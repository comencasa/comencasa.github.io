import { crearOptions } from "./crearOptions.js";

/**
 *Función que carga todas las tipologias de establecimientos en el select con id=tipologia
 */
export function cargarTipoLogia(datos) {
  let tipologias = new Set();
  $.each(datos, function (index, tipologia) {
    let tipologiaNombre = tipologia.fields.tipologia;
    let tipologiaMayuscula =
      tipologiaNombre.charAt(0).toUpperCase() + tipologiaNombre.slice(1);
    tipologias.add(tipologiaMayuscula);
  });
  tipologias = [...tipologias].sort(Intl.Collator().compare);
  crearOptions(tipologias, $("#tipologia"), "--Seleccione la tipologia--");
}
