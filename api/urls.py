from django.urls import path
from api.views import auth_view

auth_urls = [path("auth/signin", auth_view.user_sign_in)]

urlpatterns = auth_urls
