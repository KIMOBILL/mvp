function inicializar() {
    window.arrayInput = new Array();
    limpiarArray();
}
function limpiarArray() {
    var parametros = {
        "BorrarImg": true};
    $.ajax({
        data: parametros, url: "ajax/DeleteDocument.php", type: "POST",
        success: function (response) {
            console.log(response);
        }
    });
}

function abrirOffCanvas() {
    $('#offcanvasExample').show();
}
function abrirmodal() {
    if (window.op) {
        window.op = 0;
    }

    Limpiar();
    $('#offcanvasExample').hide();
    $('#staticBackdrop').modal('show');
}
function Limpiar() {
    $("#estructura").html("");
    $("#divButton").html("");
}
function Imagen() {
    abrirmodal();
    const num = ContDiv();
    var estructura = '<div class="container"><div class="row">'
            + '<form method="post" action="#" enctype="multipart/form-data">'
            + '<label for="txtImagen' + num + '" class="col-5 form-label"><b>Seleccione la Imagen</b></label>'
            + '<input type="file" class="col-7 form-control-file" accept="image/png,image/jpeg" name="txtImagen' + num + '" id="txtImagen' + num + '" title="Seleccionar Imagen">'
            + '</form>'
            + '</div>';
    document.getElementById('staticBackdropLabel').innerHTML = "IMAGEN O LOGO";
    $("#estructura").html(estructura);
    $("#divButton").html("<button  type='button' class='btn btn-outline-success' onclick='AddImagen(" + '"txtImagen' + num + '"' + ");' >AGREGAR</button>");
    document.getElementById("txtImagen").focus();
}


function AddImagen(txtfile) {
    var formData = new FormData();
    var files = $('#' + txtfile)[0].files[0];
    formData.append('file', files);
    $.ajax({
        url: 'ajax/upload.php',
        type: 'post',
        data: formData,
        contentType: false,
        processData: false,
        success: function (response) {
            if (response === "" || response === "NULL") {
                alert('Formato de imagen incorrecto.');
            } else {
                AddImagen2(response);
            }

        }
    });
    return false;
}

function AddImagen2(imagen) {
    const num = ContDiv();
    var Nombre = NewDiv("div");
    var pregunta = '<div class="container" id="' + Nombre + '">' +
            '<div class="row">' +
            '<div class="col-2"></div>' +
            '<div class="col-8 text-center" ><br>' +
            '<img name="img' + num + '" id="img' + num + '" src="temp/' + imagen + '" width="200" height="50">' +
            '<br></div>' +
            '<div class="col-2">' +
            '<div id="divclose" class="text-end" style="word-wrap: break-word;">' +
            '<button onclick="Remover2(' + "'" + Nombre + "','" + imagen + "'" + ');" class="btn btn-outline-danger">Delete</button>' +
            '</div>' +
            '</div>' +
            '</div><br>' +
            '</div>';
    var dataAnterior = $("#objetos").html();
    var dataAnterior = dataAnterior + pregunta;
    $("#objetos").html(dataAnterior);
    $('#staticBackdrop').modal('hide');
}

function Remover2(name, imagen) {
    var parametros = {
        "ElImagen": true,
        "Imagen": imagen};
    $.ajax({
        data: parametros, url: "ajax/DeleteDocument.php", type: "POST",
        success: function (response) {
            if (response === "true") {
                $("#" + name).remove();
            }

        }
    });
}

function Color() {
    abrirmodal();
    var estructura = '<div class="container"><div class="row">'
            + '<label for="txtColor" class="col-5 form-label"><b>Color de fondo</b></label>'
            + '<input type="color" class="col-7 form-control form-control-color" id="txtColor" value="#ffffff" title="Color de Fondo">'
            + '</div>';
    document.getElementById('staticBackdropLabel').innerHTML = "COLOR DE FONDO";
    $("#estructura").html(estructura);
    $("#divButton").html("<button  type='button' class='btn btn-outline-success' onclick='AddColor();' >AGREGAR</button>");
    document.getElementById("txtColor").focus();
}
function AddColor() {
    var ColorDiv = document.getElementById("txtColor").value;
    document.getElementById("objetos").style.backgroundColor = ColorDiv;
    $('#staticBackdrop').modal('hide');
}
function Letras() {
    abrirmodal();
    var estructura = '<div class="container"><div class="row">'
            + '<label for="txtColor" class="col-5 form-label"><b>Color de Fuente</b></label>'
            + '<input type="color" class="col-7 form-control form-control-color" id="txtColor" value="#000000" title="Color de Fondo">'
            + '</div>';
    document.getElementById('staticBackdropLabel').innerHTML = "COLOR DE FUENTE";
    $("#estructura").html(estructura);
    $("#divButton").html("<button  type='button' class='btn btn-outline-success' onclick='AddColorLetras();' >AGREGAR</button>");
    document.getElementById("txtColor").focus();
}

function AddColorLetras() {
    var ColorLetras = document.getElementById("txtColor").value;
    document.getElementById("objetos").style.color = ColorLetras;
    $('#staticBackdrop').modal('hide');
}

function Titulo() {
    abrirmodal();
    var estructura = '<div class="container"><div class="row">'
            + '<label for="txtDescrip" class="form-label"><b>Ingrese la Descripción del Titulo</b></label>'
            + '<input type="text" class="form-control" id="txtDescrip" />'
            + '</div>';
    document.getElementById('staticBackdropLabel').innerHTML = "CREAR TITULOS";
    $("#estructura").html(estructura);
    $("#divButton").html("<button  type='button' class='btn btn-outline-success' onclick='AddTitle();' >AGREGAR</button>");
    document.getElementById("txtDescrip").focus();
}

function AddTitle() {
    var Nombre = NewDiv("div");
    var desc = (document.getElementById("txtDescrip").value).trim();
    if (desc == "") {
        swal("ERROR...!", "Por Favor Ingrese el Titulo que Desea Insertar...", "warning");
    } else {
        var pregunta = '<div class="container" id="' + Nombre + '"><br>' +
                '<div class="row">' +
                '<div class="col-2"></div>' +
                '<div class="col-8 text-center" style="word-wrap: break-word;"><br>' +
                '<h2><b><label>' + desc + '</label></b></h2>' +
                '<br></div>' +
                '<div class="col-2">' +
                '<div id="divclose" class="text-end" style="word-wrap: break-word;">' +
                '<button onclick="Remover(' + "'" + Nombre + "'" + ')" class="btn btn-outline-danger">Delete</button>' +
                '</div>' +
                '</div>' +
                '</div>' +
                '</div>';
        var dataAnterior = $("#objetos").html();
        var dataAnterior = dataAnterior + pregunta;
        $("#objetos").html(dataAnterior);
        $('#staticBackdrop').modal('hide');
    }
}

function SubTitulo() {
    abrirmodal();
    var estructura = '<div class="container"><div class="row">'
            + '<label for="txtDescrip" class="form-label"><b>Ingrese la Descripcion del SubTitulo</b></label>'
            + '<input type="text" class="form-control" id="txtDescrip"/>'
            + '</div>';
    document.getElementById('staticBackdropLabel').innerHTML = "CREAR SUBTITULOS";
    $("#estructura").html(estructura);
    $("#divButton").html("<button  type='button' class='btn btn-outline-success' onclick='AddSubTitle();' >AGREGAR</button>");
    document.getElementById("txtDescrip").focus();
}

function AddSubTitle() {
    var Nombre = NewDiv("div");
    var desc = (document.getElementById("txtDescrip").value).trim();
    if (desc == "") {
        swal("ERROR...!", "Por Favor Ingrese el Sub Titulo que Desea Insertar...", "warning");
    } else {
        var pregunta = '<div class="container" id="' + Nombre + '"><br>' +
                '<div class="row">' +
                '<div class="col-2"></div>' +
                '<div class="col-8 text-start" style="word-wrap: break-word;">' +
                '<h4><b><label>' + desc +
                '</label></b></h4>' +
                '<br></div>' +
                '<div class="col-2">' +
                '<div id="divclose" class="text-end" style="word-wrap: break-word;">' +
                '<button onclick="Remover(' + "'" + Nombre + "'" + ')" class="btn btn-outline-danger">Delete</button>' +
                '</div>' +
                '</div>' +
                '</div>' +
                '</div>';
        var dataAnterior = $("#objetos").html();
        var dataAnterior = dataAnterior + pregunta;
        $("#objetos").html(dataAnterior);
        $('#staticBackdrop').modal('hide');
    }
}

function Description() {
    abrirmodal();
    var estructura = '<div class="container"><div class="row">'
            + '<label for="txtDescrip" class="form-label"><b>Ingrese el Texto que desa para la Descripción</b></label>'
            + '<br>'
            + '<textarea class="form-control" id="txtDescrip" rows="10" cols="100"></textarea>'
            + '</div>';
    document.getElementById('staticBackdropLabel').innerHTML = "TEXTO INFORMATIVO";
    $("#estructura").html(estructura);
    $("#divButton").html("<button  type='button' class='btn btn-outline-success' onclick='AddDes();' >AGREGAR</button>");
    document.getElementById("txtDescrip").focus();
}

function AddDes() {
    var Nombre = NewDiv("div");
    console.log("el nombre sera: " + Nombre);
    var desc = (document.getElementById("txtDescrip").value).trim();
    if (desc == "") {
        swal("ERROR...!", "Por Favor Ingrese una Descripcion para poder Insertar...", "warning");
    } else {
        var pregunta = '<div class="container" id="' + Nombre + '">' +
                '<div class="row">' +
                '<div class="col-2"></div>' +
                '<div class="col-8 text-start border border-dark rounded-3" style="word-wrap: break-word;"><br><p>' + desc + '</p><br><br></div>' +
                '<div class="col-2">' +
                '<div id="divclose" class="text-end" style="word-wrap: break-word;">' +
                '<button onclick="Remover(' + "'" + Nombre + "'" + ')" class="btn btn-outline-danger">Delete</button>' +
                '</div>' +
                '</div>' +
                '</div><br>' +
                '</div>';
        var dataAnterior = $("#objetos").html();
        var dataAnterior = dataAnterior + pregunta;
        $("#objetos").html(dataAnterior);
        $('#staticBackdrop').modal('hide');
    }
}



function Email() {
    abrirmodal();
    const num = ContDiv();
    const name = 'txtEmail' + num;
    var cont = window.arrayInput.length;
    var arrayAux = [];
    arrayAux["div"] = "div" + num;
    arrayAux["input"] = name;
    arrayAux["Nombre"] = "Correo Electronico";
    arrayAux["inputOption"] = '0';
    arrayAux["valOption"] = 'ValMail';
    arrayAux["tipo"] = "Informativo";
    arrayAux["estado"] = '0';
    window.arrayInput[cont] = arrayAux;
    var estructura = '<div class="container">'
            + '<div class="row">'
            + "<div><b><label>Objeto a Insertar :</label></b><br><br></div>"
            + '<br>'
            + '<br></div>'
            + "<div id='divPre'>"
            + '<label for="' + name + '" class="form-label"><b>Correo Electronico</b></label>'
            + "</div><br><div id='divRes'>"
            + "<input class='form-control' type='email' id='" + name + "' placeholder='name@example.com' pattern='^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$' title='insertar correos validos ejemplo: prueba@prueba.com' onKeyUp='this.value = this.value.toLowerCase();'/><br>"
            + "</div><br>"
            + '</div>'
            + '</div>';
    document.getElementById('staticBackdropLabel').innerHTML = "CORREO ELECTRONICO";
    $("#estructura").html(estructura);
    $("#divButton").html("<button  type='button' class='btn btn-outline-success' onclick='AddInput();' >AGREGAR</button>");
}

function Coment() {
    abrirmodal();
    const num = ContDiv();
    const name = 'txtComent' + num;
    var cont = window.arrayInput.length;
    var arrayAux = [];
    arrayAux["div"] = "div" + num;
    arrayAux["input"] = name;
    arrayAux["Nombre"] = "Ingrese un Comentario sobre Nuestros Servicios";
    arrayAux["inputOption"] = '0';
    arrayAux["valOption"] = 'ValText';
    arrayAux["tipo"] = "Informativo";
    arrayAux["estado"] = '0';
    window.arrayInput[cont] = arrayAux;
    var estructura = '<div class="container">'
            + '<div class="row">'
            + "<div><b><label>Objeto a Insertar :</label></b><br><br></div>"
            + "<div id='divPre'>"
            + '<label for="' + name + '" class="form-label"><b>Ingrese un Comentario sobre Nuestros Servicios</b></label>'
            + "</div><br><div id='divRes'>"
            + "<textarea class='form-control' type='text' id='" + name + "' name='" + name + "' placeholder='Comentario...' title='Ingresar Comentario'/></textarea><br>"
            + "</div><br>"
            + '</div>'
            + '</div>';
    document.getElementById('staticBackdropLabel').innerHTML = "COMENTARIOS";
    $("#estructura").html(estructura);
    $("#divButton").html("<button  type='button' class='btn btn-outline-success' onclick='AddInput();' >AGREGAR</button>");
}


function AddInput() {
    var Nombre = NewDiv("div");
    var pre = $("#divPre").html();
    var res = $("#divRes").html();
    if (pre == "" || res == "") {
        swal("ERROR...!", "Falta Ingresar la Descripción de la Pregunta...", "warning");
    } else {
        var cont = window.arrayInput.length;
        for (var i = 0; i < cont; i++) {
            if (window.arrayInput[i]["div"] === Nombre) {
                window.arrayInput[i]["tipo"] = "Informativo";
            }
        }
        var pregunta = '<div class="container" id="' + Nombre + '"><br>' +
                '<div class="row">' +
                '<div class="col-2"></div>' +
                '<div class="col-8 text-start " style="word-wrap: break-word;">' + pre + '</div>' +
                '<div class="col-2">' +
                '<div id="divclose" class="text-end">' +
                '<button onclick="Remover(' + "'" + Nombre + "'" + ')" class="btn btn-outline-danger">Delete</button>' +
                '</div>' +
                '</div>' +
                '</div>' +
                '<div class="row">' +
                '<div class="col-2"></div>' +
                '<div class="col-8 text-start border border-dark rounded-3" style="word-wrap: break-word;"><br>' + res + '</div>' +
                '<div class="col-2"></div>' +
                '</div><br>' +
                '</div>';
        var dataAnterior = $("#objetos").html();
        estadoObjetos(Nombre, 1);
        var dataAnterior = dataAnterior + pregunta;
        $("#objetos").html(dataAnterior);
        $('#staticBackdrop').modal('hide');
    }
}

function PreOptionOne() {
    abrirmodal();
    var estructura = '<div class="container">'
            + '<div class="row">'
            + '<label for="txtnombre" class="form-label"><b>Descripción de la Pregunta</b></label>'
            + "<input class='form-control' type='text' id='txtnombre' onKeyUp='lblPregunta();'/><br>"
            + '</div>'
            + '<div class="row">'
            + '<label for="txtnombre" class="form-label"><b>Descripción de las Respuestas</b></label>'
            + '<div class="col-10">'
            + "<input type='text' class='form-control' id='txtresp'/>"
            + '</div>'
            + '<div class="col-2">'
            + "<button type='button' class='btn btn-outline-primary' onclick='addResOptionRadio();'>+</button>"
            + '</div></div><br>'
            + "<div class='row'><b><label>Objeto a Insertar :</label></b></div><div><br></div>"
            + "<div class='row border border-dark rounded-3'><div><br></div><div id='divPre'></div><div><br></div><div id='divRes'></div><div><br></div></div>"
            + '</div>';
    document.getElementById('staticBackdropLabel').innerHTML = "PREGUNTAS CERRADAS";
    $("#estructura").html(estructura);
    $("#divButton").html("<button  type='button' class='btn btn-outline-success' onclick='AddPre();' >AGREGAR</button>");
    document.getElementById("txtnombre").focus();
}

function tipopregunta() {
    return $('input:radio[name=RadioClass]:checked').val();
}
function addResOptionRadio() {
    var dato1 = (document.getElementById("txtresp").value).trim();
    if (dato1 == "") {
        swal("ERROR...!", "Falta Ingresar la Descripción de la Respuesta...", "warning");
        document.getElementById("txtresp").value = "";
        document.getElementById("txtresp").focus();
    } else {
        if (window.op) {
            window.op++;
        } else {
            window.op = 1;
        }
        var ax = window.op;
        const num = ContDiv();
        const name = 'txtOption' + num;
        if (ax === 1) {
            var cont = window.arrayInput.length;
            var arrayAux = [];
            arrayAux["div"] = "div" + num;
            arrayAux["input"] = name;
            var dato = document.getElementById("txtnombre").value;
            arrayAux["Nombre"] = dato;
            arrayAux["inputOption"] = '1';
            arrayAux["valOption"] = '';
            arrayAux["tipo"] = "Informativo";
            arrayAux["estado"] = '0';
            window.arrayInput[cont] = arrayAux;
        }
        var objeto = '<div class="form-check"><input class="form-check-input" type="radio" value="' + dato1 + '" name="' + name + '" id="' + name + ax + '">' +
                '<label class="form-check-label" for="' + name + ax + '">' + dato1 + '</label></div>';
        var info = $("#divRes").html();
        info = info + objeto;
        $("#divRes").html(info);
        document.getElementById("txtresp").value = "";
        document.getElementById("txtresp").focus();
    }

}

function PreOptionMulti() {

    abrirmodal();
    var estructura = '<div class="container">'
            +'<div class="row">'
            + '<label for="txtnombre" class="form-label"><b>Descripción de la Pregunta</b></label>'
            + "<input class='form-control' type='text' id='txtnombre' onKeyUp='lblPregunta();'/>"
            + '</div>'
            + '<div><br></div>'
            + '<div class="row">'
            + '<label for="txtnombre" class="form-label"><b>Descripción de las Respuestas</b></label>'
            + '<div class="col-10">'
            + "<input type='text' class='form-control' id='txtresp'/>"
            + '</div>'
            + '<div class="col-2">'
            + "<button type='button' class='btn btn-outline-primary' onclick='addResCheck();'>+</button>"
            + '</div>'
            + '</div>'
            + '<div><br></div>'
            + "<div class='row'><b><label>Objeto a Insertar :</label></b></div>"
            + '<div><br></div>'
            + "<div class='row border border-dark rounded-3'>"
            + '<div><br></div>'
            + "<div id='divPre'></div>"
            + '<div><br></div>'
            +"<div id='divRes'></div>"            
            + '<div><br></div>'
            + '</div>'
    +'</div>';
    document.getElementById('staticBackdropLabel').innerHTML = "PREGUNTAS OPCION MULTIPLE";
    $("#estructura").html(estructura);
    $("#divButton").html("<button  type='button' class='btn btn-outline-success' onclick='AddPre();' >AGREGAR</button>");
    document.getElementById("txtnombre").focus();
}

function addResCheck() {
    var dato = (document.getElementById("txtresp").value).trim();
    if (dato==""){
        swal("ERROR...!", "Falta Ingresar la Descripción de la Respuesta...", "warning");
        document.getElementById("txtresp").value = "";
        document.getElementById("txtresp").focus();
    }else{
        if (window.op) {
        window.op++;
    } else {
        window.op = 1;
    }
    var ax = window.op;
    const num = ContDiv();
    const name = 'txtCheck' + num + ax;
    var cont = window.arrayInput.length;
    var arrayAux = [];
    arrayAux["div"] = "div" + num;
    arrayAux["input"] = name;
    var dato1 = document.getElementById("txtnombre").value;
    arrayAux["Nombre"] = dato1;
    arrayAux["inputOption"] = '3';
    arrayAux["valOption"] = '';
    arrayAux["tipo"] = "Informativo";
    arrayAux["estado"] = '0';
    window.arrayInput[cont] = arrayAux;
    
    var objeto = ' <div class="form-check">' +
            '<input class="form-check-input" type="checkbox" value="' + dato + '" name="' + name + '" id="' + name + '">' +
            '<label class="form-check-label" for="' + name + '">' +
            dato +
            '</label>' +
            '</div>';
    var info = $("#divRes").html();
    info = info + objeto;
    $("#divRes").html(info);
    document.getElementById("txtresp").value = "";
    document.getElementById("txtresp").focus();
    }
    
}




function PreOptionSelect() {
    abrirmodal();
    const num = ContDiv();
    const name = 'txtSelect' + num;
    var cont = window.arrayInput.length;
    var arrayAux = [];
    arrayAux["div"] = "div" + num;
    arrayAux["input"] = name;
    arrayAux["Nombre"] = "";
    arrayAux["inputOption"] = '2';
    arrayAux["valOption"] = 'ValSelect';
    arrayAux["tipo"] = "";
    arrayAux["estado"] = '0';
    window.arrayInput[cont] = arrayAux;
    var estructura = '<div class="container">'
            + '<div class="row">'
            + '<label for="txtnombre" class="form-label"><b>Descripción de la Pregunta</b></label>'
            + "<input class='form-control' type='text' id='txtnombre' onKeyUp='lblPregunta();'/>"
            + '</div>'
            + "<div><br></div>"
            +"<div><label>Atributo:</label></div>"
            +"<div>"+AtribCes()+"</div>"
            +"<div><br></div>"
            + '<div class="row">'            
            + '<div class="col-5">'
            + '<label for="txtresp" class="form-label"><b>Descripción </b></label>'
            + "<input type='text' class='form-control' id='txtresp' />"
            + '</div>'
            + '<div class="col-5">'
            + '<label for="txtrespv" class="form-label"><b>Valor</b></label>'
            + "<input type='text' class='form-control' id='txtrespv' />"
            + '</div>'
            + '<div class="col-2">'
            + "<br><button type='button' class='btn btn-outline-primary' onclick='addResSelect(" + '"' + name + '"' + ");'>+</button>"
            + '</div>'
            + '</div>'
            + "<div><br></div>"
            + "<div class='row'><b><label>Objeto a Insertar :</label></b></div>"
            + "<div><br></div>"
            + "<div class='row border border-dark rounded-3'>"
            + "<div><br></div>"
            + "<div id='divPre'></div>"
            + "<div><br></div>"
            + "<div id='divRes'>"
            + '<select id="' + name + '" class="form-select" aria-label="Default select example">'
            + '<option value="null" selected>Seleccione una Opción</option>'
            + '</select>'
            + "</div>"
            + "<div><br></div>"
            + '</div>'
    +'</div>';
    document.getElementById('staticBackdropLabel').innerHTML = "PREGUNTAS SELECTIVAS";
    $("#estructura").html(estructura);
    $("#divButton").html("<button  type='button' class='btn btn-outline-success' onclick='AddPre();' >AGREGAR</button>");
    document.getElementById("txtnombre").focus();
}

function addResSelect(nombre) {
    var dato = (document.getElementById("txtresp").value).trim();
    var valor = (document.getElementById("txtrespv").value).trim();
    if(dato=="" ){
        swal("ERROR...!", "Falta Ingresar la Descripción de la Respuesta...", "warning");
        document.getElementById("txtresp").value = "";
        document.getElementById("txtresp").focus();
    }else{
        if(valor == ""){
            swal("ERROR...!", "Falta Ingresar el valor de la Respuesta...", "warning");
            document.getElementById("txtrespv").value = "";
            document.getElementById("txtrespv").focus();
        }else{
            
        }
    const $select = document.querySelector("#" + nombre);
    const option = document.createElement('option');
    option.value = valor;
    option.text = dato;
    $select.appendChild(option);
    document.getElementById("txtresp").value = "";
    document.getElementById("txtrespv").value = "";
    document.getElementById("txtresp").focus();
    }
}


function AddPre() {
    var Nombre = NewDiv("div");
    var pre = $("#divPre").html();
    var res = $("#divRes").html();
    var cont = window.arrayInput.length;
    for (var i = 0; i < cont; i++) {
        if (window.arrayInput[i]["div"] === Nombre) {
            if (aux===0){
                aux=aux+1;
                window.arrayInput[i]["tipo"] = addatrib();
            }else{
                window.arrayInput[i]["tipo"] = "Respuesta";
            }
        }
    }
    if (pre == "" || res == "") {
        swal("ERROR...!", "Falta Ingresar la Descripción de la Pregunta o las Respuestas...", "warning");
    } else {
        var pregunta = '<div class="container" id="' + Nombre + '" >' +
                '<div class="row">' +
                '<div class="col-2"></div>' +
                '<div class="col-8 text-start" style="word-wrap: break-word;">' + pre + '<br></div>' +
                '<div class="col-2">' +
                '<div id="divclose" class="text-end">' +
                '<button onclick="Remover(' + "'" + Nombre + "'" + ')" class="btn btn-outline-danger">Delete</button>' +
                '</div>' +
                '</div>' +
                '</div>' +
                '<div class="row">' +
                '<div class="col-2"></div>' +
                '<div class="col-8 text-start border border-dark rounded-3" style="word-wrap: break-word;"><br>' + res + '<br></div>' +
                '<div class="col-2"></div>' +
                '</div>' +
                '<br>' +
                '</div>';
        var dataAnterior = $("#objetos").html();
        var dataAnterior = dataAnterior + pregunta;
        $("#objetos").html(dataAnterior);
        estadoObjetos(Nombre, 1);
        $("#divPre").html("");
        $("#divRes").html("");
        $('#staticBackdrop').modal('hide');
    }
}


function Pregunta() {
    const num = ContDiv();
    const name = 'txtInput' + num;
    var cont = window.arrayInput.length;
    var arrayAux = [];
    arrayAux["div"] = "div" + num;
    arrayAux["input"] = name;
    arrayAux["Nombre"] = "";
    arrayAux["inputOption"] = '0';
    arrayAux["valOption"] = 'ValText';
    arrayAux["tipo"] = 'Informativo';
    arrayAux["estado"] = '0';
    window.arrayInput[cont] = arrayAux;
    abrirmodal();
    var estructura = '<div class="container">'
            + '<div class="row">'
            + '<label for="txtnombre" class="form-label"><b>Descripcion de la Pregunta</b></label>'
            + "<input class='form-control' type='text' id='txtnombre' onKeyUp='lblPregunta();'/><br>"
            + '</div>'            
            +"<div><br></div>"
            + "<div class='row'><b><label>Objeto a Insertar :</label></b></div>"
            +"<div><br></div>"
            +"<div class='row border border-dark rounded-3'>"
            +"<div><br></div>"
            + "<div id='divPre' class='row'></div>"
            + '<div><br></div>'
            + "<div id='divRes' class='row'>"
            + "<input class='form-control' type='text' id='" + name + "' placeholder='Respuesta' title='Ingrese la Respuesta'/>"
            + "</div>"
            +"<div><br></div>"
            + '</div>'
            + '</div>';
    document.getElementById('staticBackdropLabel').innerHTML = "PREGUNTAS SIMPLES";
    $("#estructura").html(estructura);
    $("#divButton").html("<button  type='button' class='btn btn-outline-success' onclick='AddPre2();' >AGREGAR</button>");
    document.getElementById("txtnombre").focus();
}

function Estrellas() {
    const num = ContDiv();
    abrirmodal();
    const name = 'txtEstrellas' + num;
    var cont = window.arrayInput.length;
    var arrayAux = [];
    arrayAux["div"] = "div" + num;
    arrayAux["input"] = name;
    arrayAux["Nombre"] = "";
    arrayAux["inputOption"] = '1';
    arrayAux["valOption"] = '';
    arrayAux["tipo"] = "Informativo";
    arrayAux["estado"] = '0';
    window.arrayInput[cont] = arrayAux;
    var estructura = '<div class="container">'
            +'<div class="row">'
            + '<label for="txtnombre" class="form-label"><b>Pregunta</b></label>'
            + "<div><input class='form-control' type='text' id='txtnombre' onKeyUp='lblPregunta();'/></div>"
            + '</div>'
            + '<div><br></div>'
            + "<div><b><label>Objeto a Insertar :</label></b></div>"
            + '<div><br></div>'
            +"<div class='row border border-dark rounded-3'>"
            + '<div><br></div>'
            + "<div id='divPre'></div>"
            + '<div><br></div>'
            + "<div id='divRes' class='row'>"
            + '<div>'
            + "<label><b>CALIFICACION:</b></label>"            
            + '</div>'
            + '<p class="clasificacion">'
            + '<input id="' + name + '1" type="radio" name="' + name + '" value="5 ESTRELLA" style="display : none;">'
            + '<label for="' + name + '1" class="fas fa-star fa-2x" style="margin: 5px;"></label>'
            + '<input id="' + name + '2" type="radio" name="' + name + '" value="4 ESTRELLAS" style="display : none;">'
            + '<label for="' + name + '2" class="fas fa-star fa-2x" style="margin: 5px;"></label>'
            + '<input id="' + name + '3" type="radio" name="' + name + '" value="3 ESTRELLAS" style="display : none;">'
            + '<label for="' + name + '3" class="fas fa-star fa-2x" style="margin: 5px;"></label>'
            + '<input id="' + name + '4" type="radio" name="' + name + '" value="2 ESTRELLAS" style="display : none;">'
            + '<label for="' + name + '4" class="fas fa-star fa-2x" style="margin: 5px;" ></label>'
            + '<input id="' + name + '5" type="radio" name="' + name + '" value="1 ESTRELLAS" style="display : none;">'
            + '<label for="' + name + '5" class="fas fa-star fa-2x" style="margin: 5px;"></label>'
            + '</p>'
            + "</div>"    
            + '<div><br></div>'
            + '</div>'
            + '</div>';
    document.getElementById('staticBackdropLabel').innerHTML = "PREGUNTAS CON VALORACION 5 ESTRELLAS";
    $("#estructura").html(estructura);
    $("#divButton").html("<button  type='button' class='btn btn-outline-success' onclick='AddPre3();' >AGREGAR</button>");
    document.getElementById("txtnombre").focus();
}

function Caritas() {
    const num = ContDiv();
    abrirmodal();
    const name = 'txtFace' + num;
    var cont = window.arrayInput.length;
    var arrayAux = [];
    arrayAux["div"] = "div" + num;
    arrayAux["input"] = name;
    arrayAux["Nombre"] = "";
    arrayAux["inputOption"] = '1';
    arrayAux["valOption"] = '';
    arrayAux["tipo"] = "Informativo";
    arrayAux["estado"] = '0';
    window.arrayInput[cont] = arrayAux;
    var estructura = '<div class="container">'
            +'<div class="row">'
            + '<label for="txtnombre" class="form-label"><b>Pregunta</b></label>'
            + "<div><input class='form-control' type='text' id='txtnombre' onKeyUp='lblPregunta();'/></div>"
            + '</div>'
            + '<div><br></div>'
            + "<div><b><label>Objeto a Insertar :</label></b></div>"
            + '<div><br></div>'
            +"<div class='row border border-dark rounded-3'>"
            + '<div><br></div>'
            + "<div id='divPre'></div>"
            + '<div><br></div>'
            + "<div id='divRes' class='row'>"
            + "<label><b>CALIFICACION:</b></label>"
            + '<p class="clasificacion2">'
            + '<input id="' + name + '1" type="radio" name="' + name + '" value="ENFADADO" style="display : none;">'
            + '<label for="' + name + '1" class="far fa-angry fa-3x" style="margin: 10px;"></label>'
            + '<input id="' + name + '2" type="radio" name="' + name + '" value="MOLESTO" style="display : none;">'
            + '<label for="' + name + '2" class="far fa-frown-open fa-3x" style="margin: 10px;"></label>'
            + '<input id="' + name + '3" type="radio" name="' + name + '" value="NORMAL" style="display : none;">'
            + '<label for="' + name + '3" class="far fa-meh fa-3x" style="margin: 10px;"></label>'
            + '<input id="' + name + '4" type="radio" name="' + name + '" value="ALEGRE" style="display : none;">'
            + '<label for="' + name + '4" class="far fa-smile fa-3x" style="margin: 10px;"></label>'
            + '<input id="' + name + '5" type="radio" name="' + name + '" value="SATISFECHO" style="display : none;">'
            + '<label for="' + name + '5" class="far fa-grin-beam fa-3x" style="margin: 10px;"></label>'
            + '</p>'
            + "</div>"
            + '<div><br></div>'
            +'</div>'
            + '</div>';
    document.getElementById('staticBackdropLabel').innerHTML = "CARITAS";
    $("#estructura").html(estructura);
    $("#divButton").html("<button  type='button' class='btn btn-outline-success' onclick='AddPre3();' >AGREGAR</button>");
    document.getElementById("txtnombre").focus();
}

function Likes() {
    const num = ContDiv();
    abrirmodal();
    const name = 'txtlike' + num;
    var cont = window.arrayInput.length;
    var arrayAux = [];
    arrayAux["div"] = "div" + num;
    arrayAux["input"] = name;
    arrayAux["Nombre"] = "";
    arrayAux["inputOption"] = '1';
    arrayAux["valOption"] = '';
    arrayAux["tipo"] = "Informativo";
    arrayAux["estado"] = '0';
    window.arrayInput[cont] = arrayAux;
    var estructura = '<div class="container">'
            +'<div class="row">'
            + '<label for="txtnombre" class="form-label"><b>Pregunta</b></label>'
            + "<div><input class='form-control' type='text' id='txtnombre' onKeyUp='lblPregunta();'/></div>"
            + '</div>'
            + '<div><br></div>'
            + "<div><b><label>Objeto a Insertar :</label></b></div>"
            + '<div><br></div>'
            +"<div class='row border border-dark rounded-3'>"
            + '<div><br></div>'
            + "<div id='divPre'></div>"
            + '<div><br></div>'
            + "<div id='divRes' class='row'>"
            + '<div><br></div>'
            + "<label><b>CALIFICACION:</b></label>"
            + '<p class="clasificacion3">'
            + '<input id="' + name + '1" type="radio" name="' + name + '" value="SI" style="display : none;">'
            + '<label for="' + name + '1" class="fas fa-thumbs-up fa-3x" style="margin: 10px;"></label>'
            + '<input id="' + name + '2" type="radio" name="' + name + '" value="NO" style="display : none;">'
            + '<label for="' + name + '2" class="fas fa-thumbs-down fa-3x" style="margin: 10px;"></label>'
            + '</p>'
            + "</div>"
            + '<div><br></div>'
            + "</div>"
            + '</div>';
    document.getElementById('staticBackdropLabel').innerHTML = "PULGARES";
    $("#estructura").html(estructura);
    $("#divButton").html("<button  type='button' class='btn btn-outline-success' onclick='AddPre3();' >AGREGAR</button>");
    document.getElementById("txtnombre").focus();
}

function AddPre2() {
    var Nombre = NewDiv("div");
    var pre = $("#divPre").html();
    var res = $("#divRes").html();
    var cont = window.arrayInput.length;
    for (var i = 0; i < cont; i++) {
        if (window.arrayInput[i]["div"] === Nombre) {
            window.arrayInput[i]["tipo"] = "Informativo";
        }
    }
    if (pre == "" || res == "") {
        swal("ERROR...!", "Falta Ingresar la Descripción de la Pregunta o las Respuestas...", "warning");
    } else {
        var pregunta = '<div class="container" id="' + Nombre + '">' +
                '<div class="row">' +
                '<div class="col-2"></div>' +
                '<div class="col-8 text-start " style="word-wrap: break-word;">' + pre + '<br></div>' +
                '<div class="col-2">' +
                '<div id="divclose" class="text-end">' +
                '<button onclick="Remover(' + "'" + Nombre + "'" + ')" class="btn btn-outline-danger">Delete</button>' +
                '</div>' +
                '</div>' +
                '</div>' +
                '<div class="row">' +
                '<div class="col-2"></div>' +
                '<div class="col-8 text-start border border-dark rounded-3" style="word-wrap: break-word;"><br>' + res + '<br></div>' +
                '<div class="col-2"></div>' +
                '</div>' +
                '<br>' +
                '</div>';
        var dataAnterior = $("#objetos").html();
        var dataAnterior = dataAnterior + pregunta;
        $("#objetos").html(dataAnterior);
        estadoObjetos(Nombre, 1);
        $("#divPre").html("");
        $("#divRes").html("");
        $('#staticBackdrop').modal('hide');
    }
}

function AddPre3() {
    var Nombre = NewDiv("div");
    var pre = $("#divPre").html();
    var res = $("#divRes").html();
    var cont = window.arrayInput.length;
    for (var i = 0; i < cont; i++) {
        if (window.arrayInput[i]["div"] === Nombre) {
            window.arrayInput[i]["tipo"] = "Informativo";
        }
    }
    if (pre == "" || res == "") {
        swal("ERROR...!", "Falta Ingresar la Descripción de la Pregunta o las Respuestas...", "warning");
    } else {
        var pregunta = '<div class="container" id="' + Nombre + '">' +
                '<div class="row">' +
                '<div class="col-2"></div>' +
                '<div class="col-8 text-start " style="word-wrap: break-word;">' + pre + '<br></div>' +
                '<div class="col-2">' +
                '<div id="divclose" class="text-end">' +
                '<button onclick="Remover(' + "'" + Nombre + "'" + ')" class="btn btn-outline-danger">Delete</button>' +
                '</div>' +
                '</div>' +
                '</div>' +
                '<div class="row">' +
                '<div class="col-2"></div>' +
                '<div class="col-8 text-start border border-dark rounded-3" style="word-wrap: break-word;"><br>' + res + '<br></div>' +
                '<div class="col-2"></div>' +
                '</div>' +
                '<br>' +
                '</div>';
        var dataAnterior = $("#objetos").html();
        var dataAnterior = dataAnterior + pregunta;
        $("#objetos").html(dataAnterior);
        estadoObjetos(Nombre, 1);
        $("#divPre").html("");
        $("#divRes").html("");
        $('#staticBackdrop').modal('hide');
    }
}


function OptionRespuesta() {
    const num = ContDiv();
    abrirmodal();
    const name = 'txtOption' + num;
    var cont = window.arrayInput.length;
    var arrayAux = [];
    arrayAux["div"] = "div" + num;
    arrayAux["input"] = name;
    arrayAux["Nombre"] = "Respuesta";
    arrayAux["inputOption"] = '1';
    arrayAux["valOption"] = '';
    arrayAux["tipo"] = "Informativo";
    arrayAux["estado"] = '0';
    window.arrayInput[cont] = arrayAux;
    var cont = window.arrayInput.length;
    var arrayAux = [];
    arrayAux["div"] = "div" + num;
    arrayAux["input"] = "res" + name;
    arrayAux["Nombre"] = "Respuesta" + num;
    arrayAux["inputOption"] = '0';
    arrayAux["valOption"] = '';
    arrayAux["tipo"] = "Informativo";
    arrayAux["estado"] = '0';
    window.arrayInput[cont] = arrayAux;
    var estructura = '<div class="container">'
            + '<div class="row">'
            + '<div><label for="txtnombre" class="form-label"><b>Pregunta</b></label></div>'
            + "<div><input class='form-control' type='text' id='txtnombre' onKeyUp='lblPregunta();'/></div>"
            + '</div>'
            +"<div><br></div>"  
            +"<div><label>Atributo:</label></div>"
            +"<div>"+AtribGeneral()+"</div>"
            +"<div><br></div>"            
            + "<div class='row'><b><label>Objeto a Insertar :</label></b></div>"
            +"<div><br></div>"
            +"<div class='row border border-dark rounded-3'>"
            +"<div><br></div>"
            + "<div id='divPre'></div>"
            + "<div id='divRes' class='row'><div class='container'>"
            +"<div><br></div>"
            + "<div class='row'><b><label>CALIFICACION :</label></b></div>"
            +"<div><br></div>"
            + '<div class="row">'
            + '<div>'
            +'<div class="form-check form-check-inline">'
            + '<input class="form-check-input" type="radio" name="' + name + '" id="' + name + '1" value="1" onclick="calificar(' + "'" + name + "'" + ');">'
            + '<label class="form-check-label" for="' + name + '1" >1</label>'
            + '</div>'
            + '<div class="form-check form-check-inline">'
            + '<input class="form-check-input" type="radio" name="' + name + '" id="' + name + '2" value="2"  onclick="calificar(' + "'" + name + "'" + ');">'
            + '<label class="form-check-label" for="' + name + '2">2</label>'
            + '</div>'
            + '<div class="form-check form-check-inline">'
            + '<input class="form-check-input" type="radio" name="' + name + '" id="' + name + '3" value="3"  onclick="calificar(' + "'" + name + "'" + ');">'
            + '<label class="form-check-label" for="' + name + '3">3</label>'
            + '</div>'
            + '<div class="form-check form-check-inline">'
            + '<input class="form-check-input" type="radio" name="' + name + '" id="' + name + '4" value="4"  onclick="calificar(' + "'" + name + "'" + ');">'
            + '<label class="form-check-label" for="' + name + '4">4</label>'
            + '</div>'
            + '<div class="form-check form-check-inline">'
            + '<input class="form-check-input" type="radio" name="' + name + '" id="' + name + '5" value="5"  onclick="calificar(' + "'" + name + "'" + ');">'
            + '<label class="form-check-label" for="' + name + '5">5</label>'
            + '</div>'
            + '<div class="form-check form-check-inline">'
            + '<input class="form-check-input" type="radio" name="' + name + '" id="' + name + '6" value="6"  onclick="calificar(' + "'" + name + "'" + ');">'
            + '<label class="form-check-label" for="' + name + '6">6</label>'
            + '</div>'
            + '<div class="form-check form-check-inline">'
            + '<input class="form-check-input" type="radio" name="' + name + '" id="' + name + '7" value="7"  onclick="calificar(' + "'" + name + "'" + ');">'
            + '<label class="form-check-label" for="' + name + '7">7</label>'
            + '</div>'
            + '<div class="form-check form-check-inline">'
            + '<input class="form-check-input" type="radio" name="' + name + '" id="' + name + '8" value="8"  onclick="calificar(' + "'" + name + "'" + ');">'
            + '<label class="form-check-label" for="' + name + '7">8</label>'
            + '</div>'
            + '<div class="form-check form-check-inline">'
            + '<input class="form-check-input" type="radio" name="' + name + '" id="' + name + '9" value="9"  onclick="calificar(' + "'" + name + "'" + ');">'
            + '<label class="form-check-label" for="' + name + '9">9</label>'
            + '</div>'
            + '<div class="form-check form-check-inline">'
            + '<input class="form-check-input" type="radio" name="' + name + '" id="' + name + '10" value="10"  onclick="calificar(' + "'" + name + "'" + ');">'
            + '<label class="form-check-label" for="' + name + '10" >10</label>'
            + '</div>'
            + '</div>'
            + '<div><br></div>'
            + "<div id='div" + name + "'style='display : none;'><label class='form-label' for='res" + name + "'>Por Favor Escriba cual es el Motivo de la Calificación?</label>"
            + "<br><input class='form-control' type='text' name='res" + name + "' id='res" + name + "'/></div>";
            + '<div><br></div>'
            +'</div>'
            +'</div></div>'
            + "</div>"
            + '</div>';
    document.getElementById('staticBackdropLabel').innerHTML = "PREGUNTA SELECCION CON RESPUESTA";
    $("#estructura").html(estructura);
    $("#divButton").html("<button  type='button' class='btn btn-outline-success' onclick='AddPre4();' >AGREGAR</button>");
    document.getElementById("txtnombre").focus();
}


function AtribGeneral(){
    var atributo="<select id='selectAtrib' class='form-select'>"
                +"<option value='Informativa' selected>Informativa</option>"
                +"<option value='Agilidad' >Agilidad</option>"
                +"<option value='Amabilidad' >Amabilidad</option>"    
                +"<option value='Bioseguridad' >Bioseguridad</option>"
                +"<option value='NPS' >Recomendación</option>"
                +"<option value='Recompra' >Recompra</option>"
                +"<option value='INS' >Satisfacción General</option>"
                +"</select>";
    return atributo;
}
function AtribCes(){
    var atributo="<select id='selectAtrib' class='form-select'>"
                +"<option value='Informativa' selected >Informativa</option>"
                +"<option value='CES' >Esfuerzo</option>"
                +"</select>";
    return atributo;
}
function addatrib(){    
    return ($('select[id=selectAtrib]').val());
}
function AddPre4() {
    $("#txtrespuesta").html("");
    var Nombre = NewDiv("div");
    var pre = $("#divPre").html();
    var res = $("#divRes").html();
    var aux=0;
    var cont = window.arrayInput.length;
    for (var i = 0; i < cont; i++) {
        if (window.arrayInput[i]["div"] === Nombre) {
            if (aux===0){
                aux=aux+1;
                window.arrayInput[i]["tipo"] = addatrib();
            }else{
                window.arrayInput[i]["tipo"] = "Respuesta";
            }
        }
    }
    estadoObjetos(Nombre, 1);
    if (pre == "" || res == "") {
        swal("ERROR...!", "Falta Ingresar la Descripción de la Pregunta o las Respuestas...", "warning");
    } else {
        var pregunta = '<div class="container" id="' + Nombre + '">' +
                '<div class="row">' +
                '<div class="col-2"></div>' +
                '<div class="col-8 text-start " style="word-wrap: break-word;">' + pre + '<br></div>' +
                '<div class="col-2">' +
                '<div id="divclose" class="text-end">' +
                '<button onclick="Remover(' + "'" + Nombre + "'" + ')" class="btn btn-outline-danger">Delete</button>' +
                '</div>' +
                '</div>' +
                '</div>' +
                '<div class="row">' +
                '<div class="col-2"></div>' +
                '<div class="col-8 text-start border border-dark rounded-3" style="word-wrap: break-word;"><br>' + res + '<br></div>' +
                '<div class="col-2"></div>' +
                '</div>' +
                '<br>' +
                '</div>';
        var dataAnterior = $("#objetos").html();
        var dataAnterior = dataAnterior + pregunta;
        $("#objetos").html(dataAnterior);
        estadoObjetos(Nombre, 1);
        $("#divPre").html("");
        $("#divRes").html("");
        $('#staticBackdrop').modal('hide');
    }
}


function insertOption() {
    var opciones = "";
    opciones = '<label for="txtnombre" class="form-label"><b>Tipo de Pregunta</b></label><br>'
            + '<div class="form-check form-check-inline"><input class="form-check-input" type="radio" name="RadioClass" id="RadioClass0" value="Informativo" checked><label class="form-check-label" for="RadioClass0">INFORMATIVO</label></div>';
    var cont = window.arrayInput.length;
    var contins = 0;
    var contces = 0;
    var contnps = 0;
    console.log(window.arrayInput);
    for (var i = 0; i < cont; i++) {
        if (window.arrayInput[i]["tipo"] === "INS") {
            contins++;
        }
        if (window.arrayInput[i]["tipo"] === "CES") {
            contces++;
        }
        if (window.arrayInput[i]["tipo"] === "NPS") {
            contnps++;
        }
    }
    if (contins === 0) {
        opciones += '<div class="form-check form-check-inline"><input class="form-check-input" type="radio" name="RadioClass" id="RadioClass1" value="INS"><label class="form-check-label" for="RadioClass1">INS</label></div>';
    }
    if (contces === 0) {
        opciones += '<div class="form-check form-check-inline"><input class="form-check-input" type="radio" name="RadioClass" id="RadioClass2" value="CES"><label class="form-check-label" for="RadioClass5">CES</label></div>';
    }
    if (contnps === 0) {
        opciones += '<div class="form-check form-check-inline"><input class="form-check-input" type="radio" name="RadioClass" id="RadioClass3" value="NPS"><label class="form-check-label" for="RadioClass3">NPS</label></div>';
    }
    $("#divop").html(opciones);
}




function FormContact() {
    const num = ContDiv();
    abrirmodal();
    const name = 'txtOption' + num;
    var cont = 0;
    cont = window.arrayInput.length;
    var arrayAux = [];
    arrayAux["div"] = "div" + num;
    arrayAux["input"] = 'txtNom' + num;
    arrayAux["Nombre"] = "Nombre";
    arrayAux["inputOption"] = '0';
    arrayAux["valOption"] = 'ValText';
    arrayAux["tipo"] = "Informativo";
    arrayAux["estado"] = '0';
    window.arrayInput[cont] = arrayAux;
    cont = window.arrayInput.length;
    var arrayAux = [];
    arrayAux["div"] = "div" + num;
    arrayAux["input"] = 'txtApe' + num;
    arrayAux["Nombre"] = "Apellidos";
    arrayAux["inputOption"] = '0';
    arrayAux["valOption"] = 'ValText';
    arrayAux["tipo"] = "Informativo";
    arrayAux["estado"] = '0';
    window.arrayInput[cont] = arrayAux;
    cont = window.arrayInput.length;
    var arrayAux = [];
    arrayAux["div"] = "div" + num;
    arrayAux["input"] = 'txtDni' + num;
    arrayAux["Nombre"] = "Dni";
    arrayAux["inputOption"] = '0';
    arrayAux["valOption"] = 'ValDni';
    arrayAux["tipo"] = "Informativo";
    arrayAux["estado"] = '0';
    window.arrayInput[cont] = arrayAux;
    cont = window.arrayInput.length;
    var arrayAux = [];
    arrayAux["div"] = "div" + num;
    arrayAux["input"] = 'txtEdad' + num;
    arrayAux["Nombre"] = "Edad";
    arrayAux["inputOption"] = '0';
    arrayAux["valOption"] = 'ValEdad';
    arrayAux["tipo"] = "Informativo";
    arrayAux["estado"] = '0';
    window.arrayInput[cont] = arrayAux;
    cont = window.arrayInput.length;
    var arrayAux = [];
    arrayAux["div"] = "div" + num;
    arrayAux["input"] = 'txtTel' + num;
    arrayAux["Nombre"] = "Telefono";
    arrayAux["inputOption"] = '0';
    arrayAux["valOption"] = 'ValFono';
    arrayAux["tipo"] = "Informativo";
    arrayAux["estado"] = '0';
    window.arrayInput[cont] = arrayAux;
    cont = window.arrayInput.length;
    var arrayAux = [];
    arrayAux["div"] = "div" + num;
    arrayAux["input"] = 'txtCel' + num;
    arrayAux["Nombre"] = "Celular";
    arrayAux["inputOption"] = '0';
    arrayAux["valOption"] = 'ValCel';
    arrayAux["tipo"] = "Informativo";
    arrayAux["estado"] = '0';
    window.arrayInput[cont] = arrayAux;
    var estructura = '' +
            "<div><br><b><label>Objeto a Insertar :</label></b><br><br></div>" +
            '<div class="Container">' +
            "<br><div id='divPre'><label><b>Datos Informativos</b></label></div><br>" +
            '<div id="divRes">' +
            '<form class="row g-3">' +
            '<div class="col-md-6">' +
            '<b><label for="txtNom' + num + '" class="form-label">Nombres</label></b>' +
            '<input type="text" class="form-control" id="txtNom' + num + '" onkeypress="return ValidarLetras(event);"/>' +
            '</div>' +
            '<div class="col-md-6">' +
            '<b><label for="txtApe' + num + '" class="form-label">Apellidos</label></b>' +
            '<input type="text" class="form-control" id="txtApe' + num + '" onkeypress="return ValidarLetras(event);"/>' +
            '</div>' +
            '<div class="col-md-6">' +
            '<b><label for="txtDni' + num + '" class="form-label">DNI</label></b>' +
            '<input type="text" class="form-control" id="txtDni' + num + '"onkeypress="return ValidarNumeros(event);" maxlength="10"/>' +
            '</div>' +
            '<div class="col-md-6">' +
            '<b><label for="txtEdad' + num + '" class="form-label">Edad</label></b>' +
            '<input type="number" class="form-control" id="txtEdad' + num + '" onkeypress="return ValidarNumeros(event);" min="18" max="100"/>' +
            '</div>' +
            '<div class="col-md-6">' +
            '<b><label for="txtTel' + num + '" class="form-label">Telefono</label></b>' +
            '<input type="text" class="form-control" id="txtTel' + num + '" onkeypress="return ValidarNumeros(event);" maxlength="9"/>' +
            '</div>' +
            '<div class="col-md-6">' +
            '<b><label for="txtCel' + num + '" class="form-label">Celular</label></b>' +
            '<input type="text" class="form-control" id="txtCel' + num + '" onkeypress="return ValidarNumeros(event);" maxlength="10"/>' +
            '</div>' +
            '</form></div><br></div>';
    document.getElementById('staticBackdropLabel').innerHTML = "FORMULARIO DE CONTACTO";
    $("#estructura").html(estructura);
    $("#divButton").html("<button  type='button' class='btn btn-outline-success' onclick='AddForm();' >AGREGAR</button>");
    document.getElementById("txtNom" + num).focus();
}



function AddForm() {
    var Nombre = NewDiv("div");
    var pre = $("#divPre").html();
    var res = $("#divRes").html();
    var pregunta = '<div class="container" id="' + Nombre + '">' +
            '<div class="row">' +
            '<div class="col-2"></div>' +
            '<div class="col-8 text-start" style="word-wrap: break-word;">' + pre + '</div>' +
            '<div class="col-2">' +
            '<div id="divclose" class="text-end">' +
            '<button onclick="Remover(' + "'" + Nombre + "'" + ')" class="btn btn-outline-danger">Delete</button>' +
            '</div>' +
            '</div>' +
            '</div>' +
            '<div class="row">' +
            '<div class="col-2"></div>' +
            '<div class="col-8 text-start border border-dark rounded-3" style="word-wrap: break-word;"><br>' + res + '<br></div>' +
            '<div class="col-2"></div>' +
            '</div><br>' +
            '</div>';
    var dataAnterior = $("#objetos").html();
    var dataAnterior = dataAnterior + pregunta;
    $("#objetos").html(dataAnterior);
    estadoObjetos(Nombre, 1);
    $('#staticBackdrop').modal('hide');
}

function lblPregunta() {
    var Nombre = NewDiv("div");
    var dato = document.getElementById("txtnombre").value;
    var objeto = '<b><label>' + dato + '</label></b>';
    $("#divPre").html(objeto);
    nameObjetos(Nombre, dato);
}

function nameObjetos(nomObjeto, pregunta) {
    const aux = window.arrayInput.length;
    var cont = 0;
    for (var i = 0; i < aux; i++) {
        if (window.arrayInput[i]['div'] === nomObjeto) {
            if (cont === 0) {
                window.arrayInput[i]['Nombre'] = pregunta;
                cont++;
            }


        }
    }
}


function estadoObjetos(nomObjeto, Estado) {
    const aux = window.arrayInput.length;
    for (var i = 0; i < aux; i++) {
        if (window.arrayInput[i]['div'] === nomObjeto) {
            if (Estado === 1) {
                window.arrayInput[i]['estado'] = '1';
            } else {
                window.arrayInput[i]['estado'] = '0';
            }
        }
    }
}




function Remover(name) {
    estadoObjetos(name, 0);
    $("#" + name).remove();
}

function ContDiv() {
    var arrId = [];
    $('#objetos').children().each(function () {
        var ids;
        ids = $(this).attr('id');
        if (ids !== undefined) {
            arrId.push(ids);
        }
    });
    var contador = arrId.length;
    contador++;
    return contador;
}

function NewDiv(name) {
    var arrId = [];
    $('#objetos').children().each(function () {
        var ids;
        ids = $(this).attr('id');
        if (ids !== undefined) {
            arrId.push(ids);
        }
    });
    var contador = arrId.length;
    contador++;
    var nombre = name + contador;
    return nombre;
}

function buscardiv() {
    var arrId = [];
    $('#objetos').children().each(function () {
        var ids;
        ids = $(this).attr('id');
        if (ids !== undefined) {
            arrId.push(ids);
        }
    });
    var contador = arrId.length;
    for (var i = 0; i < contador; i++) {
        $("#divclose").remove();
    }
}




function SaveForm() {
//    console.log(window.arrayInput);
    buscardiv();
    var cont = window.arrayInput.length;
    console.log(window.arrayInput);
    var arrayAux = [];
    for (var ax = 0; ax < cont; ax++) {
        if (window.arrayInput[ax]['estado'] === "1") {
            var cont2 = arrayAux.length;
            arrayAux[cont2] = window.arrayInput[ax]['input'];
            cont2 = arrayAux.length;
            arrayAux[cont2] = window.arrayInput[ax]['Nombre'];
            cont2 = arrayAux.length;
            arrayAux[cont2] = window.arrayInput[ax]['inputOption'];
            cont2 = arrayAux.length;
            arrayAux[cont2] = window.arrayInput[ax]['valOption'];
            cont2 = arrayAux.length;
            arrayAux[cont2] = window.arrayInput[ax]['tipo'];
        }
    }
    console.log(arrayAux);
    var formu = $("#DesignFrom").html();
    var parametros = {
        "NewForm": true,
        "Estructura": formu,
        "Input": JSON.stringify(arrayAux)};
    $.ajax({
        data: parametros, url: "ajax/Formularios.php", type: "POST",
        success: function (response) {
            console.log(response);
            if (response == "FALSE") {
                swal("ERROR...!", "No se pudo Concluir el Proceso Intentelo Mas Tarde...", "warning");
            } else {
                if (response == "NULL") {
                    swal("ERROR...!", "No se pudo Concluir el Proceso Intentelo Mas Tarde...", "warning");
                } else {
                    Guardar(response);
                }
            }

        }
    });
}

function Guardar(url) {
    var root = location.protocol + '//' + location.host + '/encuestas/';
    var urlCompleta = root + url;
    var parametros = {"Guardar": true, "URL": urlCompleta};
    $.ajax({
        data: parametros, url: "ajax/Encuestas.php", type: "POST",
        success: function (response) {
            console.log(response);
            if (response === 1 || response === "1") {
                swal("EN HORA BUENA...!", "LA ENCUESTA FUE GUARDADA", "success")
                        .then((value) => {
                            window.location = "encuestas.php";
                        });
            } else {
                swal("ERROR...!", "No se pudo Concluir el Proceso Intentelo Mas Tarde...", "warning");
            }
        }
    });
}
function buscarinput() {
    var contador = ContDiv();
    for (i = 1; i <= contador; i++) {

    }
}


