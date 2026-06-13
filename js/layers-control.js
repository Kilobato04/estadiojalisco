// Variable global para almacenar todas nuestras capas
let layerGroups = {};

// 1. Definición de Iconos SVG Personalizados (Con etiqueta xmlns corregida)
const iconMiBici = L.divIcon({
    className: 'custom-svg-icon',
    html: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#E6007E" width="28px" height="28px">
              <path d="M15.5 5.5c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zM5 12c-2.8 0-5 2.2-5 5s2.2 5 5 5 5-2.2 5-5-2.2-5-5-5zm0 8.5c-1.9 0-3.5-1.6-3.5-3.5s1.6-3.5 3.5-3.5 3.5 1.6 3.5 3.5-1.6 3.5-3.5 3.5zm5.8-10l2.4-2.4.8.8c1.3 1.3 3 2.1 5.1 2.1V9c-1.5 0-2.7-.6-3.6-1.5l-1.9-1.9c-.5-.4-1-.6-1.6-.6s-1.1.2-1.4.6L7.8 8.4c-.4.4-.6 1-.6 1.5V13h2V10l1.8-1.5v3.3l-3.2 7.7h2.2l2.6-6.5h3v-2h-2.5l-2.3 2.5-1-2.5zM19 12c-2.8 0-5 2.2-5 5s2.2 5 5 5 5-2.2 5-5-2.2-5-5-5zm0 8.5c-1.9 0-3.5-1.6-3.5-3.5s1.6-3.5 3.5-3.5 3.5 1.6 3.5 3.5-1.6 3.5-3.5 3.5z"/>
           </svg>`,
    iconSize: [28, 28], 
    iconAnchor: [14, 14]
});

const iconInterseccion = L.divIcon({
    className: 'custom-svg-icon',
    html: `<svg viewBox="0 0 24 24" fill="#FF8C00" width="28px" height="28px"><path d="M14.5 12.5l-4-4v2h-3v4h2v-2h1v3.5c0 1.1-.9 2-2 2s-2-.9-2-2v-4h-2v4c0 2.2 1.8 4 4 4s4-1.8 4-4v-3.5h1v2l4-4z"/></svg>`,
    iconSize: [28, 28], 
    iconAnchor: [14, 14]
});

// Función principal para cargar y procesar el GeoJSON
async function loadGeoJsonData() {
    try {
        const response = await fetch('data/capas_movilidad.geojson');
        const data = await response.json();

        L.geoJSON(data, {
            
            // Lógica para POLÍGONOS y LÍNEAS
            style: function(feature) {
                if(feature.properties.Grupo === 'Parking') return { color: "#3388ff", weight: 2, fillOpacity: 0.5 };
                if(feature.properties.Grupo === 'TP Estación') return { color: "#ff7800", weight: 2, fillOpacity: 0.5 };
                return { color: "#888", weight: 2, fillOpacity: 0.5 };
            },
            
            // Lógica para PUNTOS (ignorando mayúsculas)
            pointToLayer: function (feature, latlng) {
                let iconToUse = new L.Icon.Default(); 
                const nombreGrupo = (feature.properties.Grupo || '').toLowerCase();
                
                if (nombreGrupo === 'mibici') {
                    iconToUse = iconMiBici;
                } else if (nombreGrupo === 'intersecciones') {
                    iconToUse = iconInterseccion;
                }
                return L.marker(latlng, { icon: iconToUse });
            },

            // Organizar en grupos
            onEachFeature: function (feature, layer) {
                const grupo = feature.properties.Grupo || 'Sin Grupo';
                layer.bindPopup(`<b>${feature.properties.name || 'Elemento'}</b><br>Grupo: ${grupo}`);

                if (!layerGroups[grupo]) {
                    layerGroups[grupo] = L.layerGroup();
                }
                layerGroups[grupo].addLayer(layer);
            }
        });

        // Añadir las capas al panel de control
        for (const [nombreGrupo, grupoLayer] of Object.entries(layerGroups)) {
            layerControl.addOverlay(grupoLayer, nombreGrupo);
            grupoLayer.addTo(map);
        }

        // Inyectar el botón directamente dentro del panel de Leaflet
        agregarBotonMaestroAlPanel();

    } catch (error) {
        console.error("Error cargando el GeoJSON:", error);
    }
}

// 4. Lógica de inyección en el DOM de Leaflet
function agregarBotonMaestroAlPanel() {
    // Buscamos el contenedor interno donde Leaflet guarda las "Overlays" (tus capas)
    const overlaysContainer = document.querySelector('.leaflet-control-layers-overlays');
    if (!overlaysContainer) return;

    // Diseñamos el botón como un separador elegante
    const divBoton = document.createElement('div');
    divBoton.style.padding = '6px 5px';
    divBoton.style.margin = '5px 0 10px 0';
    divBoton.style.borderBottom = '1px solid #ddd';
    divBoton.style.borderTop = '1px solid #ddd';
    divBoton.style.cursor = 'pointer';
    divBoton.style.fontWeight = 'bold';
    divBoton.style.textAlign = 'center';
    divBoton.style.backgroundColor = '#f8f9fa';
    divBoton.style.borderRadius = '4px';
    divBoton.style.fontSize = '13px';
    divBoton.innerHTML = '👁️ Ocultar Capas';

    let todasOcultas = false;

    // Acción al dar clic
    divBoton.onclick = function(e) {
        e.stopPropagation(); // Evita que Leaflet colapse el menú
        todasOcultas = !todasOcultas;
        divBoton.innerHTML = todasOcultas ? '🙈 Mostrar Capas' : '👁️ Ocultar Capas';

        // Buscamos todas las casillas de verificación dentro del panel
        const checkboxes = overlaysContainer.querySelectorAll('input[type="checkbox"]');
        
        checkboxes.forEach(cb => {
            // Hacemos clic automático solo en las que necesitan cambiar de estado
            if ((cb.checked && todasOcultas) || (!cb.checked && !todasOcultas)) {
                cb.click();
            }
        });
    };

    // Insertamos nuestro botón al principio de la lista de capas, justo después del separador de Mapas Base
    overlaysContainer.insertBefore(divBoton, overlaysContainer.firstChild);
}

// Ejecutar
loadGeoJsonData();
