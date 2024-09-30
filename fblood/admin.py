from django.contrib import admin
 # Import the model you want to register
from .models import Donar_donate_info,PreviousInfo,OTP

# Register your models here.
 

# Register your model
admin.site.register(Donar_donate_info)
admin.site.register(PreviousInfo)
admin.site.register(OTP)
