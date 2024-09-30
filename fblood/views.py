from django.shortcuts import render,redirect,HttpResponse

from  .models import signup_info,Donar_donate_info,FindInfo,PreviousInfo,ProfileInfo,Feedback
from datetime import datetime, timedelta
from django.contrib.auth.models import User
from django.urls import reverse

from django.utils.dateparse import parse_date

from django.db.models import F

from django.utils.timezone import localdate
from django.contrib import  messages
import os
from django.contrib.auth.decorators import login_required
from django.contrib.auth import authenticate,login,logout
from cloudinary.uploader import upload  # For Cloudinary upload


#otp
import random
from django.core.mail import send_mail
from django.utils import timezone
from .models import OTP








# Create your views here.
def signup(request):
    if request.method == "POST":
        phone=request.POST["phone"]
        password=request.POST["password"]
        c_password=request.POST["c_password"]
        email=request.POST["email"]
        exists_phone = User.objects.filter(username=phone).exists()
        exists_mail= User.objects.filter(email=email).exists()
        
        #showing error message for each field individually
        if(len(phone)!=11):
            messages.error(request," this phone number  already registered or wrong(Length Should Be 11)")
            return redirect('signup')
        elif(password!=c_password):
            messages.error(request,"Password and confirm password doesn't match")
            return redirect('signup')
        elif(exists_phone==True):
            messages.error(request,"This Phone Number Already Registered")
            return redirect('signup')
        elif(exists_mail==True):
            messages.error(request,"This email Already Registered")
            return redirect('signup')
       
        else:
            info = User.objects.create_user(username=phone,password=password,email=email)
            info.save()
            return redirect('Login')

    else:
        return render(request,'signup.html')
    
    
def Login(request):
    if request.method == "POST":
        val=1
        phone=request.POST["phone"]
        password=request.POST["password"]
        #phone1=phone
        #exists = Donar_signup_info.objects.filter(phone=phone,password=password).exists()
       #exists=authenticate(request,username=phone,password=password)
        user = authenticate(request, username=phone, password=password)
        print(user)
        #exists = User.objects.filter(phone=phone,password=password).exists()
       
        if user is not None:
            login(request,user)
            #return render(request,'home.html',{"phone":phone,"val":val})
            return redirect(f'{reverse("home")}?phone={phone}')

        else:
            messages.error(request,"Wrong phone number or password")
            return redirect('Login')
    else:
        return render(request,'login.html') 

@login_required(login_url='Login')
def home(request):
    val=0
    phone = request.GET.get('phone')
    if phone:
        val=1
        return render(request,'home.html',{"phone":phone,"val":val})
    else:
        return render(request,'home.html',{"val":val})
        
        

@login_required(login_url='Login')
def donate(request):
    if request.method == "POST":
        uploaded_file = request.FILES.get("image")  # Assuming the input field name is "file"
        name=request.POST["fullName"]
        phone=request.POST["phone"]
        blood=request.POST["BloodGroup"]
        """ print(phone) """
        """ blood=blood.upper() """
        print(blood)
        date=request.POST["lastDate"]
        district=request.POST["district"]
        police=request.POST["policeStation"]
        exists = User.objects.filter(username=phone).exists()
        exists1 = Donar_donate_info.objects.filter(phone=phone).exists()
        print(exists)
        print(exists1)
        
        if uploaded_file:
            # Process the uploaded image (e.g., save it to a model)
            print("upload")
            if(len(phone)!=11 or exists!=True or exists1==True):
                messages.error(request,"You have submitted wrong information or this phone number already donate")
                print("unsave")
                return redirect('donate')
            
            
            else:
                # Upload the image to Cloudinary
                cloudinary_response = upload(uploaded_file)
            
                # Get the secure URL of the uploaded image
                image_url = cloudinary_response.get('secure_url')
                print(image_url)
                info = Donar_donate_info(name=name,phone=phone,blood=blood,date=date,district=district,
                                         police=police,img=image_url)
                info.save()
                print("save")
                messages.success(request,"All information have been submitted successfully")
                return redirect('donate')
               #return render(request, "body.html") 
            
            
               #image_instance = Donar_info(img=uploaded_file)
               #image_instance.save()
               #return HttpResponse("Image uploaded successfully!")

    else:
         print("meo")
         return render(request,'donate.html')

@login_required(login_url='Login')      
def find(request):
    if request.method == "POST":
        blood=request.POST["BloodGroup"]
        date=request.POST["blood_requre_date"]
        district=request.POST["district"]
        police=request.POST["policeStation"]
        count=0
        temp = []
        fetch=Donar_donate_info.objects.all()
        
        for info in fetch:
            #tot=(date-info.last).days
            date1 = parse_date(date)
            date2 = parse_date(info.date)
            difference= date1 - date2
            days = difference.days
            print(difference)
            print(days)
            if(info.blood == blood and days>=121 and info.district == district and info.police == police):
                count+=1
                address= info.police + ", " + info.district
                obj=FindInfo()
                obj.name=info.name
                obj.phone=info.phone
                obj.blood=info.blood
                obj.address=address
                obj.img=info.img
                """ temp=FindInfo(name=info.name,phon=info.phone,blood=info.blood,address=address,img=info.img) """
                temp.append(obj)
                """ temp.save() """
        if(count==0):
                messages.error(request,"Sorry! There aren't any donors available in your criteria.")
                return redirect('find')
        else:
            print("2")
            messages.success(request,"Sorry! There aren't any donors available in your criteria.")
            return render(request,'find.html',{"fabs":temp})
        
    else:
        return render(request,'find.html')
    
    
@login_required(login_url='Login')
def profile(request):
   if request.method == "POST":
        phone=request.POST["phoneNumber"]
        print("ami")
        print(phone)
        Total=0
        fetch=PreviousInfo.objects.all()
        for info in fetch:
            if(phone==info.phone):
                Total+=1
        
        count=0
        temp = []
        fetch=Donar_donate_info.objects.all()
        for info in fetch:
            if(phone==info.phone):
                count+=1
                address= info.police + ", " + info.district
                obj=ProfileInfo()
                obj.name=info.name
                obj.phone=info.phone
                obj.blood=info.blood
                obj.address=address
                obj.img=info.img
                today = datetime.today().date()
                date_string = str(today)  # Convert date to string
                date1 = parse_date(date_string)
                date2 = parse_date(info.date)
                difference= date1 - date2
                days = difference.days
                DaysLeft=121-days
                datetime_object = datetime.strptime(date_string,'%Y-%m-%d')
                new_date = datetime_object + timedelta(days=DaysLeft)
                new_date_str = new_date.strftime("%Y-%m-%d")
                obj.LastDate=info.date
                obj.DaysLeft=DaysLeft
                obj.TotalDonate=Total+1
                obj.ProbableDate=new_date_str
                temp.append(obj)
                return render(request,'profile.html',{"fabs":temp,"val":count})
        if(count == 0):
            print(phone)
            print("odo")
            return render(request,'profile.html',{"val":count,"phone":phone})
        
                
@login_required(login_url='Login')       
def update(request):
    if request.method == "POST":
        updated_file = request.FILES.get("image")  # Assuming the input field name is "file"
        updated_phone=request.POST["phone"]
        updated_mail=request.POST["updated_email"]
        
        
        """ previous logic
        if(Donar_donate_info.objects.filter(phone=updated_phone).exists()==True or 
               User.objects.filter(username=updated_phone).exists()==True or 
               PreviousInfo.objects.filter(phone=updated_phone).exists()==True or
               User.objects.filter(email=updated_mail).exists()==True ):
                messages.error(request,"Your updated phone or email already exist in other account")
                return redirect('update') """
        
        
        
        
        if(len(updated_phone)>0):    
            if(Donar_donate_info.objects.filter(phone=updated_phone).exists()==True or 
               User.objects.filter(username=updated_phone).exists()==True or 
               PreviousInfo.objects.filter(phone=updated_phone).exists()==True ):
                messages.error(request,"Your updated phone or email already exist in other account")
                return redirect('update')
        elif(len(updated_mail)>0):
            if(User.objects.filter(email=updated_mail).exists()==True ):
               messages.error(request,"Your updated phone or email already exist in other account")
               return redirect('update')
            
        
        
        
        
        
        updated_date=request.POST["lastDate"]
        updated_district=request.POST["district"]
        updated_police=request.POST["policeStation"]
        previous_phone=request.POST["HiddenPhone"]
        exists = Donar_donate_info.objects.filter(phone=previous_phone).exists()
        if(exists==True):
            updated_info = Donar_donate_info.objects.get(phone=previous_phone)
            if updated_file:
                # Upload the image to Cloudinary
                cloudinary_response = upload(updated_file)
                # Get the secure URL of the uploaded image
                image_url = cloudinary_response.get('secure_url')
                print(image_url)
                #os.remove(updated_info.img.path)
                updated_info.img=image_url
            if(len(updated_phone)>0):
                updated_phone_signup=User.objects.get(username=previous_phone)
                updated_phone_signup.username=updated_phone
                updated_phone_signup.save()
                update_previousinfo=PreviousInfo.objects.all()
                for info in update_previousinfo:
                    if(previous_phone==info.phone):
                        PreviousInfo.objects.filter(phone=previous_phone).update(phone=updated_phone)
                
                updated_info.phone=updated_phone
                
            if(len(updated_date)>0):
                previous=PreviousInfo(phone=updated_info.phone,date=updated_info.date)
                previous.save()
                updated_info.date=updated_date
            if(len(updated_district)>0):
                updated_info.district=updated_district
            if(len(updated_police)>0):
                updated_info.police=updated_police
            updated_info.save()
        
        else:
            if(len(updated_phone)>0):
                updated_phone_signup=User.objects.get(username=previous_phone)
                updated_phone_signup.username=updated_phone
                updated_phone_signup.save() 
                
            if(len(updated_mail)>0):
                updated_phone_signup=User.objects.get(username=previous_phone)
                updated_phone_signup.email=updated_mail
                updated_phone_signup.save() 
             
                
        #sending messages based on email and phone 
        if(len(updated_phone)>0 and len(updated_mail)>0):
            messages.success(request,"Provided Information Are Updated")
            return render(request,'update.html',{"phone":updated_phone,"val":1})
        elif(len(updated_phone)>0 and len(updated_mail)==0):
            messages.success(request,"Provided Information Are Updated")
            print(updated_phone)
            return render(request,'update.html',{"phone":updated_phone,"val":1})
        elif(len(updated_phone)==0 and len(updated_mail)>0):
            messages.success(request,"Provided Information Are Updated")
            return render(request,'update.html',{"phone":previous_phone})
        else:
            messages.success(request,"Provided Information Are Updated")
            return render(request,'update.html',{"phone":previous_phone})
        
            
            
            
    else:      
        return render(request,'update.html')
    



 #Feedback 
def feedback(request):
    if request.method == 'POST':
        feedback_hidden_phone =request.POST["hidden_phone_feedback"]
        feedback_message =request.POST["message"]
        if(len( feedback_message)>0):
            feedback_info=Feedback(phone=feedback_hidden_phone,feedback=feedback_message)
            feedback_info.save()
            return redirect('home')
        else:
            return redirect('home')
    else:
        return HttpResponse("Page not found", status=404)
        
#otp
def generate_otp():
    return str(random.randint(100000, 999999))

def send_otp_email(user):
    otp_code = generate_otp()
    
    # Save the OTP to the database
    otp = OTP.objects.create(user=user, otp=otp_code)
    
    # Send email with the OTP
    send_mail(
        'Your OTP Code',
        f'Your OTP code is {otp_code}. It is valid for 3 minutes.',
        'c223075@ugrad.iiuc.ac.bd',  # Replace with your sender email
        [user.email],
        fail_silently=False,
    )    
    
    
    
    
    
    
    
    
    
def reset(request):
    if request.method == "POST":
        username=request.POST["phone"]
        exists = User.objects.filter(username=username).exists()
        email=request.POST["email"]
        
        if(exists==True):
            #set_password use for hash format(using this method the password save in hash format)
            #user.password=reset_password (if we used this then the password store in plain text)
            user = User.objects.get(username=username)
            if (user.email==email):
               #return redirect('Login') 
               # Send OTP to the user’s email
               send_otp_email(user)
               # Redirect to the OTP verification page
               messages.success(request,"Please Check Your Email For The OTP")
               return redirect('otp')
            else:
                 messages.error(request," email is not matching(Please Enter The Prvious Email)")
                 return redirect('reset')
                
        else:
            messages.error(request,"Phone or email are not matching(Please Enter The Prvious Phone and Email)")
            return redirect('reset')
            
    else:
        return render(request,'reset.html')  
   
   
def  otp(request):
    if request.method == 'POST':
        username=request.POST["phone"]
        otp_input=request.POST["OTP"]
        reset_password=request.POST["password"]
        print(otp_input)
        
           
        user = User.objects.get(username=username)  # Get the correct user

            # Get the latest OTP for the user
        otp = OTP.objects.filter(user=user).order_by('-created_at').first()

        if otp and otp.otp ==otp_input:
            if otp.is_valid():
                # OTP is valid, process further
                user.set_password(reset_password)
                user.save()
                messages.success(request,"Successfully Change Password")
                return redirect('Login')
            else:
                # OTP expired
                messages.error(request,"OTP expired")
                return redirect('reset')  # Start OTP process again
        else:
                # OTP expired
                messages.error(request," Invalid OTP")
                return redirect('otp')  # Start OTP process again
    else:
       return render(request, 'otp.html')  
   
 
def Logout(request):
    logout(request)
    return redirect('Login')
