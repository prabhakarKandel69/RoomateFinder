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
        title="RoommateFinder Chat API",
        default_version='v1',
        description="""
            **WebSocket Endpoint**:  
            `ws/chat/<room_name>/`  
            - Connect to this WebSocket endpoint with a room name.
            - Example: `ws://127.0.0.1:8000/ws/chat/admin_prabh/`.
            - Messages should be sent in the following format:  
              ```json
              {
                  "message": "Hello, World!",(required)
                  "attachment": "data:image/png;base64,<base64-encoded-data>"(may be null)
              }
              ```
            - Response would be:

            ```json
              {
                  "message": <message>,
                  "attachment_url": <url>(may be null),
                  "sender": <username>
              }
              ```



            **HTTP Endpoints**:
        """,
        terms_of_service="https://www.google.com/policies/terms/",
        contact=openapi.Contact(email="support@roommatefinder.com"),
        license=openapi.License(name="BSD License"),
    ),
    public=True,
    permission_classes=(permissions.AllowAny,),
)


urlpatterns = [
    
    path('api-docs/', schema_view.with_ui('swagger', cache_timeout=0), name='schema-swagger-ui'),
    path('docs/', schema_view.with_ui('redoc', cache_timeout=0), name='schema-redoc'),
    path('register/', RegisterView.as_view(), name='register'),
    path('login/', CustomLogin.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('upload-photo/', PhotoUploadView.as_view(), name='upload_photo'),
    path('photos/',PhotoGetView.as_view(),name='photos'),
    path('delete-photo/<int:photo_id>/',PhotoDeleteView.as_view(),name='delete_photo'),
    path('get-photos/<str:username>/',PublicPhotoGet.as_view(),name='get_photos'),
    path('logout/', LogoutView.as_view(), name='logout'),
    path('profile/<str:username>/',PublicProfileView.as_view(),name='public_profile'),
    path('profile/',ProfileView.as_view(),name='profile'),
    path('delete-account/',DeleteAccountView.as_view(),name='delete-account'),
    path('auth/google/',GoogleAuthView.as_view(),name='google_auth'),
]



