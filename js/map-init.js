// Inicializar el mapa centrado en Zapopan (Mercado del Mar / CUCEA)
const map = L.map('map').setView([20.728, -103.385], 14);

// Mapas Base
const osmLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { 
    maxZoom: 19,
    attribution: '© OpenStreetMap'
});
const cartoLightLayer = L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', { 
    maxZoom: 19,
    attribution: '© CARTO'
});
const sateliteLayer = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
    attribution: 'Tiles © Esri'
});

// Forzar mapa claro por defecto
cartoLightLayer.addTo(map);

const baseMaps = {
    "Mapa Claro (Carto)": cartoLightLayer,
    "OpenStreetMap": osmLayer,
    "Satélite (Esri)": sateliteLayer
};

// --- TRÁFICO EN TIEMPO REAL (Live integrado de forma fija) ---
const HERE_API_KEY = 'i8vlAqNpKjA6X9tJfnAXYTL2IzUnPd8fM0lQwSyU1qI'; 

const googleTrafficLayer = L.tileLayer('https://mt1.google.com/vt/lyrs=h,traffic&x={x}&y={y}&z={z}', {
    maxZoom: 19, 
    opacity: 0.8, 
    attribution: '© Google Traffic'
});

const hereTrafficLayer = L.tileLayer(`https://traffic.maps.hereapi.com/v3/flow/mc/{z}/{x}/{y}/png?apiKey=${HERE_API_KEY}`, {
    maxZoom: 19, 
    opacity: 0.8, 
    attribution: '© HERE Traffic'
});

// Guardamos el tráfico como capas superpuestas iniciales
const overlayMaps = {
    "Tráfico Live (Google)": googleTrafficLayer,
    "Tráfico Live (HERE)": hereTrafficLayer
};

// LÓGICA MÓVIL: Detectamos si la pantalla es de un celular (menos de 768px de ancho)
const isMobile = window.innerWidth <= 768;

// Guardamos el control en window.layerControl para enlazarlo con layers-control.js
window.layerControl = L.control.layers(baseMaps, overlayMaps, {
    collapsed: isMobile, // Si es celular se colapsa (icono hamburguesa), si es PC se queda abierto
    position: 'topright'
}).addTo(map);
