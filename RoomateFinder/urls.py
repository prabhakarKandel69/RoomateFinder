from django.contrib import admin
from django.urls import path,include
from django.conf import settings
from django.conf.urls.static import static



urlpatterns = [
    path('accounts/',include('allauth.urls')),
    path('admin/', admin.site.urls),
    path('api/', include('api.urls')),
    path('matches/',include('matches.urls')),
    path('chat/',include('chat.urls')),
    path('search/',include('search.urls')),
    path('notifications/',include('notifications.urls')),
]

urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)


