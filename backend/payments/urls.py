from django.urls import path
from .views import (
    payments_root,
    InitiateSTKPushView,
    PaymentStatusView,
    MpesaCallbackView
)

urlpatterns = [
    path('', payments_root, name='payments-root'),
    path('initiate-stk-push/', InitiateSTKPushView.as_view(), name='initiate-stk-push'),
    path('<int:pk>/status/', PaymentStatusView.as_view(), name='payment-status'),
    path('mpesa-callback/', MpesaCallbackView.as_view(), name='mpesa-callback'),
]