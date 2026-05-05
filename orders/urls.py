from django.urls import path
from .views import CreateOrderView, GetOrderView

urlpatterns = [
    path('create/', CreateOrderView.as_view(), name='create-order'),
    path('<str:order_number>/', GetOrderView.as_view(), name='get-order'),
]