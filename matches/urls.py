from django.urls import path
from .views import *

urlpatterns = [
    path('',MatchGetView.as_view(),name='getmatch'),
    path('reqmatch/',MatchReqView.as_view(),name='requestmatch'),
    path('requests/',MatchRequests.as_view(),name='matchrequests')
]
