from django.contrib import admin
from .models import AudioFile, Contact

class AudioFileAdmin(admin.ModelAdmin):
    list_display = ('title', 'description', 'uploaded_at', 'file', 'image')  # Display image field in admin list

class ContactAdmin(admin.ModelAdmin):
    list_display = ('name', 'email', 'subject', 'submitted_at')  # Display subject field in admin list    

admin.site.register(AudioFile, AudioFileAdmin)  # Register both models with custom admin classes
admin.site.register(Contact, ContactAdmin)