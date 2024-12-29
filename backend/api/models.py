from django.db import models
from PIL import Image
from io import BytesIO
from django.core.files.base import ContentFile

class AudioFile(models.Model):
    title = models.CharField(max_length=255)
    description = models.TextField(blank=True)
    file = models.FileField(upload_to='audio/')
    image = models.ImageField(upload_to='images/', null=True, blank=True)
    uploaded_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title
    

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