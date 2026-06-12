// Función para cargar y procesar el GeoJSON
async function loadGeoJsonData() {
    try {
        // Hacemos la petición al archivo local
        const response = await fetch('data/capas_movilidad.geojson');
        const data = await response.json();

        // Creamos objetos para almacenar nuestras capas por separado
        const layerGroups = {};

        // Configuramos el estilo visual de los polígonos
        const styleOptions = {
            color: "#ff7800",
            weight: 2,
            opacity: 1,
            fillOpacity: 0.5
        };

        // Recorremos cada "feature" del GeoJSON
        L.geoJSON(data, {
            style: function(feature) {
                // Puedes cambiar el color según el grupo
                if(feature.properties.Grupo === 'Parking') {
                    return { color: "#3388ff", weight: 2, fillOpacity: 0.5 };
                }
                return styleOptions;
            },
            onEachFeature: function (feature, layer) {
                // Extraer a qué grupo pertenece
                const grupo = feature.properties.Grupo || 'Sin Grupo';
                
                // Añadir un popup interactivo al hacer clic
                layer.bindPopup(`<b>${feature.properties.name}</b><br>Grupo: ${grupo}`);

                // Si el grupo no existe en nuestro objeto, lo creamos
                if (!layerGroups[grupo]) {
                    layerGroups[grupo] = L.layerGroup();
                }

                // Añadimos el polígono al grupo correspondiente
                layerGroups[grupo].addLayer(layer);
            }
        });

        // Añadir las capas separadas al control de la esquina superior derecha
        for (const [nombreGrupo, grupoLayer] of Object.entries(layerGroups)) {
            // Añadimos el checkbox al menú
            layerControl.addOverlay(grupoLayer, nombreGrupo);
            
            // (Opcional) Activar las capas por defecto al cargar
            grupoLayer.addTo(map);
        }

    } catch (error) {
        console.error("Error cargando el GeoJSON:", error);
    }
}

// Ejecutar la función
loadGeoJsonData();
