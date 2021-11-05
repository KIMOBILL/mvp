<?php
session_start();
include 'data/seguridad.php';
include 'layout/header.php';
?>
<script src="layout/jquery/FuncionesP.js" type="text/javascript"></script>
<script src="layout/jquery/encuestas.js" type="text/javascript"></script>
<script src="layout/jquery/cargarSelect.js" type="text/javascript"></script>
<?php
include 'layout/body.php';
?>
<div class="container">

    <div class="text-center"><br><br><h3><label>ENCUESTAS CREADAS</label></h3><br><br></div>
    <div class="card">
        <div class="card-body">       

            <div class="row">
                <div id='datatable' class="col-12">

                </div>
            </div>
        </div>
    </div>
    <div>
        <br><br>   
    </div>
    <div class="modal fade" id="ModalFiltros" tabindex="-1" aria-labelledby="ModalFoltros" aria-hidden="true">
        <div class="modal-dialog modal-dialog-scrollable modal-xl">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="ModalFiltros">Listado de Filtros</h5>
                </div>
                <div class="modal-body"> 
                    <label><h5>AÑADIR FILTRO</h5></label>
                    <div class="row">
                        
                        <div class="col-auto">
                            <div class="form-group">
                                <label for="AgenciaSelect">Agencia</label>
                                <select class="form-control" name="AgenciaSelect" id="AgenciaSelect"></select>
                            </div>
                        </div>
                        <div class="col-auto">
                            <div class="form-group">
                                <label for="SeccionSelect">Seccion</label>
                                <select class="form-control" name="SeccionSelect" id="SeccionSelect"></select>
                            </div>
                        </div>
                        <div class="col-auto">
                            <div class="form-group">
                                <label for="CanalSelect">Canal</label>
                                <select class="form-control" name="CanalSelect" id="CanalSelect"></select>
                            </div>
                        </div>
                        
                        <div class="col-auto">
                            <div class="form-group">
                                <label for="OtrosSelect">Otros</label>
                                <select class="form-control" name="OtrosSelect" id="OtrosSelect"></select>
                            </div>
                        </div>
                        <div class="col-auto">
                            <div class="form-group">
                                <label for="btnaddfiltro"></label>
                                <button type="button" class="form-control btn-success btn-" id="btnaddfiltro" onclick="AddFiltros();">Add Filtro</button>
                            </div>
                        </div>
                    </div>
                    <br>
                    <label><h5>LISTADO DE FILTROS ASIGNADOS</h5></label>
                    <div class="row table-responsive" id="divData"></div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                </div>
            </div>
        </div>
    </div>

    <div class="modal fade" id="ModalData" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-scrollable modal-xl">
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

    <?php
    include 'layout/footer.php';
    ?>
    <script>
        DataMenu();
        Buscar();
        selectAgencias();
        TraerEmpresa();
    </script>
</body>
</html>
