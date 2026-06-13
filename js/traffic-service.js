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

        // ¡Regresamos a HERE!
        const HERE_API_KEY = 'i8vlAqNpKjA6X9tJfnAXYTL2IzUnPd8fM0lQwSyU1qI';
        
        // Usamos {s} para que Leaflet alterne entre los servidores 1, 2, 3 y 4
        const trafficUrl = `https://{s}.traffic.maps.ls.hereapi.com/maptile/2.1/traffictile/newest/normal.day/{z}/{x}/{y}/256/png8?apiKey=${HERE_API_KEY}`;
        
        trafficLayer = L.tileLayer(trafficUrl, {
            subdomains: '1234', // Leaflet usará 1.traffic..., 2.traffic..., etc.
            maxZoom: 19,
            opacity: 0.8,
            attribution: '© HERE Traffic'
        });

        trafficLayer.addTo(map);
        layerControl.addOverlay(trafficLayer, "Tráfico HERE (18:00)");

    } else {
        display.style.color = "black";
        display.style.fontWeight = "normal";
    }
}

slider.addEventListener('input', function(e) {
    const horaSeleccionada = parseInt(e.target.value);
    display.textContent = horaSeleccionada.toString().padStart(2, '0') + ":00";
    updateTrafficLayer(horaSeleccionada);
});
