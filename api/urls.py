from django.urls import path
from api.views import auth_view, tweet_view

auth_urls = [
    path("auth/signin", auth_view.user_sign_in),
    path("auth/signup", auth_view.user_sign_up),
    path("auth/completeprofile", auth_view.complete_profile),
    path("auth/changepassword", auth_view.change_password),
    path("auth/resetpassword", auth_view.reset_password),
    path("auth/createnewpassword", auth_view.create_new_password),
]

tweet_urls = [
    path("tweet/add", tweet_view.create_new_tweet),
    path("tweet/all", tweet_view.get_all_tweet),
    path("tweet/reply", tweet_view.add_tweet_replies),
    path("tweet/like", tweet_view.like_dislike_tweet),
    path("tweet/one", tweet_view.get_one_tweet),
    path("tweet/delete", tweet_view.delete_tweet),
]

user_urls = [
    path("user/follow", tweet_view.follow_unfollow_user),
    path("user/details", tweet_view.get_user_detail),
]

urlpatterns = auth_urls + tweet_urls + user_urls
