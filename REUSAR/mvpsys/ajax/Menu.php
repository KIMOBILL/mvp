<?php
include '../data/Connectiondata.php';
if ((isset($_POST['DataMenu']))) {
    session_start();
    $data = array();
    $CodRol =$_SESSION['IdRol'];
    $consulta = "CALL MENU('" . $CodRol . "')";
    if (($segmento = $conexion->query($consulta))) {
        while ($obj = $segmento->fetch_object()) {
            $data2 = array();
            $data2['Codigo'] = $obj->codigo;
            $data2['Menu'] = $obj->menu;
            $data2['Icono'] = $obj->icono;
            $data2['Url'] = $obj->url;
            $data2['Padre'] = $obj->padre;
            $contador = count($data);
            $data[$contador] = $data2;
        }
        $segmento->close();
    } else {
        $data2 = array();
        $data2['Codigo'] = 0;
        $data2['Menu'] = "null";
        $data2['Icono'] = "null";
        $data2['Url'] = "null";
        $data2['Padre'] = "null";
        $contador = count($data);
        $data[$contador] = $data2;
    }
    echo json_encode($data);
}



