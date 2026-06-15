let layerGroups = {};

// 1. Icono Bici Pública (Rosa característico de MiBici)
const iconMiBici = L.divIcon({
    className: 'custom-svg-icon',
    html: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#E6007E" width="28px" height="28px">
              <path d="M15.5 5.5c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zM5 12c-2.8 0-5 2.2-5 5s2.2 5 5 5 5-2.2 5-5-2.2-5-5-5zm0 8.5c-1.9 0-3.5-1.6-3.5-3.5s1.6-3.5 3.5-3.5 3.5 1.6 3.5 3.5-1.6 3.5-3.5 3.5zm5.8-10l2.4-2.4.8.8c1.3 1.3 3 2.1 5.1 2.1V9c-1.5 0-2.7-.6-3.6-1.5l-1.9-1.9c-.5-.4-1-.6-1.6-.6s-1.1.2-1.4.6L7.8 8.4c-.4.4-.6 1-.6 1.5V13h2V10l1.8-1.5v3.3l-3.2 7.7h2.2l2.6-6.5h3v-2h-2.5l-2.3 2.5-1-2.5zM19 12c-2.8 0-5 2.2-5 5s2.2 5 5 5 5-2.2 5-5-2.2-5-5-5zm0 8.5c-1.9 0-3.5-1.6-3.5-3.5s1.6-3.5 3.5-3.5 3.5 1.6 3.5 3.5-1.6 3.5-3.5 3.5z"/>
           </svg>`,
    iconSize: [28, 28], 
    iconAnchor: [14, 14]
});

// 2. Icono Intersección (Cruz Negra sólida)
const iconInterseccion = L.divIcon({
    className: 'custom-svg-icon',
    html: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#000000" width="22px" height="22px">
              <path d="M19 10.5h-5.5V5h-3v5.5H5v3h5.5V19h3v-5.5H19v-3z"/>
           </svg>`,
    iconSize: [22, 22], 
    iconAnchor: [11, 11]
});

// 3. Icono Transporte Público (Autobús azul para estaciones TP)
const iconTPEstacion = L.divIcon({
    className: 'custom-svg-icon',
    html: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#004aad" width="28px" height="28px">
              <path d="M12 2c-4.42 0-8 .5-8 4v9.5C4 17.43 5.57 19 7.5 19L6 20.5v.5h2l2-2h4l2 2h2v-.5L16.5 19c1.93 0 3.5-1.57 3.5-3.5V6c0-3.5-3.58-4-8-4zM7.5 17c-.83 0-1.5-.67-1.5-1.5S6.67 14 7.5 14s1.5.67 1.5 1.5S8.33 17 7.5 17zm9 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm-8.5-6V6h8v5H8z"/>
           </svg>`,
    iconSize: [28, 28], 
    iconAnchor: [14, 14]
});

// 4. Icono Puente Peatonal (Silueta de peatón cruzando)
const iconPuentePeatonal = L.divIcon({
    className: 'custom-svg-icon',
    html: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#8E44AD" width="28px" height="28px">
              <path d="M13.5 5.5c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zM9.8 8.9L7 23h2.1l1.8-8 2.1 2v6h2v-7.5l-2.1-2 .6-3C14.8 12 16.8 13 19 13v-2c-1.9 0-3.5-1-4.3-2.4l-1-1.6c-.4-.6-1-1-1.7-1-.3 0-.5.1-.8.1L6 8.3V13h2V9.6l1.8-.7"/>
           </svg>`,
    iconSize: [28, 28], 
    iconAnchor: [14, 14]
});

// Función principal para cargar y procesar el GeoJSON
async function loadGeoJsonData() {
    try {
        const response = await fetch('data/capas_movilidad.geojson');
        const data = await response.json();

        L.geoJSON(data, {
            
            // Filtro para excluir 'Demanda TP' por completo
            filter: function(feature) {
                const grupo = (feature.properties.Grupo || '').toLowerCase().trim();
                return grupo !== 'demanda tp'; 
            },

            // Estilos para Polígonos y Líneas (Soporta "Recintos" y "Recinto")
            style: function(feature) {
                const grupoPoligono = (feature.properties.Grupo || '').toLowerCase().trim();
                if (grupoPoligono === 'recintos' || grupoPoligono === 'recinto') {
                    return { color: "#e74c3c", weight: 2, fillOpacity: 0.5 }; 
                }
                if (grupoPoligono === 'parking') {
                    return { color: "#3388ff", weight: 2, fillOpacity: 0.5 };
                }
                if (grupoPoligono === 'tp estación' || grupoPoligono === 'tp estacion') {
                    return { color: "#ff7800", weight: 2, fillOpacity: 0.5 };
                }
                return { color: "#888", weight: 2, fillOpacity: 0.5 };
            },
            
            // Asignación de vectores SVG para los Puntos
            pointToLayer: function (feature, latlng) {
                let iconToUse = new L.Icon.Default(); 
                let valorGrupo = feature.properties.Grupo || '';
                const nombreGrupoLimpiado = valorGrupo.trim().toLowerCase();
                
                if (nombreGrupoLimpiado === 'bici pública' || nombreGrupoLimpiado === 'bici publica' || nombreGrupoLimpiado === 'mibici') {
                    iconToUse = iconMiBici;
                } else if (nombreGrupoLimpiado === 'intersecciones' || nombreGrupoLimpiado === 'interseccion') {
                    iconToUse = iconInterseccion;
                } else if (nombreGrupoLimpiado === 'tp estación' || nombreGrupoLimpiado === 'tp estacion') {
                    iconToUse = iconTPEstacion;
                } else if (nombreGrupoLimpiado === 'puente peatonal' || nombreGrupoLimpiado === 'puentes peatonales') {
                    iconToUse = iconPuentePeatonal;
                }
                
                return L.marker(latlng, { icon: iconToUse });
            },

            // Estructura Dinámica y Flexible de Popups
            onEachFeature: function (feature, layer) {
                const props = feature.properties;
                const grupo = props.Grupo || 'Sin Grupo';
                
                let popupHTML = `<div style="font-family: Arial, sans-serif; min-width: 160px;">`;
                popupHTML += `<strong style="font-size: 15px; display: block; border-bottom: 1px solid #ccc; padding-bottom: 5px; margin-bottom: 8px;">${props.name || 'Elemento sin nombre'}</strong>`;
                popupHTML += `<div style="font-size: 13px; margin-bottom: 4px;">Grupo: <span style="font-weight: bold; color: #555;">${grupo}</span></div>`;
                
                // Renderizado condicional de métricas (viejas y nuevas)
                if (props.Aforo !== undefined) {
                    popupHTML += `<div style="font-size: 13px; margin-bottom: 4px;">Aforo: <b>${props.Aforo.toLocaleString()}</b></div>`;
                }
                if (props.Parking !== undefined) {
                    popupHTML += `<div style="font-size: 13px; margin-bottom: 4px;">Parking: <b>${props.Parking}</b></div>`;
                }
                if (props['Parking/Seat'] !== undefined) {
                    popupHTML += `<div style="font-size: 13px; margin-bottom: 4px;">Parking/Seat: <b>${props['Parking/Seat']}</b></div>`;
                }
                if (props['Parking Recinto'] !== undefined) {
                    popupHTML += `<div style="font-size: 13px; margin-bottom: 4px;">Parking Recinto: <b>${props['Parking Recinto']}</b></div>`;
                }
                if (props.oferta !== undefined) {
                    popupHTML += `<div style="font-size: 13px; margin-bottom: 4px;">Oferta: <b>${props.oferta}</b></div>`;
                }
                if (props.demanda !== undefined) {
                    popupHTML += `<div style="font-size: 13px; margin-bottom: 4px;">Demanda: <b>${props.demanda}</b></div>`;
                }
                
                popupHTML += `</div>`;
                layer.bindPopup(popupHTML);

                // Agrupación en el menú lateral tal como viene escrito el grupo
                if (!layerGroups[grupo]) {
                    layerGroups[grupo] = L.layerGroup();
                }
                layerGroups[grupo].addLayer(layer);
            }
        });

        // Vincular los grupos activos al menú superior derecho
        for (const [nombreGrupo, grupoLayer] of Object.entries(layerGroups)) {
            window.layerControl.addOverlay(grupoLayer, nombreGrupo);
            grupoLayer.addTo(map);
        }

        agregarBotonMaestroAlPanel();

    } catch (error) {
        console.error("Error cargando el GeoJSON:", error);
    }
}

// Lógica de inyección del botón de control masivo (Sin Emojis)
function agregarBotonMaestroAlPanel() {
    const overlaysContainer = document.querySelector('.leaflet-control-layers-overlays');
    if (!overlaysContainer) return;

    const divBoton = document.createElement('div');
    divBoton.className = 'btn-maestro';
    
    const svgOjoCerrado = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M12 7c2.76 0 5 2.24 5 5 0 .65-.13 1.26-.36 1.83l2.92 2.92c1.51-1.26 2.7-2.89 3.43-4.75-1.73-4.39-6-7.5-11-7.5-1.4 0-2.74.25-3.98.7l2.16 2.16C10.74 7.13 11.35 7 12 7zM2 4.27l2.28 2.28.46.46C3.08 8.3 1.78 10.02 1 12c1.73 4.39 6 7.5 11 7.5 1.55 0 3.03-.3 4.38-.84l.42.42L19.73 22 21 20.73 3.27 3 2 4.27zM7.53 9.8l1.55 1.55c-.05.21-.08.43-.08.65 0 1.66 1.34 3 3 3 .22 0 .44-.03.65-.08l1.55 1.55c-.67.33-1.41.53-2.2.53-2.76 0-5-2.24-5-5 0-.79.2-1.53.53-2.2zm4.31-.78l3.15 3.15.02-.16c0-1.66-1.34-3-3-3l-.17.01z"/></svg>`;
    const svgOjoAbierto = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/></svg>`;

    divBoton.innerHTML = `${svgOjoCerrado} Ocultar Capas`;

    let todasOcultas = false;

    divBoton.onclick = function(e) {
        e.stopPropagation(); 
        todasOcultas = !todasOcultas;
        divBoton.innerHTML = todasOcultas ? `${svgOjoAbierto} Mostrar Capas` : `${svgOjoCerrado} Ocultar Capas`;

        const checkboxes = overlaysContainer.querySelectorAll('input[type="checkbox"]');
        checkboxes.forEach(cb => {
            if ((cb.checked && todasOcultas) || (!cb.checked && !todasOcultas)) {
                cb.click();
            }
        });
    };

    overlaysContainer.insertBefore(divBoton, overlaysContainer.firstChild);
}

loadGeoJsonData();
