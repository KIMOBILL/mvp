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

function CrearViewPregunta() {
    var valor = document.getElementById("SelectPreg").value;
    switch (valor) {
        case '1':
            Color();
            break;
        case '2':
            Letras();
            break;
        case '3':
            Imagen();
            break;
        case '4':
            Titulo();
            break;
        case '5':
            SubTitulo();
            break;
        case '6':
            Description();
            break;
        case '7':
            Email();
            break;
        case '8':
            Coment();
            break;
        case '9':
            FormContact();
            break;
        case '10':
            Pregunta();
            break;
        case '11':
            PreOptionOne();
            break;
        case '12':
            OptionRespuesta();
            break;
        case '13':
            PreOptionMulti();
            break;
        case '14':
            PreOptionSelect();
            break;
        case '15':
            Estrellas();
            break;
        case '16':
            Caritas();
            break;
        case '17':
            Likes();
            break;
            document.getElementById('first-select').value;

        default:
            alert("ninguno de los anteriorres");
            break;
    }
}


function abrirOffCanvas() {
    $('#offcanvasExample').show();
}
function abrirmodal() {
    if (window.op) {
        window.op = 0;
    }
    Limpiar();
    $('#staticBackdrop').modal('show');
}
function Limpiar() {
    $("#estructura").html("");
    $("#divButton").html("");
}
function lblPregunta() {
    var Nombre = NewDiv("div");
    var dato = document.getElementById("txtnombre").value;
    var objeto = '<b><label id="lblpregunta">' + dato + '</label></b>';
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

function RemoverDivClose() {
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

//--- AÑADIR UNA IMAGEN A NUESTRO FORMULARIO---/
function Imagen() {
    if (window.op) {
        window.op = 0;
    }
    Limpiar();
    const num = ContDiv();
    var estructura = '<div class="form-group">' +
            '<label>Seleccionar Imagen</label>' +
            '<form method="post" action="#" enctype="multipart/form-data">' +
            '<input type="file" class="file-upload" accept="image/png,image/jpeg" name="txtImagen' + num + '" id="txtImagen' + num + '" title="Seleccionar Imagen">' +
            '</form>' +
            '</div>';
    document.getElementById('staticBackdropLabel').innerHTML = "IMAGEN O LOGO";
    $("#estructura").html(estructura);
    $("#divButton").html("<button  type='button' class='btn btn-outline-success' onclick='AddImagen(" + '"txtImagen' + num + '"' + ");' >AGREGAR</button>");
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
//---PONER COLOR DE FONDO AL FORMULARIO---//
function Color() {
    if (window.op) {
        window.op = 0;
    }
    Limpiar();
    var estructura='<h4 class="card-title">Color picker (default)</h4>'+
                      '<p class="card-description">Seleccione el Color</p>'+
                      '<input type="text" id="txtColor" class="color-picker" value="#ffe74c" />';
//    var estructura = '<div class="container"><div class="row">'
//            + '<label for="txtColor" class="col-5 form-label"><b>Color de fondo</b></label>'
//            + '<input type="color" class="col-7 form-control form-control-color" id="txtColor" value="#ffffff" title="Color de Fondo">'
//            + '</div>';
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

//---CAMBIAR DE COLOR DE LETRAS---//
function Letras() {
    if (window.op) {
        window.op = 0;
    }
    Limpiar();
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
//--- INSERTAR TITULO A NUESTRO FORMULARIO---//

function Titulo() {
    if (window.op) {
        window.op = 0;
    }
    Limpiar();
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
        swal.fire("ERROR...!", "Por Favor Ingrese el Titulo que Desea Insertar...", "warning");
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

//--- INSERTAR SUBTITULOS EN EL FORMULARIO---//
function SubTitulo() {
    if (window.op) {
        window.op = 0;
    }
    Limpiar();
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
        swal.fire("ERROR...!", "Por Favor Ingrese el Sub Titulo que Desea Insertar...", "warning");
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
//---INSERTAR UNA BREBE DESCRIPCION DE LA ENCUESTA----//
function Description() {
    if (window.op) {
        window.op = 0;
    }
    Limpiar();
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
    if (desc === "") {
        Swal.fire('warning!', 'Por Favor Ingrese una Descripcion para poder Insertar...', 'warning');
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

//---INSERTAR CAMPOS DE EMAIL, COMENTARIOS Y PREGUNTAS SIMPLES---//

function Email() {
    if (window.op) {
        window.op = 0;
    }
    Limpiar();
    const num = ContDiv();
    const name = 'txtEmail' + num;
    var cont = window.arrayInput.length;
    var arrayAux = [];
    arrayAux["Div"] = "div" + num;
    arrayAux["Input"] = name;
    arrayAux["Detalle"] = "Correo Electronico";
    arrayAux["Indicador"] = "INF";
    arrayAux["Tipo"] = 'text';
    arrayAux["Estado"] = '1';
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
    if (window.op) {
        window.op = 0;
    }
    Limpiar();
    const num = ContDiv();
    const name = 'txtComent' + num;
    var cont = window.arrayInput.length;
    var arrayAux = [];
    arrayAux["Div"] = "div" + num;
    arrayAux["Input"] = name;
    arrayAux["Detalle"] = "Ingrese un Comentario sobre Nuestros Servicios";
    arrayAux["Indicador"] = "INF";
    arrayAux["Tipo"] = "text";
    arrayAux["Estado"] = '1';
    window.arrayInput[cont] = arrayAux;
    var estructura = '<div class="form-group">'
            + "<div><b><label>Objeto a Insertar :</label></b><br><br></div>"
            + "<div id='divPre'>"
            + '<label for="' + name + '" class="form-label"><b>Ingrese un Comentario sobre Nuestros Servicios</b></label>'
            + "</div><br><div id='divRes'>"
            + "<textarea class='form-control' type='text' id='" + name + "' name='" + name + "' placeholder='Comentario...' title='Ingresar Comentario'/></textarea><br>"
            + "</div><br>"
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
        swal.fire("ERROR...!", "Falta Ingresar la Descripción de la Pregunta...", "warning");
    } else {
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


//---preguntas simples---//
function Pregunta() {
    const num = ContDiv();
    const name = 'txtInput' + num;
    var cont = window.arrayInput.length;
    var arrayAux = [];
    arrayAux["Div"] = "div" + num;
    arrayAux["Input"] = name;
    arrayAux["Detalle"] = "";
    arrayAux["Indicador"] = "INF";
    arrayAux["Tipo"] = 'text';
    arrayAux["Estado"] = '1';
    window.arrayInput[cont] = arrayAux;
    if (window.op) {
        window.op = 0;
    }
    Limpiar();
    var estructura = '<div class="container">'
            + '<div class="row">'
            + '<label for="txtnombre" class="form-label"><b>Descripcion de la Pregunta</b></label>'
            + "<input class='form-control' type='text' id='txtnombre' onKeyUp='lblPregunta();'/><br>"
            + '</div>'
            + "<div><br><br></div>"
            + "<div class='row'><b><label>Objeto a Insertar :</label></b></div>"
            + "<div><br></div>"
            + "<div><br></div>"
            + "<div id='divPre'></div>"
            + '<div><br></div>'
            + "<div id='divRes' style='word-wrap: break-word'>"
            + "<input class='form-control' type='text' id='" + name + "' placeholder='Respuesta' title='Ingrese la Respuesta'/>"
            + "</div>"
            + '</div>';
    document.getElementById('staticBackdropLabel').innerHTML = "PREGUNTAS SIMPLES";
    $("#estructura").html(estructura);
    $("#divButton").html("<button  type='button' class='btn btn-outline-success' onclick='AddPreSimple();' >AGREGAR</button>");
    document.getElementById("txtnombre").focus();
}

function AddPreSimple() {
    var Nombre = NewDiv("div");
    var pre = $("#divPre").html();
    var res = $("#divRes").html();
    var cont = window.arrayInput.length;
    for (var i = 0; i < cont; i++) {
        if (window.arrayInput[i]["div"] === Nombre) {
            window.arrayInput[i]["Detalle"] = document.getElementById("lblpregunta").innerHTML;
        }
    }
    if (pre == "" || res == "") {
        swal.fire("ERROR...!", "Falta Ingresar la Descripción de la Pregunta o las Respuestas...", "warning");
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


function SaveForm() {
    swal.fire({
        title: 'Para continuar',
        input: 'text',
        inputLabel: 'Ingrese el Nombre de la encuarta a crear',
        inputValue: "",
        showCancelButton: true,
        inputValidator: (value) => {
            if (!value) {
                return 'falta ingresar el nombre!';
            } else {
                var parametros = {
                    "BuscarNombre": true,
                    "Nombre": value};
                $.ajax({
                    type: "POST",
                    url: "ajax/Formularios.php",
                    data: parametros, //capturo array     
                    success: function (data) {
                        if (data === 0 || data === "0") {
                            EncuestaSave(value);
                        } else {
                            return 'ya existe un formulario con ese nombre por favor cambie de nombre!';
                        }
                    }
                });

            }
        }

    });
}
function EncuestaSave(NomForm) {
    var respuesta = 0;
    var arrayAux = [];
    var cont = 0;
    for (var ax = 0; ax < window.arrayInput.length; ax++) {
        if (window.arrayInput[ax]['Estado'] === "1") {
            var cont = arrayAux.length;
            arrayAux[cont] = window.arrayInput[ax]['Input'];
            arrayAux[cont + 1] = window.arrayInput[ax]['Tipo'];
            arrayAux[cont + 2] = window.arrayInput[ax]['Detalle'];
            arrayAux[cont + 3] = window.arrayInput[ax]['Indicador'];
        }
    }
    if (arrayAux.length === 0) {
        Swal.fire("Advertencia!", "No existen elementos para crear un formulario", "question");
        respuesta = 2;
    } else {
        RemoverDivClose();
        var formu = $("#DesignFrom").html();
        var parametros = {
            "NewForm2": true,
            "Estructura": formu,
            "Nombre": NomForm,
            "Input": JSON.stringify(arrayAux)};
        $.ajax({
            type: "POST",
            url: "ajax/Formularios.php",
            data: parametros, //capturo array     
            success: function (data) {
                console.log(data);
                if (data === "true" || data === true || data === 1) {
                    Swal.fire({
                        title: 'En Hora Buena...!',
                        text: "El Formulario fue creado con exito..",
                        icon: 'success',
                        showCancelButton: false,
                        confirmButtonColor: '#3085d6',
                        cancelButtonColor: '#d33',
                        confirmButtonText: 'ACEPTAR'
                    }).then((result) => {
                        if (result.isConfirmed) {
                            window.location.href="encuestas.php";
                        }
                    });
//                    Swal.fire("En hora Buena..!", "El Formulario fue creado con exito..", "success");
                    respuesta = 1;

                } else {
                    Swal.fire("Error..!", "No se pudo crear la encuesta intentolo mas tarde...", "error");
                    respuesta = 3;
                }
            }
        });
    }
    switch (respuesta) {
        case 0:
            Swal.fire("Error..!", "El Proceso a fallado intentolo mas tarde...", "error");
            break;
    }
}

///---PREGUNTA DE SELECCION SIMPLE---///

function PreOptionOne() {
    if (window.op) {
        window.op = 0;
    }
    Limpiar();
    var estructura = '<div class="container">'
            + '<div class="row">'
            + '<label for="txtnombre" class="form-label"><b>Descripción de la Pregunta</b></label>'
            + "<input class='form-control' type='text' id='txtnombre' onKeyUp='lblPregunta();'/>"
            + '</div>'
            + '<br><br>'
            + '<div class="row">'
            + '<label for="txtnombre" class="form-label"><b>Descripción de las Respuestas</b></label>'
            + '<br>'
            + '<div class="col-10">'
            + "<input type='text' class='form-control' id='txtresp'/>"
            + '</div>'
            + '<div class="col-2">'
            + "<button type='button' class='btn btn-outline-primary' onclick='addResOptionRadio();'>+</button>"
            + '</div></div><br><br>'
            + "<div class='row'><b><label>Objeto a Insertar :</label></b></div><br><br>"
            + "<div class='row '>"
            + "<div id='divPre'></div>"
            + "<div id='divRes'></div>"
            + "</div>"
            + '</div>';
    document.getElementById('staticBackdropLabel').innerHTML = "PREGUNTAS CERRADAS";
    $("#estructura").html(estructura);
    $("#divButton").html("<button  type='button' class='btn btn-outline-success' onclick='AddPre();' >AGREGAR</button>");
    document.getElementById("txtnombre").focus();
}

function OptionRespuesta() {
    const num = ContDiv();
    if (window.op) {
        window.op = 0;
    }
    Limpiar();
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

            + '<div class="form-group">'
            + '<label for="txtnombre">Pregunta : </label>'
            + "<input class='form-control' type='text' id='txtnombre' placeholder='Pregunta' onKeyUp='lblPregunta();'/>"
            + '</div>'
            + '<div class="form-group">'
            + '<label for="selectAtrib">Atributo : </label>' + AtribGeneral()
            + '</div>'
            + "<div class='row'><b><label>Objeto a Insertar :</label></b></div>"
            + "<div id='divPre'></div>"

            + "<div id='divRes'>"
            + "<div class='row'><b><label>CALIFICACION :</label></b></div>"
            + "<br>"
            + '<div class="row">'
            + '<div class="form-group">' +
            '<div class="form-check">' +
            '<label class="form-check-label">' +
            '<input type="radio" class="form-check-input" name="' + name + '" id="' + name + '1" value="1" onclick="calificar(' + "'" + name + "'" + ');">' +
            '1' +
            '</label>' +
            '</div>' +
            '<div class="form-check">' +
            '<label class="form-check-label">' +
            '<input type="radio" class="form-check-input" name="' + name + '" id="' + name + '2" value="2" onclick="calificar(' + "'" + name + "'" + ');">' +
            '2' +
            '</label>' +
            '</div>' +
            '<div class="form-check">' +
            '<label class="form-check-label">' +
            '<input type="radio" class="form-check-input" name="' + name + '" id="' + name + '3" value="3" onclick="calificar(' + "'" + name + "'" + ');">' +
            '3' +
            '</label>' +
            '</div>' +
            '<div class="form-check">' +
            '<label class="form-check-label">' +
            '<input type="radio" class="form-check-input" name="' + name + '" id="' + name + '4" value="4" onclick="calificar(' + "'" + name + "'" + ');">' +
            '4' +
            '</label>' +
            '</div>' +
            '<div class="form-check">' +
            '<label class="form-check-label">' +
            '<input type="radio" class="form-check-input" name="' + name + '" id="' + name + '5" value="5" onclick="calificar(' + "'" + name + "'" + ');">' +
            '5' +
            '</label>' +
            '</div>' +
            '</div>' +
            '</div>'
            + "<div class='form-group'  id='div" + name + "'style='display : none;'>"
            + "<label for='res" + name + "'>Por Favor Escriba cual es el Motivo de la Calificación?</label>"
            + "<input type='text' class='form-control' name='res" + name + "' id='res" + name + "' placeholder='Escriba su Respuesta'/>"
            + "</div>"
            + '</div>'
            + '</div>';
    document.getElementById('staticBackdropLabel').innerHTML = "PREGUNTA SELECCION CON RESPUESTA";
    $("#estructura").html(estructura);
    $("#divButton").html("<button  type='button' class='btn btn-outline-success' onclick='AddPre4();' >AGREGAR</button>");
    document.getElementById("txtnombre").focus();
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
//        var objeto='<div class="form-group"><div class="form-check">'+
//                        '<label class="form-check-label">'+
//                          '<input type="checkbox" class="form-check-input">'+
//                          'Default'+
//                        '</label>'+
//                   '</div></div>';
        var objeto = '<div class="form-check">'
                + '<input class="form-check-input" type="radio" value="' + dato1 + '" name="' + name + '" id="' + name + ax + '">' +
                '<label class="form-check-label" for="' + name + ax + '">' + dato1 + '</label></div>';
        var info = $("#divRes").html();
        info = info + objeto;
        $("#divRes").html(info);
        document.getElementById("txtresp").value = "";
        document.getElementById("txtresp").focus();
    }

}


//---FORMULARIO DE CONTACTOS--- //
function FormContact() {
    const num = ContDiv();
    if (window.op) {
        window.op = 0;
    }
    Limpiar();
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

