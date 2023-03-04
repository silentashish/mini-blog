from django.urls import path
from api.views import auth_view

auth_urls = [
    path("auth/signin", auth_view.user_sign_in),
    path("auth/signup", auth_view.user_sign_up),
    path("auth/completeprofile", auth_view.complete_profile),
]

urlpatterns = auth_urls
