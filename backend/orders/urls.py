from django.urls import path

from .views import CreateOrderView, GetOrderView, orders_root

urlpatterns = [
    path('', orders_root, name='orders-root'),
    path('create/', CreateOrderView.as_view(), name='create-order'),
    path('<str:order_number>/', GetOrderView.as_view(), name='get-order'),
]
