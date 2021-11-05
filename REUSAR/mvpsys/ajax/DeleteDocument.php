<?php
session_start();
if ((isset($_POST['ElImagen']))) {
    $respuesta="falso";
    $img = $_POST['Imagen'];
    $arreglo= array();
    $cont=0;
    if(isset($_SESSION["imagenes"])){
        $ax = count($_SESSION["imagenes"]);        
        for($i=0;$i<$ax;$i++){
            if(($_SESSION["imagenes"][$i])!=$img){
               $arreglo[$cont]= $_SESSION["imagenes"][$i];
               $cont++;
            }else{
                $host= $_SERVER["HTTP_HOST"];
                $url= $_SERVER["REQUEST_URI"];
                $ruta="../temp/".$img;
                $exists = is_file( $ruta );
                if($exists==true){
                    unlink($ruta);
                    $respuesta="true";
                }                
            }
        }
    }    
    echo $respuesta;
}

if ((isset($_POST['BorrarImg']))) {
    $respuesta="BACIO";
    if(isset($_SESSION["imagenes"])){
        $_SESSION["imagenes"]= array();
        $respuesta="BORRADO";
    } 
    echo $respuesta;
}