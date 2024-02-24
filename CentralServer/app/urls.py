from django.urls import path
from . import views

urlpatterns = [
    path('', views.Home, name="Home"),
    path('Home', views.Home, name="Home"),
    path('Actualidad', views.Actualidad, name="Actualidad"),
    path('Trabajo', views.Trabajo, name="Trabajo"),
    
    path('Contabilidad', views.Contabilidad, name="Contabilidad"),
    path('Perdidas', views.Perdidas, name="Perdidas"),
    path('Ganancias', views.Ganancias, name="Ganancias"),
    path('Trazabilidad', views.Trazabilidad, name="Trazabilidad"),
    path('Proyectos', views.Proyectos, name="Proyectos"),
    path('Progreso', views.Progreso, name="Progreso"),
    path('Documentacion', views.Documentacion, name="Documentacion"),
    path('Calendario', views.Calendario, name="Calendario"),
    
    path('Control', views.Control, name="Control"),
    path('Salud', views.Salud, name="Salud"),
    path('Tools', views.Tools, name="Tools"),
    path('Chill', views.Chill, name="Chill"),
    path('Personal', views.Personal, name="Personal"),
    path('Creador', views.Creador, name="Creador"),
    path('GraficaHome', views.GraficaHome, name="GraficaHome"),
    path('GraficaTrabajo', views.GraficaTrabajo, name="GraficaTrabajo"),
    path('GraficaPerdidas', views.GraficaPerdidas, name="GraficaPerdidas"),
]
