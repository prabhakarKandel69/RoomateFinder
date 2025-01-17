from django.urls import path
from .views import Search,SearchByName

urlpatterns = [
    path('', Search.as_view(), name='search'),
    path('name/',SearchByName.as_view(),name='searchbyname')
]