from django.shortcuts import render, redirect
from django.http import HttpResponse, HttpResponseRedirect
from django.contrib.auth import authenticate, login, logout
from .models import User
from django.urls import reverse


# Create your views here.
def index(request):
    return render(request, 'store/index.html')


def login_view(request):
    return render(request, 'store/login.html')

def login_user(request) :
    if request.method == 'POST' :
        username = request.POST['username']
        password = request.POST['password']
        
        user = authenticate(request, username = username, password = password)
        
        if user is not None :
            login(request, user)
            return redirect('index')
        
        else:
            error = 'invalid name or password '
            return render(request, 'store/login.html',{
                'message' : error
            })
            
    else:
        return render (request, 'store/error.html', {
            'message' : 'LOG IN FIRST WITH THE REQUIREMENTS'
        })
    
def logout_user(request) :
    logout(request)
    return HttpResponseRedirect(reverse('index'))
        
def register_view(request):
    return render(request, 'store/Register.html')

def register(request) :
    if request.method == 'POST' :
        username = request.POST['username']
        email = request.POST['email']
        password =request.POST['password']
        print(password)
        confirmed_password =request.POST['confirmed_password']
        print(confirmed_password)
        
        if password != confirmed_password:
            return render(request, 'store/Register.html', {
                'message' :" Password mismatch"
            })
            
        if User.objects.filter( username = username).exists():
             return render(request, 'store/Register.html',{
                 'message' : 'User already exists' 
             })
             
             
        new_user =User.objects.create_user(username, email, password)
        new_user.save()
        login(request, new_user)
        return HttpResponseRedirect(reverse('index'))


    else:
        return render(request, 'store/error.html',{
            'message': 'not allowed'
        })
    
def topics(request) :
    return render(request, 'store/topics.html')
        
             
             
        
        
        
    
