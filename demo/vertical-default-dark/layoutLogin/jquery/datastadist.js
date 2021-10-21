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
            CargarTIndicador();
        }
    });
}

function CargarTIndicador() {
    var periodo = document.getElementById("selectPeriodo").value;
    var agencia = document.getElementById("selectAgencia").value;
    var canal = document.getElementById("selectCanal").value;
    var area = document.getElementById("selectArea").value;
    var parametros = {"CargarTIndicador": true, "Periodo": periodo, "Agencia": agencia, "Canal": canal, "Area": area};
    $.ajax({
        type: 'POST',
        url: 'ajax/CargarSelect.php',
        dataType: "json",
        data: parametros,
        success: function (data) {
            BorrarSelect("selectTIndicador");
            const domElement = "selectTIndicador";
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
            CargarIndicador();
        }
    });
}
function CargarIndicador() {
    var periodo = document.getElementById("selectPeriodo").value;
    var agencia = document.getElementById("selectAgencia").value;
    var canal = document.getElementById("selectCanal").value;
    var area = document.getElementById("selectArea").value;
    var tindicador = document.getElementById("selectTIndicador").value;
    var parametros = {"CargarIndicador": true, "Periodo": periodo, "Agencia": agencia, "Canal": canal, "Area": area, "TIndicador": tindicador};
    $.ajax({
        type: 'POST',
        url: 'ajax/CargarSelect.php',
        dataType: "json",
        data: parametros,
        success: function (data) {
            BorrarSelect("selectIndicador");
            const domElement = "selectIndicador";
            var select = document.getElementsByName(domElement)[0];
            var option = document.createElement("option");
            option.selected = "true";
            option.text = "Indicador";
            option.value = "null";
            select.add(option);
            for (var i = 0; i < data.length; i++) {
                var option = document.createElement("option");
                if (data[i] == "SATISFACCION GENERAL") {
                    option.text = "INS";
                } else {
                    if (data[i] == "RECOMENDACIÓN" || data[i] == "RECOMENDACION") {
                        option.text = "NPS";
                    } else {
                        if (data[i] == "ESFUERZO") {
                            option.text = "CES";
                        } else {
                            option.text = data[i];
                        }
                    }
                }
                option.value = data[i];
                select.add(option);
            }
            Calcular();
        }
    });
}

function setdata() {
    var datos = new Array();
    datos[0] = document.getElementById("selectPeriodo").value;
    datos[1] = document.getElementById("selectAgencia").value;
    datos[2] = document.getElementById("selectCanal").value;
    datos[3] = document.getElementById("selectArea").value;
    datos[4] = document.getElementById("selectTIndicador").value;
    datos[5] = document.getElementById("selectIndicador").value;
    datos[6] = document.getElementById("selectCalculo").value;
    return datos;
}

function Calcular() {
    var datos = setdata();
    DatosTacometros(datos);
    DatosBarras(datos);
    DatosAgencias(datos, 1);
}

function DatosTacometros(datos) {
    var parametros = {"DatosTacometros": true, "Periodo": datos[0], "Agencia": datos[1],
        "Canal": datos[2], "Area": datos[3], "TIndicador": datos[4],
        "Indicador": datos[5], "Calculo": datos[6]};
    $.ajax({
        type: 'POST',
        url: 'ajax/Datastadist.php',
        dataType: "json",
        data: parametros,
        success: function (data) {
            console.log(data);
            var tacometros = "<div class='row align-items-center justify-content-center'>";
            for (var i = 0; i < data.length; i++) {
                tacometros += '<div  class=" col-md-6 col-lg-4">'
                        + '<figure class="highcharts-figure">'
                        + '<div id="' + data[i]["Indicador"] + '" class="chart-container"></div>'
                        + '</figure>'
                        + '</div>';
            }
            tacometros += "</div>";
            $("#divTacometros").html(tacometros);
            tacometro(data);
        }
    });
}
function tacometro(data) {
    for (var i = 0; i < data.length; i++) {
        var valor = 0;
        valor = (data[i]["Uno"] / (data[i]["Uno"] + data[i]["Cero"])) * 100;
        if (data[i]["Indicador"] == "CES" || data[i]["Indicador"] == "ESFUERZO") {
            GraficarTacometroCes(valor, data[i]["Indicador"]);
        } else {
            GraficarTacometro(valor, data[i]["Indicador"]);
        }

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

function GraficarTacometroCes(valor, grafica) {
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
                [0.9, '#DF5353'], // green
                [0.7, '#DDDF0D'], // yellow
                [0.1, '#55BF3B'] // red
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


function DatosBarras(datos) {
    var parametros = {"DatosBarras": true, "Periodo": datos[0], "Agencia": datos[1],
        "Canal": datos[2], "Area": datos[3], "TIndicador": datos[4],
        "Indicador": datos[5], "Calculo": datos[6]};
    $.ajax({
        type: 'POST',
        url: 'ajax/Datastadist.php',
        dataType: "json",
        data: parametros,
        success: function (data) {
            var PeriodosName = ClaPeriodo(data);
            var indicador = ClaIndicador(data);
            var valores = Traervalores(data, indicador);
            GraficarBarras(PeriodosName, valores);
        }
    });
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

function Traervalores(data, indicador) {
    var datos = new Array();
    for (var i = 0; i < indicador.length; i++) {
        var columnas = new Array();
        columnas["name"] = indicador[i];
        var datos2 = new Array();
        for (var i2 = 0; i2 < data.length; i2++) {
            var fila = data[i2]['datos'];
            var ax2 = 0;
            for (var j = 0; j < fila.length; j++) {
                if (fila[j]["Indicador"] == indicador[i]) {
                    var ax = datos2.length;
                    datos2[ax] = (fila[j]["Uno"] / (fila[j]["Uno"] + fila[j]["Cero"])) * 100;
                    ax2 = 1;
                }
            }
            if (ax2 == 0) {
                var ax = datos2.length;
                datos2[ax] = 0;
            }
        }
        columnas["data"] = datos2;
        datos[i] = columnas;
    }
    return datos;
}

function GraficarBarras(periodo, coordenadas) {
    var titulo = document.getElementById("selectTIndicador").value;
    Highcharts.chart('divBarras', {
        chart: {
            type: 'column'
        },
        title: {
            text: titulo
        },
        subtitle: {
            text: ''
        },
        xAxis: {
            categories: periodo,
            crosshair: true
        },
        yAxis: {
            min: 0,
            title: {
                text: 'Porcentaje'
            }
        },
        tooltip: {
            headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
            pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                    '<td style="padding:0"><b>{point.y:.1f} %</b></td></tr>',
            footerFormat: '</table>',
            shared: true,
            useHTML: true
        },
        plotOptions: {
            column: {
                pointPadding: 0.2,
                borderWidth: 0
            }
        },
        series: coordenadas
    });

}

function DatosAgencias(datos) {
    var parametros = {"DatosAgencias": true, "Periodo": datos[0], "Agencia": datos[1],
        "Canal": datos[2], "Area": datos[3], "TIndicador": datos[4],
        "Indicador": datos[5], "Calculo": datos[6]};
    $.ajax({
        type: 'POST',
        url: 'ajax/Datastadist.php',
        dataType: "json",
        data: parametros,
        success: function (data) {
            console.log(data);
            var IndicadorName = ClaIndicador(data);
            console.log(IndicadorName);
            var tablero = "<table class='table'><tr><th colspan='" + ((IndicadorName.length) + 1) + "' scope='col'><center>" + datos[4] + "</center></th></tr>";
            var tablero = tablero + "<tr><th scope='col'>AGENCIA : </th>";
            for (var i = 0; i < IndicadorName.length; i++) {
                tablero = tablero + "<th scope='col'><font size=1>" + IndicadorName[i] + "</font></th>";
            }
            tablero = tablero + "</tr><tbody>";
            var nregistros = data.length;
            var op2 = 0;
            if (nregistros > 6) {
                nregistros = 6;
                op2 = 1;
            }
            for (var i = 0; i < nregistros; i++) {
                tablero = tablero + "<tr><th><font size=1>" + data[i]["Agencia"] + "</font></th>";
                for (var j = 0; j < IndicadorName.length; j++) {
                    var SetData = data[i]["datos"];
                    for (var k = 0; k < SetData.length; k++) {
                        if (SetData[k]["Indicador"] == IndicadorName[j]) {
                            var valor = ((SetData[k]['Uno'] / (SetData[k]['Uno'] + SetData[k]['Cero'])) * 100);
                            var color = "";
                            if (valor < 60) {
                                color = "red";
                            } else {
                                if (valor >= 60 && valor < 80) {
                                    color = "Orange";
                                } else {
                                    if (valor >= 80 && valor <= 100) {
                                        color = "green";
                                    }
                                }
                            }
                            tablero = tablero + "<td scope='row'><b><font  color='" + color + "' size=1 >" + valor.toFixed(2) + " %</font></b></td>";
                        }
                    }
                }
                tablero = tablero + "</tr>";
            }
            if (op2 === 1) {
                tablero = tablero + "</tbody><tfooter><tr><td colspan='" + ((IndicadorName.length) + 1) + "'><a href='#' onclick='AbrirModal();'>ver mas...</a></td></tr></tfooter></table>";
            } else {
                tablero = tablero + "</tbody></table>";
            }
            $("#divTablero").html(tablero);

        }
    });
}

function DatosAgencias2(datos) {
    var parametros = {"DatosAgencias": true, "Periodo": datos[0], "Agencia": datos[1],
        "Canal": datos[2], "Area": datos[3], "TIndicador": datos[4],
        "Indicador": datos[5], "Calculo": datos[6]};
    $.ajax({
        type: 'POST',
        url: 'ajax/Datastadist.php',
        dataType: "json",
        data: parametros,
        success: function (data) {
            var IndicadorName = ClaIndicador(data);
            console.log(IndicadorName);
            var tablero = "<table class='table'><tr><th scope='col'>AGENCIA :</th>";
            for (var i = 0; i < IndicadorName.length; i++) {
                tablero = tablero + "<th scope='col'><font size=2>" + IndicadorName[i] + "</font></th>";
            }
            tablero = tablero + "</tr><tbody>";
            var nregistros = data.length;
            for (var i = 0; i < nregistros; i++) {
                tablero = tablero + "<tr><th><font size=2>" + data[i]["Agencia"] + "</font></th>";
                for (var j = 0; j < IndicadorName.length; j++) {
                    var SetData = data[i]["datos"];
                    for (var k = 0; k < SetData.length; k++) {
                        if (SetData[k]["Indicador"] == IndicadorName[j]) {
                            var valor = ((SetData[k]['Uno'] / (SetData[k]['Uno'] + SetData[k]['Cero'])) * 100);
                            var color = "";
                            if (valor < 60) {
                                color = "red";
                            } else {
                                if (valor >= 60 && valor < 80) {
                                    color = "Orange";
                                } else {
                                    if (valor >= 80 && valor <= 100) {
                                        color = "green";
                                    }
                                }
                            }
                            tablero = tablero + "<td scope='row'><center><b><font  color='" + color + "' size=2 >" + valor.toFixed(2) + " %</font></b></center></td>";
                        }
                    }
                }
                tablero = tablero + "</tr>";
            }
            tablero = tablero + "</tbody></table>";
            document.getElementById('exampleModalLabel').innerHTML = "RESULTADOS DE " + datos[4];
            $("#divData").html("");
            $("#divData").html(tablero);
            $('#ModalData').modal('show');

        }
    });
}

function AbrirModal() {
    var datos = setdata();
    DatosAgencias2(datos);
}

function Verbati() {
    var datos = setdata();

}

function BorrarSelect(Nombre) {
    const $select = document.querySelector("#" + Nombre);
    for (let i = $select.options.length; i >= 0; i--) {
        $select.remove(i);
    }
}
