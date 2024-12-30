from rest_framework.views import APIView
from rest_framework.response import Response
from .models import AudioFile, Contact
from rest_framework import status
from .serializers import ContactSerializer


class MessageView(APIView):
    def get(self, request):
        return Response({"message": "Hello, world!"})
    


class AudioListView(APIView):
    def get(self, request):
        audio_files = AudioFile.objects.all()
        data = [
            {
                "title": audio.title,
                "description": audio.description,
                "audio_url": request.build_absolute_uri(audio.file.url),
                "image_url": request.build_absolute_uri(audio.image.url) if audio.image else None,
            }
            for audio in audio_files
        ]
        return Response(data)
    

class ContactView(APIView):
    def get(self, request):
        # Fetch all submitted inquiries
        inquiries = Contact.objects.all()
        serializer = ContactSerializer(inquiries, many=True)
        return Response(serializer.data)

    def post(self, request):
        # Handle form submission
        serializer = ContactSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"message": "Your inquiry has been submitted!"}, status=201)
        return Response(serializer.errors, status=400)