import {crearOptions} from "./crearOptions.js";

/**
 *Función que carga todas las provincias en el select con id=provincia
 */
 export function cargarProvincias(datos) {
    let provincias = new Set();
  $.each(datos, function(index, provincia) {
    if (provincia.fields.provincia != "León+A129:P130") {
      provincias.add(provincia.fields.provincia);
    }
  });
  provincias = [...provincias].sort(Intl.Collator().compare);
  crearOptions(provincias, $('#provincia'), '--Seleccione una provincia--');
  }