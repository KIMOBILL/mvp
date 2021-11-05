<?php
include '../data/Connectiondata.php';
if ((isset($_POST['DataPrivilegios']))) {
    session_start();
    $data = array();
    $CodRol = $_SESSION['IdRol'];
    $pagina=$_POST['NamePage'];
    $cont=0;
    $consulta = "CALL PRIVILEGIOS(" . $CodRol.",'".$pagina. "')";
    if (($segmento = $conexion->query($consulta))) {
        while ($obj = $segmento->fetch_object()) {
            $data2 = array();
            $data2['Inesertar'] = $obj->Insertar;
            $data2['Modificar'] = $obj->Modificar;
            $data2['Eliminar'] = $obj->Eliminar;            
            $data[0] = $data2;
        }
        $segmento->close();
    } else {
        $data2 = array();
        $data2['Inesertar'] = 0;
        $data2['Modificar'] = 0;
        $data2['Eliminar'] = 0;
        $contador = count($data);
        $data[0] = $data2;
    }
    echo json_encode($data);
}
?>
