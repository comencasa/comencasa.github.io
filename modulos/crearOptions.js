/**
 * Función que crea los options para un select.
 * Se le da el array de datos, el select donde tiene que crear
 * los options y el valor del primer option (el de --Seleccione ...--)
 */
export function crearOptions(array, select, primerOption) {
  console.log(array);
  let fragmento = document.createDocumentFragment();
  //Agregamos el primer option
  let option1 = document.createElement("option");
  option1.value = "";
  option1.textContent = primerOption;
  fragmento.append(option1);
//Agregamos el resto ede options
  array.forEach((element) => {
    let option = document.createElement("option");
    if(array.includes("Bar")){
      option.value = element.toLowerCase();
    }else{
      option.value = element;
    }
    option.textContent = element;
    fragmento.append(option);
  });
  select.append(fragmento);
}
