<?php
session_start();
if ((isset($_POST['CargarAgencia']))) {
    include '../data/Connectiondata.php';
    $consulta = "SELECT codigo,nombre FROM view_agencias where (idempresa=".$_SESSION["IdEmp"]." and estado=1)";
    $data = array();
    if (($segmento = $conexion->query($consulta))) {
        while ($obj = $segmento->fetch_object()) {
            $fila = count($data);
            $dataset = array();
            $dataset["Codigo"] = $obj->codigo;
            $dataset["Nombre"] = $obj->nombre;
            $data[$fila]=$dataset;
        }
        $segmento->close();
    }
    echo json_encode($data);
}
if ((isset($_POST['CargarCanales']))) {
    include '../data/Connectiondata.php';
    $consulta = "SELECT can_id,can_nom FROM tbl_canales where can_est=1";
    $data = array();
    if (($segmento = $conexion->query($consulta))) {
        while ($obj = $segmento->fetch_object()) {
            $fila = count($data);
            $dataset = array();
            $dataset["Codigo"] = $obj->can_id;
            $dataset["Nombre"] = $obj->can_nom;
            $data[$fila]=$dataset;
        }
        $segmento->close();
    }
    echo json_encode($data);
}

if ((isset($_POST['CargarSeccion']))) {
    include '../data/Connectiondata.php';
    $consulta = "SELECT sec_id,sec_nom FROM tbl_seccion where sec_est=1";
    $data = array();
    if (($segmento = $conexion->query($consulta))) {
        while ($obj = $segmento->fetch_object()) {
            $fila = count($data);
            $dataset = array();
            $dataset["Codigo"] = $obj->sec_id;
            $dataset["Nombre"] = $obj->sec_nom;
            $data[$fila]=$dataset;
        }
        $segmento->close();
    }
    echo json_encode($data);
}

if ((isset($_POST['CargarOtros']))) {
    include '../data/Connectiondata.php';
    $consulta = "SELECT otr_id,otr_nom FROM tbl_otros where otr_est=1";
    $data = array();
    if (($segmento = $conexion->query($consulta))) {
        while ($obj = $segmento->fetch_object()) {
            $fila = count($data);
            $dataset = array();
            $dataset["Codigo"] = $obj->otr_id;
            $dataset["Nombre"] = $obj->otr_nom;
            $data[$fila]=$dataset;
        }
        $segmento->close();
    }
    echo json_encode($data);
}

function CargarSelect($consulta, $Dato) {
    include '../data/Connection.php';
    $data = array();
    if (($segmento = $conexion->query($consulta))) {
        while ($obj = $segmento->fetch_object()) {
            $fila = count($data);
            $data[$fila] = $obj->$Dato;
        }
        $segmento->close();
    }
    return $data;
}