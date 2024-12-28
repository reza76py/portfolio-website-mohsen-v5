from django.urls import path
from .views import MessageView, AudioListView

urlpatterns = [
    path('message/', MessageView.as_view()),
    path('audio/', AudioListView.as_view()),
]