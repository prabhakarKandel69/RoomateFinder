from django.urls import path
from .views import *

urlpatterns = [
    path('',MatchGetView.as_view(),name='view')
]
