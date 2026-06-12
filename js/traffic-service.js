// Configuración de HERE API
const HERE_API_KEY = 'i8vlAqNpKjA6X9tJfnAXYTL2IzUnPd8fM0lQwSyU1qI'; // Reemplazar en producción

// Capa base de tráfico vacía para iniciarla
let trafficLayer = null;

// Elementos del DOM
const slider = document.getElementById('timeSlider');
const display = document.getElementById('timeDisplay');

// Función para cargar el tráfico
function updateTrafficLayer(hora) {
    // Si ya existe una capa de tráfico, la removemos para no empalmarlas
    if (trafficLayer) {
        map.removeLayer(trafficLayer);
    }

    // HERE API requiere un formato de tiempo específico o usa el tile en tiempo real.
    // Como las APIs de tiles predictivos por hora suelen ser de pago Enterprise, 
    // aquí implementamos la llamada estándar. Cuando sea las 18:00, encendemos el tráfico.
    
    if (hora === 18) {
        // Alerta visual de que estamos viendo la hora pico
        display.style.color = "red";
        display.style.fontWeight = "bold";

        // URL del Tile de tráfico de HERE (Flow layer)
        const trafficUrl = `https://2.traffic.maps.ls.hereapi.com/maptile/2.1/traffictile/newest/normal.day/{z}/{x}/{y}/256/png8?apiKey=${HERE_API_KEY}`;
        
        trafficLayer = L.tileLayer(trafficUrl, {
            maxZoom: 19,
            attribution: '© HERE Traffic'
        });

        trafficLayer.addTo(map);
        
        // Lo añadimos temporalmente al control superior derecho para que el usuario sepa que está activo
        layerControl.addOverlay(trafficLayer, "Tráfico (Hora Pico)");

    } else {
        // Restablecer estilo visual si no es hora pico
        display.style.color = "black";
        display.style.fontWeight = "normal";
        
        // Limpiamos la capa del control si se baja de la hora pico
        if (trafficLayer) {
            layerControl.removeLayer(trafficLayer);
        }
    }
}

// Escuchar cambios en el slider de forma dinámica
slider.addEventListener('input', function(e) {
    const horaSeleccionada = parseInt(e.target.value);
    
    // Formatear la hora con ceros (ej. 09:00, 18:00)
    display.textContent = horaSeleccionada.toString().padStart(2, '0') + ":00";

    // Actualizar la capa de tráfico basada en la hora
    updateTrafficLayer(horaSeleccionada);
});
