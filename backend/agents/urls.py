from django.urls import path, include
from rest_framework.routers import DefaultRouter
from properties.views import AgentViewSet

router = DefaultRouter()
router.register(r'agents', AgentViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
