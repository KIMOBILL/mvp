<?php



//function CargarSelect($consulta, $Dato) {
//    include '../data/Connection.php';
//    $data = array();
//    if (($segmento = $conexion->query($consulta))) {
//        while ($obj = $segmento->fetch_object()) {
//            $fila = count($data);
//            $data[$fila] = $obj->$Dato;
//        }
//        $segmento->close();
//    }
//    return $data;
//}
function CargarSelect2($consulta, $Dato1,$Dato2,$Dato3) {
    include '../data/Connection.php';
    $data = array();
    if (($segmento = $conexion->query($consulta))) {
        while ($obj = $segmento->fetch_object()) {
            $fila = count($data);
            $data2 = array();
            $data2["Agencia"] = $obj->$Dato1;
            $data2["Indicador"] = $obj->$Dato2;
            $data2["Observacion"] = $obj->$Dato3;
            $data[$fila]=$data2;
        }
        $segmento->close();
    }
    return $data;
}

if ((isset($_POST['DatosVerb']))) {
    $periodo = $_POST['Periodo'];
    $agencia = $_POST['Agencia'];
    $canal = $_POST['Canal'];
    $area = $_POST['Area'];
    $indicador = $_POST['Indicador'];
    $consulta = "";
    $ArrayObservacion = array();
    $ArrayFinal = array();
    $Arrayverb = array();
         if (($periodo == "null") && ($agencia == "null") && ($canal != "null") && ($area != "null") && ($indicador == "null") ) {
            $consulta = "SELECT Agencia,Indicador,Observacion FROM tbl_datos where Canal ='" . $canal . "'"
                    . " and Area ='" . $area . "' and Observacion<>'' and Observacion<>'NA' and Observacion<>'NA ' and Observacion<>'N/A'";
        }
        if (($periodo == "null") && ($agencia == "null") && ($canal != "null") && ($area != "null") && ($indicador != "null") ) {
            $consulta = "SELECT Agencia,Indicador,Observacion FROM tbl_datos where Canal ='" . $canal . "'"
                    . " and Area ='" . $area . "' and Indicador ='" . $indicador . "'  and Observacion<>'' and Observacion<>'NA' and Observacion<>'NA ' and Observacion<>'N/A'";
        }

        if (($periodo == "null") && ($agencia != "null") && ($canal != "null") && ($area != "null") && ($indicador == "null") ) {
            $consulta = "SELECT Agencia,Indicador,Observacion FROM tbl_datos where Agencia = '" . $agencia . "' and Canal ='" . $canal . "'"
                    . " and Area ='" . $area . "' and Observacion<>'' and Observacion<>'NA' and Observacion<>'NA ' and Observacion<>'N/A'";
        }
        if (($periodo == "null") && ($agencia != "null") && ($canal != "null") && ($area != "null") && ($indicador != "null") ) {
            $consulta = "SELECT Agencia,Indicador,Observacion FROM tbl_datos where Agencia = '" . $agencia . "' and Canal ='" . $canal . "'"
                    . " and Area ='" . $area . "'and Indicador ='" . $indicador . "' and Observacion<>'' and Observacion<>'NA' and Observacion<>'NA ' and Observacion<>'N/A'";
        }
        if (($periodo != "null") && ($agencia == "null") && ($canal != "null") && ($area != "null") && ($indicador == "null") ) {
            $consulta = "SELECT Agencia,Indicador,Observacion FROM tbl_datos where Periodo = '" . $periodo . "' and Canal ='" . $canal . "'"
                    . " and Area ='" . $area . "' and Observacion<>'' and Observacion<>'NA' and Observacion<>'NA ' and Observacion<>'N/A'";
        }
        if (($periodo != "null") && ($agencia == "null") && ($canal != "null") && ($area != "null") && ($indicador != "null") ) {
            $consulta = "SELECT Agencia,Indicador,Observacion FROM tbl_datos where Periodo = '" . $periodo . "' and Canal ='" . $canal . "'"
                    . " and Area ='" . $area . "' and Indicador ='" . $indicador . "' and Observacion<>'' and Observacion<>'NA' and Observacion<>'NA ' and Observacion<>'N/A'";
        }
        
        if (($periodo != "null") && ($agencia != "null") && ($canal != "null") && ($area != "null") && ($indicador == "null")) {
            $consulta = "SELECT Agencia,Indicador,Observacion FROM tbl_datos where Periodo = '" . $periodo . "' and Agencia ='" . $agencia . "' and Canal ='" . $canal . "'"
                    . " and Area ='" . $area . "' and Observacion<>'' and Observacion<>'NA' and Observacion<>'NA ' and Observacion<>'N/A'";
        }
        if (($periodo != "null") && ($agencia != "null") && ($canal != "null") && ($area != "null") && ($indicador != "null")) {
            $consulta = "SELECT Agencia,Indicador,Observacion FROM tbl_datos where Periodo = '" . $periodo . "' and Agencia ='" . $agencia . "' and Canal ='" . $canal . "'"
                    . " and Area ='" . $area . "' and Indicador ='" . $indicador . "' and Observacion<>'' and Observacion<>'NA' and Observacion<>'NA ' and Observacion<>'N/A'";
        }
        $ArrayObservacion = CargarSelect2($consulta, "Agencia","Indicador","Observacion");
        $Arrayverb= TraerVerb();
        for($i=0;$i<sizeof($ArrayObservacion);$i++){
            $positivo=0;
            $negativo=0;
            for($j=0;$j<sizeof($Arrayverb);$j++){
                $result=strrpos(strtoupper($ArrayObservacion[$i]["Observacion"]),strtoupper($Arrayverb[$j]["palabra"]));
                if($result==true){
                    if($Arrayverb[$j]["status"]=="POSITIVO"){
                        $positivo++;
                    }else{
                        $negativo++;
                    }
                }
            }
            $estado="";
            if($positivo==$negativo){
                $estado="NEUTRAL";
            }else{
                if($positivo>$negativo){
                    $estado="POSITIVA";
                }else{
                    $estado="NEGATIVA";
                }
            }
            $arrayhelp= array();
            $arrayhelp["Agencia"]=$ArrayObservacion[$i]["Agencia"];
            $arrayhelp["Indicador"]=$ArrayObservacion[$i]["Indicador"];
            $arrayhelp["frase"]=$ArrayObservacion[$i]["Observacion"];
            $arrayhelp["estado"]=$estado;
            $ArrayFinal[$i]=$arrayhelp;
        }
    echo json_encode($ArrayFinal);
    
}

function TraerVerb() {
    include '../data/Connection.php';
    $data = array();
    $consulta="select verb_des,verb_status from tbl_adjetivos";
    if (($segmento = $conexion->query($consulta))) {
        while ($obj = $segmento->fetch_object()) {
            $fila = count($data);
            $data2 = array();
            $data2["palabra"]=$obj->verb_des;
            $data2["status"]=$obj->verb_status;
            $data[$fila] = $data2;
        }
        $segmento->close();
    }
    return $data;
}

