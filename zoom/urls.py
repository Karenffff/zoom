from django.urls import path
from . import views

urlpatterns = [
    path('zoommeeting/', views.home, name='home'),
    path('createlink/', views.zoom_meeting, name='zoom_link'),
    path('zoommeeting/zoommeeting/', views.final, name='zoom_meeting'),
    path("verify-user/", views.verify_user, name="verify_user"),
   
]
