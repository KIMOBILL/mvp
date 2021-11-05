<?php
session_start();
include '../data/Connectiondata.php'; 
if ((isset($_POST['BuscarIndicadores']))) {
    $empresa=$_SESSION['IdEmp'];
    $data = array();     
    $cont=0;
    $consulta = "select cod_indicador,indicador,siglas from view_indicadores where cod_empresa=".$empresa." and estado=1 and esta_indicador=1 and esta_tipoindicador=1" ;
    if (($segmento = $conexion->query($consulta))) {
        while ($obj = $segmento->fetch_object()) {
             $dataset = array();
             $dataset["codigo"]=$obj->cod_indicador;
             $dataset["indicador"]=$obj->indicador;
             $dataset["siglas"]=$obj->siglas;
             $data[$cont]=$dataset;
             $cont++;
        }
        $segmento->close();
    }    
    echo json_encode($data);
}
