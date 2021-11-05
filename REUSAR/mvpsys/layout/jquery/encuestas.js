function Buscar() {
    var parametros = {"Buscar": true};
    $.ajax({
        data: parametros, url: "ajax/Encuestas.php", type: "POST",
        success: function (response) {
            $("#datatable").html(response);
        }
    });
}

function FiltroEstado(codigo, estado) {
    var parametros = {"EstadoFiltros": true, "Codigo": codigo, "Estado": estado};
    $.ajax({
        data: parametros, url: "ajax/filtros.php", type: "POST",
        success: function (response) {
            TraerFiltros(CodEncuesta);
        }
    });
}

function AddFiltros() {
    var Agencia = document.getElementById("AgenciaSelect").value;
    var Canales = document.getElementById("CanalSelect").value;
    var Seccion = document.getElementById("SeccionSelect").value;
    var Otros = document.getElementById("OtrosSelect").value;
    var op = 0;
    if (Agencia == "null" || Canales == "null" || Seccion == "null" || Otros == "null") {
        alert("Para poder continuar debes seleccionar todas las opciones");
    } else {
        if (Agencia == 0 || Agencia == "0") {
            op = 1;
        } else {
            op = 2;
        }
        var parametros = {"AddFiltros": true, "Op": op, "Encuesta": CodEncuesta, "Agencia": Agencia, "Canales": Canales, "Seccion": Seccion, "Otros": Otros};
        console.log(parametros);
        $.ajax({
            data: parametros, url: "ajax/filtros.php", type: "POST",
            success: function (response) {
                console.log(response);
                TraerFiltros(CodEncuesta);
            }
        });
    }

}


function Informacion(base, tabla) {
    var parametros = {"Informacion": true, "Base": base, "Tabla": tabla};
    $.ajax({
        data: parametros, url: "ajax/Encuestas.php", type: "POST",
        success: function (response) {

            $("#divData").html(response);
            $('#ModalData').modal('show');
        }
    });
}

function Estadisticas(base, tabla) {

    var parametros = {"Estadisticas": true, "Base": base, "Tabla": tabla};
//    $.ajax({
//        data: parametros, url: "ajax/Encuestas.php", type: "POST",
//        success: function (response) {
//
//            $("#divData").html(response);
//            $('#ModalData').modal('show');
//        }
//    });
    $.ajax({
        type: 'POST',
        url: 'ajax/Encuestas.php',
        dataType: "json",
        data: parametros,
        success: function (data) {

            var tacometros = "<div class='row align-items-center justify-content-center'>";
            for (var i = 0; i < data.length; i++) {
                tacometros += '<div id="' + data[i]["preg"] + '" class=" col-md-6 col-lg-4"></div>';
            }
            tacometros += "</div>";
            $("#divData").html(tacometros);
            $('#ModalData').modal('show');
            tacometro(data);
        }
    });
}
function tacometro(data) {
    console.log(data);
    for (var i = 0; i < data.length; i++) {
        var valor = 0;
        valor = (data[i]["uno"] / (data[i]["uno"] + data[i]["cero"])) * 100;
        grafica(valor, data[i]["preg"], data[i]["atrib"]);
    }
}

function grafica(valor, grafica, atributo) {
    Highcharts.chart(grafica, {

        chart: {
            type: 'gauge',
            plotBackgroundColor: null,
            plotBackgroundImage: null,
            plotBorderWidth: 0,
            plotShadow: false
        },

        title: {
            text: grafica
        },

        pane: {
            startAngle: -90,
            endAngle: 90,
            background: [{
                    backgroundColor: {
                        linearGradient: {x1: 0, y1: 0, x2: 0, y2: 1},
                        stops: [
                            [0, '#FFF'],
                            [1, '#fff']
                        ]
                    },
                    borderWidth: 0,
                    outerRadius: '100%'
                }, {
                    backgroundColor: {
                        linearGradient: {x1: 0, y1: 0, x2: 0, y2: 1},
                        stops: [
                            [0, '#fff'],
                            [1, '#FFF']
                        ]
                    },
                    borderWidth: 0,
                    outerRadius: '100%'
                }, {
                    // default background
                }, {
                    backgroundColor: '#DDD',
                    borderWidth: 0,
                    outerRadius: '105%',
                    innerRadius: '103%'
                }]
        },

        // the value axis
        yAxis: {
            min: 0,
            max: 100,
            labels: {
                step: 1,
                rotation: 'auto'
            },
            title: {
                text: ''
            },
            plotBands: [{
                    from: 0,
                    to: 20,
                    color: '#E30E0E' // rojo
                }, {
                    from: 20,
                    to: 40,
                    color: '#F57F10' // tomate
                }, {
                    from: 40,
                    to: 60,
                    color: '#F6F319' // amarillo
                }, {
                    from: 60,
                    to: 80,
                    color: '#91EA5E' // yellow
                }, {
                    from: 80,
                    to: 100,
                    color: '#50C249' // verde
                }]
        },

        series: [{
                name: atributo,
                data: [0],
                tooltip: {
                    valueSuffix: ' %'
                }
            }]

    },
// Add some life
            function (chart) {
                if (!chart.renderer.forExport) {
                    setInterval(function () {
                        var point = chart.series[0].points[0],
                                newVal, inc = 0;

                        newVal = valor;

                        point.update(newVal);

                    }, 3000);
                }
            });
}
function Eliminar(codigo) {
    var parametros = {"Eliminar": true, "Codigo": codigo};

    Swal.fire({
        title: 'Esta Seguro que desea eliminar la Encuesta?',
        text: "Si continua se borrara todos los registros de la base de datos y la pagina web de esta encuesta.",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, Borrarlo!'
    }).then((result) => {
        if (result.isConfirmed) {
            $.ajax({
                data: parametros, url: "ajax/Encuestas.php", type: "POST",
                success: function (response) {
                    console.log(response);
                    if (response === 1 || response === "1") {
                        swal.fire("EN HORA BUENA...!", "LA ENCUESTA FUE ELIMINADA DE LA BASE DE DATOS", "success")
                                .then((value) => {
                                    Buscar();
                                });
                    } else {
                        swal.fire("ERROR...!", "No se pudo Concluir el Proceso Intentelo Mas Tarde...", "warning");
                    }
                }
            });
            Swal.fire(
                    'Eliminado!',
                    'Su Encuesta ha sido eliminado Completamente.',
                    'success'
                    );
        }
    });
}


function Ver(url) {

    window.open(url, "Encuestas", "width=800, height=600");
}
