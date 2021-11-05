<?php

function Session() {
    session_start();

    if (isset($_SESSION['IdRol'])) {
        unset($_SESSION['IdRol']);
    }
    if (isset($_SESSION['Rol'])) {
        unset($_SESSION['Rol']);
    }
    if (isset($_SESSION['IdUser'])) {
        unset($_SESSION['IdUser']);
    }
    if (isset($_SESSION['Nombres'])) {
        unset($_SESSION['Nombres']);
    }
    if (isset($_SESSION['IdEmp'])) {
        unset($_SESSION['IdEmp']);
    }
    if (isset($_SESSION['Empresa'])) {
        unset($_SESSION['Empresa']);
    }
    if (isset($_SESSION['Web'])) {
        unset($_SESSION['Web']);
    }
}
include '../data/Connectiondata.php';
include '../data/Encriptar.php';
if ((isset($_POST['Login']))) {
    Session();
    $respuesta = 0;
    $usuario = $_POST['Usuario'];
    $pass = Passwords::encryption($_POST['Pass']);
    $consulta = "CALL Login('" . $usuario . "','" . $pass . "')";
    if (($segmento = $conexion->query($consulta))) {
        while ($obj = $segmento->fetch_object()) {
            $respuesta = $obj->msn;
            if ($respuesta == 1) {
                $_SESSION['IdUser'] = $obj->CodPer;
                $_SESSION['Nombres'] = $obj->Nombres;
                $_SESSION['IdEmp'] = $obj->CodEmp;
                $_SESSION['Empresa'] = $obj->Empresa;
                $_SESSION['Web'] = $obj->Web;
                $_SESSION['IdRol'] = $obj->CodRol;
                $_SESSION['Rol'] = $obj->Rol;
            }
        }
        $segmento->close();
    }
    echo $respuesta;
}

if ((isset($_POST['DataUser']))) {
    session_start();
    $data = array();
    $data2 = array();
    $data2["Nombre"] = $_SESSION['Nombres'];
    $data2["Rol"] = $_SESSION['Rol'];
    $data[0] = $data2;
    echo json_encode($data);
}
