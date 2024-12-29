from django.contrib import admin
from .models import AudioFile

class AudioFileAdmin(admin.ModelAdmin):
    list_display = ('title', 'description', 'uploaded_at', 'file', 'image')  # Display image field in admin list

admin.site.register(AudioFile, AudioFileAdmin)