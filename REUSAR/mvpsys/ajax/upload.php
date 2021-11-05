<?php
session_start();
if(!isset( $_SESSION["imagenes"])){
    $_SESSION["imagenes"][0]="";
}
$respuesta="";
if (($_FILES["file"]["type"] == "image/pjpeg")
    || ($_FILES["file"]["type"] == "image/jpeg")
    || ($_FILES["file"]["type"] == "image/png")
    || ($_FILES["file"]["type"] == "image/gif")) {
    if (move_uploaded_file($_FILES["file"]["tmp_name"], "../temp/".$_FILES['file']['name'])) {
        //more code here...
        $host= $_SERVER["HTTP_HOST"];
        $url= $_SERVER["REQUEST_URI"];
        $imagen=$_FILES['file']['name'];
        $respuesta=$imagen;
        $ax=count($_SESSION["imagenes"]);
        $_SESSION["imagenes"][$ax]=$imagen;
    } else {
        $respuesta="NULL";
    }
} else {
     $respuesta="NULL";
}
echo $respuesta;



