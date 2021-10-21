function calificar(label) {
    var valor = $('input:radio[name='+label+']:checked').val();
        var div = document.getElementById("div"+label);
    if (valor >= 0 && valor <= 10) {
        div.style.display = "block";
    } else {
        div.style.display = "none";
    }
    
}

function calificar2(label) {
    var valor=document.getElementById(label).value;
    var div = document.getElementById("div"+label);
    if (valor =="null") {
        div.style.display = "none";
    } else {
        div.style.display = "block";
    }
    
}


//Se utiliza para que el campo de texto solo acepte letras
function ValidarLetras(e) {
    console.log(e);
    key = e.keyCode || e.which;
    tecla = String.fromCharCode(key).toString();
    letras = "abcdefghijklmñnopqrstuvwxyz ABCDEFGHIJKLMÑNOPQRSTUVWXYZ";//Se define todo el abecedario que se quiere que se muestre.
    especiales = [8, 6, 13, 164, 165]; //Es la validación del KeyCodes, que teclas recibe el campo de texto.

    tecla_especial = false;
    for (var i in especiales) {
        if (key === especiales[i]) {
            tecla_especial = true;
            break;
        }
    }
    if (letras.indexOf(tecla) === -1 && !tecla_especial) {
        return false;
    }
}
function ValidarLN(e) {
    console.log(e);
    key = e.keyCode || e.which;
    tecla = String.fromCharCode(key).toString();
    letras = "abcdefghijklmñnopqrstuvwxyz ABCDEFGHIJKLMÑNOPQRSTUVWXYZ1234567890-";//Se define todo el abecedario que se quiere que se muestre.
    especiales = [8, 6, 13, 164, 165]; //Es la validación del KeyCodes, que teclas recibe el campo de texto.

    tecla_especial = false;
    for (var i in especiales) {
        if (key === especiales[i]) {
            tecla_especial = true;
            break;
        }
    }
    if (letras.indexOf(tecla) === -1 && !tecla_especial) {
        return false;
    }
}

function ValidarDecimal(e) {
    console.log(e);
    key = e.keyCode || e.which;
    tecla = String.fromCharCode(key).toString();
    letras = "1234567890.";//Se define todo el abecedario que se quiere que se muestre.
    especiales = [8, 6, 13]; //Es la validación del KeyCodes, que teclas recibe el campo de texto.

    tecla_especial = false;
    for (var i in especiales) {
        if (key === especiales[i]) {
            tecla_especial = true;
            break;
        }
    }
    if (letras.indexOf(tecla) === -1 && !tecla_especial) {
        return false;
    }
}



//Se utiliza para que el campo de texto solo acepte numeros
function ValidarNumeros(evt) {
    console.log(evt);
    if (window.event) {//asignamos el valor de la tecla a keynum
        keynum = evt.keyCode; //IE
    } else {
        keynum = evt.which; //FF
    }
    //comprobamos si se encuentra en el rango numérico y que teclas no recibirá.
    if ((keynum > 47 && keynum < 58) || keynum === 8 || keynum === 13 || keynum === 6) {
        return true;
    } else {
        return false;
    }
}

function ValidarCedula(dni) {
    var respuesta;
    var respuesta = 0;
    var cedula = dni;
    //Preguntamos si la cedula consta de 10 digitos
    if (cedula.length == 10) {
        //Obtenemos el digito de la region que sonlos dos primeros digitos
        var digito_region = cedula.substring(0, 2);
        //Pregunto si la region existe ecuador se divide en 24 regiones
        if ((digito_region >= 1 && digito_region <= 24) || digito_region == 30) {
            // Extraigo el ultimo digito
            var ultimo_digito = cedula.substring(9, 10);
            //Agrupo todos los pares y los sumo
            var pares = parseInt(cedula.substring(1, 2)) + parseInt(cedula.substring(3, 4)) + parseInt(cedula.substring(5, 6)) + parseInt(cedula.substring(7, 8));
            //Agrupo los impares, los multiplico por un factor de 2, si la resultante es > que 9 le restamos el 9 a la resultante
            var numero1 = cedula.substring(0, 1);
            var numero1 = (numero1 * 2);
            if (numero1 > 9) {
                var numero1 = (numero1 - 9);
            }
            var numero3 = cedula.substring(2, 3);
            if (numero3 > 5) {
                var respuesta = 0;
            } else {
                var numero3 = (numero3 * 2);
                if (numero3 > 9) {
                    var numero3 = (numero3 - 9);
                }
                var numero5 = cedula.substring(4, 5);
                var numero5 = (numero5 * 2);
                if (numero5 > 9) {
                    var numero5 = (numero5 - 9);
                }
                var numero7 = cedula.substring(6, 7);
                var numero7 = (numero7 * 2);
                if (numero7 > 9) {
                    var numero7 = (numero7 - 9);
                }
                var numero9 = cedula.substring(8, 9);
                var numero9 = (numero9 * 2);
                if (numero9 > 9) {
                    var numero9 = (numero9 - 9);
                }
                var impares = numero1 + numero3 + numero5 + numero7 + numero9;
                //Suma total
                var suma_total = (pares + impares);
                //extraemos el primero digito
                var primer_digito_suma = String(suma_total).substring(0, 1);
                //Obtenemos la decena inmediata
                var decena = (parseInt(primer_digito_suma) + 1) * 10;
                //Obtenemos la resta de la decena inmediata - la suma_total esto nos da el digito validador
                var digito_validador = decena - suma_total;
                //Si el digito validador es = a 10 toma el valor de 0
                if (digito_validador == 10)
                    var digito_validador = 0;
                //Validamos que el digito validador sea igual al de la cedula
                if (digito_validador == ultimo_digito) {
                    var respuesta = 1;
                }
            }
        }
    }
    return respuesta;
}


