from django.contrib import admin
from django.http import HttpResponse
from django.urls import path, include

urlpatterns = [
    path('', lambda request: HttpResponse('{"message": "SantoZ Furniture API is running"}', content_type='application/json')),
    path('admin/', admin.site.urls),
    path('api/auth/', include('accounts.urls')),
    path('api/orders/', include('orders.urls')),
    path('api/payments/', include('payments.urls')),
]