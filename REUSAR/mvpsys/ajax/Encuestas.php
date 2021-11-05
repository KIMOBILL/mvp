<?php

session_start();

if ((isset($_POST['Buscar']))) {
    include '../data/Connectiondata.php';
    $consulta = "SELECT cod_encuesta,encuesta,fecha,url,esta_encuesta from view_infoencuestas where idempresa=".$_SESSION["IdEmp"];    
    $ventana = "";
    $ventana .= '<div class="table-responsive">'
            . '<table name="order-listing" id="order-listing" class="table">';
    $ventana .= '<thead>';
    $ventana .= '<tr>'
            . '<th>#</th>'
            . '<th>ENCUESTA</th>'
            . '<th>FECHA DE CREACIÓN</th>'
            . '<th>ESTADO</th>'
            . '<th>FUNCIONES</th>'
            . '</tr>';
    $ventana .= '</thead>';
    $ventana .= '<tbody>';
    $cotador = 0;    
    if (($segmento = $conexion->query($consulta))) {
        while ($obj = $segmento->fetch_object()) {
            $cotador++;
            $ventana .= "<tr>";
            $ventana .= '<th>' . $cotador . '</th>';
            $ventana .= '<td>' . $obj->encuesta . '</td>';
            $ventana .= '<td>' . $obj->fecha . '</td>';
            $NomForm = str_replace(" ", "_", $obj->encuesta);
            if($obj->esta_encuesta==1){
                $ventana .= '<th><label class="badge badge-info">Activo</label></th>';
            }else{
                $ventana .= '<th><label class="badge badge-danger">Activo</label></th>';                
            }
            $ventana .= '<td>';            
            $ventana .= '<button class="btn btn-inverse-primary" title="Ver Encuesta" onclick=" Ver('."'encuestas/".$_SESSION['Empresa']."/".$NomForm."/" . $obj->url."'" . ');">Ver Form</button>';
            $ventana .= '<button class="btn btn-inverse-warning" title="Filtros Asignados" onclick=" Filtros(' . $obj->cod_encuesta . ');">Filtros</button>';
            $ventana .= '<button class="btn btn-inverse-info" title="Información Ingresada" onclick=" Información(' . $obj->cod_encuesta . ');">Data</button>';
            $ventana .= '<button class="btn btn-inverse-success" title="Resumen Estadistico" onclick=" Estadisticos(' . $obj->cod_encuesta . ');">Informativo</button>';            
            $ventana .= '<button class="btn btn-inverse-danger" title="Eliminar Encuesta" onclick=" Eliminar(' . $obj->cod_encuesta . ');">Delete</button>';
            $ventana .= '</td>';
            $ventana .= "<tr>";
            
        }
        $segmento->close();
    }
    $ventana .= '</tbody></table></div>';
    echo $ventana;
}


if ((isset($_POST['Eliminar']))) {
    $Id = $_POST['Codigo'];
    $respuesta = 0;
    include '../data/Connectiondata.php';
    $consulta = "call ENCUESTADELETE(" . $Id . ")";
    if (($segmento = $conexion->query($consulta))) {
        while ($obj = $segmento->fetch_object()) {
            if ($obj->msn == 1) {
                $NomForm = str_replace(" ", "_", $obj->Nombre);
                BorrarDirectorio('../encuestas/' . $_SESSION["Empresa"] . '/' . $NomForm);
                $respuesta=1;
            }
        }
        $segmento->close();
    }
    echo $respuesta;
}




function BorrarDirectorio($dir) {
    if ($handle = opendir($dir)) {
        while ((($file = readdir($handle)) !== false)) {
            if ($file != '.' && $file != '..') {
                if (is_dir($dir . '/' . $file)) {
                    $result = BorrarDirectorio($dir . '/' . $file);
                } else {
                    $result = unlink($dir . '/' . $file);
                }
            }
        }
        closedir($handle);
        rmdir($dir);
    }
}
