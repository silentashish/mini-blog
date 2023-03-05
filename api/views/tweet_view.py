from miniblog.settings import BASE_DIR
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import api_view, permission_classes
from rest_framework.authtoken.models import Token
from rest_framework.response import Response
from rest_framework import status
from rest_framework import serializers

from api.serializers import CreateTweetSerializer, TweetSerializer, TweetImageSerializer
from api.models import Tweet, TweetImages


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
            all_tweet = TweetSerializer(Tweet.objects.all(), many=True).data

            for tweet in all_tweet:
                images = TweetImageSerializer(
                    TweetImages.objects.filter(tweet=tweet["id"]), many=True
                ).data
                tweet["images"] = images

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
