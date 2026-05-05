import json
import base64
import requests
from datetime import datetime
from django.conf import settings
from django.http import HttpResponse
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator
from rest_framework import generics, status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response

from .models import Payment, MpesaTransaction
from .serializers import PaymentSerializer, InitiatePaymentSerializer
from orders.models import Order


# M-Pesa Configuration (Replace with your actual credentials)
MPESA_CONFIG = {
    'CONSUMER_KEY': 'your_consumer_key_here',
    'CONSUMER_SECRET': 'your_consumer_secret_here',
    'SHORTCODE': '174379',  # Test shortcode
    'PASSKEY': 'bfb279f9aa9bdbcf158e97dd71a467cd2e0c893059b10f78e6b72ada1ed2c919',  # Test passkey
    'BASE_URL': 'https://sandbox.safaricom.co.ke' if settings.DEBUG else 'https://api.safaricom.co.ke',
}


def get_mpesa_access_token():
    """Get M-Pesa access token"""
    try:
        credentials = base64.b64encode(
            f"{MPESA_CONFIG['CONSUMER_KEY']}:{MPESA_CONFIG['CONSUMER_SECRET']}".encode()
        ).decode()

        headers = {
            'Authorization': f'Basic {credentials}',
            'Content-Type': 'application/json'
        }

        response = requests.get(
            f"{MPESA_CONFIG['BASE_URL']}/oauth/v1/generate?grant_type=client_credentials",
            headers=headers
        )

        if response.status_code == 200:
            return response.json()['access_token']
        return None
    except Exception as e:
        print(f"Error getting access token: {e}")
        return None


def generate_password():
    """Generate M-Pesa password"""
    timestamp = datetime.now().strftime('%Y%m%d%H%M%S')
    password_str = f"{MPESA_CONFIG['SHORTCODE']}{MPESA_CONFIG['PASSKEY']}{timestamp}"
    password = base64.b64encode(password_str.encode()).decode()
    return password, timestamp


@api_view(['GET'])
def payments_root(request):
    return Response({
        'message': 'Payments API',
        'endpoints': {
            'initiate_stk_push': '/api/payments/initiate-stk-push/',
            'payment_status': '/api/payments/{payment_id}/status/',
            'callback': '/api/payments/mpesa-callback/'
        }
    })


class InitiateSTKPushView(generics.GenericAPIView):
    serializer_class = InitiatePaymentSerializer
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        order_id = serializer.validated_data['order_id']
        phone_number = serializer.validated_data['phone_number']

        try:
            order = Order.objects.get(id=order_id)
        except Order.DoesNotExist:
            return Response({'error': 'Order not found'}, status=status.HTTP_404_NOT_FOUND)

        # Check if payment already exists
        if hasattr(order, 'payment'):
            return Response({'error': 'Payment already initiated for this order'}, status=status.HTTP_400_BAD_REQUEST)

        # Create payment record
        payment = Payment.objects.create(
            order=order,
            amount=order.total_amount,
            phone_number=phone_number,
            status='pending'
        )

        # Get access token
        access_token = get_mpesa_access_token()
        if not access_token:
            payment.status = 'failed'
            payment.response_description = 'Failed to get M-Pesa access token'
            payment.save()
            return Response({'error': 'Payment service unavailable'}, status=status.HTTP_503_SERVICE_UNAVAILABLE)

        # Generate password and timestamp
        password, timestamp = generate_password()

        # Prepare STK push request
        stk_push_url = f"{MPESA_CONFIG['BASE_URL']}/mpesa/stkpush/v1/processrequest"
        headers = {
            'Authorization': f'Bearer {access_token}',
            'Content-Type': 'application/json'
        }

        payload = {
            'BusinessShortCode': MPESA_CONFIG['SHORTCODE'],
            'Password': password,
            'Timestamp': timestamp,
            'TransactionType': 'CustomerPayBillOnline',
            'Amount': int(order.total_amount),
            'PartyA': phone_number,
            'PartyB': MPESA_CONFIG['SHORTCODE'],
            'PhoneNumber': phone_number,
            'CallBackURL': f"{request.build_absolute_uri('/api/payments/mpesa-callback/')}",
            'AccountReference': f"SZ-{order.order_number}",
            'TransactionDesc': f"Payment for Order {order.order_number}"
        }

        try:
            response = requests.post(stk_push_url, json=payload, headers=headers)
            response_data = response.json()

            if response.status_code == 200:
                payment.merchant_request_id = response_data.get('MerchantRequestID')
                payment.checkout_request_id = response_data.get('CheckoutRequestID')
                payment.status = 'processing'
                payment.response_code = response_data.get('ResponseCode')
                payment.response_description = response_data.get('ResponseDescription')
                payment.save()

                return Response({
                    'message': 'STK push initiated successfully',
                    'payment_id': payment.id,
                    'merchant_request_id': payment.merchant_request_id,
                    'checkout_request_id': payment.checkout_request_id,
                    'response_description': payment.response_description
                }, status=status.HTTP_200_OK)
            else:
                payment.status = 'failed'
                payment.response_description = response_data.get('errorMessage', 'STK push failed')
                payment.save()

                return Response({
                    'error': 'Failed to initiate payment',
                    'details': payment.response_description
                }, status=status.HTTP_400_BAD_REQUEST)

        except Exception as e:
            payment.status = 'failed'
            payment.response_description = str(e)
            payment.save()

            return Response({
                'error': 'Payment processing error',
                'details': str(e)
            }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class PaymentStatusView(generics.RetrieveAPIView):
    serializer_class = PaymentSerializer
    permission_classes = [AllowAny]

    def get_queryset(self):
        return Payment.objects.all()


@method_decorator(csrf_exempt, name='dispatch')
class MpesaCallbackView(generics.GenericAPIView):
    permission_classes = [AllowAny]

    def post(self, request):
        try:
            callback_data = json.loads(request.body)
            print(f"M-Pesa Callback: {callback_data}")

            # Save raw callback data
            result_code = callback_data.get('Body', {}).get('stkCallback', {}).get('ResultCode')
            result_desc = callback_data.get('Body', {}).get('stkCallback', {}).get('ResultDesc')
            merchant_request_id = callback_data.get('Body', {}).get('stkCallback', {}).get('MerchantRequestID')
            checkout_request_id = callback_data.get('Body', {}).get('stkCallback', {}).get('CheckoutRequestID')

            # Find payment by checkout_request_id
            try:
                payment = Payment.objects.get(checkout_request_id=checkout_request_id)
            except Payment.DoesNotExist:
                return HttpResponse("Payment not found", status=404)

            # Update payment status
            if result_code == 0:
                # Payment successful
                payment.status = 'completed'
                callback_metadata = callback_data.get('Body', {}).get('stkCallback', {}).get('CallbackMetadata', {}).get('Item', [])

                # Extract transaction details
                transaction_data = {}
                for item in callback_metadata:
                    name = item.get('Name')
                    value = item.get('Value')
                    transaction_data[name] = value

                mpesa_receipt_number = transaction_data.get('MpesaReceiptNumber')
                transaction_date = transaction_data.get('TransactionDate')
                phone_number = transaction_data.get('PhoneNumber')
                amount = transaction_data.get('Amount')

                # Create MpesaTransaction record
                MpesaTransaction.objects.create(
                    payment=payment,
                    transaction_type='STK',
                    mpesa_receipt_number=mpesa_receipt_number,
                    transaction_date=datetime.strptime(str(transaction_date), '%Y%m%d%H%M%S') if transaction_date else None,
                    phone_number=str(phone_number),
                    amount=amount,
                    account_reference=f"SZ-{payment.order.order_number}",
                    transaction_desc=f"Payment for Order {payment.order.order_number}",
                    raw_callback_data=callback_data
                )

                # Update order payment status
                payment.order.payment_status = True
                payment.order.status = 'paid'
                payment.order.save()

            else:
                # Payment failed
                payment.status = 'failed'
                payment.response_description = result_desc

            payment.save()

            return HttpResponse("Callback received successfully", status=200)

        except Exception as e:
            print(f"Callback processing error: {e}")
            return HttpResponse("Callback processing failed", status=500)
