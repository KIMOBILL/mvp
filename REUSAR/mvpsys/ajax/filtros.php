<?php

session_start();
if ((isset($_POST['DatosFiltros']))) {
    include '../data/Connectiondata.php';
    $consulta = "SELECT cod_filtro,encuesta,agencia,canales,url,seccion,otros,esta_filtro FROM view_filtros where (cod_encuesta=" . $_POST["Encuesta"] . ")";
    $data = array();
    if (($segmento = $conexion->query($consulta))) {
        while ($obj = $segmento->fetch_object()) {
            $fila = count($data);
            $dataset = array();
            $NomForm = str_replace(" ", "_", $obj->encuesta);
            $dataset["Codigo"] = $obj->cod_filtro;
            $dataset["Agencia"] = $obj->agencia;
            $dataset["Url"] =$NomForm."/".$obj->url;
            $dataset["Canal"] = $obj->canales;
            $dataset["Seccion"] = $obj->seccion;
            $dataset["Otros"] = $obj->otros;
            $dataset["Estado"] = $obj->esta_filtro;
            $data[$fila] = $dataset;
        }
        $segmento->close();
    }
    echo json_encode($data);
}

if ((isset($_POST['AddFiltros']))) {
    include '../data/Connectiondata.php';
    $opcion = $_POST['Op'];

    $consulta = "";
    if ($opcion == 1 || $opcion == "1") {
        $consulta = "call FILTROFULLSAVE(" . $_SESSION['IdEmp'] . "," . $_POST['Encuesta'] . "," . $_POST['Canales'] . "," . $_POST['Seccion'] . "," . $_POST['Otros'] . ")";
    } else {
        $consulta = "call FILTROSAVE(" . $_POST['Encuesta'] . "," . $_POST['Agencia'] . "," . $_POST['Canales'] . "," . $_POST['Seccion'] . "," . $_POST['Otros'] . ")";
    }
    $resultado = 0;
    if (($segmento = $conexion->query($consulta))) {
        while ($obj = $segmento->fetch_object()) {
            $resultado = $obj->msn;
        }
        $segmento->close();
    }
    echo $resultado;
}

if ((isset($_POST['EstadoFiltros']))) {
    include '../data/Connectiondata.php';
    $consulta = "call FILTROESTADO(" . $_POST['Codigo'] . "," . $_POST['Estado'] . ")";
    $resultado = 0;
    if (($segmento = $conexion->query($consulta))) {
        while ($obj = $segmento->fetch_object()) {
            $resultado = $obj->msn;
        }
        $segmento->close();
    }
    echo $resultado;
}

if ((isset($_POST['TraerEmpresa']))) {    
    echo $_SESSION['Empresa'] ;
}