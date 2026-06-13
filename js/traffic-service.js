// Configuración de HERE API
const HERE_API_KEY = 'i8vlAqNpKjA6X9tJfnAXYTL2IzUnPd8fM0lQwSyU1qI'; 

// Capa base de tráfico vacía
let trafficLayer = null;

const slider = document.getElementById('timeSlider');
const display = document.getElementById('timeDisplay');

function updateTrafficLayer(hora) {
    if (trafficLayer) {
        map.removeLayer(trafficLayer);
        // También removemos la capa del control superior si existe
        try { layerControl.removeLayer(trafficLayer); } catch(e) {}
    }
    
    if (hora === 18) {
        display.style.color = "red";
        display.style.fontWeight = "bold";

        // CORRECCIÓN: Usamos la variable HERE_API_KEY correctamente
        const trafficUrl = `https://1.traffic.maps.ls.hereapi.com/maptile/2.1/traffictile/newest/normal.day/{z}/{x}/{y}/256/png8?apiKey=${HERE_API_KEY}`;
        
        trafficLayer = L.tileLayer(trafficUrl, {
            maxZoom: 19,
            attribution: '© HERE Traffic'
        });

        trafficLayer.addTo(map);
        
        // Lo añadimos al control superior
        layerControl.addOverlay(trafficLayer, "Tráfico (Hora Pico)");

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
