from django.contrib import admin
from .models import Payment, MpesaTransaction


@admin.register(Payment)
class PaymentAdmin(admin.ModelAdmin):
    list_display = ['id', 'order', 'amount', 'phone_number', 'status', 'created_at']
    list_filter = ['status', 'created_at']
    search_fields = ['order__order_number', 'phone_number', 'transaction_id']
    readonly_fields = ['transaction_id', 'merchant_request_id', 'checkout_request_id', 'created_at', 'updated_at']


@admin.register(MpesaTransaction)
class MpesaTransactionAdmin(admin.ModelAdmin):
    list_display = ['payment', 'transaction_type', 'mpesa_receipt_number', 'amount', 'created_at']
    list_filter = ['transaction_type', 'created_at']
    search_fields = ['mpesa_receipt_number', 'payment__order__order_number']
    readonly_fields = ['created_at']
