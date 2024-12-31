from django.urls import path
from .views import *
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from rest_framework import permissions
from drf_yasg.views import get_schema_view
from drf_yasg import openapi
from django.conf import settings
from django.conf.urls.static import static  



schema_view = get_schema_view(
    openapi.Info(
        title="Roommate Finder API",
        default_version='v1',
        description="API documentation for Roommate Finder application",
        contact=openapi.Contact(email="pkandel6969@gmail.com"),
    ),
    public=True,
    permission_classes=(permissions.AllowAny,),
)



urlpatterns = [
    path('api-docs/', schema_view.with_ui('swagger', cache_timeout=0), name='schema-swagger-ui'),
    path('docs/', schema_view.with_ui('redoc', cache_timeout=0), name='schema-redoc'),
    path('register/', RegisterView.as_view(), name='register'),
    path('login/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('logout/', LogoutView.as_view(), name='logout'),
    path('profile/<str:username>/',PublicProfileView.as_view(),name='public_profile'),
    path('profile/',ProfileView.as_view(),name='profile'),
    path('delete-account/',DeleteAccountView.as_view(),name='delete-account')
]



