from django.db import models
from django.contrib.auth.models import User
from django.utils import timezone
from datetime import timedelta

# Create your models here.
""" class Donar_signup_info(models.Model):
    phone=models.CharField(max_length=11)
    password=models.CharField(max_length=60)
    email = models.EmailField(max_length=60)
    access = models.IntegerField(default=0) """

class signup_info:
    c_password:str
    
class Donar_donate_info(models.Model):
    name=models.CharField(max_length=20)
    phone=models.CharField(max_length=11)
    blood=models.CharField(max_length=5)
    date=models.CharField(max_length=15)
    district= models.CharField(max_length=20)
    police=models.CharField(max_length=20)
    #img=models.ImageField(upload_to='pics')
    img = models.URLField()

class FindInfo:
    name:str
    phone:str
    blood:str
    address:str
    img:str
    
class PreviousInfo(models.Model):
    phone=models.CharField(max_length=11)
    date=models.CharField(max_length=15)
    
class ProfileInfo:
    name:str
    phone:str
    blood:str
    address:str
    img:str
    LastDate:str
    DaysLeft:int
    TotalDonate:int
    ProbableDate:str
    
#models for otp(start here)
class OTP(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    otp = models.CharField(max_length=6)
    created_at = models.DateTimeField(auto_now_add=True)

    def is_valid(self):
        return timezone.now() < self.created_at + timedelta(minutes=3)
#models for otp(end here)