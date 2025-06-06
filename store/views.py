from django.shortcuts import render, redirect
from django.http import HttpResponse
from django.contrib.auth import authenticate, login as auth_login
from django.contrib.auth.models import User
from . models import profile

# Create your views here.
def index(request):
    return render(request, 'store/index.html')


def login_view(request):
    return render(request, 'store/login.html')

def login(request) :
    if request.method == 'POST' :
        username = request.POST['username']
        password = request.POST['password']
        
        user = authenticate(request, username = username, password = password)
        
        if user is not None :
            auth_login(request, user)
            return redirect('login')
        
        else:
            error = 'invalid name or password '
            return render(request, 'store/login.html',{
                'message' : error
            })
            
    else:
        return render (request, 'store/error.html', {
            'message' : 'LOG IN FIRST WITH THE REQUIREMENTS'
        })
        
def register_view(request):
    return render(request, 'store/register.html')

def register(request) :
    if request.method == 'POST' :
        username = request.POST['username']
        email = request.POST['email']
        password =request.POST['password']
        confirmed_password =request.POST['comfirmed_password']
        
        if password != confirmed_password:
            return render(request, 'store/register.html', {
                'message' :" Passwords mismatch"
            })
            
        if User.objects.filter( user = request.user).exists():
             return render(request, 'store/register.html',{
                 'message' : 'User already exists' 
             })
             
             
        new_user = profile.objects.create(user = request.user,
                               email = email,
                               password = password
                               )
        new_user.save()
        
             
             
        
        
        
    
