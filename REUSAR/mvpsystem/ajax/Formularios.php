<?php

session_start();
if ((isset($_POST['NewForm']))) {
    $header = '<html lang="en">
    <head>
        <!-- Required meta tags -->
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <!-- Bootstrap CSS -->
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-eOJMYsd53ii+scO/bJGFsiCZc+5NDVN2yr8+0RDqr0Ql0h+rP48ckxlpbzKgwra6" crossorigin="anonymous">
        <link rel="shortcut icon" href="layout/img/kimobill.png">
        <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.6.1/css/all.css" integrity="sha384-gfdkjb5BdAXd+lj+gudLWI+BXq4IuLW5IT+brZEZsLFm++aCMlF1V92rMkPaX4PP" crossorigin="anonymous">
        <script src="layout/js/main.js" type="text/javascript"></script>
        <link rel="stylesheet" href="layout/css/main.css">  
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-eOJMYsd53ii+scO/bJGFsiCZc+5NDVN2yr8+0RDqr0Ql0h+rP48ckxlpbzKgwra6" crossorigin="anonymous">
        <script src = " https://unpkg.com/sweetalert/dist/sweetalert.min.js " > </script>
        <script src = " layout/js/encuesta.js " > </script>
        <title>Formulario de Encuesta</title>
    </head>
    <body style="font-family: ' . "'Russo One'" . ', sans-serif;">';
    $footer = '<div class="container text-center"><br><br><br><button class="btn btn-outline-primary" onclick="Guardar();">ENVIAR ENCUESTA</button></div>
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js"></script>
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta3/dist/js/bootstrap.bundle.min.js" integrity="sha384-JEW9xMcG8R+pH31jmWH6WWP0WintQrMb4s7ZOdauHnUtxwoG2vI5DkLtS3qm9Ekf" crossorigin="anonymous"></script>
    </body>
</html>';

    $respuesta = "FALSE";
    $Dato = $_POST['Estructura'];
    $Inputs = json_decode($_POST['Input']);
    $Datos = [];
    $Preguntas = [];
    $Campos = [];
    $Calificacion = [];
    $index = 0;
    $ax = count($Inputs);
    for ($j = 0; $j < $ax; $j = $j + 5) {
        $Datos[$index] = [
            'Campo' => $Inputs[$j],
            'Tipo' => $Inputs[$j + 2],
            'Verificacion' => $Inputs[$j + 3]
        ];
        $Preguntas[$index] = $Inputs[$j + 1];
        $Campos[$index] = $Inputs[$j];
        $Calificacion[$index] = $Inputs[$j + 4];
        $index++;
    }
    $contDato = count($Datos);
    $i = false;
    $cont = 0;
    do {
        $cont++;
        $nameCarpetas = str_replace(" ", "", $_SESSION['Empresa']);
        $pathp = "encuestas/" . $nameCarpetas;
        $path = $pathp . "/formulario" . $cont;
        $nameform = "formulario" . $cont;
        if (!is_dir("../" . $pathp)) {
            mkdir("../" . $pathp, 0777, true);
        }
        if (!is_dir("../" . $path)) {
            mkdir("../" . $path, 0777, true);
            mkdir("../" . $path . "/temp", 0777, true);
            mkdir("../" . $path . "/layout/css", 0777, true);
            mkdir("../" . $path . "/layout/js", 0777, true);
            $i = true;
            $control = fopen("../" . $path . "/encuesta.html", "w+");
            if ($control == false) {
                $respuesta = "NULL";
            } else {
                $file = fopen("../" . $path . "/encuesta.html", "w");
                fwrite($file, $header . PHP_EOL);
                fwrite($file, $Dato . PHP_EOL);
                fwrite($file, $footer . PHP_EOL);
                fclose($file);
                $copiar = 2;
                if (!copy("../layout/css/main.css", "../" . $path . "/layout/css/main.css")) {
                    $copiar--;
                } else {
                    if (!copy("../layout/jquery/main.js", "../" . $path . "/layout/js/main.js")) {
                        $copiar--;
                    }
                }
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
                if ($copiar == 2) {
                    $nameData = str_replace(" ", "", $_SESSION['Empresa']);
                    $result = createDatabase($nameData);
                    if ($result === 1) {
                        $_SESSION['Tabla'] = $nameform;
                        $result2 = createTable($nameData, $nameform, $Campos);
                        if ($result2 == 1) {
                            $result3 = InsertData($nameData, $nameform, $Preguntas);
                            if ($result3 == 1) {
                                $result4 = InsertData($nameData, $nameform, $Calificacion);
                                if ($result4 === 1) {
                                    $result5 = CrearJs($path, $Datos);
                                    $contador = $result5;
                                    $result6 = CrearPHP($nameData, $nameform, $path, $Datos);
                                    $contador = $contador + $result6;
                                    if ($contador == 2) {
                                        $respuesta = $path . "/encuesta.html";
                                    } else {
                                        $respuesta = "NULL";
                                    }
                                } else {
                                    $respuesta = $result4;
                                }
                            } else {
                                $respuesta = $result3;
                            }
                        } else {
                            $respuesta = $result2;
                        }
                    } else {
                        $respuesta = "no se creo la base";
                    }
                } else {
                    $respuesta = "NULL";
                }
            }
        }
    } while ($i == false);
    echo $respuesta;
//    echo $contDato;
}

function CrearJs($path, $Datos) {
    $estructura = "function limpiar(){";
    $estructura2 = "function Guardar(){";
    $estructura3 = 'function traerDato(name){
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
}';
    $estructura2 .= 'var parametros = {
        "Enviar": true,';
    $ax = count($Datos);
    for ($j = 0; $j < $ax; $j++) {
        if ($Datos[$j]['Tipo'] == 0) {
            $estructura .= 'document.getElementById("' . $Datos[$j]['Campo'] . '").value = "";';
            $estructura2 .= '"' . $Datos[$j]['Campo'] . '": document.getElementById("' . $Datos[$j]['Campo'] . '").value';
        }
        if ($Datos[$j]['Tipo'] == 1) {
            $estructura2 .= '"' . $Datos[$j]['Campo'] . '":traerDato("' . $Datos[$j]['Campo'] . '")';
        }
        if ($Datos[$j]['Tipo'] == 2) {
            $estructura2 .= '"' . $Datos[$j]['Campo'] . '":$("#' . $Datos[$j]['Campo'] . '").val()';
        }
        if ($Datos[$j]['Tipo'] == 3) {
            $estructura2 .= '"' . $Datos[$j]['Campo'] . '":vercheck("' . $Datos[$j]['Campo'] . '")';
        }
        if ($j + 1 < $ax) {
            $estructura2 .= ",";
        } else {
            $estructura2 .= "};";
        }
    }
    $estructura2 .= 'console.log(parametros);
        $.ajax({
        data: parametros, url: "ajax/encuesta.php", type: "POST",
        success: function (response) {
        console.log(response);
            if (response == 1) {
                swal("CORRECTO...!", "El Registro Fue Creado sin Problemas.. ", "success").then((value) => {
                            window.location.href="' . $_SESSION['Web'] . '";
                        });
            } else {
                swal("ERROR...!", "No se pudo Concluir el Proceso Intentelo Mas Tarde", "warning");                
            }
        }
    });';
    $estructura2 .= "}";
    $estructura .= "}";
    $respuesta = 0;
    $aux = fopen("../" . $path . "/layout/js/encuesta.js", "w+");
    if ($aux == true) {
        $file = fopen("../" . $path . "/layout/js/encuesta.js", "w");
        fwrite($file, $estructura . PHP_EOL);
        fwrite($file, $estructura2 . PHP_EOL);
        fwrite($file, $estructura3 . PHP_EOL);
        fclose($file);
        $respuesta = 1;
    }
    return $respuesta;
}

function CrearPHP($base, $tabla, $path, $Datos) {
    $estructura = "<?php ";
    $estructura .= " if ((isset(/_POST['Enviar']))) {";

    $consulta = "/consulta= 'insert into " . $base . "." . $tabla . " values(default,";
    $ax = count($Datos);
    for ($i = 0; $i < $ax; $i++) {
        $input = '"' . "'" . './_POST["' . $Datos[$i]['Campo'] . '"].' . "'" . '"';
        $consulta .= $input;
        if (($i + 1) < $ax) {
            $consulta .= ',';
        } else {
            $consulta .= ");';";
        }
    }
    $estructura .= $consulta;
    include '../data/VarConexion.php';
    $estructura .= "/servidor = '" . $servidor . "';
    /usuario = '" . $usuario . "';
    /pass = '" . $pass . "';
    /bdd='" . $base . "';
    /conexion = new mysqli(/servidor, /usuario, /pass, /bdd);
    if (/conexion->query(/consulta)) {
        /respuesta = 1;
    } else {
        /respuesta = 0;
    }
    echo /respuesta;";

    $estructura .= "}  ?>";
    $respuesta = 0;
    mkdir("../" . $path . "/ajax", 0777, true);
    $aux = fopen("../" . $path . "/ajax/original.php", "w+");
    if ($aux == true) {
        $file = fopen("../" . $path . "/ajax/original.php", "w");
        fwrite($file, $estructura . PHP_EOL);
        fclose($file);
        remplazarchar($path);
        $respuesta = 1;
    }
    return $respuesta;
}

function remplazarchar($path) {
    $contenidoOriginal = file_get_contents("../" . $path . "/ajax/original.php");
    $contenidoRemplazado = str_replace("/", "$", $contenidoOriginal);
    file_put_contents("../" . $path . "/ajax/encuesta.php", $contenidoRemplazado);
    unlink("../" . $path . "/ajax/original.php");
}

function createDatabase($newbdd) {
    $respuesta = 0;
    include '../data/Connection.php';
    $consulta = "create database if not exists " . $newbdd . ";";
    if ($conexion->query($consulta)) {
        $respuesta = 1;
    } else {
        $respuesta = 0;
    }
    return $respuesta;
}

function createTable($newbdd, $nametable, $campos) {

    $ax = count($campos);
    $celdas = "id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,";
    for ($i = 0; $i < $ax; $i++) {
        $celdas .= $campos[$i] . " varchar(200)not null";
        if (($i + 1) < $ax) {
            $celdas .= ',';
        }
    }
    include '../data/VarConexion.php';
    $conexion = new mysqli($servidor, $usuario, $pass, $newbdd);
    $consulta = "CREATE TABLE " . $nametable . " (" . $celdas . ");";
    if ($conexion->query($consulta)) {
        $respuesta = 1;
    } else {
        $respuesta = 0;
    }
    return $respuesta;
}

function InsertData($newbdd, $nametable, $Preguntas) {
    $ax = count($Preguntas);
    $consulta = "insert into " . $newbdd . "." . $nametable . " values(default,";
    for ($i = 0; $i < $ax; $i++) {
        $consulta .= "'" . $Preguntas[$i] . "'";
        if (($i + 1) < $ax) {
            $consulta .= ",";
        } else {
            $consulta .= ")";
        }
    }
    include '../data/VarConexion.php';
    $conexion = new mysqli($servidor, $usuario, $pass, $newbdd);
    if ($conexion->query($consulta)) {
        $respuesta = 1;
    } else {
        $respuesta = 0;
    }
    return $respuesta;
}
