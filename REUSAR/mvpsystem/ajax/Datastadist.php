<?php


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

if ((isset($_POST['DatosTacometros']))) {
    $periodo = $_POST['Periodo'];
    $agencia = $_POST['Agencia'];
    $canal = $_POST['Canal'];
    $area = $_POST['Area'];
    $tindicador = $_POST['TIndicador'];
    $indicador = $_POST['Indicador'];
    $calculo = $_POST['Calculo'];
    $consulta = "";
    $ArrayIndi = array();
    if ($indicador == "null") {
        if (($periodo == "null") && ($agencia == "null") && ($canal != "null") && ($area != "null") && ($tindicador != "null") && ($indicador = "null")) {
            $consulta = "SELECT DISTINCT Indicador FROM tbl_datos where Canal ='" . $canal . "'"
                    . " and Area ='" . $area . "' and Tipo_Indicador='" . $tindicador . "'";
        }
        if (($periodo == "null") && ($agencia != "null") && ($canal != "null") && ($area != "null") && ($tindicador != "null") && ($indicador = "null")) {
            $consulta = "SELECT DISTINCT Indicador FROM tbl_datos where Agencia = '" . $agencia . "' and Canal ='" . $canal . "'"
                    . " and Area ='" . $area . "' and Tipo_Indicador='" . $tindicador . "'";
        }
        if (($periodo != "null") && ($agencia == "null") && ($canal != "null") && ($area != "null") && ($tindicador != "null") && ($indicador = "null")) {
            $consulta = "SELECT DISTINCT Indicador FROM tbl_datos where Periodo = '" . $periodo . "' and Canal ='" . $canal . "'"
                    . " and Area ='" . $area . "' and Tipo_Indicador='" . $tindicador . "'";
        }
        if (($periodo != "null") && ($agencia != "null") && ($canal != "null") && ($area != "null") && ($tindicador != "null") && ($indicador = "null")) {
            $consulta = "SELECT DISTINCT Indicador FROM tbl_datos where Periodo = '" . $periodo . "' and Agencia ='" . $agencia . "' and Canal ='" . $canal . "'"
                    . " and Area ='" . $area . "' and Tipo_Indicador='" . $tindicador . "'";
        }
        $ArrayIndi = CargarSelect($consulta, "Indicador");
    } else {
        $ArrayIndi[0] = $indicador;
    }

    if (($periodo == "null") && ($agencia == "null") && ($canal != "null") && ($area != "null") && ($tindicador != "null")) {
        $consulta = "SELECT Calificacion FROM tbl_datos where Canal ='" . $canal . "'"
                . " and Area ='" . $area . "' and Tipo_Indicador='" . $tindicador . "' and Indicador='";
    }
    if (($periodo == "null") && ($agencia != "null") && ($canal != "null") && ($area != "null") && ($tindicador != "null")) {
        $consulta = "SELECT Calificacion FROM tbl_datos where Agencia = '" . $agencia . "' and Canal ='" . $canal . "'"
                . " and Area ='" . $area . "' and Tipo_Indicador='" . $tindicador . "' and Indicador='";
    }
    if (($periodo != "null") && ($agencia == "null") && ($canal != "null") && ($area != "null") && ($tindicador != "null")) {
        $consulta = "SELECT Calificacion FROM tbl_datos where Periodo = '" . $periodo . "' and Canal ='" . $canal . "'"
                . " and Area ='" . $area . "' and Tipo_Indicador='" . $tindicador . "' and Indicador='";
    }
    if (($periodo != "null") && ($agencia != "null") && ($canal != "null") && ($area != "null") && ($tindicador != "null")) {
        $consulta = "SELECT Calificacion FROM tbl_datos where Periodo = '" . $periodo . "' and Agencia ='" . $agencia . "' and Canal ='" . $canal . "'"
                . " and Area ='" . $area . "' and Tipo_Indicador='" . $tindicador . "' and Indicador='";
    }
    $datag = array();
    for ($i = 0; $i < count($ArrayIndi); $i++) {
        $dataf = array();
        $dataf["Indicador"] = $ArrayIndi[$i];
        $datar = TraerDataTacometro($consulta, $ArrayIndi[$i]);
        $dataf["Uno"] = $datar["Uno"];
        $dataf["Cero"] = $datar["Cero"];
        $fila = count($datag);
        $datag[$fila] = $dataf;
    }
    echo json_encode($datag);
}

function TraerDataTacometro($consulta, $Dato) {
    include '../data/Connectiondata.php';
    $data = array();
    $consulta .= $Dato . "'";
    $uno = 0;
    $cero = 0;
    if (($segmento = $conexion->query($consulta))) {
        while ($obj = $segmento->fetch_object()) {
            if($Dato=="ESFUERZO"){
                if ($obj->Calificacion >= 4) {
                $uno++;
            } else {
                $cero++;
            }
            }else{
                if ($obj->Calificacion >= 9) {
                $uno++;
            } else {
                $cero++;
            }
            }
            
        }
        $segmento->close();
    }
    $data["Uno"] = $uno;
    $data["Cero"] = $cero;
    return $data;
}

if ((isset($_POST['DatosBarras']))) {
    $periodo = $_POST['Periodo'];
    $agencia = $_POST['Agencia'];
    $canal = $_POST['Canal'];
    $area = $_POST['Area'];
    $tindicador = $_POST['TIndicador'];
    $indicador = $_POST['Indicador'];
    $calculo = $_POST['Calculo'];
    $consulta = "";

    $ArrayPeriodo = array();
    if ($periodo == "null") {
        $consulta = "SELECT DISTINCT Periodo FROM tbl_datos";
        $ArrayPeriodo = CargarSelect($consulta, "Periodo");
    } else {
        $ArrayPeriodo[0] = $periodo;
    }
    $dataBarras = array();
    for ($i = 0; $i < count($ArrayPeriodo); $i++) {
        $dataf = array();
        $dataf["Periodo"] = $ArrayPeriodo[$i];
        $dataf["datos"] = TraerDataBarras($ArrayPeriodo[$i], $agencia, $canal, $area, $tindicador, $indicador);
        $fila = count($dataBarras);
        $dataBarras[$fila] = $dataf;
    }
    echo json_encode($dataBarras);
}


function TraerDataBarras($periodo, $agencia, $canal, $area, $tindicador, $indicador) {
    $ArrayIndi = array();
    if ($indicador == "null") {
        if (($agencia == "null") && ($canal != "null") && ($area != "null") && ($tindicador != "null") && ($indicador = "null")) {
            $consulta = "SELECT DISTINCT Indicador FROM tbl_datos where Periodo = '" . $periodo . "' and Canal ='" . $canal . "'"
                    . " and Area ='" . $area . "' and Tipo_Indicador='" . $tindicador . "'";
        }
        if (($agencia != "null") && ($canal != "null") && ($area != "null") && ($tindicador != "null") && ($indicador = "null")) {
            $consulta = "SELECT DISTINCT Indicador FROM tbl_datos where Periodo = '" . $periodo . "' and Agencia = '" . $agencia . "' and Canal ='" . $canal . "'"
                    . " and Area ='" . $area . "' and Tipo_Indicador='" . $tindicador . "'";
        }       
        $ArrayIndi = CargarSelect($consulta, "Indicador");
    } else {
        $ArrayIndi[0] = $indicador;
    }

    if (($agencia == "null") && ($canal != "null") && ($area != "null") && ($tindicador != "null")) {
        $consulta = "SELECT Calificacion FROM tbl_datos where Periodo = '" . $periodo . "' and Canal ='" . $canal . "'"
                . " and Area ='" . $area . "' and Tipo_Indicador='" . $tindicador . "' and Indicador='";
    }
    if (($agencia != "null") && ($canal != "null") && ($area != "null") && ($tindicador != "null")) {
        $consulta = "SELECT Calificacion FROM tbl_datos where Periodo = '" . $periodo . "' and Agencia = '" . $agencia . "' and Canal ='" . $canal . "'"
                . " and Area ='" . $area . "' and Tipo_Indicador='" . $tindicador . "' and Indicador='";
    }    
    $datag = array();
    $ArrayData = array();
    for ($i = 0; $i < count($ArrayIndi); $i++) {
        $dataf = array();
        if($ArrayIndi[$i]=="SATISFACCION GENERAL"){
            $dataf["Indicador"] = "INS";
        }else{
            if($ArrayIndi[$i]=="RECOMENDACIÓN" || $ArrayIndi[$i]=="RECOMENDACION"){
                $dataf["Indicador"] = "NPS";
            }else{
                if($ArrayIndi[$i]=="ESFUERZO"){
                    $dataf["Indicador"] = "CES";
                }else{
                    $dataf["Indicador"] = $ArrayIndi[$i];
                }
            }
        }
        $datar = TraerDataTacometro($consulta, $ArrayIndi[$i]);
        $dataf["Uno"] = $datar["Uno"];
        $dataf["Cero"] = $datar["Cero"];
        $fila = count($ArrayData);
        $ArrayData[$fila] = $dataf;
    }
    
    return $ArrayData;
}



if ((isset($_POST['DatosAgencias']))) {
    $periodo = $_POST['Periodo'];
    $agencia = $_POST['Agencia'];
    $canal = $_POST['Canal'];
    $area = $_POST['Area'];
    $tindicador = $_POST['TIndicador'];
    $indicador = $_POST['Indicador'];
    $calculo = $_POST['Calculo'];
    $consulta = "";

    $ArrayAgencia = array();
    if ($periodo == "null" && $agencia=="null") {
        $consulta = "SELECT DISTINCT Agencia FROM tbl_datos";
    } 
    if ($periodo != "null" && $agencia=="null") {
        $consulta = "SELECT DISTINCT Agencia FROM tbl_datos where Periodo='".$periodo."'";
    }
    if ($periodo == "null" && $agencia!="null") {
        $consulta = "SELECT DISTINCT Agencia FROM tbl_datos where Agencia='".$agencia."'";
    }
    if ($periodo != "null" && $agencia!="null") {
        $consulta = "SELECT DISTINCT Agencia FROM tbl_datos where Periodo='".$periodo."' and Agencia='".$agencia."'";
    }
    $ArrayAgencia = CargarSelect($consulta, "Agencia");
    $dataAgencias = array();
    for ($i = 0; $i < count($ArrayAgencia); $i++) {
        $dataf = array();
        $dataf["Agencia"] = $ArrayAgencia[$i];        
        $dataf["datos"] = TraerDataAgencias($periodo, $ArrayAgencia[$i], $canal, $area, $tindicador, $indicador);
        $fila = count($dataAgencias);
        $dataAgencias[$fila] = $dataf;
    }
    echo json_encode($dataAgencias);
}


function TraerDataAgencias($periodo, $agencia, $canal, $area, $tindicador, $indicador) {
    $ArrayIndi = array();
    if ($indicador == "null") {
        if (($periodo == "null") && ($canal != "null") && ($area != "null") && ($tindicador != "null") && ($indicador = "null")) {
            $consulta = "SELECT DISTINCT Indicador FROM tbl_datos where Agencia = '" . $agencia . "' and Canal ='" . $canal . "'"
                    . " and Area ='" . $area . "' and Tipo_Indicador='" . $tindicador . "'";
        }
        if (($periodo != "null") && ($canal != "null") && ($area != "null") && ($tindicador != "null") && ($indicador == "null")) {
            $consulta = "SELECT DISTINCT Indicador FROM tbl_datos where Periodo = '" . $periodo . "' and Agencia = '" . $agencia . "' and Canal ='" . $canal . "'"
                    . " and Area ='" . $area . "' and Tipo_Indicador='" . $tindicador . "'";
        }        
        $ArrayIndi = CargarSelect($consulta, "Indicador");
    } else {
        $ArrayIndi[0] = $indicador;
    }

    if (($periodo == "null") && ($canal != "null") && ($area != "null") && ($tindicador != "null")) {
        $consulta = "SELECT Calificacion FROM tbl_datos where Agencia = '" . $agencia . "' and Canal ='" . $canal . "'"
                . " and Area ='" . $area . "' and Tipo_Indicador='" . $tindicador . "' and Indicador='";
    }
    if (($periodo != "null") && ($canal != "null") && ($area != "null") && ($tindicador != "null")) {
        $consulta = "SELECT Calificacion FROM tbl_datos where Periodo = '" . $periodo . "' and Agencia = '" . $agencia . "' and Canal ='" . $canal . "'"
                . " and Area ='" . $area . "' and Tipo_Indicador='" . $tindicador . "' and Indicador='";
    }
    
    $datag = array();
    $ArrayData = array();
    for ($i = 0; $i < count($ArrayIndi); $i++) {
        $dataf = array();
        if($ArrayIndi[$i]=="SATISFACCION GENERAL"){
            $dataf["Indicador"] = "INS";
        }else{
            if($ArrayIndi[$i]=="RECOMENDACIÓN" || $ArrayIndi[$i]=="RECOMENDACION"){
                $dataf["Indicador"] = "NPS";
            }else{
                if($ArrayIndi[$i]=="ESFUERZO"){
                    $dataf["Indicador"] = "CES";
                }else{
                    $dataf["Indicador"] = $ArrayIndi[$i];
                }
            }
        }
        $datar = ExtraerDataAgencias($consulta, $ArrayIndi[$i]);
        $dataf["Uno"] = $datar["Uno"];
        $dataf["Cero"] = $datar["Cero"];
        $fila = count($ArrayData);
        $ArrayData[$fila] = $dataf;
    }
    
    return $ArrayData;
}


function ExtraerDataAgencias($consulta, $Dato) {
    include '../data/Connectiondata.php';
    $data = array();
    $consulta .= $Dato . "'";
    $uno = 0;
    $cero = 0;
    if (($segmento = $conexion->query($consulta))) {
        while ($obj = $segmento->fetch_object()) {
            if ($obj->Calificacion > 8) {
                $uno++;
            } else {
                $cero++;
            }
        }
        $segmento->close();
    }
    $data["Uno"] = $uno;
    $data["Cero"] = $cero;
    return $data;
}

