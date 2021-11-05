function init() { /* función inicial */

}

function usuario(obj) {
    var strLength = obj.value.length;
    var img = document.getElementById("imagenlogin");
    if (strLength <= 17) {
        img.setAttribute("src", "../templates/images/login/" + strLength + ".png");
    } else {
        img.setAttribute("src", "../templates/images/login/17.png");
    }
}

function password() {
    var img = document.getElementById("imagenlogin");
    img.setAttribute("src", "../templates/images/login/pass.png");
}

function valKey(e) {
    if (e.which === 13) {
        Ingresar();
    }
}

function validarclave(clave) {
    if (clave.length >= 8)
    {
        var mayuscula = false;
        var minuscula = false;
        var numero = false;
        var caracter_raro = false;

        for (var i = 0; i < clave.length; i++)
        {
            if (clave.charCodeAt(i) >= 65 && clave.charCodeAt(i) <= 90)
            {
                mayuscula = true;
            } else if (clave.charCodeAt(i) >= 97 && clave.charCodeAt(i) <= 122)
            {
                minuscula = true;
            } else if (clave.charCodeAt(i) >= 48 && clave.charCodeAt(i) <= 57)
            {
                numero = true;
            } else
            {
                caracter_raro = true;
            }
        }
        if (mayuscula == true && minuscula == true && caracter_raro == true && numero == true)
        {
            return true;
        }
    }
    return false;
}