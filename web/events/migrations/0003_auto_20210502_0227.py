# Generated by Django 3.0 on 2021-05-01 17:27

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('events', '0002_event_participants'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='event',
            options={'ordering': ['-id']},
        ),
    ]
