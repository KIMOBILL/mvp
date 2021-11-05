<?php require 'header.php'; ?>
<?php require 'menu.php'; ?>

<!-- partial -->
<div class="main-panel">
    <div class="content-wrapper">
        <div class="row">
            <div class="col-sm-2 col-md-2 col-lg-2 col-xl-2">
                <select class="btn btn-success btn-sm" name="selectPeriodo" id="selectPeriodo" onchange="CargarAgencia()"></select>
            </div>
            <div class="col-sm-2 col-md-2 col-lg-2 col-xl-2">
                <select class="btn btn-info btn-sm" name="selectAgencia" id="selectAgencia" onchange="CargarCanal()"></select>
            </div>
            <div class="col-sm-2 col-md-2 col-lg-2 col-xl-2">
                <select class="btn btn-light btn-sm" name="selectCanal" id="selectCanal" onchange="CargarArea()"> </select>
            </div>
            <div class="col-sm-2 col-md-2 col-lg-2 col-xl-2">
                <select class="btn btn-success btn-sm" name="selectArea" id="selectArea" onchange="CargarTIndicador()"></select>
            </div>
            <div class="col-sm-2 col-md-2 col-lg-2 col-xl-2">
                <select class="btn btn-info btn-sm" name="selectTIndicador" id="selectTIndicador" onchange="CargarIndicador()"></select>
            </div>
            <div class="col-sm-2 col-md-2 col-lg-2 col-xl-2">
                <select class="btn btn-light btn-sm" name="selectIndicador" id="selectIndicador" onchange="Calcular()"></select>
            </div>
            <div class="col-sm-2 col-md-2 col-lg-2 col-xl-2">
                <select class="btn btn-success btn-sm" name="selectCalculo" id="selectCalculo" onchange="Calcular()">
                    <option value="PB" selected>PB</option>
                    <option value="KMB">KMB</option>
                </select>
            </div>
        </div>
        <div class="row">
            <div class="row" id="divTacometros"></div>
        </div>
        <!--        <div class="row">
                    <div class="col-lg-6 grid-margin stretch-card">
                        <div class="card">
                            <div class="card-body">
                                <h4 class="card-title">Sample</h4>
                                <div class="mb-4" id="g1"></div>
                            </div>
        
                        </div>
                    </div>
                    <div class="col-lg-6 grid-margin stretch-card">
                        <div class="card">
                            <div class="card-body">
                                <h4 class="card-title">Sample</h4>
                                <div id="g3" class="gauge"></div>
                            </div>
                        </div>
                    </div>
        
                    <div class="col-lg-6 grid-margin stretch-card">
                        <div class="card">
                            <div class="card-body">
                                <h4 class="card-title">Sample</h4>
                                <div class="container text-center">
                                    <div id="g2" class="gauge"></div>
                                    <a href="#" class="btn btn-success" id="g2_refresh">Random Refresh</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>-->
    </div>
    <!-- content-wrapper ends -->
</div>
<!-- main-panel ends -->

<?php require 'footer.php'; ?>
