// Configuración de HERE API (Comentada o ignorada por ahora)
const HERE_API_KEY = 'i8vlAqNpKjA6X9tJfnAXYTL2IzUnPd8fM0lQwSyU1qI'; 

// Capa base de tráfico vacía
let trafficLayer = null;

const slider = document.getElementById('timeSlider');
const display = document.getElementById('timeDisplay');

function updateTrafficLayer(hora) {
    // 1. Limpiar capa anterior
    if (trafficLayer) {
        map.removeLayer(trafficLayer);
        try { layerControl.removeLayer(trafficLayer); } catch(e) {}
    }
    
    // 2. Lógica del Slider a las 18:00 hrs
    if (hora === 18) {
        display.style.color = "red";
        display.style.fontWeight = "bold";

        // URL de Tráfico de Google Maps (Solo para entorno de pruebas/desarrollo)
        const trafficUrl = 'https://mt1.google.com/vt/lyrs=h,traffic&x={x}&y={y}&z={z}';
        
        trafficLayer = L.tileLayer(trafficUrl, {
            maxZoom: 19,
            opacity: 0.8, // Ligera transparencia para ver tus polígonos debajo
            attribution: '© Google Traffic'
        });

        trafficLayer.addTo(map);
        layerControl.addOverlay(trafficLayer, "Tráfico (18:00)");

    } else {
        display.style.color = "black";
        display.style.fontWeight = "normal";
    }
} // <-- ¡Aquí estaba la llave doble, ya la quité!

slider.addEventListener('input', function(e) {
    const horaSeleccionada = parseInt(e.target.value);
    display.textContent = horaSeleccionada.toString().padStart(2, '0') + ":00";
    updateTrafficLayer(horaSeleccionada);
});
