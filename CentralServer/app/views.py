from django.shortcuts import render
from django.http import JsonResponse
from random import randint

def Home(request):
     
     return render(request, "Grups/1.home.html")

def Actualidad(request):
     return render(request, "Grups/2.actualidad.html")

def Trabajo(request):
     return render(request, "Grups/3.trabajo.html")

def Contabilidad(request):
     return render(request, "Trabajo/1.Contabilidad.html")

def Perdidas(request):
     return render(request, "Trabajo/2.Perdidas.html")

def Ganancias(request):
     return render(request, "Trabajo/3.Ganancias.html")

def Trazabilidad(request):
     return render(request, "Trabajo/4.Trazabilidad.html")

def Proyectos(request):
     return render(request, "Trabajo/5.Proyectos.html")

def Progreso(request):
     return render(request, "Trabajo/6.Progreso.html")

def Documentacion(request):
     return render(request, "Trabajo/7.Documentacion.html")

def Calendario(request):
     return render(request, "Trabajo/8.Calendario.html")


def Control(request):
     return render(request, "Grups/4.control.html")

def Salud(request):
     return render(request, "Grups/5.salud.html")

def Tools(request):
     return render(request, "Grups/6.tools.html")

def Chill(request):
     return render(request, "Grups/7.chill.html")

def Personal(request):
     return render(request, "Grups/8.personal.html")

def Creador(request):
     return render(request, "Grups/9.creador.html")


def GraficaHome(request):
    # Generar valores de ejemplo
    labels = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre']
    data = [randint(1, 100) for _ in range(len(labels))]

    # Crear el JSON de respuesta
    response_data = {
        'labels': labels,
        'data': data,
    }

    return JsonResponse(response_data)



def GraficaTrabajo(request):
    # Generar valores de ejemplo
    labels = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre']
    data = [randint(1, 100) for _ in range(len(labels))]

    # Crear el JSON de respuesta
    response_data = {
        'labels': labels,
        'data': data,
    }

    return JsonResponse(response_data)

def GraficaPerdidas(request):
    # Generar valores de ejemplo
    labels = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "30"]
    data = [randint(1, 100) for _ in range(len(labels))]
    data1 = [randint(1, 100) for _ in range(len(labels))]
    data2= [randint(1, 100) for _ in range(len(labels))]

    # Crear el JSON de respuesta
    response_data = {
        'labels': labels,
        'data': data,
        'data1': data1,
        'data2': data2,
    }

    return JsonResponse(response_data)