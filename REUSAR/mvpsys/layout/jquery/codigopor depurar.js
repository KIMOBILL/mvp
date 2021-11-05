




function PreOptionMulti() {

    if (window.op) {
        window.op = 0;
    }
    Limpiar();
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
    if (window.op) {
        window.op = 0;
    }
    Limpiar();
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
    var aux=0;
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
    if (window.op) {
        window.op = 0;
    }
    Limpiar();
    var estructura = '<div class="container">'
            + '<div class="row">'
            + '<label for="txtnombre" class="form-label"><b>Descripcion de la Pregunta</b></label>'
            + "<input class='form-control' type='text' id='txtnombre' onKeyUp='lblPregunta();'/><br>"
            + '</div>'            
            +"<div><br><br></div>"
            + "<div class='row'><b><label>Objeto a Insertar :</label></b></div>"
            +"<div><br></div>"
            +"<div><br></div>"
            + "<div id='divPre'></div>"
            + '<div><br></div>'
            + "<div id='divRes' style='word-wrap: break-word'>"
            + "<input class='form-control' type='text' id='" + name + "' placeholder='Respuesta' title='Ingrese la Respuesta'/>"
            + "</div>"
            + '</div>';
    document.getElementById('staticBackdropLabel').innerHTML = "PREGUNTAS SIMPLES";
    $("#estructura").html(estructura);
    $("#divButton").html("<button  type='button' class='btn btn-outline-success' onclick='AddPre2();' >AGREGAR</button>");
    document.getElementById("txtnombre").focus();
}

function Estrellas() {
    const num = ContDiv();
    if (window.op) {
        window.op = 0;
    }
    Limpiar();
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
    if (window.op) {
        window.op = 0;
    }
    Limpiar();
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
    if (window.op) {
        window.op = 0;
    }
    Limpiar();
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




function AtribGeneral(){
    console.log(listIndicador);
    var atributo="<select id='selectAtrib' class='form-control'>";
                for(var i=0;i<listIndicador.length;i++){
                    if(listIndicador[i]["indicador"]==="Informativa"){
                        atributo+= "<option value='"+listIndicador[i]['codigo']+"' selected>"+listIndicador[i]['indicador']+"</option>";
                    }else{
                        atributo+= "<option value='"+listIndicador[i]['codigo']+"' >"+listIndicador[i]['indicador']+"</option>";
                    }
                }
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
    var root = location.protocol + '//' + location.host + '/mvpsys/';
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


