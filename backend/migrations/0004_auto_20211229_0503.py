# Generated by Django 3.1 on 2021-12-29 05:03

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('backend', '0003_auto_20211229_0458'),
    ]

    operations = [
        migrations.AlterField(
            model_name='message',
            name='convo',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='messages', to='backend.convo'),
        ),
    ]
