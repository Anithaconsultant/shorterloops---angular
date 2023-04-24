from django.contrib import admin
from django.urls import path
from accounts import views
from django.conf.urls import include
urlpatterns = [
    path('api-auth/', include('rest_framework.urls', namespace='rest_framework')),
    path('', views.login, name='login'),
    path('signup/', views.signup, name='signup'),
    path('addcity/', views.addcity, name='addcity'),
    path('addcity/<cityid>', views.editcity, name='editcity'),
    path('facility/', views.facility, name='facility'),
    path('updatefacility/', views.updatefacility, name='updatefacility')
   
]
