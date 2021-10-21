function CargarPeriodo() {
    var meses = new Array();
    meses[0] = "ENERO 2021";
    meses[1] = "FEBRERO 2021";
    meses[2] = "MARZO 2021";
    meses[3] = "ABRIL 2021";
    meses[4] = "MAYO 2021";
    meses[5] = "JUNIO 2021";
    meses[6] = "JULIO 2021";
    meses[7] = "AGOSTO 2021";
    meses[8] = "SEPTIEMBRE 2021";
    meses[9] = "OCTUBRE 2021";
    meses[10] = "NOVIEMBRE 2021";
    meses[11] = "DICIEMBRE 2021";
    var parametros = {"CargarPeriodo": true};
    $.ajax({
        type: 'POST',
        url: 'ajax/CargarSelect.php',
        dataType: "json",
        data: parametros,
        success: function (data) {
            BorrarSelect("selectPeriodo");
            const domElement = "selectPeriodo";
            var select = document.getElementsByName(domElement)[0];
            var option = document.createElement("option");
            option.selected = "true";
            option.text = "Periodo";
            option.value = "null";
            select.add(option);
            for (var j = 0; j < meses.length; j++) {
                for (var i = 0; i < data.length; i++) {
                    if (meses[j] === data[i]) {
                        var option = document.createElement("option");
                        option.text = data[i];
                        option.value = data[i];
                        select.add(option);
                    }

                }
            }

            CargarAgencia();
        }
    });
}

function CargarAgencia() {
    var periodo = document.getElementById("selectPeriodo").value;
    var parametros = {"CargarAgencia": true, "Periodo": periodo};
    $.ajax({
        type: 'POST',
        url: 'ajax/CargarSelect.php',
        dataType: "json",
        data: parametros,
        success: function (data) {
            BorrarSelect("selectAgencia");
            const domElement = "selectAgencia";
            var select = document.getElementsByName(domElement)[0];
            var option = document.createElement("option");
            option.selected = "true";
            option.text = "Agencia";
            option.value = "null";
            select.add(option);
            for (var i = 0; i < data.length; i++) {
                var option = document.createElement("option");
                option.text = data[i];
                option.value = data[i];
                select.add(option);
            }
            CargarCanal();
        }
    });
}

function CargarCanal() {
    var periodo = document.getElementById("selectPeriodo").value;
    var agencia = document.getElementById("selectAgencia").value;
    var parametros = {"CargarCanal": true, "Periodo": periodo, "Agencia": agencia};
    $.ajax({
        type: 'POST',
        url: 'ajax/CargarSelect.php',
        dataType: "json",
        data: parametros,
        success: function (data) {
            BorrarSelect("selectCanal");
            const domElement = "selectCanal";
            var select = document.getElementsByName(domElement)[0];
            for (var i = 0; i < data.length; i++) {
                if (i === 0) {
                    const option = document.createElement('option');
                    option.selected = "true";
                    option.text = data[i];
                    option.value = data[i];
                    select.appendChild(option);
                } else {
                    const option = document.createElement('option');
                    option.text = data[i];
                    option.value = data[i];
                    select.appendChild(option);
                }
            }
            CargarArea();
        }
    });
}

function CargarArea() {
    var periodo = document.getElementById("selectPeriodo").value;
    var agencia = document.getElementById("selectAgencia").value;
    var canal = document.getElementById("selectCanal").value;
    var parametros = {"CargarArea": true, "Periodo": periodo, "Agencia": agencia, "Canal": canal};
    $.ajax({
        type: 'POST',
        url: 'ajax/CargarSelect.php',
        dataType: "json",
        data: parametros,
        success: function (data) {
            BorrarSelect("selectArea");
            const domElement = "selectArea";
            var select = document.getElementsByName(domElement)[0];
            for (var i = 0; i < data.length; i++) {
                if (i === 0) {
                    const option = document.createElement('option');
                    option.selected = "true";
                    option.text = data[i];
                    option.value = data[i];
                    select.appendChild(option);
                } else {
                    const option = document.createElement('option');
                    option.text = data[i];
                    option.value = data[i];
                    select.appendChild(option);
                }
            }
            Calcular();
        }
    });
}


//function CargarIndicador() {
//    var periodo = document.getElementById("selectPeriodo").value;
//    var agencia = document.getElementById("selectAgencia").value;
//    var canal = document.getElementById("selectCanal").value;
//    var area = document.getElementById("selectArea").value;
//    var tindicador = document.getElementById("selectTIndicador").value;
//    var parametros = {"CargarIndicador": true, "Periodo": periodo, "Agencia": agencia, "Canal": canal, "Area": area, "TIndicador": tindicador};
//    $.ajax({
//        type: 'POST',
//        url: 'ajax/Busqueda2.php',
//        dataType: "json",
//        data: parametros,
//        success: function (data) {
//            console.log(data);
//        }
//    });
//}


function setdata() {
    var datos = new Array();
    datos[0] = document.getElementById("selectPeriodo").value;
    datos[1] = document.getElementById("selectAgencia").value;
    datos[2] = document.getElementById("selectCanal").value;
    datos[3] = document.getElementById("selectArea").value;
    datos[4] = document.getElementById("selectIndicador").value;
    return datos;
}

function Calcular() {
    var datos = setdata();
    clasificacionVerb(datos);
}

function clasificacionVerb(datos) {
    var parametros = {"DatosVerb": true, "Periodo": datos[0], "Agencia": datos[1],
        "Canal": datos[2], "Area": datos[3], "Indicador": datos[4]};
    $.ajax({
        type: 'POST',
        url: 'ajax/Analisisdata.php',
        dataType: "json",
        data: parametros,
        success: function (data) {
            console.log(data);
            var positivo = 0;
            var negativo = 0;
            var neutral = 0;
            for (var i = 0; i < data.length; i++) {
                if (data[i]["estado"] === "POSITIVA") {
                    positivo = positivo + 1;
                } else {
                    if (data[i]["estado"] === "NEGATIVA") {
                        negativo = negativo + 1;
                    } else {
                        neutral = neutral + 1;
                    }
                }
            }
            var total = positivo + negativo + neutral;
            var datos = new Array();
            var datos1 = new Array();
            datos1["Indicador"] = "POSITIVOS";
            datos1["valor"] = positivo;
            datos1["total"] = total;
            datos[0] = datos1;
            var datos2 = new Array();
            datos2["Indicador"] = "NEGATIVOS";
            datos2["valor"] = negativo;
            datos2["total"] = total;
            datos[1] = datos2;
            var datos3 = new Array();
            datos3["Indicador"] = "NEUTROS";
            datos3["valor"] = neutral;
            datos3["total"] = total;
            datos[2] = datos3;
            var tacometros = "<div class='row align-items-center justify-content-center'>";
            for (var i = 0; i < datos.length; i++) {
                tacometros += '<div  class=" col-md-6 col-lg-4">'
                        + '<figure class="highcharts-figure">'
                        + '<div id="' + datos[i]["Indicador"] + '" class="chart-container"></div>'
                        + '</figure>'
                        + '</div>';
            }
            tacometros += "</div>";
            $("#divTacometros").html(tacometros);
            tacometro(datos);
            tabledata();
        }
    });
}

function tabledata() {
    var op = document.getElementById("selectTvalor").value;
    var datos = setdata();
    traerdatatable(datos, op);
}

function traerdatatable(datos, op) {
    var parametros = {"DatosVerb": true, "Periodo": datos[0], "Agencia": datos[1],
        "Canal": datos[2], "Area": datos[3], "Indicador": datos[4]};
    $.ajax({
        type: 'POST',
        url: 'ajax/Analisisdata.php',
        dataType: "json",
        data: parametros,
        success: function (data) {
            
            var detalledata = "<div class=' table-responsive align-items-center justify-content-center'>"
                    +"<table class='table table-striped'><tbody><tr><th>AGENCIA</th><th>OBSERVACIÓN</th><th>CALIFICATIVO</th></tr></tbody>"
                    +"<tbody>";
            for (var i = 0; i < data.length; i++) {
                if (op === "TODOS") {
                    detalledata=detalledata+"<tr><td>"+data[i]["Agencia"]+"</td><td>"+data[i]["frase"]+"</td><td>"+data[i]["estado"]+"</td></tr>";
                } else {
                    if (data[i]["estado"] === op) {
                        detalledata=detalledata+"<tr><td>"+data[i]["Agencia"]+"</td><td>"+data[i]["frase"]+"</td><td>"+data[i]["estado"]+"</td></tr>";
                    }
                }
            }
            detalledata=detalledata+"</tbody></table></div>";
            $("#divtable").html(detalledata);

        }
    });
}

function tacometro(data) {
    for (var i = 0; i < data.length; i++) {
        var valor = 0;
        valor = ((data[i]["valor"] * 100) / data[i]["total"]);
        GraficarTacometro(valor, data[i]["Indicador"]);


    }
}

function GraficarTacometro(valor, grafica) {
    var gaugeOptions = {
        chart: {type: 'solidgauge'}, title: null,
        pane: {
            center: ['50%', '85%'],
            size: '140%',
            startAngle: -90,
            endAngle: 90,
            background: {backgroundColor: '#EEE', innerRadius: '60%', outerRadius: '100%', shape: 'arc'}
        },

        exporting: {enabled: false},
        tooltip: {enabled: false},

        // the value axis
        yAxis: {
            stops: [
                [0.1, '#DF5353'], // green
                [0.5, '#DDDF0D'], // yellow
                [0.9, '#55BF3B'] // red
            ]
            ,
            lineWidth: 0,
            tickWidth: 0,
            minorTickInterval: null,
            tickAmount: 2,
            title: {y: -70},
            labels: {y: 16}
        },

        plotOptions: {solidgauge: {dataLabels: {y: 5, borderWidth: 0, useHTML: true}}}
    };

    var chartSpeed = Highcharts.chart(grafica, Highcharts.merge(gaugeOptions, {
        yAxis: {min: 0, max: 100, title: {text: grafica}},

        credits: {
            enabled: false
        },

        series: [{
                name: grafica, data: [80],
                dataLabels: {
                    format:
                            '<div style="text-align:center">' +
                            '<span style="font-size:20px">' + valor.toFixed(2) + '</span>' +
                            '<span style="font-size:20px">%</span><br>' +
//                            '<span style="font-size:12px;opacity:0.4">' + grafica + '</span>' +
                            '</div>'
                },
                tooltip: {valueSuffix: ' %'}
            }]

    }));

    var point, newVal, inc;
    if (chartSpeed) {
        point = chartSpeed.series[0].points[0];
        inc = 0;
        newVal = valor;
        point.update(newVal);
    }
}





function ClaPeriodo(data) {
    var meses = new Array();
    meses[0] = "ENERO 2021";
    meses[1] = "FEBRERO 2021";
    meses[2] = "MARZO 2021";
    meses[3] = "ABRIL 2021";
    meses[4] = "MAYO 2021";
    meses[5] = "JUNIO 2021";
    meses[6] = "JULIO 2021";
    meses[7] = "AGOSTO 2021";
    meses[8] = "SEPTIEMBRE 2021";
    meses[9] = "OCTUBRE 2021";
    meses[10] = "NOVIEMBRE 2021";
    meses[11] = "DICIEMBRE 2021";
    var Periodo = new Array();
    for (var i = 0; i < meses.length; i++) {
        for (var j = 0; j < data.length; j++) {
            if (meses[i] === data[j]['Periodo']) {
                var cont = Periodo.length;
                Periodo[cont] = data[j]['Periodo'];
            }

        }
    }
    return Periodo;
}

function ClaIndicador(data) {
    var indicador = new Array();
    for (var i = 0; i < data.length; i++) {
        var datos = data[i]['datos'];
        for (var j = 0; j < datos.length; j++) {
            var cont = indicador.length;
            if (cont > 0) {
                var aux = 0;
                for (var k = 0; k < indicador.length; k++) {
                    if (indicador[k] == datos[j]['Indicador']) {
                        aux = 1;
                    }
                }
                if (aux == 0) {
                    var fila = indicador.length;
                    ;
                    indicador[fila] = datos[j]['Indicador'];
                }
            } else {
                indicador[0] = datos[j]['Indicador'];
            }
        }
    }
    return indicador;
}

function BorrarSelect(Nombre) {
    const $select = document.querySelector("#" + Nombre);
    for (let i = $select.options.length; i >= 0; i--) {
        $select.remove(i);
    }
}



























//function grafica(valor, grafica, atributo) {
//    Highcharts.chart(grafica, {
//
//        chart: {
//            type: 'gauge',
//            plotBackgroundColor: null,
//            plotBackgroundImage: null,
//            plotBorderWidth: 0,
//            plotShadow: false
//        },
//
//        title: {
//            text: grafica
//        },
//
//        pane: {
//            startAngle: -90,
//            endAngle: 90,
//            background: [{
//                    backgroundColor: {
//                        linearGradient: {x1: 0, y1: 0, x2: 0, y2: 1},
//                        stops: [
//                            [0, '#FFF'],
//                            [1, '#fff']
//                        ]
//                    },
//                    borderWidth: 0,
//                    outerRadius: '100%'
//                }, {
//                    backgroundColor: {
//                        linearGradient: {x1: 0, y1: 0, x2: 0, y2: 1},
//                        stops: [
//                            [0, '#fff'],
//                            [1, '#FFF']
//                        ]
//                    },
//                    borderWidth: 0,
//                    outerRadius: '100%'
//                }, {
//                    // default background
//                }, {
//                    backgroundColor: '#DDD',
//                    borderWidth: 0,
//                    outerRadius: '105%',
//                    innerRadius: '103%'
//                }]
//        },
//
//        // the value axis
//        yAxis: {
//            min: 0,
//            max: 100,
//            labels: {
//                step: 1,
//                rotation: 'auto'
//            },
//            title: {
//                text: ''
//            },
//            plotBands: [{
//                    from: 0,
//                    to: 20,
//                    color: '#E30E0E' // rojo
//                }, {
//                    from: 20,
//                    to: 40,
//                    color: '#F57F10' // tomate
//                }, {
//                    from: 40,
//                    to: 60,
//                    color: '#F6F319' // amarillo
//                }, {
//                    from: 60,
//                    to: 80,
//                    color: '#91EA5E' // yellow
//                }, {
//                    from: 80,
//                    to: 100,
//                    color: '#50C249' // verde
//                }]
//        },
//
//        series: [{
//                name: atributo,
//                data: [0],
//                tooltip: {
//                    valueSuffix: ' %'
//                }
//            }]
//
//    },
//// Add some life
//            function (chart) {
//                if (!chart.renderer.forExport) {
//                    setInterval(function () {
//                        var point = chart.series[0].points[0],
//                                newVal, inc = 0;
//
//                        newVal = valor;
//
//                        point.update(newVal);
//
//                    }, 3000);
//                }
//            });
//}
