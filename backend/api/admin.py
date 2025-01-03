from django.contrib import admin
from .models import AudioFile, Contact, Links, Category  # Import the models

# Admin for Category
@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ['name', 'created_at']  # Display name and creation date
    search_fields = ['name']  # Required for autocomplete functionality in AudioFileAdmin

# Admin for AudioFile
@admin.register(AudioFile)
class AudioFileAdmin(admin.ModelAdmin):
    list_display = ['title', 'category', 'uploaded_at', 'file', 'image']  # Display category and other fields
    search_fields = ['title', 'category__name']  # Allow searching by title and category name
    list_filter = ['category']  # Add filtering by category
    autocomplete_fields = ['category']  # Enable searchable dropdown for categories

# Admin for Contact
@admin.register(Contact)
class ContactAdmin(admin.ModelAdmin):
    list_display = ('name', 'email', 'subject', 'submitted_at')  # Display subject and submission time

# admin.py
@admin.register(Links)
class LinksAdmin(admin.ModelAdmin):
    list_display = ('title', 'url', 'description', 'uploaded_at', 'category')
    search_fields = ('title', 'url', 'category__name')
    list_filter = ('category',)  # Filter by category
    autocomplete_fields = ['category']  # Enable searchable dropdown for categories
