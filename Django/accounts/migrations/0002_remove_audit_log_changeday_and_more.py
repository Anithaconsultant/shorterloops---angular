# Generated by Django 4.1.5 on 2024-04-29 10:42

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='audit_log',
            name='changeDay',
        ),
        migrations.RemoveField(
            model_name='audit_log',
            name='currentLoc',
        ),
    ]