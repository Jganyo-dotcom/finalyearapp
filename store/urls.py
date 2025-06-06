from django.urls import path
from . import views

urlpatterns = [
    path("", views.index, name = 'index'),
    path("login", views.login_user,name = 'login'),
    path('login_view', views.login_view, name = 'login_view'),
    path('logout', views.logout_user, name = 'logout'),
    path('register_view', views.register_view, name='register_view'),
    path('register', views.register, name='register')
]

   
