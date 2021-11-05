<?php
include '../Data/Encriptar.php';
if ((isset($_POST['Enviar']))) {
    $nombre=$_POST['Nombre'];
    $direccion=$_POST['Direccion'];
    $email=$_POST['Email'];
    $web=$_POST['Web'];
    $nick=$_POST['Nick'];
    $clave=Passwords::encryption($_POST['Pass']);
    $respuesta=0;
    include '../data/Connection.php';    
    $consulta = "CALL EMPRESAS_INSERT('".$nombre."','".$direccion."','".$email."','".$web."','".$nick."','".$clave."')" ;
    if (($segmento = $conexion->query($consulta))) {
        while ($obj = $segmento->fetch_object()) {
            $respuesta =$obj->msn;            
        }
        $segmento->close();
    }    
    echo $respuesta;
}
