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

        // --- CAPA 1: GOOGLE (Estable para desarrollo) ---
        const googleUrl = 'https://mt1.google.com/vt/lyrs=h,traffic&x={x}&y={y}&z={z}';
        googleTrafficLayer = L.tileLayer(googleUrl, {
            maxZoom: 19,
            opacity: 0.8,
            attribution: '© Google Traffic'
        });

        // --- CAPA 2: HERE (Para debugging) ---
        // Usamos {s} para alternar subdominios (1, 2, 3, 4)
        const hereUrl = `https://{s}.traffic.maps.ls.hereapi.com/maptile/2.1/traffictile/newest/normal.day/{z}/{x}/{y}/256/png8?apiKey=${HERE_API_KEY}`;
        hereTrafficLayer = L.tileLayer(hereUrl, {
            subdomains: '1234',
            maxZoom: 19,
            opacity: 0.8,
            attribution: '© HERE Traffic'
        });

        // 3. Comportamiento visual
        // Añadimos Google al mapa por defecto para que el usuario vea el tráfico
        googleTrafficLayer.addTo(map);

        // Añadimos AMBAS al control de capas para que tú puedas alternarlas manualmente
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
