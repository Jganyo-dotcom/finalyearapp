from django.shortcuts import render, redirect
from django.http import HttpResponse
from django.contrib.auth import authenticate, login as auth_login

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
        
        
        
    
