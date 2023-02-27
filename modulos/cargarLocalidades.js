import {crearOptions} from "./crearOptions.js";


/**
 *Función que carga todas las localidades en el select con id=localidad
 */
 export function cargarLocalidades(datos) {
    let localidades = new Set();
    $.each(datos, function(index, localidad) {
      localidades.add(localidad.fields.localidad);
    });
    localidades = [...localidades].sort(Intl.Collator().compare);
    crearOptions(localidades, $('#localidad'), '--Selecciona una localidad--');
  }