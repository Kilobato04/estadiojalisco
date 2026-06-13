// Variable global para almacenar todas nuestras capas y poder apagarlas/encenderlas
let layerGroups = {};

// 1. Definición de Iconos SVG Personalizados
const iconMiBici = L.divIcon({
    className: 'custom-svg-icon',
    // SVG color rosa característico de MiBici (#E6007E)
    html: `<svg viewBox="0 0 24 24" fill="#E6007E" width="28px" height="28px"><path d="M15.5,5.5c1.1,0,2-0.9,2-2s-0.9-2-2-2s-2,0.9-2,2S14.4,5.5,15.5,5.5z M5.5,11C2.5,11,0,13.5,0,16.5S2.5,22,5.5,22 s5.5-2.5,5.5-5.5c0-2.3-1.4-4.3-3.3-5.1l1.6-3.3C10.5,8.8,12.1,10,14,10v2c-2.3,0-4.3-1.4-5.1-3.3l-1.3-2.6L6,8l1.4,4.2 C6.8,11.5,6.2,11,5.5,11z M18.5,11c-3,0-5.5,2.5-5.5,5.5s2.5,5.5,5.5,5.5s5.5-2.5,5.5-5.5S21.5,11,18.5,11z M5.5,20 c-1.9,0-3.5-1.6-3.5-3.5S3.6,13,5.5,13s3.5,1.6,3.5,3.5S7.4,20,5.5,20z M18.5,20c-1.9,0-3.5-1.6-3.5-3.5s1.6-3.5,3.5-3.5 s3.5,1.6,3.5,3.5S20.4,20,18.5,20z"/></svg>`,
    iconSize: [28, 28], 
    iconAnchor: [14, 14]
});

const iconInterseccion = L.divIcon({
    className: 'custom-svg-icon',
    // SVG Naranja precaución para cruces
    html: `<svg viewBox="0 0 24 24" fill="#FF8C00" width="28px" height="28px"><path d="M14.5 12.5l-4-4v2h-3v4h2v-2h1v3.5c0 1.1-.9 2-2 2s-2-.9-2-2v-4h-2v4c0 2.2 1.8 4 4 4s4-1.8 4-4v-3.5h1v2l4-4z"/></svg>`,
    iconSize: [28, 28], 
    iconAnchor: [14, 14]
});

// Función principal para cargar y procesar el GeoJSON
async function loadGeoJsonData() {
    try {
        // Hacemos la petición al archivo local
        const response = await fetch('data/capas_movilidad.geojson');
        const data = await response.json();

        // Recorremos cada "feature" del GeoJSON
        L.geoJSON(data, {
            
            // Lógica para POLÍGONOS y LÍNEAS (Estilos de color)
            style: function(feature) {
                if(feature.properties.Grupo === 'Parking') {
                    return { color: "#3388ff", weight: 2, fillOpacity: 0.5 };
                }
                if(feature.properties.Grupo === 'TP Estación') {
                    return { color: "#ff7800", weight: 2, fillOpacity: 0.5 };
                }
                // Estilo por defecto
                return { color: "#888", weight: 2, fillOpacity: 0.5 };
            },
            
            // Lógica para PUNTOS (Sustituir el pin azul por SVG según el Grupo)
            pointToLayer: function (feature, latlng) {
                let iconToUse = new L.Icon.Default(); // Pin azul nativo como respaldo
                
                if (feature.properties.Grupo === 'MiBici') {
                    iconToUse = iconMiBici;
                } else if (feature.properties.Grupo === 'Intersecciones') {
                    iconToUse = iconInterseccion;
                }
                
                return L.marker(latlng, { icon: iconToUse });
            },

            // Lógica para estructurar el panel de capas y popups
            onEachFeature: function (feature, layer) {
                const grupo = feature.properties.Grupo || 'Sin Grupo';
                
                // Añadir un popup interactivo al hacer clic
                layer.bindPopup(`<b>${feature.properties.name || 'Elemento'}</b><br>Grupo: ${grupo}`);

                // Si el grupo no existe en nuestro objeto global, lo creamos
                if (!layerGroups[grupo]) {
                    layerGroups[grupo] = L.layerGroup();
                }

                // Añadimos el elemento (punto o polígono) al grupo correspondiente
                layerGroups[grupo].addLayer(layer);
            }
        });

        // Añadir las capas separadas al control nativo de la esquina superior derecha
        for (const [nombreGrupo, grupoLayer] of Object.entries(layerGroups)) {
            layerControl.addOverlay(grupoLayer, nombreGrupo);
            
            // Activar todas las capas por defecto al cargar la página
            grupoLayer.addTo(map);
        }

        // Inicializar el Botón Maestro una vez que los datos terminaron de procesarse
        crearBotonMaestro();

    } catch (error) {
        console.error("Error cargando el GeoJSON:", error);
    }
}

// Lógica del Botón Maestro "Apagar/Encender Todo"
function crearBotonMaestro() {
    let todasVisibles = true;
    
    // Creamos un control personalizado en Leaflet
    const masterControl = L.control({ position: 'topright' });
    
    masterControl.onAdd = function (map) {
        const div = L.DomUtil.create('div', 'leaflet-bar leaflet-control');
        div.style.background = 'white';
        div.style.padding = '8px 12px';
        div.style.cursor = 'pointer';
        div.style.fontWeight = 'bold';
        div.style.textAlign = 'center';
        div.style.marginTop = '10px';
        div.innerHTML = '👁️ Ocultar Capas GeoJSON';
        
        // Comportamiento al hacer clic
        div.onclick = function(e) {
            e.stopPropagation(); // Evita clics accidentales en el mapa de fondo
            todasVisibles = !todasVisibles;
            
            div.innerHTML = todasVisibles ? '👁️ Ocultar Capas GeoJSON' : '🙈 Mostrar Capas GeoJSON';
            
            // Recorremos el objeto de capas y las aplicamos o quitamos del mapa
            for (const grupoLayer of Object.values(layerGroups)) {
                if (todasVisibles) {
                    map.addLayer(grupoLayer);
                } else {
                    map.removeLayer(grupoLayer);
                }
            }
        };
        return div;
    };
    
    // Insertamos el botón en el mapa
    masterControl.addTo(map);
}

// Ejecutar la función al cargar el script
loadGeoJsonData();
