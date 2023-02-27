let lista = document.getElementById("row");

export function cargarVistaLista(datos) {
  if (!lista.hasChildNodes()) {
    let fragmento = document.createDocumentFragment();
    datos.forEach((element) => {
      let div = document.createElement("div");
      let parrafo = document.createElement("p");
      div.setAttribute("class", "card");
      //Creo el titulo de la tarjeta
      let titulo = div.cloneNode();
      if (element.fields.tipologia === "bar") {
        titulo.setAttribute("class", "bar");
        titulo.innerHTML =
          "<h3>" + element.fields.nombre_comercial + "</h3>";
      } else if (element.fields.tipologia === "restaurante") {
        titulo.setAttribute("class", "restaurante");
        titulo.innerHTML =
          "<h3>" +
          element.fields.nombre_comercial +
          "</h3>";
      } else if (element.fields.tipologia === "cafetería") {
        titulo.setAttribute("class", "cafeteria");
        titulo.innerHTML =
          "<h3>" + element.fields.nombre_comercial + "</h3>";
      } else if (element.fields.tipologia === "salón de banquetes") {
        titulo.setAttribute("class", "salon");
        titulo.innerHTML =
          "<h3>" + element.fields.nombre_comercial + "</h3>";
      }
      //Creo la descripcion de la tarjeta
      let descripcion = parrafo.cloneNode();
      descripcion.setAttribute("class","justificado");
      descripcion.textContent = element.fields.observaciones;
      //Creo el parrado de contacto 
      let contacto = parrafo.cloneNode();
      contacto.setAttribute("class","izquierda");
      if (element.fields.pagina_web != undefined) {
        contacto.innerHTML =
          "<img src='./imagenes/red-mundial.png' alt='Icono de internet'> <a href='" +
          element.fields.pagina_web +
          "'>" +
          element.fields.pagina_web;
      }
      if (element.fields.correo_electronico != undefined) {
        contacto.innerHTML +=
          "</a><br><img src='./imagenes/email.png' alt='Icono de email'><a href='mailto:" +
          element.fields.correo_electronico +
          "'> " +
          element.fields.correo_electronico;
      }
      if (element.fields.telefono != undefined) {
        contacto.innerHTML +=
          "</a><br><img src='./imagenes/telefono.png' alt='Icono de teléfono'> " +
          element.fields.telefono;
      }
      contacto.innerHTML +=
        "<br><img src='./imagenes/direccion.png' alt='Icono de dirección'> " +
        element.fields.direccion +
        ", " +
        element.fields.localidad +
        " (" +
        element.fields.provincia +
        ")";
        //Creo el parrafo con el envio
        let envio = parrafo.cloneNode();
      envio.setAttribute("class","envioParrafo");
      if(element.fields.recoger==="Sí"){
        envio.innerHTML = "<img class='recoger' src='./imagenes/take-away.PNG' alt='Se puede recoger' title='Se puede recoger'>"
      }else{
        envio.innerHTML = "<img class='noRecoger' src='./imagenes/take-away.PNG' alt='No se puede recoger' title='No se puede recoger'>"
      }
      if(element.fields.envio==="no"){
        envio.innerHTML+= "<img class='noEnvio' src='./imagenes/delivery.PNG' alt='Sin envío a domicilio' title='Sin envío a domicilio'>"
      }else{
        envio.innerHTML+= "<img class='envio' src='./imagenes/delivery.PNG' alt='Con envío a domicilio' title='Con envío a domicilio'>"

      }
      div.append(titulo, descripcion, contacto, envio);
      fragmento.append(div);
    });
    lista.append(fragmento);
  }
}
 