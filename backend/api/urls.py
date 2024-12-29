from django.urls import path
from .views import MessageView, AudioListView

urlpatterns = [
    path('message/', MessageView.as_view(), name='message'),
    path('audio/', AudioListView.as_view(), name='audio-list'),
]