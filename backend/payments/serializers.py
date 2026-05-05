from rest_framework import serializers
from .models import Payment, MpesaTransaction


class MpesaTransactionSerializer(serializers.ModelSerializer):
    class Meta:
        model = MpesaTransaction
        fields = '__all__'


class PaymentSerializer(serializers.ModelSerializer):
    mpesa_transactions = MpesaTransactionSerializer(many=True, read_only=True)
    order_number = serializers.CharField(source='order.order_number', read_only=True)

    class Meta:
        model = Payment
        fields = [
            'id', 'order', 'order_number', 'amount', 'phone_number',
            'transaction_id', 'status', 'response_code', 'response_description',
            'mpesa_transactions', 'created_at', 'updated_at'
        ]
        read_only_fields = ['transaction_id', 'status', 'response_code', 'response_description', 'created_at', 'updated_at']


class InitiatePaymentSerializer(serializers.Serializer):
    order_id = serializers.IntegerField()
    phone_number = serializers.CharField(max_length=15)

    def validate_phone_number(self, value):
        # Basic phone number validation for Kenyan numbers
        if not value.startswith('254') or len(value) != 12:
            raise serializers.ValidationError("Phone number must be in format 254XXXXXXXXX")
        return value
