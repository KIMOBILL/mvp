var listIndicador=new Array();
function BuscarIndicadores() {
    var parametros = {"BuscarIndicadores": true};
    $.ajax({
        type: 'POST',
        url: 'ajax/Indicadores.php',
        dataType: "json",
        data: parametros,
        success: function (data) {
            listIndicador=data;
            console.log(listIndicador);
        }
    });
}

