from django.db import models

from django.contrib.auth.models import BaseUserManager, AbstractBaseUser

from datetime import datetime


class MyUserManager(BaseUserManager):
    def create_user(self, email, username, password=None):
        """
        Creates and saves a User with the given email,username,password.
        """
        if not email:
            raise ValueError("Users must have an email address")

        user = self.model(
            email=self.normalize_email(email),
            username=username,
        )

        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, username, password=None):
        """
        Creates and saves a superuser with the given email, username and password.
        """
        user = self.create_user(
            email,
            password=password,
            username=username,
        )
        user.is_admin = True
        user.save(using=self._db)
        return user


class MyUser(AbstractBaseUser):
    username = models.CharField(max_length=30, unique=True)
    first_name = models.CharField(verbose_name="first name", max_length=30, blank=True)
    last_name = models.CharField(verbose_name="last name", max_length=30, blank=True)
    email = models.EmailField(
        verbose_name="email address",
        max_length=255,
        unique=True,
    )
    profile_picture = models.ImageField(upload_to="images/")
    is_verified = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)
    is_admin = models.BooleanField(default=False)
    # This field will be use for password reset
    password_reset_token = models.CharField(blank=True, max_length=30)
    reset_start_time = models.DateTimeField(
        default=datetime.now(), blank=True, auto_now=False, auto_now_add=False
    )

    objects = MyUserManager()

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = ["username"]

    def __str__(self):
        return self.email

    def has_perm(self, perm, obj=None):
        "Does the user have a specific permission?"
        # Simplest possible answer: Yes, always
        return True

    def has_module_perms(self, app_label):
        "Does the user have permissions to view the app `app_label`?"
        # Simplest possible answer: Yes, always
        return True

    @property
    def is_staff(self):
        "Is the user a member of staff?"
        # Simplest possible answer: All admins are staff
        return self.is_admin


class Tweet(models.Model):
    user = models.ForeignKey(MyUser, on_delete=models.CASCADE)
    text = models.CharField(max_length=280)
    created_at = models.DateTimeField(auto_now_add=True)


class TweetImages(models.Model):
    tweet = models.ForeignKey(Tweet, on_delete=models.CASCADE)
    image = models.ImageField(upload_to="images/", blank=False)
    created_at = models.DateTimeField(auto_now_add=True)


class TweetReplies(models.Model):
    tweet = models.ForeignKey(Tweet, on_delete=models.CASCADE)
    parent = models.ForeignKey("self", on_delete=models.CASCADE, null=True)
    user = models.ForeignKey(MyUser, on_delete=models.CASCADE)
    text = models.CharField(max_length=280)
    created_at = models.DateTimeField(auto_now_add=True)


class TweetLike(models.Model):
    user = models.ForeignKey(MyUser, on_delete=models.CASCADE, related_name="like_set")
    tweet = models.ForeignKey(Tweet, on_delete=models.CASCADE, related_name="like_set")
    created_at = models.DateTimeField(auto_now_add=True)


class UserFollower(models.Model):
    user = models.ForeignKey(MyUser, on_delete=models.CASCADE, related_name="following")
    follower = models.ForeignKey(
        MyUser, on_delete=models.CASCADE, related_name="follower"
    )
    created_at = models.DateTimeField(auto_now_add=True)
