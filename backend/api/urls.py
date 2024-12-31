from django.urls import path
from .views import MessageView, AudioListView, ContactView, LinksView

urlpatterns = [
    path('message/', MessageView.as_view(), name='message'),
    path('audio/', AudioListView.as_view(), name='audio-list'),
    path('contact/', ContactView.as_view(), name='contact'),
    path('links/', LinksView.as_view(), name='links'),
]