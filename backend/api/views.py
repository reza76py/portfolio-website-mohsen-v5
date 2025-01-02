from rest_framework.decorators import api_view
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import AudioFile, Contact, Links, Category
from .serializers import ContactSerializer, LinksSerializer, AudioFileSerializer, CategorySerializer
from rest_framework.pagination import PageNumberPagination


class AudioPagination(PageNumberPagination):
    page_size = 10

# View to list all categories
@api_view(['GET'])
def category_list(request):
    categories = Category.objects.all()
    serializer = CategorySerializer(categories, many=True)
    return Response(serializer.data)

# View for the message endpoint
class MessageView(APIView):
    def get(self, request):
        return Response({"message": "Select the Category of music you want to listen to."})

# View to list all audio files with audio_url and image_url
class AudioListView(APIView):
    def get(self, request):
        category_name = request.GET.get('category', None)
        if category_name:
            audio_files = AudioFile.objects.filter(category__name=category_name)
        else:
            audio_files = AudioFile.objects.all()
        data = [
            {
                "title": audio.title,
                "description": audio.description,
                "audio_url": request.build_absolute_uri(audio.file.url),
                "image_url": request.build_absolute_uri(audio.image.url) if audio.image else None,
                "category": audio.category.name if audio.category else "Uncategorized",
            }
            for audio in audio_files
        ]
        return Response(data)

    def post(self, request):
        serializer = AudioFileSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# View to list and create links
class LinksView(APIView):
    def get(self, request):
        links = Links.objects.all()
        serializer = LinksSerializer(links, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = LinksSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# View to handle contact inquiries
class ContactView(APIView):
    def get(self, request):
        inquiries = Contact.objects.all()
        serializer = ContactSerializer(inquiries, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = ContactSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"message": "Your inquiry has been submitted!"}, status=201)
        return Response(serializer.errors, status=400)
