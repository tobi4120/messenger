from django.urls import include, path
from rest_framework import routers
from . import views
from knox import views as knox_views
from .views import RegisterAPI, LoginAPI, UserAPI

router = routers.DefaultRouter()

urlpatterns = [
    path("api_", include(router.urls)),
    path("registerAPI", RegisterAPI.as_view()),
    path("loginAPI", LoginAPI.as_view()),
    path("userAPI", UserAPI.as_view()),
    path("logoutAPI", knox_views.LogoutView.as_view(), name='knox_logout'),
    path("auth", include('knox.urls'))
]