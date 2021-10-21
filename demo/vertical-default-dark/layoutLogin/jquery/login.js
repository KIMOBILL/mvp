function Limpiar() {
    document.getElementById("txtNom").value = "";
    document.getElementById("txtDir").value = "";
    document.getElementById("txtMail").value = "";
    document.getElementById("txtWeb").value = "";
    document.getElementById("txtUser").value = "";
    document.getElementById("txtPass1").value = "";
    document.getElementById("txtPass2").value = "";
}

function Verificar() {
    var nombre1 = (document.getElementById("txtNom").value).trim();
    var direccion = (document.getElementById("txtDir").value).trim();
    var email = (document.getElementById("txtMail").value).trim();
    var web = (document.getElementById("txtWeb").value).trim();
    var usuario = (document.getElementById("txtUser").value).trim();
    var pass1 = (document.getElementById("txtPass1").value).trim();
    var pass2 = (document.getElementById("txtPass2").value).trim();
    if (nombre1 == '') {
        swal("ADVERTENCIA...!", "Por Favor Ingrese el Primer Nombre...", "info");
        document.getElementById("txtNom").focus();
    } else {
        if (direccion == '') {
            swal("ADVERTENCIA...!", "Por Favor Ingrese el PDirección Domiciliaria...", "info");
            document.getElementById("txtDir").focus();
        } else {
            if (email == '') {
                swal("ADVERTENCIA...!", "Por Favor Ingrese El Mail...", "info");
                document.getElementById("txtMail").focus();
            } else {
                var resemail = validarEmail(email);
                if (resemail === true) {
                    if (web == '') {
                        swal("ADVERTENCIA...!", "Por Favor Ingrese la Web Institucional...", "info");
                        document.getElementById("txtWeb").focus();
                    } else {
                        var resurl=isValidURL(web);
                        if(resurl===true){
                            if (usuario == '') {
                            swal("ADVERTENCIA...!", "Por Favor Ingrese el Usuario o Nick...", "info");
                            document.getElementById("txtUser1").focus();
                        } else {
                            if (pass1 == '') {
                                swal("ADVERTENCIA...!", "Por Favor Ingrese el Passwords...", "info");
                                document.getElementById("txtPass1").focus();
                            } else {
                                if (pass2 == '') {
                                    swal("ADVERTENCIA...!", "Por Favor Realice la Confirmacion del Password...", "info");
                                    document.getElementById("txtPass2").focus();
                                } else {
                                    var veri = validarclave(pass1);
                                    if (veri === true) {
                                        if (pass1 == pass2) {
                                            Guardar();
                                        } else {
                                            swal("ADVERTENCIA...!", "La Confirmación del Password es Incorrecta...", "info");
                                            document.getElementById("txtPass2").value = "";
                                            document.getElementById("txtPass2").focus();
                                        }
                                    } else {
                                        swal("ADVERTENCIA...!", "la Clave Ingresada no es Segura,\n debe tener un largo minimo de 8 Caracteres \n entre Mayusculas,minusculas,Numericos y Especiales \n Eje.: Pepito@123", "info");
                                        document.getElementById("txtPass1").value = "";
                                        document.getElementById("txtPass2").value = "";
                                        document.getElementById("txtPass1").focus();
                                    }

                                }
                            }
                        }
                        }else{
                            swal("ADVERTENCIA...!", "la URL del Sitio Web ingresado no es una Valida ...", "info");
                            document.getElementById("txtWeb").value = "";
                            document.getElementById("txtWeb").focus();
                        }
                        
                    }
                } else {
                    swal("ADVERTENCIA...!", "Por Favor Ingrese un Email Valido...", "info");
                    document.getElementById("txtMail").value = "";
                    document.getElementById("txtMail").focus();
                }

            }
        }
    }
}



function Ingresar() {
    var usuario = document.getElementById("txtUser1").value;
    var passwords = document.getElementById("txtPass").value;
    var parametros = {"Login": true, "Usuario": usuario, "Pass": passwords};
    $.ajax({
        data: parametros, url: "ajax/login.php", type: "POST",
        success: function (response) {
            if (response === 1 || response === "1") {
                window.location.replace("panel.php");
            } else {
                swal("ERROR...!", "El Usuario o la Contraseña son Incorrectos...", "warning");
                document.getElementById("txtUser").focus();
            }
        }
    });


}

function Guardar() {
    var nombre = (document.getElementById("txtNom").value).trim();
    var direccion = (document.getElementById("txtDir").value).trim();
    var web = (document.getElementById("txtWeb").value).trim();
    var email = (document.getElementById("txtMail").value).trim();
    var usuario = (document.getElementById("txtUser").value).trim();
    var pass1 = (document.getElementById("txtPass1").value).trim();
    var parametros = {
        "Enviar": true,
        "Nombre": nombre,
        "Direccion": direccion,
        "Email": email,
        "Web": web,
        "Nick": usuario,
        "Pass": pass1};
    $.ajax({
        data: parametros, url: "ajax/Empresas.php", type: "POST",
        success: function (response) {
            if (response == 1) {
                $('#staticBackdrop').modal('toggle');
                swal("CORRECTO...!", "El Registro Fue Creado sin Problemas.. ", "success");
                Buscar();
            } else {
                if (response == 2) {
                    swal("ADVERTENCIA...!", "Ya Existe otra Empresa con el mismo Nombre.. ", "warning");
                    document.getElementById("txtNom").value = "";
                    document.getElementById("txtNom").focus();
                } else {
                    if (response == 3) {
                        swal("ADVERTENCIA...!", "Ya Existe una Empresa con el mismo Usuario.. ", "warning");
                        document.getElementById("txtUser").value = "";
                        document.getElementById("txtUser").focus();
                    } else {
                        swal("ERROR...!", "No se pudo Concluir el Proceso Intentelo Mas Tarde", "warning");
                    }
                }
            }
        }
    });
}



function valKey(e) {
    if (e.which === 13) {
        Ingresar();
    }
}

function validarEmail(valor) {
    var re=/^([\da-z_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/;
	if(!re.exec(valor)){
            return false;
	}else{ 
            return true;
	}
   
}

function isValidURL(url){
    var RegExp = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/;

    if(RegExp.test(url)){
        return true;
    }else{
        return false;
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








function abrirmodal() {
    Limpiar();
    $('#staticBackdrop').modal('show');
}
function salirmodal() {
    Limpiar();
    $('#staticBackdrop').modal('toggle');
}

function usuario(obj) {
    var strLength = obj.value.length;
    var img = document.getElementById("imagenlogin");
    if (strLength <= 17) {
        img.setAttribute("src", "layout/imglogin/" + strLength + ".png");
    } else {
        img.setAttribute("src", "layout/imglogin/17.png");
    }



}
function password() {
    var img = document.getElementById("imagenlogin");
    img.setAttribute("src", "layout/imglogin/pass.png");
}