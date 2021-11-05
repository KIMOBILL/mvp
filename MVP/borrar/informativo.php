<?php
session_start();

include 'layout/header.php';
?>
<script src="layout/jquery/datastadist.js" type="text/javascript"></script>

<style>

    .highcharts-figure .chart-container {
        width: 300px;
        height: 200px;
        float: left;
    }
    #container {
        height: 400px;
    }
    .highcharts-figure, .highcharts-data-table table {
        width: 600px;
        margin: 0 auto;
    }

    /*.highcharts-figure, .highcharts-data-table table {
        min-width: 310px; 
        max-width: 800px;
        margin: 1em auto;
    }*/

    .highcharts-data-table table {
        font-family: Verdana, sans-serif;
        border-collapse: collapse;
        border: 1px solid #EBEBEB;
        margin: 10px auto;
        text-align: center;
        width: 100%;
        max-width: 500px;
    }

    .highcharts-data-table caption {
        padding: 1em 0;
        font-size: 1.2em;
/*        color: #fffff;*/
    }

    .highcharts-data-table th {
        font-weight: 600;
        padding: 0.5em;
    }

    .highcharts-data-table td, .highcharts-data-table th, .highcharts-data-table caption {
        padding: 0.5em;
    }
    .highcharts-data-table thead tr, .highcharts-data-table tr:nth-child(even) {
/*        background: #f8f8f8;*/
    }
    .highcharts-data-table tr:hover {
/*        background: #f1f7ff;*/
    }


    @media (max-width: 600px) {
        .highcharts-figure, .highcharts-data-table table {
            width: 100%;
        }
        .highcharts-figure .chart-container {
            width: 300px;
            float: none;
            margin: 0 auto;
        }

    }

</style>
<?php
include 'layout/body.php';
include 'layout/menu.php';
?>

<div class="modal fade" id="ModalData" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-scrollable">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">INFORMACIÓN INGRESADA</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <div id="divData"></div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            </div>
        </div>
    </div>
</div>


<div class="container-fluid ">
    <div class="row justify-content-end">   
        <div class="col-1">

            <select class="form-select" aria-label=".form-select-sm example" name="selectPeriodo" id="selectPeriodo" onchange="CargarAgencia()">

            </select>
        </div>
        <div class="col-1">
            <select class="form-select" aria-label=".form-select-sm example" name="selectAgencia" id="selectAgencia" onchange="CargarCanal()">

            </select>
        </div>
        <div class="col-1">
            <select class="form-select" aria-label=".form-select-sm example" name="selectCanal" id="selectCanal" onchange="CargarArea()"> </select>
        </div>
        <div class="col-1">
            <select class="form-select" aria-label=".form-select-sm example" name="selectArea" id="selectArea" onchange="CargarTIndicador()"></select>
        </div>

        <div class="col-1">
            <select class="form-select" aria-label=".form-select-sm example" name="selectTIndicador" id="selectTIndicador" onchange="CargarIndicador()">
            </select>
        </div>
        <div class="col-1">
            <select class="form-select" aria-label=".form-select-sm example" name="selectIndicador" id="selectIndicador" onchange="Calcular()">

            </select>
        </div>
        <div class="col-1">
            <select class="form-select" name="selectCalculo" id="selectCalculo" onchange="Calcular()">
                <option value="PB" selected>PB</option>
                <option value="KMB">KMB</option>
            </select>
        </div>
    </div>
</div>
<div class="container-fluid">
    <br>
</div>
<div class="container-fluid">
    <br>
    <div class="row" id="divTacometros"></div>
</div>
<div class="container-fluid">
    <br>
</div>
<div class="container-fluid">
    <br>
    <div class="container">
        <div class="row">
            
                <div id="divDiagrama1" class="col-md-6">
                    <div class="container">
                    <figure class="highcharts-figure">
                        <div id="divBarras"></div>
                        <p class="highcharts-description">                       
                        </p>
                    </figure>
                    </div>
                </div>   
            <div class="col-md-6 text-aling-center">
                <div class="container">
                    <div name="divTablero"  id="divTablero" ></div>
                </div>
            </div >
                
            
        </div>
    </div>
</div>
<?php
include 'layout/footer.php';
?>
<script src="https://code.highcharts.com/highcharts.js"></script>
<script src="https://code.highcharts.com/highcharts-more.js"></script>
<script src="https://code.highcharts.com/modules/solid-gauge.js"></script>
<script src="https://code.highcharts.com/modules/exporting.js"></script>
<script src="https://code.highcharts.com/modules/export-data.js"></script>
<script src="https://code.highcharts.com/modules/accessibility.js"></script>
<script>
                CargarPeriodo();
</script>
</body>
</html>