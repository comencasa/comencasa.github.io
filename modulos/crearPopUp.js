export function crearPopUp(punto) {
  //Se imprime el titulo, el tipo de establecimiento, la descripcion y los tipos de envio y recogida
  let cadena =
    "<div><h2 id='titulo'>" +
    punto.fields.nombre_comercial +
    " (" +
    punto.fields.tipologia +
    ")</h3><p>" +
    punto.fields.observaciones +
    "</p><p>Recoger: " +
    punto.fields.recoger +
    "<br>Envíos: " +
    punto.fields.envio +
    "</p>";
  //Si tiene pagina web la imprimimos
  if (punto.fields.pagina_web != undefined) {
    cadena +=
      "<img src='./imagenes/red-mundial.png'> <a href='" +
      punto.fields.pagina_web +
      "'>" +
      punto.fields.pagina_web;
  }
  //Si tiene email lo imprimimos
  if (punto.fields.correo_electronico != undefined) {
    cadena +=
      "</a><br><img src='./imagenes/email.png'><a href='mailto:" +
      punto.fields.correo_electronico +
      "'> " +
      punto.fields.correo_electronico;
  }
  //Si tiene telefono lo imprimimos
  if (punto.fields.telefono != undefined) {
    cadena +=
      "</a><br><img src='./imagenes/telefono.png'> " + punto.fields.telefono;
  }
  //Imprimimos la direccion
  cadena +=
    "<br><img src='./imagenes/direccion.png'> " +
    punto.fields.direccion +
    ", " +
    punto.fields.localidad +
    " (" +
    punto.fields.provincia +
    ")</div>";

  return cadena;
}
