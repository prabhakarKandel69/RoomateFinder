from django.urls import path
from .views import *

urlpatterns = [
    path('recent-messages/', RecentMessages.as_view(), name="recent-messages"),
    path('message/<str:username>/', MessageDetail.as_view(), name="message-detail"),
]
