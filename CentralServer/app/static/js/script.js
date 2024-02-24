

///PLANTILLA
// Obtén el elemento del header
var header = document.querySelector('header');

// Asigna un evento de scroll al objeto window
window.addEventListener('scroll', function() {
  
  var opacity = 1 - window.scrollY / 100; // Puedes ajustar el valor según sea necesario
  
  // Asegúrate de que la opacidad esté en el rango de 0 a 1
  opacity = Math.min(1, Math.max(0, opacity));
  
  // Aplica la opacidad al header
  header.style.opacity = opacity.toString();
  
  // Oculta el header si la opacidad es cero
  if (opacity === 0) {
    header.style.visibility = 'hidden';
  } else {
    header.style.visibility = 'visible';
  }
});


  

document.querySelectorAll('.tabla1 table tr').forEach(fila => {
  const tdElement = fila.querySelector('td');
  const dataAttribute = tdElement?.getAttribute('data');

  if (dataAttribute === window.location.pathname) {
    tdElement.style.fontWeight = 600;
  }

  fila.addEventListener('click', function() {
    const url = tdElement?.getAttribute('data');
    if (url) {
      window.location.href = window.location.origin + url;
    }
  });
});

document.querySelectorAll('.tabla2 table tr').forEach(fila => {
  fila.addEventListener('click', function() {
    const tdElement = fila.querySelector('td');
    const url = tdElement?.getAttribute('data');
    if (url) {
      window.open(url, '_blank');
    }
  });
});


//////MODO-CLARO / MODO-OSCURO

document.querySelector('.item5').addEventListener('click', () => {
  const header = document.querySelector('header');
  const section = document.querySelector('.seccion1Home');
  const icono = document.querySelector('.lunasol');
  const nav = document.querySelector('nav');
  const blocks = document.querySelectorAll('.blocks');
  const buscador = document.querySelector('input');
  const name = document.querySelector('.name');
  const secion2home = document.querySelector('.seccion2Home');
  const SeleccionVar = document.getElementById('seleccionVariable1');
  const Desde = document.getElementById('seleccionFechaHoraDesde');
  const Hasta = document.getElementById('seleccionFechaHoraHasta');
  const Limpiar = document.getElementById('Limpiar');

  if (icono.src.split('/').pop() === 'luna.png') {
    icono.src = 'http://127.0.0.1:8000/static/icons/sol.png';
    nav.style.backgroundColor = 'rgba(200, 200, 200, 0.595)';
    buscador.style.backgroundColor = 'rgba(255, 255, 255, 0.795)';
    name.style.color = 'rgba(255, 255, 255, 0.795)';
    header.style.backgroundColor = '#3d4a91';
    section.style.backgroundColor = '#3d4a91';
    secion2home.style.backgroundColor = 'rgba(200, 200, 200, 0.595)';
    SeleccionVar.style.backgroundColor = 'rgba(255, 255, 255, 0.395)';
    Desde.style.backgroundColor = 'rgba(255, 255, 255, 0.395)';
    Hasta.style.backgroundColor = 'rgba(255, 255, 255, 0.395)';
    Limpiar.style.backgroundColor = '#3d4a91';
    blocks.forEach((block) => {
      block.style.background = 'rgba(255, 255, 255, 0.795)';
    });
  } else {
    icono.src = 'http://127.0.0.1:8000/static/icons/luna.png';
    nav.style.backgroundColor = 'white';
    buscador.style.backgroundColor = 'white';
    header.style.backgroundColor = '#5e72e4';
    section.style.backgroundColor = '#5e72e4';
    name.style.color = 'white';
    secion2home.style.backgroundColor = 'white';
    Desde.style.backgroundColor ='white';
    Hasta.style.backgroundColor = 'white';
    Limpiar.style.backgroundColor = '#5e72e4';
    blocks.forEach((block) => {
      block.style.background = 'white';
    });
  }
});

///INICIO-HOME



// Variables globales
let fechaHoraFormateada = '';
let latitud = '';
let longitud = '';
let pais = '';
let comunidad = '';

// Función para obtener la fecha y hora actual
function obtenerFechaHora() {
  const fechaHoraActual = new Date();
  const opcionesFechaHora = {
    hour: '2-digit',
    minute: '2-digit',
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  };
  fechaHoraFormateada = fechaHoraActual.toLocaleString(undefined, opcionesFechaHora);
}

// Función para obtener la latitud y longitud
function obtenerLatitudYLongitud() {
  navigator.geolocation.getCurrentPosition(
    (position) => {
      latitud = position.coords.latitude;
      longitud = position.coords.longitude;
    },
    (error) => {
      console.error('Error al obtener la ubicación:', error.message);
    }
  );
}

// Función para obtener el país y la comunidad basados en la ubicación
function obtenerPaisYComunidad() {
  const apiUrl = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitud}&lon=${longitud}`;

  fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
      pais = data.address.country || '';
      comunidad = data.address.state || '';
    })
    .catch(error => {
      console.error('Error al obtener la información de ubicación:', error.message);
    });
}

// Función para mostrar la información final
function mostrarInformacion() {
  const resultadoFinal = `${fechaHoraFormateada} - ${pais}, ${comunidad}`;
  document.querySelector('.infoact').innerHTML = resultadoFinal;
}








// Declarar una variable global para almacenar la instancia de la gráfica
var myChart;

function ValoresGrafica() {
  fetch(window.location.origin + '/' + 'GraficaHome')
    .then(response => response.json())
    .then(data => {
      // Verificar si la instancia de la gráfica ya existe
      if (myChart) {
        // Actualizar solo los datos
        myChart.data.labels = data.labels;
        myChart.data.datasets[0].data = data.data;
        myChart.update(); // Actualizar la gráfica
      } else {
        // Si la instancia de la gráfica no existe, crearla
        var ctx = document.getElementById('miGrafica').getContext('2d');
        myChart = new Chart(ctx, {
          type: 'line',
          data: {
            labels: data.labels,
            datasets: [{
              label: 'IPC',
              data: data.data,
              backgroundColor: 'rgba(75, 192, 192, 0.2)',
              borderColor: 'rgba(75, 192, 192, 1)',
              borderWidth: 1
            }]
          }
        });
      }
    });
}

if (window.location.pathname === '/' || window.location.pathname === '/Home' ) {

setInterval(() => {
  obtenerFechaHora();
  obtenerLatitudYLongitud();
  obtenerPaisYComunidad();
  mostrarInformacion();
  ValoresGrafica();
}, 30000);

ValoresGrafica();
obtenerFechaHora();
obtenerLatitudYLongitud();
obtenerPaisYComunidad();
mostrarInformacion();
}




    if (window.location.pathname === '/Actualidad') {
        
        // Función para cambiar la fuente del iframe
        function cambiarFuenteIframe(url) {
          var iframe = document.getElementById('miIframe');
          iframe.src = url;
        }
        cambiarFuenteIframe("https://www.elmundo.es");
        // Evento clic en un bloque
        document.addEventListener('click', function(event) {
          var bloque = event.target.closest('.blocksA');
          
          if (bloque) {
              var url = bloque.dataset.src;
              cambiarFuenteIframe(url);
          }
        });

        var map = L.map('map').setView([40.416775, -3.70379], 12); // Coordenadas iniciales (Madrid, España)
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);
        ObtenerMeteorologia()
      
  }
 

  // Función para buscar una ciudad ingresada por el usuario
  function buscarCiudad_Mapa() {
      var location = document.getElementById('location').value;
      ObtenerMeteorologia()
      if (location.trim() !== '') {
          var url = 'https://nominatim.openstreetmap.org/search?format=json&limit=1&q=' + encodeURIComponent(location);
          fetch(url)
              .then(response => response.json())
              .then(data => {
                  if (data.length > 0) {
                      var lat = parseFloat(data[0].lat);
                      var lon = parseFloat(data[0].lon);
                      map.setView([lat, lon], 12);
                      L.marker([lat, lon]).addTo(map);
                  } else {
                      alert('No se encontró la ubicación.');
                  }
              })
              .catch(error => {
                  console.error('Error:', error);
                  alert('Ocurrió un error al buscar la ubicación.');
              });
      } else {
          alert('Por favor, introduzca una ubicación válida.');
      }
  }


  function ObtenerMeteorologia() {
    const apiKey = 'f93e208ee79c50c1cd3175df934fe5c7';
    const location = document.getElementById('location').value;
    const ubicacion = location.trim() !== '' ? location : 'España, Extremadura';
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${ubicacion}&appid=${apiKey}&units=metric`;
  
    fetch(apiUrl)
      .then(response => response.json())
      .then(data => {
        tiempo(data)
        ObtenerPronosticoDia()
      })
      .catch(error => console.error('Error al obtener datos del tiempo:', error));
  }

  let myChart2; // Cambiamos a let para que podamos reasignar
  function ObtenerPronosticoDia() {
    const apiKey = 'f93e208ee79c50c1cd3175df934fe5c7';
    const location = document.getElementById('location').value;
    const ubicacion = location.trim() !== '' ? location : 'España, Extremadura';
    const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${ubicacion}&appid=${apiKey}&units=metric`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            console.log(data)
            const hours = [];
            const temperatures = [];
            const tempMax = [];
            const tempMin = [];

            // Iterar sobre los pronósticos y extraer las horas, temperaturas, temperatura máxima y mínima
            for (let i = 0; i < 4; i++) {
                const FechaPronostico = data.list[i].dt_txt;
                const temperatura = data.list[i].main.temp;
                const temperaturaMax = data.list[i].main.temp_max;
                const temperaturaMin = data.list[i].main.temp_min;

                hours.push(FechaPronostico);
                temperatures.push(temperatura);
                tempMax.push(temperaturaMax);
                tempMin.push(temperaturaMin);
            }

            if (myChart2) {
                myChart2.destroy();
            }

            generarGrafica(hours, temperatures, tempMax, tempMin);
        })
        .catch(error => console.error('Error al obtener datos del tiempo:', error));
}


  function tiempo(DatosMeteorologia){
      console.log('Datos meteorológicos:', DatosMeteorologia);
      document.querySelector('.temp_met').textContent = DatosMeteorologia.main.temp + 'ºC';
      document.querySelector('.viento_met').textContent = DatosMeteorologia.wind.speed + ' m/s en dirección ' + obtenerDireccionViento(DatosMeteorologia.wind.deg);
      document.querySelector('.pascal_met').textContent = DatosMeteorologia.main.pressure + 'hPa';
      document.querySelector('.val_humedad_met').textContent = DatosMeteorologia.main.humidity + '%';
      document.querySelector('.val_rocio_met').textContent = (DatosMeteorologia.main.temp - (DatosMeteorologia.main.temp - 237.7) * (1 - (DatosMeteorologia.main.humidity / 100.0))).toFixed(2) + 'ºC';
      document.querySelector('.val_visibilidad_met').textContent = DatosMeteorologia.visibility / 1000 + ' kilómetros';
      
      
      const fechaHora = new Date();
      const fecha = `${fechaHora.getDate()} de ${obtenerMes(fechaHora.getMonth())}, ${formatoHora(fechaHora.getHours())}:${formatoHora(fechaHora.getMinutes())} ${formatoAMPM(fechaHora.getHours())}`;
      document.querySelector('.fechayhora_met').textContent = fecha;
      document.querySelector('.ubicacion_met').textContent = `${DatosMeteorologia.name}, ${DatosMeteorologia.sys.country}`;
      document.querySelector('.sensacion_met').textContent = `La sensación es de ${DatosMeteorologia.main.feels_like}°C. ${traducirDescripcionClima(DatosMeteorologia.weather[0].description)}. ${obtenerSensacionViento(DatosMeteorologia.wind.speed)}`;

    }
  
    function obtenerMes(numeroMes) {
      const meses = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];
      return meses[numeroMes];
    }

    function formatoHora(hora) {
      return hora < 10 ? '0' + hora : hora;
    }

    function formatoAMPM(hora) {
      return hora >= 12 ? 'p.m.' : 'a.m.';
    }

    function obtenerSensacionViento(velocidad) {
      if (velocidad < 1.5) return 'Calma';
      else if (velocidad < 3.3) return 'Brisa ligera';
      else if (velocidad < 5.5) return 'Brisa suave';
      else if (velocidad < 7.9) return 'Brisa moderada';
      else if (velocidad < 10.7) return 'Brisa fresca';
      else if (velocidad < 13.8) return 'Brisa fuerte';
      else if (velocidad < 17.1) return 'Viento fresco';
      else if (velocidad < 20.7) return 'Viento fuerte';
      else if (velocidad < 24.4) return 'Viento muy fuerte';
      else if (velocidad < 28.4) return 'Viento vendaval';
      else if (velocidad < 32.6) return 'Temporal';
      else return 'Huracán';
    }

    function traducirDescripcionClima(description) {
      const traducciones = {
        'few clouds': 'Pocas nubes',
        'scattered clouds': 'Nubes dispersas',
        'broken clouds': 'Nubes rotas',
        'overcast clouds': 'Nublado',
        'clear sky': 'Cielo despejado',
        'light rain': 'Lluvia ligera',
        'moderate rain': 'Lluvia moderada',
        'heavy intensity rain': 'Lluvia intensa',
        // Agrega más traducciones aquí según sea necesario
      };
      return traducciones[description] || description;
    }
    
    function obtenerDireccionViento(grados) {
      var direccion = '';
      if (grados >= 337.5 || grados < 22.5) {
        direccion = 'Norte';
      } else if (grados >= 22.5 && grados < 67.5) {
        direccion = 'Noreste';
      } else if (grados >= 67.5 && grados < 112.5) {
        direccion = 'Este';
      } else if (grados >= 112.5 && grados < 157.5) {
        direccion = 'Sureste';
      } else if (grados >= 157.5 && grados < 202.5) {
        direccion = 'Sur';
      } else if (grados >= 202.5 && grados < 247.5) {
        direccion = 'Suroeste';
      } else if (grados >= 247.5 && grados < 292.5) {
        direccion = 'Oeste';
      } else if (grados >= 292.5 && grados < 337.5) {
        direccion = 'Noroeste';
      }
      return direccion;
    }




    function generarGrafica(hours, temperatures, tempMax, tempMin) {
      const ctx = document.getElementById('pronostico').getContext('2d');
      myChart2 = new Chart(ctx, {
          type: 'line',
          data: {
              labels: hours,
              datasets: [{
                  label: 'Temp. Actual (°C)',
                  data: temperatures,
                  backgroundColor: 'rgba(255, 99, 132, 0.2)',
                  borderColor: 'rgba(255, 99, 132, 1)',
                  borderWidth: 2,
                  pointRadius: 4,
                  pointBackgroundColor: 'rgba(255, 99, 132, 1)',
                  pointBorderColor: 'rgba(255, 255, 255, 1)',
              }, {
                  label: 'Temp. Máxima (°C)',
                  data: tempMax,
                  backgroundColor: 'rgba(255, 205, 86, 0.2)',
                  borderColor: 'rgba(255, 205, 86, 1)',
                  borderWidth: 2,
                  pointRadius: 4,
                  pointBackgroundColor: 'rgba(255, 205, 86, 1)',
                  pointBorderColor: 'rgba(255, 255, 255, 1)',
              }, {
                  label: 'Temp. Mínima (°C)',
                  data: tempMin,
                  backgroundColor: 'rgba(75, 192, 192, 0.2)',
                  borderColor: 'rgba(75, 192, 192, 1)',
                  borderWidth: 2,
                  pointRadius: 4,
                  pointBackgroundColor: 'rgba(75, 192, 192, 1)',
                  pointBorderColor: 'rgba(255, 255, 255, 1)',
              }]
          },
          options: {
              scales: {
                  y: {
                      beginAtZero: false,
                      grid: {
                          color: 'rgba(0, 0, 0, 0.1)',
                      },
                      ticks: {
                          font: {
                              size: 12,
                          },
                      },
                  },
                  x: {
                      grid: {
                          display: false,
                      },
                      ticks: {
                          font: {
                              size: 12,
                          },
                      },
                  },
              },
              plugins: {
                  legend: {
                      labels: {
                          font: {
                              size: 14,
                          },
                      },
                  },
              },
          },
      });
  }
  




  if (window.location.pathname === '/Trabajo') {
    ValoresGraficaTrabajo()

    setInterval(() => {
      ValoresGraficaTrabajo()
    }, 30000);
    
    var contenedorBloques = document.querySelector('.BloquesTrabajo');

    // Agregar un evento de clic al contenedor de bloques
    contenedorBloques.addEventListener('click', function(event) {
      // Verificar si se hizo clic en un elemento aside
      if (event.target.tagName === 'ASIDE') {
        // Obtener la URL del atributo data-url del aside clicado
        var url = event.target.getAttribute('data-url');
        console.log(url)
        // Redirigir a la URL especificada
        if (url) {
          window.location.href = url;
        }
      }
    });
  
}

  var myChart3;

function ValoresGraficaTrabajo() {
  fetch(window.location.origin + '/' + 'GraficaTrabajo')
    .then(response => response.json())
    .then(data => {
      // Verificar si la instancia de la gráfica ya existe
      if (myChart3) {
        // Actualizar solo los datos
        myChart3.data.labels = data.labels;
        myChart3.data.datasets[0].data = data.data;
        myChart3.update(); // Actualizar la gráfica
      } else {
        // Si la instancia de la gráfica no existe, crearla
        var ctx = document.getElementById('GraficaTrabajo').getContext('2d');
        myChart3 = new Chart(ctx, {
          type: 'line',
          data: {
            labels: data.labels,
            datasets: [{
              label: 'PAYPAL',
              data: data.data,
              backgroundColor: 'rgba(75, 192, 192, 0.2)',
              borderColor: 'rgba(75, 192, 192, 1)',
              borderWidth: 1
            }]
          }
        });
      }
    });
}




if (window.location.pathname === '/Contabilidad') {
 function cambiarFuenteIframe(url) {
  var iframe = document.getElementById('miIframe');
  iframe.src = url;
}
cambiarFuenteIframe("https://www.elmundo.es");
// Evento clic en un bloque
document.addEventListener('click', function(event) {
  var bloque = event.target.closest('.blocksA');
  
  if (bloque) {
      var url = bloque.dataset.src;
      cambiarFuenteIframe(url);
  }
});
  }


  var myChart4;

  function ValoresGraficaPerdidas() {
    let hours = [];
    let Sonepar = [];
    let Schneider = [];
    let Abb = [];
    let total = []; // Array para almacenar el total en cada punto
  
    fetch(window.location.origin + '/' + 'GraficaPerdidas')
      .then(response => response.json())
      .then(data => {
        console.log(data);
        console.log(data.data);
        hours = data.labels;
        Sonepar = data.data;
        Schneider = data.data1;
        Abb = data.data2;
        
  
        // Calcular el total en cada punto sumando los valores de las variables
        for (let i = 0; i < hours.length; i++) {
          total.push(Sonepar[i] + Schneider[i] + Abb[i]);
        }
  
        const ctx = document.getElementById('GraficaPerdidas').getContext('2d');
        myChart4 = new Chart(ctx, {
          type: 'line',
          data: {
            labels: hours,
            datasets: [{
                label: 'Sonepar',
                data: Sonepar,
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 2,
                pointRadius: 4,
                pointBackgroundColor: 'rgba(255, 99, 132, 1)',
                pointBorderColor: 'rgba(255, 255, 255, 1)',
              },
              {
                label: 'Schneider',
                data: Schneider,
                backgroundColor: 'rgba(255, 205, 86, 0.2)',
                borderColor: 'rgba(255, 205, 86, 1)',
                borderWidth: 2,
                pointRadius: 4,
                pointBackgroundColor: 'rgba(255, 205, 86, 1)',
                pointBorderColor: 'rgba(255, 255, 255, 1)',
              },
              {
                label: 'Abb',
                data: Abb,
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 2,
                pointRadius: 4,
                pointBackgroundColor: 'rgba(75, 192, 192, 1)',
                pointBorderColor: 'rgba(255, 255, 255, 1)',
              },
              // Nuevo dataset para el total
              {
                label: 'Total',
                data: total,
                type: 'bar',
                backgroundColor: 'rgba(54, 162, 235, 0.2)',
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 2,
              }
            ]
          },
          options: {
            scales: {
              y: {
                beginAtZero: false,
                grid: {
                  color: 'rgba(0, 0, 0, 0.1)',
                },
                ticks: {
                  font: {
                    size: 12,
                  },
                },
              },
              x: {
                grid: {
                  display: false,
                },
                ticks: {
                  font: {
                    size: 12,
                  },
                },
              },
            },
            plugins: {
              legend: {
                labels: {
                  font: {
                    size: 14,
                  },
                },
              },
            },
          },
        });
      });
  }
  







var gridContainer = document.querySelector('body');

  if (window.location.pathname === '/Perdidas') {
    ValoresGraficaPerdidas()

    gridContainer.style.gridTemplateRows = '80px 400px 3fr 34px';

    setInterval(() => {
      ValoresGraficaPerdidas()
    }, 1000);
}
else{
  gridContainer.style.gridTemplateRows = '80px 3fr 3fr 34px';
}