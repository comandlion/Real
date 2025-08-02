from django.urls import path
from rest_framework_simplejwt.views import TokenRefreshView
from .views import login, register, user_profile

urlpatterns = [
    path('login/', login, name='login'),
    path('register/', register, name='register'),
    path('user/', user_profile, name='user-profile'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token-refresh'),
]
