from django.db import models
from django.contrib.auth import get_user_model

User = get_user_model()


class Payment(models.Model):
    PAYMENT_STATUS_CHOICES = [
        ('pending', 'Pending'),
        ('processing', 'Processing'),
        ('completed', 'Completed'),
        ('failed', 'Failed'),
        ('cancelled', 'Cancelled'),
    ]

    order = models.OneToOneField('orders.Order', on_delete=models.CASCADE, related_name='payment')
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    phone_number = models.CharField(max_length=15)
    transaction_id = models.CharField(max_length=100, blank=True, null=True)
    merchant_request_id = models.CharField(max_length=100, blank=True, null=True)
    checkout_request_id = models.CharField(max_length=100, blank=True, null=True)
    status = models.CharField(max_length=20, choices=PAYMENT_STATUS_CHOICES, default='pending')
    response_code = models.CharField(max_length=10, blank=True, null=True)
    response_description = models.TextField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"Payment for Order {self.order.order_number}"

    class Meta:
        ordering = ['-created_at']


class MpesaTransaction(models.Model):
    TRANSACTION_TYPES = [
        ('STK', 'STK Push'),
        ('C2B', 'Customer to Business'),
        ('B2C', 'Business to Customer'),
    ]

    payment = models.ForeignKey(Payment, on_delete=models.CASCADE, related_name='mpesa_transactions')
    transaction_type = models.CharField(max_length=10, choices=TRANSACTION_TYPES)
    mpesa_receipt_number = models.CharField(max_length=20, blank=True, null=True)
    transaction_date = models.DateTimeField(blank=True, null=True)
    phone_number = models.CharField(max_length=15)
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    account_reference = models.CharField(max_length=100)
    transaction_desc = models.TextField(blank=True, null=True)
    raw_callback_data = models.JSONField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.transaction_type} - {self.mpesa_receipt_number or 'Pending'}"

    class Meta:
        ordering = ['-created_at']
