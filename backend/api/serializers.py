from rest_framework import serializers
from .models import Contact, Links, AudioFile, Category

# Contact Serializer
class ContactSerializer(serializers.ModelSerializer):
    class Meta:
        model = Contact
        fields = ['name', 'email', 'subject', 'message']

# Links Serializer
class LinksSerializer(serializers.ModelSerializer):
    class Meta:
        model = Links
        fields = ['title', 'url', 'description', 'uploaded_at']

# AudioFile Serializer
class AudioFileSerializer(serializers.ModelSerializer):
    category = serializers.StringRelatedField()  # Display category name
    category_id = serializers.PrimaryKeyRelatedField(queryset=Category.objects.all(), source='category')  # Include category ID

    class Meta:
        model = AudioFile
        fields = ['title', 'description', 'file', 'image', 'category', 'category_id']

# Category Serializer
class CategorySerializer(serializers.ModelSerializer):
    audio_files = AudioFileSerializer(many=True, read_only=True)  # Include related audio files

    class Meta:
        model = Category
        fields = ['name', 'created_at', 'audio_files']
