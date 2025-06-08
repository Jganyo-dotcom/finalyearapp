from django.db import models
from django.contrib.auth.models import AbstractUser


class User(AbstractUser) :
    pass

class Topic(models.Model) :
    name = models.CharField( max_length=50)
    user=models.ForeignKey(User, on_delete=models.CASCADE)
    score = models.IntegerField(default = 0)

    def __str__(self) :
        return self.name
    
class Question(models.Model) :
    topic = models.ForeignKey(Topic, on_delete=models.CASCADE, related_name= 'qustion')
    actual_question = models.CharField()
    option_alpha = models.CharField(max_length= 225)
    option_beta = models.CharField(max_length= 225)
    option_gammar = models.CharField(max_length= 225)
    option_delta = models.CharField(max_length= 225)

    correct_option =models.CharField(
        max_length=22,
        choices=[
            ('A', 'option A'),
            ('B ', 'option B'),
            ('C ', 'option C'),
            ('D ', 'option D')
        ]
        )
    
    def get_correct_answer(self):
        return{
            'A': self.option_alpha,
            'B': self.option_beta,
            'C': self.option_gammar ,
            'D': self.option_delta,
        }.get(self.correct_option)

    

# Create your models here.
