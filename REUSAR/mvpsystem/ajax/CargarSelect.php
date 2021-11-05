<?php


if ((isset($_POST['CargarPeriodo']))) {
    $consulta = "SELECT DISTINCT Periodo FROM tbl_datos";
    echo json_encode(CargarSelect($consulta, "Periodo"));
}

if ((isset($_POST['CargarAgencia']))) {
    $periodo = $_POST['Periodo'];
    $consulta = "";
    if ($periodo == "null") {
        $consulta = "SELECT DISTINCT Agencia FROM tbl_datos";
    } else {
        $consulta = "SELECT DISTINCT Agencia FROM tbl_datos where Periodo = '" . $periodo . "'";
    }
    echo json_encode(CargarSelect($consulta, "Agencia"));
}

if ((isset($_POST['CargarCanal']))) {
    $periodo = $_POST['Periodo'];
    $agencia = $_POST['Agencia'];
    $consulta = "";
    if (($periodo == "null") && ($agencia == "null")) {
        $consulta = "SELECT DISTINCT Canal FROM tbl_datos";
    }
    if (($periodo != "null") && ($agencia == "null")) {
        $consulta = "SELECT DISTINCT Canal FROM tbl_datos where Periodo = '" . $periodo . "'";
    }
    if (($periodo == "null") && ($agencia != "null")) {
        $consulta = "SELECT DISTINCT Canal FROM tbl_datos where Agencia = '" . $agencia . "'";
    }
    if (($periodo != "null") && ($agencia != "null")) {
        $consulta = "SELECT DISTINCT Canal FROM tbl_datos where Periodo = '" . $periodo . "' and Agencia ='" . $agencia . "'";
    }
    echo json_encode(CargarSelect($consulta, "Canal"));
}

if ((isset($_POST['CargarArea']))) {
    $periodo = $_POST['Periodo'];
    $agencia = $_POST['Agencia'];
    $canal = $_POST['Canal'];
    $consulta = "";
    if (($periodo == "null" && $agencia == "null")) {
        $consulta = "SELECT DISTINCT Area FROM tbl_datos where Canal='" . $canal . "'";
    }
    if (($periodo == "null") && ($agencia != "null") && ($canal != "null")) {
        $consulta = "SELECT DISTINCT Area FROM tbl_datos where Agencia='" . $agencia . "' and Canal='" . $canal . "'";
    }
    if (($periodo != "null") && ($agencia != "null") && ($canal != "null")) {
        $consulta = "SELECT DISTINCT Area FROM tbl_datos where Periodo = '" . $periodo . "' and Agencia ='" . $agencia . "' and Canal ='" . $canal . "'";
    }
    if (($periodo != "null") && ($agencia == "null") && ($canal != "null")) {
        $consulta = "SELECT DISTINCT Area FROM tbl_datos where Periodo = '" . $periodo . "' and Canal ='" . $canal . "'";
    }
    echo json_encode(CargarSelect($consulta, "Area"));
}

if ((isset($_POST['CargarTIndicador']))) {
    $periodo = $_POST['Periodo'];
    $agencia = $_POST['Agencia'];
    $canal = $_POST['Canal'];
    $area = $_POST['Area'];
    $consulta = "";
    if (($periodo == "null") && ($agencia == "null") && ($canal != "null") && ($area != "null")) {
        $consulta = "SELECT DISTINCT Tipo_Indicador FROM tbl_datos where Canal ='" . $canal . "' and Area ='" . $area . "'";
    }
    if (($periodo == "null") && ($agencia != "null") && ($canal != "null") && ($area != "null")) {
        $consulta = "SELECT DISTINCT Tipo_Indicador FROM tbl_datos where Agencia = '" . $agencia . "' and Canal ='" . $canal . "' and Area ='" . $area . "'";
    }
    if (($periodo != "null") && ($agencia == "null") && ($canal != "null") && ($area != "null")) {
        $consulta = "SELECT DISTINCT Tipo_Indicador FROM tbl_datos where Periodo = '" . $periodo . "' and Canal ='" . $canal . "' and Area ='" . $area . "'";
    }
    if (($periodo != "null") && ($agencia != "null") && ($canal != "null") && ($area != "null")) {
        $consulta = "SELECT DISTINCT Tipo_Indicador FROM tbl_datos where Periodo = '" . $periodo . "' and Agencia ='" . $agencia . "' and Canal ='" . $canal . "'"
                . " and Area ='" . $area . "'";
    }
    echo json_encode(CargarSelect($consulta, "Tipo_Indicador"));
}

if ((isset($_POST['CargarIndicador']))) {
    $periodo = $_POST['Periodo'];
    $agencia = $_POST['Agencia'];
    $canal = $_POST['Canal'];
    $area = $_POST['Area'];
    $tindicador = $_POST['TIndicador'];
    $consulta = "";
    if (($periodo == "null") && ($agencia == "null") && ($canal != "null") && ($area != "null") && ($tindicador != "null")) {
        $consulta = "SELECT DISTINCT Indicador FROM tbl_datos where Canal ='" . $canal . "'"
                . " and Area ='" . $area . "' and Tipo_Indicador='" . $tindicador . "'";
    }
    if (($periodo == "null") && ($agencia != "null") && ($canal != "null") && ($area != "null") && ($tindicador != "null")) {
        $consulta = "SELECT DISTINCT Indicador FROM tbl_datos where Agencia = '" . $agencia . "' and Canal ='" . $canal . "'"
                . " and Area ='" . $area . "' and Tipo_Indicador='" . $tindicador . "'";
    }
    if (($periodo != "null") && ($agencia == "null") && ($canal != "null") && ($area != "null") && ($tindicador != "null")) {
        $consulta = "SELECT DISTINCT Indicador FROM tbl_datos where Periodo = '" . $periodo . "' and Canal ='" . $canal . "'"
                . " and Area ='" . $area . "' and Tipo_Indicador='" . $tindicador . "'";
    }
    if (($periodo != "null") && ($agencia != "null") && ($canal != "null") && ($area != "null") && ($tindicador != "null")) {
        $consulta = "SELECT DISTINCT Indicador FROM tbl_datos where Periodo = '" . $periodo . "' and Agencia ='" . $agencia . "' and Canal ='" . $canal . "'"
                . " and Area ='" . $area . "' and Tipo_Indicador='" . $tindicador . "'";
    }
    echo json_encode(CargarSelect($consulta, "Indicador"));
}

function CargarSelect($consulta, $Dato) {
    include '../data/Connectiondata.php';
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