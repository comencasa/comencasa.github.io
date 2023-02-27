import { cargarProvincias } from "./cargarProvincias.js";
import { cargarLocalidades } from "./cargarLocalidades.js";
import { cargarTipoLogia } from "./cargarTipologias.js";
import { cargarVistaMapa } from "./cargarVistaMapa.js";
import { borrarMapa } from "./borrarMapa.js";
import { cargarVistaLista } from "./cargarVistaLista.js";
import { borrarSelect } from "./borrarSelect.js";
import { tipoCadena } from "./mensajesCadena.js";
import { envioCadena } from "./mensajesCadena.js";

let selectLocal = document.getElementById("localidad"); //Este es el unico que si lo hago con JQuery no funciona
let datos = [];
let datosAMostrar = [];
axios({
  metod: "get",
  url: "https://analisis.datosabiertos.jcyl.es/api/records/1.0/search/?dataset=hosteleria-a-domicilio&q=&rows=150&facet=provincia&facet=localidad",
  responseType: "json",
  //Cuando esté cargando la página, aparecerá un gif cargando
  onDownloadProgress: () => {
    $("#mensaje").html(
      "<h2>Buscando establecimientos</h2><br><img src='./imagenes/loading-gif.gif'>"
    );
  },
})
  .then((datosJSON) => {
    $("#mensaje").html(""); //Borramos el GIF de carga y rellenamos los datos
    datos = datosJSON.data.records;
    cargarProvincias(datos);
    cargarLocalidades(datos);
    cargarTipoLogia(datos);
    cargarVistaMapa(datos);
    $("#btn_mapa").toggle();
  })
  .catch(() => {
    //Si nos da fallo de CORS
    axios({
      metod: "get",
      url: "./php/errores.php?url=https://analisis.datosabiertos.jcyl.es/api/records/1.0/search/?dataset=hosteleria-a-domicilio&q=&rows=150&facet=provincia&facet=localidad",
      responseType: "json",
    }).then((datosJSON) => {
      cargando = false;
      datos = datosJSON.data.records;
      cargarProvincias(datos);
      cargarLocalidades(datos);
      cargarTipoLogia(datos);
      cargarVistaMapa(datos);
      $("#btn_mapa").toggle();
    }).catch((error)=>{
    //Si no cargan los datos ni a través de php...
     
    })
  });

/* *
 * Cuando se pulse sobre el botón de buscar, se imprimirán en el mapa aquellos
 * establecimientos que cumplan con las condiciones dadas por el usuario
 */
$("#buscar").click(function () {
  let provSel = $("#provincia").val();
  let localSel = $("#localidad").val();
  let tipoSel = $("#tipologia").val();
  let envioSel = $("#envio").val();
  let recogerSel = $("#recogida").val();
  let datosAMostrar = datos;

  if (provSel != "") {
    if (provSel === "León") {
      datosAMostrar = datosAMostrar.filter(
        (element) =>
          element.fields.provincia === provSel ||
          element.fields.provincia === "León+A129:P130"
      );
    } else {
      datosAMostrar = datosAMostrar.filter(
        (element) => element.fields.provincia === provSel
      );
    }
  }
  if (localSel != "") {
    datosAMostrar = datosAMostrar.filter(
      (element) => element.fields.localidad === localSel
    );
  }
  if (tipoSel != "") {
    datosAMostrar = datosAMostrar.filter(
      (element) => element.fields.tipologia === tipoSel
    );
  }
  if (envioSel != "") {
    datosAMostrar = datosAMostrar.filter(
      (element) => element.fields.envio.toLowerCase().startsWith(envioSel)
    );
  }
  if (recogerSel != "") {
    datosAMostrar = datosAMostrar.filter(
      (element) => element.fields.recoger.toLowerCase().startsWith(recogerSel)
    );
  }
  if (datosAMostrar.length < 1) {
   
    if ($("#btn_lista").is(":visible")) {
      document.getElementById("mensaje").innerHTML =
      "<h2>¡Ooohh! No hay establecimientos que coincidan con lo que buscas.<br>Puedes investigar el mapa o hacer otra búsqueda.</h2>";
      borrarMapa();
      cargarVistaMapa(datos);
    } else {
      document.getElementById("mensaje").innerHTML =
      "<h2>¡Ooohh! No hay establecimientos que coincidan con lo que buscas.<br>Prueba a buscar otra vez.</h2>";
      $("#row").empty();
      $("#mensaje").append("<br><img class='triste' src='./imagenes/triste.png'>");
    }
  } else {
    //Escribimos la cadena con los resultados de la busqueda
    let cadena = "<h2>Aquí tienes ";
    cadena += tipoCadena(tipoSel);

    if (localSel != "" && provSel === "") {
      cadena += "en " + localSel;
    }
    if (localSel != "" && provSel != "") {
      cadena += "en " + localSel + " (" + provSel + ")";
    }
    cadena += envioCadena(envioSel);
    cadena += "</h2>";
    $("#mensaje").html(cadena);
    //Actualizamos mapa
    //Si el boton de lista está visible, estamos viendo el mapa (cargamos el mapa)
    if ($("#btn_lista").is(":visible")) {
      borrarMapa();
      cargarVistaMapa(datosAMostrar);
    } else {
      //Cargamos la vista en formato lista
      borrarMapa();
      $("#row").empty();
      cargarVistaLista(datosAMostrar);
    }
  }
});

/*Cuando seleccione la provincia se cambia el select de las localidades
para que solo aparezcan las localidades de la provincia seleccionada*/
$("#provincia").change(function () {
  if ($("#provincia").val() === "") {
    borrarSelect(selectLocal);
    cargarLocalidades(datos);
  } else {
    let seleccionado = $("#provincia").val();
    datosAMostrar = datos.filter(
      (element) => element.fields.provincia === seleccionado
    );
    borrarSelect(selectLocal);
    cargarLocalidades(datosAMostrar);
  }
});
/*Evento para el boton de ver vista*/
$("#btn_lista").click(function () {
  $("#map").hide();
  $("#row").show();
  cargarVistaLista(datos);
  $("#btn_mapa").toggle();
  $("#btn_lista").toggle();
  $("#mensaje").text("");
});

/**
 * Evento para el boton de ver mapa
 */
$("#btn_mapa").click(function () {
  $("#map").show();
  $("#row").hide();
  $("#btn_mapa").toggle();
  $("#btn_lista").toggle();
  $("#mensaje").text("");
  borrarMapa();
  cargarVistaMapa(datos);
});
