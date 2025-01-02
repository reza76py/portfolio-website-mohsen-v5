from django.db import models
from PIL import Image
from io import BytesIO
from django.core.files.base import ContentFile


class Category(models.Model):
    name = models.CharField(max_length=100, unique=True)
    created_at = models.DateTimeField(auto_now_add=True)
    def __str__(self):
        return self.name

class AudioFile(models.Model):
    title = models.CharField(max_length=255)
    description = models.TextField(blank=True)
    file = models.FileField(upload_to='audio/')
    image = models.ImageField(upload_to='images/', null=True, blank=True)
    uploaded_at = models.DateTimeField(auto_now_add=True)
    category = models.ForeignKey(
        'Category', 
        on_delete=models.CASCADE, 
        related_name='audio_files', 
        null=True,  # Allow null values for existing rows
        blank=True  # Make the field optional in forms
    )

    def __str__(self):
        return f"{self.title} ({self.category.name if self.category else 'No Category'})"
    

    def save(self, *args, **kwargs):
        # Call the parent save method to save other fields first
        super().save(*args, **kwargs)
        
        if self.image:
            # Open the uploaded image
            img = Image.open(self.image)
            
            # Convert to RGB format if not already
            img = img.convert("RGB")
            
            # Resize the image to a maximum of 300x400 pixels
            max_size = (300, 400)
            img.thumbnail(max_size)
            
            # Save the resized image to a BytesIO buffer
            buffer = BytesIO()
            img.save(buffer, format="JPEG", quality=85)  # Optimize quality to 85%
            
            # Replace the original image with the resized version
            self.image.save(self.image.name, ContentFile(buffer.getvalue()), save=False)

        # Save the model again to store the resized image
        super().save(*args, **kwargs)

class Links(models.Model):
    title = models.CharField(max_length=255)
    url = models.URLField()
    description = models.TextField(blank=True)
    uploaded_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title


class Contact(models.Model):
    name = models.CharField(max_length=255)
    email = models.EmailField()
    subject = models.CharField(max_length=255, blank=True, null=True)
    message = models.TextField()
    submitted_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.name} - {self.subject or 'No Subject'}"        