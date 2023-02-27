export function tipoCadena(tipoSel) {
  switch (tipoSel) {
    case "bar":
      return "todos los bares ";
    case "cafetería":
      return "todas las cafeterías ";
    case "restaurante":
      return "todos los restaurantes ";
    case "salón de banquetes":
      return "todos los salones de banquetes ";
    default:
      return " tus resultados ";
  }
}

export function envioCadena(envioSel) {
  switch (envioSel) {
    case "si":
      return " con envío disponible";
    case "no":
      return " sin envío disponible";
    default:
      return "";
  }
}
