from rest_framework import serializers
from api.models import Tweet, MyUser, TweetImages

# Serializer related to the auth section
class SigninSerializer(serializers.Serializer):
    email = serializers.EmailField(required=True)
    password = serializers.CharField(required=True)


class SignupSerializer(serializers.Serializer):
    username = serializers.CharField(required=True)
    email = serializers.EmailField(required=True)
    password = serializers.CharField(required=True)


class ChangePasswordSerializer(serializers.Serializer):
    old_password = serializers.CharField(required=True)
    new_password = serializers.CharField(required=True)


class CompleteProfileSerializer(serializers.Serializer):
    profile_image = serializers.ImageField(required=True)
    first_name = serializers.CharField(required=True)
    last_name = serializers.CharField(required=True)


class ResetPasswordSerializer(serializers.Serializer):
    email = serializers.EmailField(required=True)


class CreatePasswordSerializer(serializers.Serializer):
    token = serializers.CharField(required=True)
    new_password = serializers.CharField(required=True)


# Serializer related to the tweet section


class CreateTweetSerializer(serializers.Serializer):
    message = serializers.CharField(required=True)
    image1 = serializers.ImageField(required=False)
    image2 = serializers.ImageField(required=False)
    image3 = serializers.ImageField(required=False)


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = MyUser
        fields = ["username", "email", "profile_picture", "first_name", "last_name"]


class TweetImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = TweetImages
        fields = ["image"]


class TweetSerializer(serializers.ModelSerializer):
    user = UserSerializer()

    class Meta:
        model = Tweet
        fields = ["id", "user", "created_at", "text"]
