/**
 * Función que elimina el mapa actual
 */
export function borrarMapa() {
  //Borramos el mapa
  $("#map").remove();
  //volvemos a crear el div del mapa en el index
  $("#main").append('<div id="map" class="container"></div>');
}
