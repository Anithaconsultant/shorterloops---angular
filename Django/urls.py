from django.contrib import admin
from django.urls import path
from accounts import views
from django.conf.urls import include
urlpatterns = [
    # path('api-auth/', include('rest_framework.urls', namespace='rest_framework')),
    # path('', views.login, name='login'),
    # path('login/', views.login, name='login'),
    # path('updateusercity/<userid>', views.updateusercity, name='updateusercity'),
    # path('signup/', views.signup, name='signup'),
    # path('addcity/', views.addcity, name='addcity'),
    # path('addcity/<cityid>', views.editcity, name='editcity'),
    # path('facility/<mayorid>', views.facility, name='facility'),
    # path('updatefacility/', views.updatefacility, name='updatefacility')
   
    path('api/api-auth/', include('rest_framework.urls', namespace='rest_framework')),
    path('api/', views.login, name='login'),
    path('api/login/', views.login, name='login'),
    path('api/updateusercity/<userid>', views.updateusercity, name='updateusercity'),
    path('api/signup/', views.signup, name='signup'),
    path('api/addcity/', views.addcity, name='addcity'),
    path('api/addcity/<cityid>', views.editcity, name='editcity'),
    path('api/facility/<mayorid>', views.facility, name='facility'),
    path('api/getfacility/<cityid>', views.getfacility, name='getfacility'),
    path('api/updatefacility/', views.updatefacility, name='updatefacility')
]
