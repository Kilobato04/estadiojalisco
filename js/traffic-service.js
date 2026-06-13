// Configuración de HERE API
const HERE_API_KEY = 'i8vlAqNpKjA6X9tJfnAXYTL2IzUnPd8fM0lQwSyU1qI'; 

// Variables separadas para cada capa de tráfico
let googleTrafficLayer = null;
let hereTrafficLayer = null;

const slider = document.getElementById('timeSlider');
const display = document.getElementById('timeDisplay');

function updateTrafficLayer(hora) {
    // 1. Limpiar ambas capas del mapa y del panel si ya existen
    if (googleTrafficLayer) {
        map.removeLayer(googleTrafficLayer);
        try { layerControl.removeLayer(googleTrafficLayer); } catch(e) {}
    }
    if (hereTrafficLayer) {
        map.removeLayer(hereTrafficLayer);
        try { layerControl.removeLayer(hereTrafficLayer); } catch(e) {}
    }
    
    // 2. Lógica del Slider a las 18:00 hrs
    if (hora === 18) {
        display.style.color = "red";
        display.style.fontWeight = "bold";

        // --- CAPA 1: GOOGLE (Restaurada con 'h' para que renderice) ---
        const googleUrl = 'https://mt1.google.com/vt/lyrs=h,traffic&x={x}&y={y}&z={z}';
        googleTrafficLayer = L.tileLayer(googleUrl, {
            maxZoom: 19,
            opacity: 0.8,
            attribution: '© Google Traffic'
        });

        // --- CAPA 2: HERE (Raster Tile API v3 - Endpoint Moderno) ---
        const hereUrl = `https://traffic.maps.hereapi.com/v3/flow/mc/{z}/{x}/{y}/png?apiKey=${HERE_API_KEY}`;
        hereTrafficLayer = L.tileLayer(hereUrl, {
            maxZoom: 19,
            opacity: 0.8,
            attribution: '© HERE Traffic'
        });

        // 3. Comportamiento visual por defecto
        // Encendemos Google de inicio para asegurar el render
        googleTrafficLayer.addTo(map);

        // Añadimos AMBAS al control de capas para que puedas alternar y hacer el debug de HERE
        layerControl.addOverlay(googleTrafficLayer, "Tráfico (Google)");
        layerControl.addOverlay(hereTrafficLayer, "Tráfico Debug (HERE)");

    } else {
        // Restablecer el estilo si no es hora pico
        display.style.color = "black";
        display.style.fontWeight = "normal";
    }
}

// Escuchar cambios en el slider
slider.addEventListener('input', function(e) {
    const horaSeleccionada = parseInt(e.target.value);
    display.textContent = horaSeleccionada.toString().padStart(2, '0') + ":00";
    updateTrafficLayer(horaSeleccionada);
});
