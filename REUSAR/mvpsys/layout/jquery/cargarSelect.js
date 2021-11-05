var listAgencias = new Array();
var listCanales = new Array();
var listSeccion = new Array();
var listOtros = new Array();
var CodEncuesta= 0;
var NameEmpresa= "";
function OpenModalFiltro() {
    $('#ModalFiltros').modal('show');
}

function Filtros(IdEncuesta) {
    TraerFiltros(IdEncuesta);
    fullAgencias();
    fullCanales();
    fullSeccion();
    fullOtros();
    OpenModalFiltro();
}

function TraerFiltros(IdEncuesta) {
    CodEncuesta=IdEncuesta;
    var parametros = {"DatosFiltros": true, "Encuesta": IdEncuesta};
    $.ajax({
        type: 'POST',
        url: 'ajax/filtros.php',
        dataType: "json",
        data: parametros,
        success: function (data) {
            var tablero = "<table class='table'>";
            tablero += "<thead><tr>";
            tablero += "<th>#</th><th>AGENCIA</th><th>URL ENCUESTA</th><th>CANAL</th><th>SECCIÓN</th><th>OTROS</th><th>ESTADO</th><th></th>";
            tablero += "</tr></thead>";
            tablero += "<tbody>";
            var Dominio=getAbsolutePath();
            var nregistros = data.length;
            for (var i = 0; i < nregistros; i++) {
                var Url=Dominio+"encuestas/"+NameEmpresa+"/"+ data[i]["Url"];
                tablero += "<tr>";
                tablero += "<th><font size=2>" + i + "</font></th>";
                tablero += "<td><font size=2>" + data[i]["Agencia"] + "</font></td>";
                if (data[i]["Estado"] === 0 || data[i]["Estado"] === "0") {
                    tablero += "<td><font size=2>URL Inactivo</font></td>";
                }else{
                    tablero += "<td><font size=2>"+Url + "</font></td>";
                }                
                tablero += "<td><font size=2>" + data[i]["Canal"] + "</font></td>";
                tablero += "<td><font size=2>" + data[i]["Seccion"] + "</font></td>";
                tablero += "<td><font size=2>" + data[i]["Otros"] + "</font></td>";
                if (data[i]["Estado"] === 0 || data[i]["Estado"] === "0") {
                    tablero += "<td><font size=2>DESACTIVADOR</font></td>";
                    tablero += "<td><button class='form-control btn-warning' onclick='FiltroEstado(" + data[i]["Codigo"] + ",1)'>ACTIVAR</button>";
                } else {
                    tablero += "<td><font size=2>ACTIVADO</font></td>";
                    tablero += "<td><button class='form-control btn-danger' onclick='FiltroEstado(" + data[i]["Codigo"] + ",0)'>DESACTIVAR</button>";
                }
                tablero+="<button class='btn btn-inverse-primary' title='Ver Encuesta' onclick=' Ver("+'"'+Url+'"'+")'>Ver Form</button></td>";
                tablero += "</tr>";
            }
            tablero += "</tbody></table>";
            $("#divData").html("");
            $("#divData").html(tablero);
        }
    });
}
function Ver(url) {

    window.open(url, "Encuestas", "width=800, height=600");
}

function TraerEmpresa() {
    var parametros = {"TraerEmpresa": true};
    $.ajax({
        data: parametros, url: "ajax/filtros.php", type: "POST",
        success: function (response) {
            NameEmpresa= response;
        }
    });
}
function getAbsolutePath() {
    var loc = window.location;
    var pathName = loc.pathname.substring(0, loc.pathname.lastIndexOf('/') + 1);
    return loc.href.substring(0, loc.href.length - ((loc.pathname + loc.search + loc.hash).length - pathName.length));
}
function BorrarSelect(Nombre) {
    const $select = document.querySelector("#" + Nombre);
    for (let i = $select.options.length; i >= 0; i--) {
        $select.remove(i);
    }
}

function selectAgencias() {
    var parametros = {"CargarAgencia": true};
    $.ajax({
        type: 'POST',
        url: 'ajax/llenarSelect.php',
        dataType: "json",
        data: parametros,
        success: function (data) {
            
            listAgencias = data;
            
            selectCanales();
        }
    });
}

function fullAgencias() {
    BorrarSelect("AgenciaSelect");
    const domElement = "AgenciaSelect";
    var select = document.getElementsByName(domElement)[0];
    var option = document.createElement("option");
    option.selected = "true";
    option.text = "Seleccione";
    option.value = "null";
    select.add(option);
    console.log(listAgencias);
    for (var i = 0; i < listAgencias.length; i++) {
        var option = document.createElement("option");
        option.text = listAgencias[i]["Nombre"];
        option.value = listAgencias[i]["Codigo"];
        select.add(option);
    }
    var option = document.createElement("option");
    option.text = "Todas las agencias";
    option.value = "0";
    select.add(option);
}

function selectCanales() {
    var parametros = {"CargarCanales": true};
    $.ajax({
        type: 'POST',
        url: 'ajax/llenarSelect.php',
        dataType: "json",
        data: parametros,
        success: function (data) {
            listCanales = data;
            selectSeccion();
        }
    });
}

function fullCanales() {
    BorrarSelect("CanalSelect");
    const domElement = "CanalSelect";
    var select = document.getElementsByName(domElement)[0];
    var option = document.createElement("option");
    option.selected = "true";
    option.text = "Seleccione";
    option.value = "null";
    select.add(option);
    for (var i = 0; i < listCanales.length; i++) {
        var option = document.createElement("option");
        option.text = listCanales[i]["Nombre"];
        option.value = listCanales[i]["Codigo"];
        select.add(option);
    }
}

function selectSeccion() {
    var parametros = {"CargarSeccion": true};
    $.ajax({
        type: 'POST',
        url: 'ajax/llenarSelect.php',
        dataType: "json",
        data: parametros,
        success: function (data) {
            listSeccion = data;
            selectOtros();
        }
    });
}
function fullSeccion() {
    BorrarSelect("SeccionSelect");
    const domElement = "SeccionSelect";
    var select = document.getElementsByName(domElement)[0];
    var option = document.createElement("option");
    option.selected = "true";
    option.text = "Seleccione";
    option.value = "null";
    select.add(option);
    for (var i = 0; i < listSeccion.length; i++) {
        var option = document.createElement("option");
        option.text = listSeccion[i]["Nombre"];
        option.value = listSeccion[i]["Codigo"];
        select.add(option);
    }
}
function selectOtros() {
    var parametros = {"CargarOtros": true};
    $.ajax({
        type: 'POST',
        url: 'ajax/llenarSelect.php',
        dataType: "json",
        data: parametros,
        success: function (data) {
            listOtros = data;
        }
    });
}
function fullOtros() {
    BorrarSelect("OtrosSelect");
    const domElement = "OtrosSelect";
    var select = document.getElementsByName(domElement)[0];
    var option = document.createElement("option");
    option.selected = "true";
    option.text = "Seleccione";
    option.value = "null";
    select.add(option);
    for (var i = 0; i < listOtros.length; i++) {
        var option = document.createElement("option");
        option.text = listOtros[i]["Nombre"];
        option.value = listOtros[i]["Codigo"];
        select.add(option);
    }
}