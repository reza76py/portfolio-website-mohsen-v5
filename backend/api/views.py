from rest_framework.views import APIView
from rest_framework.response import Response
from .models import AudioFile

class MessageView(APIView):
    def get(self, request):
        return Response({"message": "Hello, world!"})
    


class AudioListView(APIView):
    def get(self, request):
        audio_files = AudioFile.objects.all()
        data = [
            {"title": audio.title, "url": request.build_absolute_uri(audio.file.url)}
            for audio in audio_files
        ]
        return Response(data)