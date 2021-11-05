<?php

require '../config/connection.php';

// data sent from form login.php
$Id = isset($_POST["txtUsuario"]) ? LimpiarCadena($_POST["txtUsuario"]) : "";
$password = isset($_POST["txtPass"]) ? LimpiarCadena($_POST["txtPass"]) : "";

function desencriptar($texto) {
    $key = 'sIst2m1s2020';  // Una clave de codificacion, debe usarse la misma para encriptar y desencriptar
    list($encrypted_data, $iv) = explode('::', base64_decode($texto), 2);
    return openssl_decrypt($encrypted_data, 'aes-256-cbc', $key, 0, $iv);
}

function encriptar($texto) {
    $key = 'sIst2m1s2020';  // Una clave de codificacion, debe usarse la misma para encriptar y desencriptar
    $iv = substr(hash('sha256', $key), 0, 16);
    $encrypted = openssl_encrypt($texto, 'aes-256-cbc', $key, 0, $iv);
    return base64_encode($encrypted . '::' . $iv);
}

//datos de prueba
//echo encriptar("mviera");
//echo("<br>");
//echo desencriptar("cVhlQ3MyaVBvdTZZRmgycWlaWUNaUT09Ojo1YWQ1MzAxMWNkODU5NzU2");


$result = ejecutarConsultaSimple("CALL MVP.Login('".encriptar($Id)."','".encriptar($password)."')");

// Variable $pass almacena la password del usuario
$user = desencriptar($result['usuario']);
$pass = desencriptar($result['clave']);

/*  verificamos que la clave y usuario ingresada es igual a la de la DB  */
if ($_POST["txtPass"] == $pass && isset($_POST["txtUsuario"]) == $user) {
    if ($result['estado'] == '1') {
        session_start();
        $idSession = session_id();
        date_default_timezone_set("America/Lima");
        $_SESSION['logged_in'] = true;
        $_SESSION['usuario'] = $user;
        $_SESSION['nombres'] = $result['Nombres'];
        $_SESSION['start'] = date('Y-m-d H:i:s');
        $_SESSION['rol'] = $result['CodRol'];
        $_SESSION['desrol'] = $result['Rol'];
        $_SESSION['idSession'] = $idSession;
        echo "<script>location.href='../views/begin.php' </script>";
//        ejecutarConsulta("INSERT INTO session(SessionId, Usuario, Estado, TmStmp) VALUES ('$_SESSION[idSession1]','$_SESSION[usu1]','$_SESSION[state1]','$_SESSION[start1]')");
    } else {
        echo "<script> alert('Usuario inactivo, comuníquese con el administrador!');
            location.href='../views/login.php' 
            </script>";
    }
} else {
    echo "<script> alert('Usuario o contraseña son incorrectas!');
            location.href='../views/login.php' 
            </script>";
}
?>