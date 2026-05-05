from django.urls import path

from .views import LoginView, RegisterView, auth_root

urlpatterns = [
    path('', auth_root, name='auth-root'),
    path('register/', RegisterView.as_view(), name='register'),
    path('login/', LoginView.as_view(), name='login'),
]
