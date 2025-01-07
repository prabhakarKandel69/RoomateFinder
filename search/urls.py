from django.urls import path
from .views import Search

urlpatterns = [
    path('', Search.as_view(), name='search'),
]