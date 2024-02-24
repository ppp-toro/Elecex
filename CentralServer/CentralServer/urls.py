from django.contrib import admin
from django.urls import path
from django.urls import include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include('app.urls')),
    path('app/', include('app.urls')),
    path('accounts/', include('django.contrib.auth.urls'))
]
