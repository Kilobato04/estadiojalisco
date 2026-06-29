let layerGroups = {};

// 1. Iconos SVG
const iconMiBici = L.divIcon({
    className: 'custom-svg-icon',
    html: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#E6007E" width="28px" height="28px">
              <path d="M15.5 5.5c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zM5 12c-2.8 0-5 2.2-5 5s2.2 5 5 5 5-2.2 5-5-2.2-5-5-5zm0 8.5c-1.9 0-3.5-1.6-3.5-3.5s1.6-3.5 3.5-3.5 3.5 1.6 3.5 3.5-1.6 3.5-3.5 3.5zm5.8-10l2.4-2.4.8.8c1.3 1.3 3 2.1 5.1 2.1V9c-1.5 0-2.7-.6-3.6-1.5l-1.9-1.9c-.5-.4-1-.6-1.6-.6s-1.1.2-1.4.6L7.8 8.4c-.4.4-.6 1-.6 1.5V13h2V10l1.8-1.5v3.3l-3.2 7.7h2.2l2.6-6.5h3v-2h-2.5l-2.3 2.5-1-2.5zM19 12c-2.8 0-5 2.2-5 5s2.2 5 5 5 5-2.2 5-5-2.2-5-5-5zm0 8.5c-1.9 0-3.5-1.6-3.5-3.5s1.6-3.5 3.5-3.5 3.5 1.6 3.5 3.5-1.6 3.5-3.5 3.5z"/>
           </svg>`,
    iconSize: [28, 28], iconAnchor: [14, 14]
});

const iconInterseccion = L.divIcon({
    className: 'custom-svg-icon',
    html: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#000000" width="22px" height="22px">
              <path d="M19 10.5h-5.5V5h-3v5.5H5v3h5.5V19h3v-5.5H19v-3z"/>
           </svg>`,
    iconSize: [22, 22], iconAnchor: [11, 11]
});

const iconTPEstacion = L.divIcon({
    className: 'custom-svg-icon',
    html: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#004aad" width="28px" height="28px">
              <path d="M12 2c-4.42 0-8 .5-8 4v9.5C4 17.43 5.57 19 7.5 19L6 20.5v.5h2l2-2h4l2 2h2v-.5L16.5 19c1.93 0 3.5-1.57 3.5-3.5V6c0-3.5-3.58-4-8-4zM7.5 17c-.83 0-1.5-.67-1.5-1.5S6.67 14 7.5 14s1.5.67 1.5 1.5S8.33 17 7.5 17zm9 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm-8.5-6V6h8v5H8z"/>
           </svg>`,
    iconSize: [28, 28], iconAnchor: [14, 14]
});

const iconPuentePeatonal = L.divIcon({
    className: 'custom-svg-icon',
    html: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#8E44AD" width="28px" height="28px">
              <path d="M13.5 5.5c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zM9.8 8.9L7 23h2.1l1.8-8 2.1 2v6h2v-7.5l-2.1-2 .6-3C14.8 12 16.8 13 19 13v-2c-1.9 0-3.5-1-4.3-2.4l-1-1.6c-.4-.6-1-1-1.7-1-.3 0-.5.1-.8.1L6 8.3V13h2V9.6l1.8-.7"/>
           </svg>`,
    iconSize: [28, 28], iconAnchor: [14, 14]
});

// 5. Nuevo Icono: NE MiBici (Azul vibrante para propuestas)
const iconNEMiBici = L.divIcon({
    className: 'custom-svg-icon',
    html: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#007bff" width="28px" height="28px">
              <path d="M15.5 5.5c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zM5 12c-2.8 0-5 2.2-5 5s2.2 5 5 5 5-2.2 5-5-2.2-5-5-5zm0 8.5c-1.9 0-3.5-1.6-3.5-3.5s1.6-3.5 3.5-3.5 3.5 1.6 3.5 3.5-1.6 3.5-3.5 3.5zm5.8-10l2.4-2.4.8.8c1.3 1.3 3 2.1 5.1 2.1V9c-1.5 0-2.7-.6-3.6-1.5l-1.9-1.9c-.5-.4-1-.6-1.6-.6s-1.1.2-1.4.6L7.8 8.4c-.4.4-.6 1-.6 1.5V13h2V10l1.8-1.5v3.3l-3.2 7.7h2.2l2.6-6.5h3v-2h-2.5l-2.3 2.5-1-2.5zM19 12c-2.8 0-5 2.2-5 5s2.2 5 5 5 5-2.2 5-5-2.2-5-5-5zm0 8.5c-1.9 0-3.5-1.6-3.5-3.5s1.6-3.5 3.5-3.5 3.5 1.6 3.5 3.5-1.6 3.5-3.5 3.5z"/>
           </svg>`,
    iconSize: [28, 28], 
    iconAnchor: [14, 14]
});

// 6. Nuevo Icono: Puente Peatonal Propuesto (Turquesa para combinar con su línea)
const iconPuentePeatonalPropuesto = L.divIcon({
    className: 'custom-svg-icon',
    html: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#1ABC9C" width="28px" height="28px">
              <path d="M13.5 5.5c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zM9.8 8.9L7 23h2.1l1.8-8 2.1 2v6h2v-7.5l-2.1-2 .6-3C14.8 12 16.8 13 19 13v-2c-1.9 0-3.5-1-4.3-2.4l-1-1.6c-.4-.6-1-1-1.7-1-.3 0-.5.1-.8.1L6 8.3V13h2V9.6l1.8-.7"/>
           </svg>`,
    iconSize: [28, 28], 
    iconAnchor: [14, 14]
});

// Función principal
async function loadGeoJsonData() {
    try {
        const response = await fetch('data/capas_movilidad.geojson');
        const data = await response.json();

        L.geoJSON(data, {
            filter: function(feature) {
                const grupo = (feature.properties.Grupo || '').toLowerCase().trim();
                return grupo !== 'demanda tp'; 
            },

            // Estilos para Polígonos y Líneas
            style: function(feature) {
                const grupoPoligono = (feature.properties.Grupo || '').toLowerCase().trim();
                const nombreFeature = (feature.properties.name || '').toLowerCase().trim();

                // 1. Propuesta de Vialidad-Andador (Gris Pizarra - Fase 1)
                if (grupoPoligono === 'pcalles/ep' || nombreFeature === 'nvialidad' || grupoPoligono === 'vialidad-andador') {
                    return { color: "#34495E", weight: 4, dashArray: "6, 6", opacity: 0.95 };
                }
                // NUEVO: Vialidad F2 (Marrón Terracota - Fase 2)
                if (nombreFeature === 'nvialidad f2') {
                    return { color: "#A04000", weight: 4, dashArray: "4, 8", opacity: 0.9 };
                }

                // 2. Estilo para Ruta UdG (Morado - Ruta 1)
                if (grupoPoligono === 'transporte público' || grupoPoligono === 'transporte publico' || nombreFeature === 'ruta udg') {
                    return { color: "#9b59b6", weight: 5, opacity: 0.8 };
                }
                // NUEVO: Estilo para Ruta UdG II (Azul Cobalto - Ruta 2)
                if (nombreFeature === 'ruta udg ii') {
                    return { color: "#2980B9", weight: 5, opacity: 0.8 };
                }

                // 3. Estilo para el puente peatonal propuesto (Turquesa segmentado)
                if (nombreFeature === 'puente peatonal ii constitución' || nombreFeature === 'puente peatonal ii constitucion') {
                    return { color: "#1ABC9C", weight: 5, dashArray: "5, 5", opacity: 0.9 };
                }

                // --- NUEVAS CAPAS: Accesos al Estadio ---
                if (nombreFeature === 'entrada-estadio') {
                    return { color: "#2ecc71", weight: 6, opacity: 0.9 }; // Verde
                }
                if (nombreFeature === 'salida-estadio') {
                    return { color: "#3498db", weight: 6, opacity: 0.9 }; // Azul
                }
                if (nombreFeature === 'entrada/salida-estadio') {
                    // Para la bidireccional, esta es la capa BASE (Rojo sólido). 
                    // La capa punteada azul se añadirá en el onEachFeature.
                    return { color: "#e74c3c", weight: 6, opacity: 0.9 }; 
                }

                // --- Capas Base ---
                if (grupoPoligono === 'recintos' || grupoPoligono === 'recinto') return { color: "#e74c3c", weight: 2, fillOpacity: 0.5 }; 
                if (grupoPoligono === 'parking') return { color: "#3388ff", weight: 2, fillOpacity: 0.5 };
                if (grupoPoligono === 'tp estación' || grupoPoligono === 'tp estacion') return { color: "#ff7800", weight: 2, fillOpacity: 0.5 };
                return { color: "#888", weight: 2, fillOpacity: 0.5 };
            },

            // Asignación de vectores SVG para los Puntos
            pointToLayer: function (feature, latlng) {
                let iconToUse = new L.Icon.Default(); 
                let valorGrupo = feature.properties.Grupo || '';
                const nombreGrupoLimpiado = valorGrupo.trim().toLowerCase();
                const nombreFeature = (feature.properties.name || '').trim().toLowerCase();
                
                // Prioridad 1: Elementos específicos de propuestas
                if (nombreFeature === 'ne mibici') {
                    iconToUse = iconNEMiBici; // Bici azul
                } else if (nombreFeature === 'puente peatonal ii constitución' || nombreFeature === 'puente peatonal ii constitucion') {
                    iconToUse = iconPuentePeatonalPropuesto; // Peatón turquesa
                } 
                
                // Prioridad 2: Elementos generales por grupo
                else if (nombreGrupoLimpiado === 'bici pública' || nombreGrupoLimpiado === 'bici publica' || nombreGrupoLimpiado === 'mibici') {
                    iconToUse = iconMiBici; // Bici rosa
                } else if (nombreGrupoLimpiado === 'intersecciones' || nombreGrupoLimpiado === 'interseccion') {
                    iconToUse = iconInterseccion;
                } else if (nombreGrupoLimpiado === 'tp estación' || nombreGrupoLimpiado === 'tp estacion') {
                    iconToUse = iconTPEstacion;
                } else if (nombreGrupoLimpiado === 'puente peatonal' || nombreGrupoLimpiado === 'puentes peatonales') {
                    iconToUse = iconPuentePeatonal; // Peatón morado (Puentes actuales)
                }
                
                return L.marker(latlng, { icon: iconToUse });
            },
            // Estructura Dinámica y Flexible de Popups
            onEachFeature: function (feature, layer) {
                const props = feature.properties;
                const grupo = props.Grupo || 'Sin Grupo';
                const name = props.name || '';
                
                // CONDICIÓN: Si es propuesta, se registra de forma independiente en el panel
                let nombreCapaDestino = grupo;
                
                if (name === 'NE MiBici' || name === 'Ruta UdG' || name === 'Ruta UdG II' || grupo === 'PCalles/EP' || name === 'NVialidad' || name === 'NVialidad F2' || name === 'Puente Peatonal II Constitución' || name === 'Puente Peatonal II Constitucion') {
                    
                    // Renombramiento dinámico para el panel de capas
                    if (name === 'NVialidad' || grupo === 'PCalles/EP') {
                        nombreCapaDestino = 'Vialidad-Andador';
                    } else if (name === 'NVialidad F2') {
                        nombreCapaDestino = 'Vialidad-Andador Fase 2';
                    } else {
                        nombreCapaDestino = name; // Mantiene "Ruta UdG II", etc.
                    }
                }
                
                let popupHTML = `<div style="font-family: Arial, sans-serif; min-width: 160px;">`;
                popupHTML += `<strong style="font-size: 15px; display: block; border-bottom: 1px solid #ccc; padding-bottom: 5px; margin-bottom: 8px;">${props.name || 'Elemento sin nombre'}</strong>`;
                popupHTML += `<div style="font-size: 13px; margin-bottom: 4px;">Grupo: <span style="font-weight: bold; color: #555;">${grupo}</span></div>`;
                
                if (props.Aforo !== undefined) popupHTML += `<div style="font-size: 13px; margin-bottom: 4px;">Aforo: <b>${props.Aforo.toLocaleString()}</b></div>`;
                if (props.Parking !== undefined) popupHTML += `<div style="font-size: 13px; margin-bottom: 4px;">Parking: <b>${props.Parking}</b></div>`;
                if (props['Parking/Seat'] !== undefined) popupHTML += `<div style="font-size: 13px; margin-bottom: 4px;">Parking/Seat: <b>${props['Parking/Seat']}</b></div>`;
                if (props['Parking Recinto'] !== undefined) popupHTML += `<div style="font-size: 13px; margin-bottom: 4px;">Parking Recinto: <b>${props['Parking Recinto']}</b></div>`;
                if (props.oferta !== undefined) popupHTML += `<div style="font-size: 13px; margin-bottom: 4px;">Oferta: <b>${props.oferta}</b></div>`;
                if (props.demanda !== undefined) popupHTML += `<div style="font-size: 13px; margin-bottom: 4px;">Demanda: <b>${props.demanda}</b></div>`;
                
                popupHTML += `</div>`;
                layer.bindPopup(popupHTML);

                if (!layerGroups[nombreCapaDestino]) {
                    layerGroups[nombreCapaDestino] = L.layerGroup();
                }
                
                // 1. Agregamos la línea normal (que para la bidireccional será roja sólida)
                layerGroups[nombreCapaDestino].addLayer(layer);

                // 2. TRUCO BICOLOR: Si es Entrada/Salida, creamos una segunda capa punteada encima
                const nombreParaBicolor = (feature.properties.name || '').toLowerCase().trim();
                
                if (nombreParaBicolor === 'entrada/salida-estadio' && layer.getLatLngs) {
                    const lineaPunteada = L.polyline(layer.getLatLngs(), {
                        color: "#3498db",     // Azul
                        weight: 6,            
                        dashArray: "12, 12",  // Patrón de guiones
                        opacity: 1
                    });
                    
                    // Le pegamos el mismo Popup para que reaccione igual al clic
                    lineaPunteada.bindPopup(popupHTML); 
                    
                    // La agregamos al mismo grupo para que se apaguen/prendan juntas
                    layerGroups[nombreCapaDestino].addLayer(lineaPunteada);
                }
            }
        });

        for (const [nombreGrupo, grupoLayer] of Object.entries(layerGroups)) {
            window.layerControl.addOverlay(grupoLayer, nombreGrupo);
            grupoLayer.addTo(map);
        }

// Llamadas de interfaz al final de loadGeoJsonData()
        agregarBotonMaestroAlPanel();
        agregarSeparadorPropuestas();
        agregarBotonEncuestaAlPanel(); 
        
        // --- NUEVAS LLAMADAS ---
        agregarSeparadorLiveData(); 
        agregarBotonesLiveData();

    } catch (error) {
        console.error("Error cargando el GeoJSON:", error);
    }
}

// ----------------------------------------------------
// BOTONES Y SEPARADORES EXISTENTES
// ----------------------------------------------------
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
            if ((cb.checked && todasOcultas) || (!cb.checked && !todasOcultas)) cb.click();
        });
    };
    overlaysContainer.insertBefore(divBoton, overlaysContainer.firstChild);
}

function agregarSeparadorPropuestas() {
    const overlaysContainer = document.querySelector('.leaflet-control-layers-overlays');
    if (!overlaysContainer) return;
    const labels = overlaysContainer.querySelectorAll('label');
    let primerPropuestaLabel = null;
    labels.forEach(label => {
        const texto = label.textContent.trim();
        if (texto === 'NE MiBici' || texto === 'Ruta UdG' || texto === 'Ruta UdG II' || texto === 'Vialidad-Andador' || texto === 'Vialidad-Andador Fase 2' || texto === 'Puente Peatonal II Constitución') {
            if (!primerPropuestaLabel) primerPropuestaLabel = label;
        }
    });
    if (primerPropuestaLabel && !document.querySelector('.separador-propuestas')) {
        const divSeparador = document.createElement('div');
        divSeparador.className = 'separador-propuestas';
        Object.assign(divSeparador.style, {
            fontWeight: 'bold', margin: '14px 0 6px 0', paddingTop: '8px', borderTop: '1px solid #ddd',
            fontSize: '11px', color: '#666', letterSpacing: '1px', paddingLeft: '4px'
        });
        divSeparador.innerHTML = 'PROPUESTAS';
        overlaysContainer.insertBefore(divSeparador, primerPropuestaLabel);
    }
}

function agregarBotonEncuestaAlPanel() {
    const overlaysContainer = document.querySelector('.leaflet-control-layers-overlays');
    if (!overlaysContainer) return;
    const divBoton = document.createElement('div');
    divBoton.className = 'btn-maestro'; 
    divBoton.style.marginTop = '15px'; 
    const svgEncuesta = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/></svg>`;
    divBoton.innerHTML = `${svgEncuesta} Encuesta OD 2023`;
    divBoton.onclick = function(e) {
        e.stopPropagation(); 
        // Usamos la nueva función universal de modales
        abrirModalIframe('https://www.imeplan.mx/plataformas-de-informacion/visualizador-eod', 'Encuesta Origen Destino 2023');
    };
    overlaysContainer.appendChild(divBoton);
}

// ----------------------------------------------------
// NUEVA SECCIÓN: LIVE DATA Y SUS BOTONES
// ----------------------------------------------------
function agregarSeparadorLiveData() {
    const overlaysContainer = document.querySelector('.leaflet-control-layers-overlays');
    if (!overlaysContainer) return;
    
    const divSeparador = document.createElement('div');
    Object.assign(divSeparador.style, {
        fontWeight: 'bold', margin: '14px 0 6px 0', paddingTop: '8px', borderTop: '1px solid #ddd',
        fontSize: '11px', color: '#666', letterSpacing: '1px', paddingLeft: '4px'
    });
    divSeparador.innerHTML = 'LIVE DATA (HERE API)';
    overlaysContainer.appendChild(divSeparador);
}

function agregarBotonesLiveData() {
    const overlaysContainer = document.querySelector('.leaflet-control-layers-overlays');
    if (!overlaysContainer) return;

    // Botón Velocidad Media
    const btnVel = document.createElement('div');
    btnVel.className = 'btn-maestro';
    btnVel.style.marginTop = '6px';
    btnVel.innerHTML = `🟢 Velocidad Media`;
    btnVel.onclick = function(e) {
        e.stopPropagation();
        abrirModalIframe('Mapa_Velocidad.html', 'Velocidad Media Operativa');
    };
    overlaysContainer.appendChild(btnVel);

    // Botón Jam Factor
    const btnJam = document.createElement('div');
    btnJam.className = 'btn-maestro';
    btnJam.style.marginTop = '6px';
    btnJam.innerHTML = `🔴 Jam Factor (Congestión)`;
    btnJam.onclick = function(e) {
        e.stopPropagation();
        abrirModalIframe('Mapa_JamFactor.html', 'Índice de Congestión (Jam Factor)');
    };
    overlaysContainer.appendChild(btnJam);
}

// ----------------------------------------------------
// MODAL UNIVERSAL REFACTORIZADO (Sirve para la Encuesta y los Mapas)
// ----------------------------------------------------
function abrirModalIframe(url, titulo) {
    if (document.getElementById('modal-iframe')) return;

    const modal = document.createElement('div');
    modal.id = 'modal-iframe';
    Object.assign(modal.style, {
        position: 'fixed', top: '0', left: '0', width: '100vw', height: '100vh',
        backgroundColor: 'rgba(0,0,0,0.85)', zIndex: '99999',
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'
    });

    const modalContent = document.createElement('div');
    Object.assign(modalContent.style, {
        width: '95%', height: '90%', maxWidth: '1200px', backgroundColor: '#fff',
        borderRadius: '8px', display: 'flex', flexDirection: 'column',
        overflow: 'hidden', boxShadow: '0 10px 25px rgba(0,0,0,0.5)'
    });

    const header = document.createElement('div');
    Object.assign(header.style, {
        padding: '12px 20px', backgroundColor: '#f1f3f5', borderBottom: '1px solid #ddd',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center'
    });

    const titleContainer = document.createElement('div');
    
    const titleEl = document.createElement('strong');
    titleEl.innerHTML = titulo;
    titleEl.style.fontSize = '16px';
    
    const linkExterno = document.createElement('a');
    linkExterno.href = url;
    linkExterno.target = '_blank';
    linkExterno.innerHTML = '🔗 Abrir en pestaña nueva';
    Object.assign(linkExterno.style, {
        textDecoration: 'none', color: '#004aad', fontWeight: 'bold', fontSize: '13px', marginLeft: '15px'
    });

    titleContainer.appendChild(titleEl);
    titleContainer.appendChild(linkExterno);

    const closeBtn = document.createElement('button');
    closeBtn.innerHTML = '✖';
    Object.assign(closeBtn.style, {
        background: 'none', border: 'none', fontSize: '20px', cursor: 'pointer', color: '#333', fontWeight: 'bold'
    });
    closeBtn.onclick = () => document.body.removeChild(modal);

    const iframe = document.createElement('iframe');
    iframe.src = url;
    Object.assign(iframe.style, {
        width: '100%', height: '100%', border: 'none', flexGrow: '1'
    });

    header.appendChild(titleContainer);
    header.appendChild(closeBtn);
    modalContent.appendChild(header);
    modalContent.appendChild(iframe);
    modal.appendChild(modalContent);
    document.body.appendChild(modal);
}

// Inicializar la carga de datos
loadGeoJsonData();
