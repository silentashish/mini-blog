from django.db.models import fields
from rest_framework import serializers
from .models import MyUser


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = MyUser
        fields = [
            "username",
            "first_name",
            "last_name",
            "email",
            "profile_picture",
            "is_verified",
            "is_active",
            "is_admin",
        ]
