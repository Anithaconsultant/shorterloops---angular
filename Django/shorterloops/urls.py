from django.contrib import admin

from django.urls import include, path
from accounts import views

urlpatterns = [

    path('api/api-auth/', include('rest_framework.urls', namespace='rest_framework')),
    path('api/', views.login, name='login'),
    path('api/login/', views.login, name='login'),
    path('api/updateusercity/<userid>',
         views.updateusercity, name='updateusercity'),
    path('api/signup/', views.signup, name='signup'),
    path('api/addcity/', views.addcity, name='addcity'),
    path('api/addcity/<cityid>', views.editcity, name='editcity'),
    path('api/updatetime/<cityid>', views.updatecurrent, name='updatecurrent'),
    path('api/getcityname/<cityid>', views.getcityname, name='getcityname'),
    path('api/facility/<mayorid>', views.facility, name='facility'),
    path('api/getfacility/<cityid>', views.getfacility, name='getfacility'),
    path('api/updatefacility/', views.updatefacility, name='updatefacility'),
    path('api/leavefacility/<userid>', views.leavefacility, name='leavefacility'),
    path('api/asset/<cityid>', views.createasset, name='createasset'),
    path('api/assets/<itemid>', views.returnasset, name='returnasset'),
    path('api/cashflow/', views.createtransaction, name='createtransaction'),
    path('api/updatetransactionfacility/<cityid>', views.updatetransactionfacility, name='updatetransactionfacility'),
    path('api/getsupermarketcash/<cityid>', views.getsupermarketcash, name='getsupermarketcash'),
    path('api/getmunicipalitycash/<cityid>', views.getmunicipalitycash, name='getmunicipalitycash'),
]
