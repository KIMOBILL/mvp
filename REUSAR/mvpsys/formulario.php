<?php
session_start();
include 'data/seguridad.php';
include 'layout/header.php';
?>
<script src="layout/jquery/formulario.js" type="text/javascript"></script>
<script src="layout/jquery/FuncionesP.js" type="text/javascript"></script>
<script src="layout/jquery/selectIndicadores.js" type="text/javascript"></script>

<!--<script src="layout/jquery/main.js" type="text/javascript"></script>
<link rel="stylesheet" href="layout/css/main.css">-->
<?php
include 'layout/body.php';
?>
<!-- Modal -->
<div class="modal fade" id="staticBackdrop" tabindex="-1" role="dialog" aria-labelledby="staticBackdropLabel" aria-hidden="true">
    <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="staticBackdropLabel">DISEÑO DE PREGUNTAS</h5>
                <button type="button" class="close" data-bs-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
            </div>
            <div class="modal-body"> 
                <div class="col-12 grid-margin">
                <div class="card">
                    <div class="card-body">
                        <div class="form-group">
                            <label for[="SelectPreg">SELECCIONE LA PREGUNTA QUE DESEA CREAR</label>
                            <br>
                            <select class="form-control" id="SelectPreg" name="SelectPreg" onchange="CrearViewPregunta();">
                                <option value="Null"selected>Open this select menu</option>
                                <option value="1">Color de Fondo</option>
                                <option value="2">Color de Letras</option>
                                <option value="3">Logo o Imagen</option>
                                <option value="4">Titulos</option>
                                <option value="5">Subtitulos</option>
                                <option value="6">Descripción</option>
                                <option value="7">Dirección de correo electrónico</option>
                                <option value="8">Caja de comentarios</option>
                                <option value="9">Formulario de contacto</option>
                                <option value="10">Pregunta Simple</option>
                                <option value="11">Pregunta de Una sola Opción</option>
                                <option value="12">Pregunta de Una sola Opción con Respuesta</option>
                                <option value="13">Pregunta de Selección Multiple</option>
                                <option value="14">Preguntas Selectivas</option>
                                <option value="15">Calificación de estrellas</option>
                                <option value="16">Valoración de Smiley</option>
                                <option value="17">Pulgares arriba / abajo</option>
                            </select>
                        </div>                                            
                    </div>                   
                    <br>                
                    <div class="card-body" id='estructura'> 
                    </div>                
                </div>
                </div>    
            </div>        
            <div class="modal-footer">
                <div id="divButton"></div>                              
            </div>
        </div>
    </div>
</div>
<div class="container text-center">
    <br>
    <h3><b><label>DISEÑO DEL FORMULARIO DE ENCUESTAS</label></b></h3>
    <br>
    <div id="DesignFrom">
        <div class="container rounded-3" id="objetos" style="backgroundColor:#ffffff;color:#000000"></div>
    </div>
    <div>
        <tr><tr><tr><tr>
    </div>           

    <div>
        <button class="btn btn-outline-info" type="button" onclick="abrirmodal();">
            AGREGAR COMPONENTE
        </button>
        <button class="btn btn-outline-success" type="button" onclick="SaveForm();">
            GUARDAR FORMULARIO
        </button>
    </div>
</div>    
<?php
include 'layout/footer.php';
?>
<script>
    inicializar();
    DataMenu();
    BuscarIndicadores();
</script>
</body>
</html>