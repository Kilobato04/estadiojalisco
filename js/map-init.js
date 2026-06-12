// 1. Inicializar el mapa centrado en tus coordenadas (Guadalajara, ej.)
const map = L.map('map').setView([20.728, -103.385], 15);

// 2. Definir Mapas Base (Base Maps)
const osmLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '© OpenStreetMap'
});

const cartoLightLayer = L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
    maxZoom: 19,
    attribution: '© CARTO'
});

// 3. Añadir el mapa por defecto al iniciar
cartoLightLayer.addTo(map);

// 4. Agrupar los mapas base para el control
const baseMaps = {
    "Mapa Claro (Carto)": cartoLightLayer,
    "OpenStreetMap": osmLayer
};

// 5. Crear el control de capas (siempre visible en la esquina superior derecha)
// Aquí usamos la funcionalidad nativa de Leaflet que crea el "dropdown"
const layerControl = L.control.layers(baseMaps, null, {
    collapsed: false, // Mantiene el menú abierto siempre
    position: 'topright'
}).addTo(map);
