<?php

try {
    $servidor = '172.19.10.124:3306';
    $usuario = 'Conexion';
    $pass = 'Kimobill2021';
    $db = 'encuestas';
    $conexion = new mysqli($servidor, $usuario, $pass, $db);  
    if ($conexion->connect_errno) {
        echo '<script>alert("NO SE PUDO CONECTAR A LA BASE DE DATOS");</script>';
    }
} catch (Exception $ex) {
    echo '<script>alert("ERROR AL MOMENTO AL CONECTAR CON EL GESTOR DE BASE DE DATOS");</script>';
}
?>
