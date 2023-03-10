from miniblog.settings import BASE_DIR
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import api_view, permission_classes
from rest_framework.authtoken.models import Token
from rest_framework.response import Response
from rest_framework import status
from rest_framework import serializers

from api.serializers import (
    CreateTweetSerializer,
    TweetSerializer,
    TweetImageSerializer,
    TweetRepliesSerializer,
    TweetReplyModelSerializer,
    TweetLikesSerializer,
    TweetLikesModelSerializer,
    UserFollowSerializer,
    TweetDetailSerializer,
    UserDetailSerializer,
    UserSerializer,
)
from api.models import Tweet, TweetImages, TweetReplies, TweetLike, MyUser, UserFollower


@api_view(["POST"])
@permission_classes([IsAuthenticated])
def create_new_tweet(request):
    if request.method == "POST":
        request_body = request.data

        user = Token.objects.get(key=request.auth.key).user
        serializer = CreateTweetSerializer(data=request_body)

        if not serializer.is_valid():
            return Response(
                {"res": False, "data": serializer.errors},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
            )

        message = request_body["message"]
        image1 = request_body["image1"]
        image2 = request_body["image2"]
        image3 = request_body["image3"]

        try:
            tweet = Tweet(text=message, user=user)
            tweet.save()

            if image1:
                tweetImage1 = TweetImages(tweet=tweet, image=image1)
                tweetImage1.save()

            if image2:
                tweetImage2 = TweetImages(tweet=tweet, image=image2)
                tweetImage2.save()

            if image3:
                tweetImage3 = TweetImages(tweet=tweet, image=image3)
                tweetImage3.save()

            return Response(
                {"res": True, "data": "Tweet added successfully."},
                status=status.HTTP_201_CREATED,
            )
        except Exception as ex:
            return Response(
                {"res": False, "data": str(ex)},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
            )
    else:
        return Response(
            {"res": False, "data": "Method Not Allowed"},
            status=status.HTTP_500_INTERNAL_SERVER_ERROR,
        )


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def get_all_tweet(request):
    if request.method == "GET":
        user = Token.objects.get(key=request.auth.key).user

        try:
            all_tweet = TweetSerializer(
                Tweet.objects.all().order_by("-created_at"), many=True
            ).data

            for tweet in all_tweet:
                images = TweetImageSerializer(
                    TweetImages.objects.filter(tweet=tweet["id"]), many=True
                ).data
                replies = TweetReplyModelSerializer(
                    TweetReplies.objects.filter(tweet=tweet["id"], parent=None),
                    many=True,
                ).data
                likes = TweetLikesModelSerializer(
                    TweetLike.objects.filter(tweet=tweet["id"]),
                    many=True,
                ).data

                tweet_liked = TweetLike.objects.filter(user=user, tweet=tweet["id"])

                if tweet_liked:
                    tweet["liked"] = True
                else:
                    tweet["liked"] = False
                # replies = TweetReplies.objects.filter(tweet=tweet["id"], parent=None)
                tweet["images"] = images
                tweet["replies"] = len(replies)
                tweet["likes"] = len(likes)

            return Response(
                {"res": True, "data": all_tweet},
                status=status.HTTP_201_CREATED,
            )
        except Exception as ex:
            return Response(
                {"res": False, "data": str(ex)},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
            )
    else:
        return Response(
            {"res": False, "data": "Method Not Allowed"},
            status=status.HTTP_500_INTERNAL_SERVER_ERROR,
        )


@api_view(["POST"])
@permission_classes([IsAuthenticated])
def add_tweet_replies(request):
    if request.method == "POST":
        user = Token.objects.get(key=request.auth.key).user

        request_body = request.data

        serializer = TweetRepliesSerializer(data=request_body)
        if not serializer.is_valid():
            return Response(
                {"res": False, "data": serializer.errors},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
            )
        message = request_body["message"]
        tweet_id = request_body["tweet"]
        parent_id = request_body["parent"]

        parent = TweetReplies.objects.get(id=parent_id) if parent_id != None else None
        tweet = Tweet.objects.get(id=tweet_id) if tweet_id != None else None

        try:
            tweet_reply = TweetReplies(
                user=user, tweet=tweet, text=message, parent=parent
            )
            tweet_reply.save()
            return Response(
                {"res": True, "data": "replies added successfully"},
                status=status.HTTP_201_CREATED,
            )
        except Exception as ex:
            return Response(
                {"res": False, "data": str(ex)},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
            )
    else:
        return Response(
            {"res": False, "data": "Method Not Allowed"},
            status=status.HTTP_500_INTERNAL_SERVER_ERROR,
        )


@api_view(["POST"])
@permission_classes([IsAuthenticated])
def like_dislike_tweet(request):
    if request.method == "POST":
        user = Token.objects.get(key=request.auth.key).user

        request_body = request.data

        serializer = TweetLikesSerializer(data=request_body)
        if not serializer.is_valid():
            return Response(
                {"res": False, "data": serializer.errors},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
            )
        action = request_body["action"]
        tweet_id = request_body["tweet"]

        tweet = Tweet.objects.get(id=tweet_id) if tweet_id != None else None

        try:
            if action == True:
                tweet_like = TweetLike(user=user, tweet=tweet)
                tweet_like.save()
            else:
                tweet_like = TweetLike.objects.get(user=user, tweet=tweet)
                tweet_like.delete()
            return Response(
                {"res": True, "data": "replies added successfully"},
                status=status.HTTP_201_CREATED,
            )
        except Exception as ex:
            return Response(
                {"res": False, "data": str(ex)},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
            )
    else:
        return Response(
            {"res": False, "data": "Method Not Allowed"},
            status=status.HTTP_500_INTERNAL_SERVER_ERROR,
        )


@api_view(["POST"])
@permission_classes([IsAuthenticated])
def follow_unfollow_user(request):
    if request.method == "POST":
        user = Token.objects.get(key=request.auth.key).user

        request_body = request.data

        serializer = UserFollowSerializer(data=request_body)
        if not serializer.is_valid():
            return Response(
                {"res": False, "data": serializer.errors},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
            )
        user_id = request_body["user"]
        action = request_body["action"]

        try:
            following = MyUser.objects.get(id=user_id)

            if user.id == following.id:
                return Response(
                    {"res": False, "data": "can't follow self"},
                    status=status.HTTP_500_INTERNAL_SERVER_ERROR,
                )

            if action == True:
                userfollower = UserFollower(user=following, follower=user)
                userfollower.save()
            else:
                userfollower = UserFollower.objects.get(user=following, follower=user)
                userfollower.delete()
            return Response(
                {"res": True, "data": "Follow update action completed"},
                status=status.HTTP_201_CREATED,
            )
        except Exception as ex:
            return Response(
                {"res": False, "data": str(ex)},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
            )
    else:
        return Response(
            {"res": False, "data": "Method Not Allowed"},
            status=status.HTTP_500_INTERNAL_SERVER_ERROR,
        )


@api_view(["POST"])
@permission_classes([IsAuthenticated])
def get_one_tweet(request):
    if request.method == "POST":
        user = Token.objects.get(key=request.auth.key).user

        request_body = request.data

        serializer = TweetDetailSerializer(data=request_body)
        if not serializer.is_valid():
            return Response(
                {"res": False, "data": serializer.errors},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
            )
        tweet_id = request_body["id"]

        try:
            tweet = Tweet.objects.get(id=tweet_id)

            serialize_tweet = TweetSerializer(tweet).data

            images = TweetImageSerializer(
                TweetImages.objects.filter(tweet=tweet), many=True
            ).data
            replies = TweetReplyModelSerializer(
                TweetReplies.objects.filter(tweet=tweet, parent=None).order_by(
                    "-created_at"
                ),
                many=True,
            ).data
            likes = TweetLikesModelSerializer(
                TweetLike.objects.filter(tweet=tweet), many=True
            ).data
            tweet_liked = TweetLike.objects.filter(user=user, tweet=tweet)

            if tweet_liked:
                serialize_tweet["liked"] = True
            else:
                serialize_tweet["liked"] = False

            serialize_tweet["images"] = images
            serialize_tweet["replies"] = len(replies)
            serialize_tweet["replies_list"] = replies
            serialize_tweet["likes"] = len(likes)

            return Response(
                {"res": True, "data": serialize_tweet},
                status=status.HTTP_201_CREATED,
            )
        except Exception as ex:
            return Response(
                {"res": False, "data": str(ex)},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
            )
    else:
        return Response(
            {"res": False, "data": "Method Not Allowed"},
            status=status.HTTP_500_INTERNAL_SERVER_ERROR,
        )


@api_view(["POST"])
@permission_classes([IsAuthenticated])
def get_user_detail(request):
    if request.method == "POST":
        user = Token.objects.get(key=request.auth.key).user

        request_body = request.data

        serializer = UserDetailSerializer(data=request_body)
        if not serializer.is_valid():
            return Response(
                {"res": False, "data": serializer.errors},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
            )
        user_id = request_body["id"]

        try:
            own_profile = user.id == user_id

            if own_profile:
                user_detail = user
            else:
                user_detail = MyUser.objects.get(id=user_id)

            all_tweet = TweetSerializer(
                Tweet.objects.filter(user=user_detail).order_by("-created_at"),
                many=True,
            ).data

            for tweet in all_tweet:
                images = TweetImageSerializer(
                    TweetImages.objects.filter(tweet=tweet["id"]), many=True
                ).data
                replies = TweetReplyModelSerializer(
                    TweetReplies.objects.filter(tweet=tweet["id"], parent=None),
                    many=True,
                ).data
                likes = TweetLikesModelSerializer(
                    TweetLike.objects.filter(tweet=tweet["id"]),
                    many=True,
                ).data

                tweet_liked = TweetLike.objects.filter(user=user, tweet=tweet["id"])

                if tweet_liked:
                    tweet["liked"] = True
                else:
                    tweet["liked"] = False
                # replies = TweetReplies.objects.filter(tweet=tweet["id"], parent=None)
                tweet["images"] = images
                tweet["replies"] = len(replies)
                tweet["likes"] = len(likes)

            follower_list = UserFollower.objects.filter(user=user_detail)
            user_detail_serialize = UserSerializer(user_detail).data
            user_detail_serialize["followers"] = follower_list.count()
            isFollowingCheck = UserFollower.objects.filter(
                user=user_detail, follower=user
            )
            user_detail_serialize["is_following"] = True if isFollowingCheck else False

            return Response(
                {
                    "res": True,
                    "data": {"user": user_detail_serialize, "tweets": all_tweet},
                },
                status=status.HTTP_201_CREATED,
            )
        except Exception as ex:
            return Response(
                {"res": False, "data": str(ex)},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
            )
    else:
        return Response(
            {"res": False, "data": "Method Not Allowed"},
            status=status.HTTP_500_INTERNAL_SERVER_ERROR,
        )


@api_view(["POST"])
@permission_classes([IsAuthenticated])
def delete_tweet(request):
    if request.method == "POST":
        user = Token.objects.get(key=request.auth.key).user

        request_body = request.data

        serializer = TweetDetailSerializer(data=request_body)
        if not serializer.is_valid():
            return Response(
                {"res": False, "data": serializer.errors},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
            )
        tweet_id = request_body["id"]

        try:
            tweet = Tweet.objects.get(id=tweet_id)

            if tweet.user.id == user.id:
                tweet.delete()

                return Response(
                    {
                        "res": True,
                        "data": "tweet delete successfully",
                    },
                    status=status.HTTP_201_CREATED,
                )
            return Response(
                {
                    "res": True,
                    "data": "permission denied",
                },
                status=status.HTTP_201_CREATED,
            )
        except Exception as ex:
            return Response(
                {"res": False, "data": str(ex)},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
            )
    else:
        return Response(
            {"res": False, "data": "Method Not Allowed"},
            status=status.HTTP_500_INTERNAL_SERVER_ERROR,
        )
