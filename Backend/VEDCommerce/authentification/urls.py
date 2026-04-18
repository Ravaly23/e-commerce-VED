from django.urls import path
from rest_framework_simplejwt.views import TokenRefreshView
from . import views

urlpatterns = [
    path('inscription/', views.inscription_client, name='inscription_client'),
    path('connexion/', views.connexion_client, name='connexion_client'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]
