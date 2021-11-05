<?php

require '../config/connection.php';
session_start();
date_default_timezone_set("America/Lima");
$_SESSION['usuario'];
$_SESSION['nombres'];
$_SESSION['estado'];
$enddate = date('Y-m-d H:i:s');
$_SESSION['desrol'];
$_SESSION['idSession'];

// -- eliminamos la sesión del usuario
if (isset($_SESSION['usuario'])) {
    unset($_SESSION['usuario']);
    unset($_SESSION['nombres']);
    unset($_SESSION['estado']);
    unset($_SESSION['desrol']);
    unset($_SESSION['idSession']);
}
if(isset($_SESSION['usuario']) == false){
    session_regenerate_id();
}
session_destroy();
header('location: ../views/login.php');
exit();
?>
