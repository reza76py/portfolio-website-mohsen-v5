from rest_framework import serializers
from .models import Contact, Links

class  ContactSerializer(serializers.ModelSerializer):
    class Meta:
        model = Contact
        fields = ['name', 'email', 'subject', 'message']


class LinksSerializer(serializers.ModelSerializer):
    class Meta:
        model = Links
        fields = ['title', 'url', 'description', 'uploaded_at']        