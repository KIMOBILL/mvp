<?php
session_start();
if(isset($_SESSION['IdUser'])){
    unset($_SESSION['IdUser']);
}
if(isset($_SESSION['Empresa'])){
    unset($_SESSION['Empresa']);
}
include '../data/Connection.php';
include '../Data/Encriptar.php';
if((isset($_POST['Login']))){
    $respuesta=0;
    $usuario=$_POST['Usuario'];
    $pass=Passwords::encryption($_POST['Pass']);
    $consulta="CALL Login('".$usuario."','".$pass."')";
    if (($segmento = $conexion->query($consulta))) {
        while ($obj = $segmento->fetch_object()) {
                $respuesta= $obj->msn;
                if($respuesta==1){
                    $_SESSION['IdUser']=$obj->codUser;
                    $_SESSION['Empresa']=$obj->empresa;
                    $_SESSION['Web']=$obj->web;
                }
        }
        $segmento->close();
    } 
    echo $respuesta;
}
