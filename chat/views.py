from django.http import HttpResponse


def index(request):
    return HttpResponse("The test for message app.")

