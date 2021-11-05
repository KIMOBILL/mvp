<?php
require '../config/connection.php';
$data = ejecutarJson('SELECT * FROM mvp.data;');
?>
<?php require 'header.php'; ?>
<?php require 'menu.php'; ?>
<script src="./scripts/dashboard.js"></script>

<div class="main-panel">
    <div class="content-wrapper">
        <div class="row">
            <div class="col-sm">
                <label for="periodoSelect">Periodo</label>
                <select class="form-control form-control-sm" id="periodoSelect">
                </select>
            </div>
            <div class="col-sm">
                <label for="agenciaSelect">Agencia</label>
                <select class="form-control form-control-sm" id="agenciaSelect">
                </select>
            </div>
            <div class="col-sm">
                <label for="canalSelect">Canal</label>
                <select class="form-control form-control-sm" id="canalSelect">
                </select>
            </div>
            <div class="col-sm">
                <label for="areaSelect">Area</label>
                <select class="form-control form-control-sm" id="areaSelect">
                </select>
            </div>
            <div class="col-sm">
                <label for="indicadorSelect">Indicador</label>
                <select class="form-control form-control-sm" id="indicadorSelect">
                </select>
            </div>
        </div>
    </div>
</div>

<?php require 'footer.php'; ?>

<script>
    var data = <?= $data ?>;
    var select = fillSelects(data);

    select[0].forEach(element => {
        $('#agenciaSelect').append($('<option />', {
            text: element,
            value: element,
        }));
    });
    select[1].forEach(element => {
        $('#areaSelect').append($('<option />', {
            text: element,
            value: element,
        }));
    });
    select[2].forEach(element => {
        $('#canalSelect').append($('<option />', {
            text: element,
            value: element,
        }));
    });
    select[3].forEach(element => {
        $('#periodoSelect').append($('<option />', {
            text: element,
            value: element,
        }));
    });
    select[4].forEach(element => {
        $('#indicadorSelect').append($('<option />', {
            text: element,
            value: element,
        }));
    });
</script>