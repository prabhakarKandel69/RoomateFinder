from django.urls import path
from .views import *

urlpatterns = [
    path('',MatchGetView.as_view(),name='getmatch'),
    path('reqmatch/',MatchReqView.as_view(),name='requestmatch'),
    path('requests/',MatchRequests.as_view(),name='matchrequests'),
    path('match/',MatchUser.as_view(),name='match'),
    path('matched/',MatchedView.as_view(),name='matched'),
]
