from django.urls import path
from .views import *

urlpatterns= [
    path('',NotificationView.as_view(),name='notifications'),
]