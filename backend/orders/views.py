from rest_framework import generics, permissions, status
from rest_framework.decorators import api_view
from rest_framework.response import Response

from .models import Order
from .serializers import OrderSerializer


@api_view(['GET'])
def orders_root(request):
    return Response({
        'message': 'Orders API',
        'endpoints': {
            'create': '/api/orders/create/',
            'get': '/api/orders/{order_number}/'
        }
    })


class CreateOrderView(generics.CreateAPIView):
    serializer_class = OrderSerializer
    permission_classes = [permissions.AllowAny]

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        order = serializer.save()

        return Response({
            'order': OrderSerializer(order).data,
            'message': 'Order created successfully!'
        }, status=status.HTTP_201_CREATED)


class GetOrderView(generics.RetrieveAPIView):
    serializer_class = OrderSerializer
    permission_classes = [permissions.AllowAny]
    lookup_field = 'order_number'

    def get_queryset(self):
        return Order.objects.all()
