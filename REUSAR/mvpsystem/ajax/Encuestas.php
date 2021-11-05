<?php

session_start();
if ((isset($_POST['Buscar']))) {
    include '../data/Connection.php';
    $codigo = $_SESSION['IdUser'];

    $ventana = "";
    $ventana .= '<div class"container"><div class="table-responsive">'
            . '<table class="table table-hover">';
    $ventana .= '<thead>';
    $ventana .= '<tr>'
            . '<th>#</th>'
            . '<th>URL</th>'
            . '<th></th>'
            . '</tr>';
    $ventana .= '</thead>';
    $ventana .= '<tbody>';
    $cotador = 0;
    $consulta = "SELECT enc_id,enc_url,enc_data,enc_table from tbl_encuestas where emp_id=" . $codigo;
    if (($segmento = $conexion->query($consulta))) {
        while ($obj = $segmento->fetch_object()) {
            $cotador++;
            $ventana .= "<tr>";
            $ventana .= '<th>' . $cotador . '</th>';
            $ventana .= '<th>' . $obj->enc_url . '</th>';
            $ventana .= '<td>';
            $nameData = str_replace(" ", "", $obj->enc_data);
            $ventana .= '<button class="btn btn-outline-info"  title="Vista Previa del Formulario" onclick="Ver(' . "'" . $obj->enc_url . "');" . '"><i class="bx bx-search fa-2x"></i></button>';
            $ventana .= '<button class="btn btn-outline-primary" title="Estadisticas" onclick="Estadisticas(' . "'" . $nameData . "','" . $obj->enc_table . "'" . ');"><i class="fas fa-chart-line fa-2x"></i></button>';
            $ventana .= '<button class="btn btn-outline-success" title="Ver Información Ingresada" onclick="Informacion(' . "'" . $nameData . "','" . $obj->enc_table . "'" . ');"><i class="fas fa-database fa-2x"></i></button>';
            $ventana .= '<button class="btn btn-outline-danger" title="Eliminar Encuesta" onclick=" Eliminar(' . $obj->enc_id . ');"><i class="far fa-trash-alt fa-2x"></i></button>';
            $ventana .= '</td>';
            $ventana .= "<tr>";
        }
        $segmento->close();
    }
    $ventana .= '</tbody></table></div></div>';
    echo $ventana;
}

if ((isset($_POST['Informacion']))) {
    include '../data/VarConexion.php';
    $base = $_POST['Base'];
    $tabla = $_POST['Tabla'];
    try {

        $db = $base;
        $conexion = new mysqli($servidor, $usuario, $pass, $db);

        if ($conexion->connect_errno) {
            echo '<script>alert("NO SE PUDO CONECTAR A LA BASE DE DATOS");</script>';
        }
    } catch (Exception $ex) {
        echo '<script>alert("ERROR AL MOMENTO AL CONECTAR CON EL GESTOR DE BASE DE DATOS");</script>';
    }
    $ventana = "";
    $ventana .= '<div class="container"><div class="table-responsive"><table class="table table-hover">';
    $ventana .= '<thead>';
    $labelarray = [];
    $result = $conexion->query("SHOW COLUMNS FROM " . $tabla);
    $aux1 = 0;
    $fila = 0;
    if ($result->num_rows > 0) {

        while ($row = $result->fetch_assoc()) {
            $labelarray[$fila] = $row['Field'];
            $fila++;
        }
    }
    $result1 = $conexion->query("SELECT * from " . $tabla);
    if ($result1->num_rows >= 0) {
        while ($row1 = $result1->fetch_assoc()) {
            if ($aux1 == 0) {
                $aux1 = 1;
                $ventana .= '<tr>';
                for ($i = 0; $i < count($labelarray); $i++) {
                    if ($i == 0) {
                        $ventana .= '<th>#</th>';
                    } else {
                        $ventana .= '<th>' . $row1[$labelarray[$i]] . '</th>';
                    }
                }
                $ventana .= '</tr>';
                $ventana .= '</thead>';
                $ventana .= '<tbody>';
            } else {
                $ventana .= '<tr>';
                for ($i = 0; $i < count($labelarray); $i++) {
                    if ($i == 0) {
                        $ventana .= '<th>' . (($row1[$labelarray[$i]]) - 1) . '</th>';
                    } else {
                        $ventana .= '<td>' . $row1[$labelarray[$i]] . '</td>';
                    }
                }
                $ventana .= '</tr>';
            }
        }
    }
    $ventana .= '</tbody></table></div></div>';
    echo $ventana;
}

if ((isset($_POST['Estadisticas']))) {
    include '../data/VarConexion.php';
    $base = $_POST['Base'];
    $tabla = $_POST['Tabla'];
    $data = array();
    try {
        $db = $base;
        $conexion = new mysqli($servidor, $usuario, $pass, $db);
        if ($conexion->connect_errno) {
            $data[0] = "NULL";
        }
    } catch (Exception $ex) {
        $data[0] = "ERROR";
    }
    $labelarray = [];
    $result = $conexion->query("SHOW COLUMNS FROM " . $tabla);
    $fila = 0;
    if ($result->num_rows > 0) {

        while ($row = $result->fetch_assoc()) {
            $labelarray[$fila] = $row['Field'];
            $fila++;
        }
    }
    $dfila = array();
    $fila = 0;
    for ($i = 1; $i < count($labelarray); $i++) {
        $aux = 0;
        $atributo = "";
        $columna = $labelarray[$i];
        $result1 = $conexion->query("SELECT " . $columna . " from " . $tabla);
        if ($result1->num_rows > 0) {
            $cont1 = 0;
            $cont0 = 0;
            while ($row1 = $result1->fetch_assoc()) {
                $aux++;
                if ($aux == 1) {
                    $dfila['preg'] = $row1[$columna];
                } else {
                    if ($aux == 2) {
                        $dfila['atrib'] = $row1[$columna];
                        $atributo = $row1[$columna];
                    } else {
                        if ($aux > 2) {
                            if ($row1[$columna] > 8) {
                                $cont1 = $cont1 + 1;
                            } else {
                                $cont0 = $cont0 + 1;
                            }
                        }
                    }
                }
            }
            $aux2 = 0;
            if($dfila['atrib']=="Informativo" || $dfila['atrib']=="Informativa") {
               $aux2=1; 
            }
            if($aux2==0) {
                $dfila['cero'] = $cont0;
                $dfila['uno'] = $cont1;
                $data[$fila] = $dfila;
                $fila = $fila + 1;
            }
        }
    }
    echo json_encode($data);
}



if ((isset($_POST['Guardar']))) {
    $codigo = $_SESSION['IdUser'];
    $bases = str_replace(" ", "", $_SESSION['Empresa']);
    $tablas = $_SESSION['Tabla'];
    $url = $_POST['URL'];
    $respuesta = 0;
    include '../data/Connection.php';
    $consulta = "call ENCUESTAS_INSERT(" . $codigo . ",'" . $url . "','" . $bases . "','" . $tablas . "')";
    if (($segmento = $conexion->query($consulta))) {
        while ($obj = $segmento->fetch_object()) {
            $respuesta = $obj->msn;
        }
        $segmento->close();
    }
    echo $respuesta;
}

if ((isset($_POST['Eliminar']))) {
    $Id = $_POST['Codigo'];
    $respuesta = 0;
    include '../data/Connection.php';
    $consulta = "call ENCUESTAS_DELETE(" . $Id . ")";
    if (($segmento = $conexion->query($consulta))) {
        while ($obj = $segmento->fetch_object()) {
            if ($obj->msn == 1) {
                $res = borrarData($obj->base, $obj->tabla);
                if ($res == true) {
                    $respuesta = $obj->msn;
                } else {
                    $respuesta = 2;
                }
            }
        }
        $segmento->close();
    }
    echo $respuesta;
}

function borrarData($base1, $tabla1) {
    include '../data/VarConexion.php';
    $base = $base1;
    $tabla = $tabla1;
    try {

        $db = $base;
        $conexion = new mysqli($servidor, $usuario, $pass, $db);

        if ($conexion->connect_errno) {
            echo '<script>alert("NO SE PUDO CONECTAR A LA BASE DE DATOS");</script>';
        }
    } catch (Exception $ex) {
        echo '<script>alert("ERROR AL MOMENTO AL CONECTAR CON EL GESTOR DE BASE DE DATOS");</script>';
    }
    if (($result1 = $conexion->query("DROP TABLE " . $tabla))) {
        BorrarDirectorio('../encuestas/' . $base . '/' . $tabla);
        return true;
    } else {
        return false;
    }
}

function BorrarDirectorio($dir) {
    if ($handle = opendir($dir)) {
        while ((($file = readdir($handle)) !== false)) {
            if ($file != '.' && $file != '..') {
                if (is_dir($dir . '/' . $file)) {
                    $result = BorrarDirectorio($dir . '/' . $file);
                } else {
                    $result = unlink($dir . '/' . $file);
                }
            }
        }
        closedir($handle);
        rmdir($dir);
    }
}
