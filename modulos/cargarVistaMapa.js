import { crearPopUp } from "./crearPopUp.js";

//https://leafletjs.com/examples/quick-start/
/**
 * Función que carga el mapa y sus chinchetas a partir de un array de datos.
 */
export function cargarVistaMapa(datos) {
  var map = L.map("map").setView([41.70, -4.8], 8);
  
  //Añadir el mapa
  L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
    attribution:
      '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  }).addTo(map);

  //Agregar puntos al mapa
  datos.forEach((punto) => {
    if (punto.geometry != undefined) {
      L.marker([punto.geometry.coordinates[1], punto.geometry.coordinates[0]], {
        title: punto.fields.nombre_comercial,
        draggable: false,
        riseOnHover: true,
      })
        .bindPopup(crearPopUp(punto))
        .addTo(map);
    }
  });
}


