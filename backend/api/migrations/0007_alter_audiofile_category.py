# Generated by Django 5.1.4 on 2025-01-02 10:17

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0006_category_audiofile_category'),
    ]

    operations = [
        migrations.AlterField(
            model_name='audiofile',
            name='category',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='audio_files', to='api.category'),
        ),
    ]