# Generated by Django 4.1.7 on 2023-03-05 08:00

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0002_alter_myuser_username'),
    ]

    operations = [
        migrations.AddField(
            model_name='myuser',
            name='password_reset_token',
            field=models.CharField(blank=True, max_length=30),
        ),
        migrations.AddField(
            model_name='myuser',
            name='reset_start_time',
            field=models.DateTimeField(blank=True, default=datetime.datetime(2023, 3, 5, 8, 0, 42, 343810)),
        ),
    ]
