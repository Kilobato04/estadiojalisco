// Inicializar el mapa centrado en Zapopan (Mercado del Mar / CUCEA)
const map = L.map('map').setView([20.728, -103.385], 15);

// 1. OpenStreetMap
const osmLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '© OpenStreetMap'
});

// 2. Carto Light (Limpio para movilidad)
const cartoLightLayer = L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
    maxZoom: 19,
    attribution: '© CARTO'
});

// 3. Esri World Imagery (Satélite)
const sateliteLayer = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
    attribution: 'Tiles © Esri'
});

// (Apple Maps omitido por requerir MapKit JS y Developer Account de pago)

// Añadir Carto por defecto
cartoLightLayer.addTo(map);

// Agrupar los mapas base para el control
const baseMaps = {
    "Mapa Claro (Carto)": cartoLightLayer,
    "OpenStreetMap": osmLayer,
    "Satélite (Esri)": sateliteLayer
};

// Crear el control de capas
const layerControl = L.control.layers(baseMaps, null, {
    collapsed: false,
    position: 'topright'
}).addTo(map);
