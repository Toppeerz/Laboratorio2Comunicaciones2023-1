/**
 * Autores: Braian Marin Puerta
 *          Juan Pablo Alviz Velasquez
 *          Juan David Ortega Casas
 */

/**
 * Este método ejecuta la opción que
 * el usuario haya seleccionado.
 */
function ejecutarPeticion(){

    let cadena = document.getElementById("textoIngresado").value;
    
    if(!validarHexadecimal(cadena)){
        alert("El texto ingresado no es hexadecimal");
    } else{
        let numH = cortarCandena(cadena);
        let opciones = document.getElementsByName("opcionR");
        let opcionSeleccionada;
        let respuesta = "";

        /**
         * Busca que entre la lista de opciones de los radio buttons
         * que opción seleccionó el usuario.
         */
        opciones.forEach(element => {
            if(element.checked){
                opcionSeleccionada = element.value;
            }
        });
    
        switch(opcionSeleccionada){
            //Opcion 1 convertir a decimal
            case 'opcion1':
                respuesta = "0x"+ numH+ " => " + hexadecimalADecimal(numH);
                break;
            //Opcion 2 convertir...
            case 'opcion2':
                respuesta = "0x"+ numH+ " => " + numH;
                break;
            //Opcion 3 convertir a direccion IP
            case 'opcion3':
                respuesta = numH + " => " + hexadecimalAIP(numH);
                break;
            //Opcion 4 convertir a binario
            case 'opcion4':
                let binario = hexadecimalABinario(numH);
                if(binario === ''){
                    respuesta = "";
                }else{
                    respuesta = "0x"+ numH+ " => " + binario;
                }
                break;
            
                default:
                    alert("No se ha seleccionado ninguna opción de conversión");
                    break;
        }
        
        document.getElementById("textoRespuesta").value = respuesta;
    }
}

function cortarCandena(cadena){
    let valorPosInicial = document.getElementById("posicionIngresada").value;
    let valorCantidad = document.getElementById("cantidadIngresada").value;

    //Si no se ingresa posicion incial ni cantidad se toma toda la cadena
    if(valorPosInicial === '' && valorCantidad === ''){
        return cadena;
    }

    //Validamos que solo se hayan ingresado números enteros positivos
    let patron = /^[0-9]+$/;
    if(!patron.test(valorPosInicial) || !patron.test(valorCantidad)){
        alert("Posicion inicial y cantidad solo pueden ser enteros positivos.");
        return null;
    }

    let posInicial = parseInt(valorPosInicial, 10);
    let cantidad = parseInt(valorCantidad, 10);

    if(posInicial > cadena.length){
        alert("La posición inicial supera el tamaño de la cadena.");
        return null;
    }

    if((posInicial+(cantidad*2)) > cadena.length){
        alert("La cantidad de bytes que se quiere tomar" 
        + " a partir de la posición" + posInicial + "\nsupera el tamaño" 
        + " de la cadena.");
        return null;
    }

    if(cantidad === 0){
        alert("No se pueden tomar 0 bytes.");
        return null;
    }

    return cadena.substr((posInicial*2), (cantidad*2));
}

/**
 * Este método valida que la cadena
 * ingresada cumpla con el patron de un número
 * hexadecimal.
 */
function validarHexadecimal(texto){
    let patron = /^[0-9a-fA-F\s]+$/;
    
    return patron.test(texto);
}

/**
 * Este método convierte un número
 * hexadecimal a un número decimal o de base diez.
 */
function hexadecimalADecimal(numH){
    numH = numH.replace(/[^0-9a-f-A-F]/gi, '');

    return Number.parseInt(numH, 16);
}

/**
 * Este método convierte un número
 * hexadecimal a una dirección IP.
 */
function hexadecimalAIP(numH){
    //Eliminamos los espacio en blanco
    numH = numH.replace(/[^0-9a-f-A-F]/gi, '');
    //Validamos que la longitud ingresada sea de 8 caracteres o 4 bytes
    if(numH.length != 8){
        alert("Para convertir a IP la cantidad de bytes debe ser 4");
        return '';
    }
    //Construimos la direccion IP
    let ip = '';
    //i <= 4 porque son 4 bytes que componene la IP
    for(var i = 0; i < 4; i++){
        /**
         * Partimos la cadena en cada byte para agregar un punto
         * y a la última posición no se coloca.
         */
        if(i == 3){
            ip += hexadecimalADecimal(numH.substr(i,2));
        }else{
            ip += hexadecimalADecimal(numH.substr(i,2)) + '.';
        }
    }
    return ip;
}

/**
 * Este método convierte un número
 * hexadecimal a un número binario o base dos.
 */
function hexadecimalABinario(numH){
    let decimal = hexadecimalADecimal(numH);
    let binario = decimal.toString(2);
    let binarioAux = '';
    let cont = 0;
    for(var i = 0; i < binario.length; i++){
        cont++;
        if(cont == 8){
            binarioAux += binario.charAt(i) + " ";
            cont = 0;
        }else{
            binarioAux += binario.charAt(i);
        }
    }
    binarioAux.trimEnd();
    return binarioAux;
}

 /**
  * Este método limpia todos los campos.
  */
 function limpiarCampos(){
    let opciones = document.getElementsByName("opcionR");
    opciones.forEach(element => {
        if(element.checked){
            element.checked = false;
        }
    });
    document.getElementById("textoIngresado").value = '';
    document.getElementById("textoRespuesta").value = '';
    document.getElementById("posicionIngresada").value = '';
    document.getElementById("cantidadIngresada").value = '';
}
