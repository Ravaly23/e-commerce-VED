from django.urls import path

from . import views

urlpatterns = [
    path('ajout_article/',views.ajout_article, name='ajout_article')
]
