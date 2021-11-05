<?php

session_start();
include '../data/Connectiondata.php';

if ((isset($_POST['BuscarNombre']))) {
    include '../data/Connectiondata.php';
    $Nombre = ($_POST['Nombre']);
    $Empresa = $_SESSION["IdEmp"];
    $consulta = "select count(*)as Nregistros from tbl_encuestas where(enc_nom='" . $Nombre . "' and emp_id=" . $Empresa . ")";
    $respuesta = 0;
    if (($segmento = $conexion->query($consulta))) {
        while ($obj = $segmento->fetch_object()) {
            if ($obj->Nregistros == 1) {
                $respuesta = 1;
            }
        }
        $segmento->close();
    }
    echo $respuesta;
}

if ((isset($_POST['NewForm2']))) {
    $respuesta = "Vacio";
    $Inputs = json_decode($_POST['Input']);
    $contador = 0;
    $contador = count($Inputs);
    $id = 0;
    $datos = array();
    $NomForm = str_replace(" ", "_", $_POST["Nombre"]);
    $NomForm = $NomForm . ".php";
    $CodEncuesta = EncuestaSave($_POST["Nombre"], $_SESSION["IdEmp"], $NomForm);
    $texto = "";
    for ($i = 0; $i < $contador; $i = $i + 4) {
        $idPregunta = GuardarPreguntas($_SESSION["IdEmp"], $CodEncuesta, $Inputs[$i + 2], $Inputs[$i + 3]);
        $dataset = array();
        do {
            $dataset["CodPre"] = $idPregunta;
            $dataset["Tipo"] = $Inputs[$i + 1];
            $dataset["InputName"] = $Inputs[$i];
        } while ($idPregunta == 0);
        $datos[$id] = $dataset;
        $id++;
    }
    $path = CrearDirectorios($_POST["Nombre"]);
    if ($path == "Null" || $path == "js" || $path == "css" || $path == "ajax") {
        switch ($path) {
            case "Null":
                $respuesta = "NullCrearDir";
                break;
            case "js":
                $respuesta = "NullDirJS";
                break;
            case "css":
                $respuesta = "NullDirCSS";
                break;
            case "ajax":
                $respuesta = "NullDirAJAX";
                break;
        }
    } else {
        $resCrearhtml = CrearhtmlEncuesta($path, $NomForm, $_POST["Nombre"], $_POST["Estructura"]);
        if ($resCrearhtml == "false") {
            $respuesta = "NullHtml";
        } else {
            $ResJS = CrearJs($path, $datos);
            if ($ResJS == "false") {
                $respuesta = "NullJS";
            } else {
                $resphp = CrearPHP($path);
                if ($resphp == "false") {
                    $respuesta = "NullPHP";
                }
                $respuesta = "true";
            }
        }
    }

    echo $respuesta;
}

function EncuestaSave($nombre, $empresa, $url) {
    include '../data/Connectiondata.php';
    $consulta = "call ENCUESTASAVE('" . $nombre . "'," . $empresa . ",'" . $url . "');";
    $codigo = 0;
    if (($segmento = $conexion->query($consulta))) {
        while ($obj = $segmento->fetch_object()) {
            if ($obj->msn == 1) {
                $codigo = $obj->IdEncuesta;
            }
        }
        $segmento->close();
    }
    return$codigo;
}

function GuardarPreguntas($empresa, $encuesta, $pregunta, $indicador) {
    include '../data/Connectiondata.php';
    $consulta = "call PREGUNTASAVE(" . $empresa . "," . $encuesta . ",'" . $pregunta . "','" . $indicador . "')";
    $codigo = 0;
    if (($segmento = $conexion->query($consulta))) {
        while ($obj = $segmento->fetch_object()) {
            if ($obj->msn == 1) {
                $codigo = $obj->IdPregunta;
            }
        }
        $segmento->close();
    }
    return $codigo;
}

function CrearDirectorios($Nombre) {
    $respuesta = "Null";
    $i = false;
    $cont = 0;
    $NomForm = str_replace(" ", "_", $Nombre);

    do {
        $cont++;
        $nameCarpetas = str_replace(" ", "", $_SESSION['Empresa']);
        $pathp = "encuestas/" . $nameCarpetas;
        $path = $pathp . "/" . $NomForm;
        if (!is_dir("../" . $pathp)) {
            mkdir("../" . $pathp, 0777, true);
        } else {
            if (!is_dir("../" . $path)) {
                mkdir("../" . $path, 0777, true);
                mkdir("../" . $path . "/temp", 0777, true);
                mkdir("../" . $path . "/layout/css", 0777, true);
                mkdir("../" . $path . "/layout/js", 0777, true);
                mkdir("../" . $path . "/ajax", 0777, true);
                if (isset($_SESSION["imagenes"])) {
                    $ax = count($_SESSION["imagenes"]);
                    for ($jx = 0; $jx < $ax; $jx++) {
                        $ruta = "../temp/" . $_SESSION["imagenes"][$jx];
                        if (is_file($ruta) == true) {
                            if (copy("../temp/" . $_SESSION["imagenes"][$jx], "../" . $path . "/temp/" . $_SESSION["imagenes"][$jx])) {
                                unlink($ruta);
                            }
                        }
                    }
                }
            } else {
                if (copy("../layout/css/main.css", "../" . $path . "/layout/css/main.css")) {
                    if (copy("../layout/jquery/main.js", "../" . $path . "/layout/js/main.js")) {                        
                        $respuesta = $path;
                        $i = true;
                    } else {
                        $respuesta = "js";
                        $i = true;
                    }
                } else {
                    $respuesta = "css";
                    $i = true;
                }
            }
        }
    } while ($i == false);
    return $respuesta;
}

function CrearhtmlEncuesta($path, $NomForm, $Nombre, $Estructura) {
    $header = '<html lang="en">
    <head>
        <!-- Required meta tags -->
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <!-- Bootstrap CSS -->
        <link rel="shortcut icon" href="layout/img/kimobill.png">
        <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.6.1/css/all.css" integrity="sha384-gfdkjb5BdAXd+lj+gudLWI+BXq4IuLW5IT+brZEZsLFm++aCMlF1V92rMkPaX4PP" crossorigin="anonymous">
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-eOJMYsd53ii+scO/bJGFsiCZc+5NDVN2yr8+0RDqr0Ql0h+rP48ckxlpbzKgwra6" crossorigin="anonymous">
        <script src = " https://unpkg.com/sweetalert/dist/sweetalert.min.js " > </script>
        <script src="layout/js/main.js" type="text/javascript"></script>
        <link rel="stylesheet" href="layout/css/main.css">  
        <script src = " layout/js/encuesta.js " > </script>
        <title>Formulario de ' . $Nombre . '</title>
    </head>
    <body">';

    $footer = '<div class="container text-center"><br><br><br><button class="btn btn-outline-primary" onclick="Guardar();">ENVIAR ENCUESTA</button></div>
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js"></script>
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta3/dist/js/bootstrap.bundle.min.js" integrity="sha384-JEW9xMcG8R+pH31jmWH6WWP0WintQrMb4s7ZOdauHnUtxwoG2vI5DkLtS3qm9Ekf" crossorigin="anonymous"></script>
    </body>
</html>';

    $respuesta = "false";
    if (fopen("../" . $path . "/" . $NomForm, "w+")) {
        $file = fopen("../" . $path . "/" . $NomForm, "w");
        fwrite($file, $header . PHP_EOL);
        fwrite($file, $Estructura . PHP_EOL);
        fwrite($file, $footer . PHP_EOL);
        fclose($file);
        $respuesta = "true";
    }
    return $respuesta;
}

function CrearJs($path, $Datos) {
    $estructura1 = '
                function Guardar(){
                    if(traerId()>0){
                    
                    var arrayInput = new Array();
                    var cont=0;';
    $ax = count($Datos);
    for ($j = 0; $j < $ax; $j++) {

        $estructura1 .= '                    
                    var arrayAux = new Array();
                    arrayAux["Pregunta"]=' . $Datos[$j]["CodPre"] . ';
                    arrayAux["Input"]="' . $Datos[$j]["InputName"] . '";
                    arrayAux["Tipo"]="' . $Datos[$j]["Tipo"] . '";
                    cont=arrayInput.length;
                    arrayInput[cont]=arrayAux;                    
                    ';
    }

    $estructura1 .= 'var recorrer=arrayInput.length;
                    var ax=0;
                    var regsave=0;
                    while(ax<recorrer){
                        var respu=0;
                        respu=PreguntaSave(arrayInput[ax]["Pregunta"],arrayInput[ax]["Input"],arrayInput[ax]["Tipo"]);                        
                        var cont=0;
                        var cont2=0;
                        while(cont=0){                            
                            var id = setInterval(function(){
                                if(respu==1){                              
                                    regsave+=1;                                    
                                    cont=cont+1;
                                    clearInterval(id); 
                                }else{
                                    if(cont2<=3){
                                        cont2=cont2+1;
                                    }else{                                        
                                        cont=1;
                                        clearInterval(id);                                    
                                    }                               
                                }
                            }, 1000);
                        }; 
                        ax=ax+1;
                    };
                     swal("CORRECTO...!", "El Registro Fue Creado sin Problemas.. ", "success").then((value) => {

                            window.location.href="http://' . $_SESSION['Web'] . '";
                        });
                    //console.log(regsave);
                    //if(recorrer==regsave){
                        //swal("CORRECTO...!", "El Registro Fue Creado sin Problemas.. ", "success").then((value) => {

                           // window.location.href="http://' . $_SESSION['Web'] . '";
                        //});
                    //}else{
                       // swal("ERROR...!", "No se pudo Concluir el Proceso Intentelo Mas Tarde", "warning");
                    //}
                }else{
                    swal("ERROR...!", "No existe un ID de proceso es un formulario de vista previa", "warning");
                }
                }
                ';
    $estructura2 = "     
            function obtenerValorParametro(sParametroNombre) {
            var sPaginaURL = window.location.search.substring(1);
             var sURLVariables = sPaginaURL.split('&');
              for (var i = 0; i < sURLVariables.length; i++) {
                var sParametro = sURLVariables[i].split('=');
                if (sParametro[0] == sParametroNombre) {
                  return sParametro[1];
                }
              }
             return null;
            }";

    $estructura3 = '

            function traerDato(name){
                var intradio=document.getElementsByName(name);    
                for(var i=0; i < intradio.length;i++) {
                    if (intradio[i].checked) {
                        return intradio[i].value;
                    }
                }
            }

            function vercheck(name){
                var checkbox= document.getElementById(name);
                //Si está marcada ejecuta la condición verdadera.
                if(checkbox.checked){
                    return ($("input:checkbox[name="+name+"]:checked").val());
                }
                //Si se ha desmarcado se ejecuta el siguiente mensaje.
                else{
                    return "";
                }
            }
            function traerId(){
                var valor = obtenerValorParametro("Id");
                var DataGet=0;
                if (valor){
                    DataGet=parseInt(valor);                            
                }
                return DataGet;
            }

            function PreguntaSave(Pregunta,Input,Tipo){
                var resPregunta="";
                switch (Tipo) {
                case "text":
                    resPregunta=document.getElementById(Input).value ;
                    break;
                case "option":
                    resPregunta=traerDato(Input);
                    break;
                case "select":
                    resPregunta=$(' . "'" . '"#' . "'+Input+'" . '"' . "'" . ').val();
                    break;
                case "check":
                    resPregunta=vercheck(Input);
                    break;
                }
                var parametros = {"Guardar": true,"IdPregunta":Pregunta,"Filtro":traerId(),"Respuesta":resPregunta,"Observacion":""};
                console.log(parametros);
                var respuesta=0;
                $.ajax({
                    data: parametros, url: "ajax/encuesta.php", type: "POST",
                    success: function (response){
                        if(response==1 || response=="1"){                        
                            respuesta=1; 
                        }
                    }
                });
                return respuesta;
            }
            ';
    $respuesta = "false";
    if (fopen("../" . $path . "/layout/js/encuesta.js", "w+")) {
        $file = fopen("../" . $path . "/layout/js/encuesta.js", "w");
        fwrite($file, $estructura1 . PHP_EOL);
        fwrite($file, $estructura2 . PHP_EOL);
        fwrite($file, $estructura3 . PHP_EOL);
        fclose($file);
        $respuesta = "true";
    }
    return $respuesta;
}

function CrearPHP($path) {
    $estructura = "<?php
                        include '../../../../data/Connectiondata.php';  
                        if ((isset(/@_POST['Guardar']))) {
                            /@respuesta=0;
                            /@consulta= 'call RESPUESTASAVE('./@_POST['IdPregunta'].','./@_POST['Filtro'].'".',"'."'./@_POST['Respuesta'].'".'","'."'./@_POST['Observacion'].'".'"'."'.')';
                            if ((/@segmento = /@conexion->query(/@consulta))) {
                                while (/@obj = /@segmento->fetch_object()) {
                                    if(/@obj->msn==1 || /@obj->msn=='1' || /@obj->msn==true){
                                        /@respuesta =1; 
                                    }            
                                }
                                /@segmento->close();
                            }    
                        echo /@respuesta;
                        }  
                    ?>";
    $respuesta = "false";
    $aux = 3;
    do {
        if (fopen("../" . $path . "/ajax/original.php", "w+")) {
            $file = fopen("../" . $path . "/ajax/original.php", "w");
            fwrite($file, $estructura . PHP_EOL);
            fclose($file);
            $reschar = remplazarchar($path);
            if ($reschar == 1) {
                $respuesta = "true";
                $aux = 0;
            }
        } else {
            $aux--;
        }
    } while ($aux > 0);
    return $respuesta;
}

function remplazarchar($path) {
    $respuesta = 0;
    $contenidoOriginal = file_get_contents("../" . $path . "/ajax/original.php");
    $contenidoRemplazado = str_replace("/@", "$", $contenidoOriginal);
    file_put_contents("../" . $path . "/ajax/encuesta.php", $contenidoRemplazado);
    if (unlink("../" . $path . "/ajax/original.php")) {
        $respuesta = 1;
    }
    return $respuesta;
}

