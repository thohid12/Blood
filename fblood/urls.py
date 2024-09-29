from django.urls import path

from .import views

urlpatterns = [
    path('', views.Login,name='Login'),
    path('Login', views.Login,name='Login'),
    path('signup', views.signup,name='signup'),
    path('home', views.home,name='home'),
    path('donate', views.donate,name='donate'),
    path('find', views.find,name='find'),
    path('profile', views.profile, name='profile'),
    path('update', views.update,name='update'),
    path('reset', views.reset,name='reset'),
    path('otp', views.otp,name='otp'),
    path('Logout', views.Logout,name='Logout'),
]
