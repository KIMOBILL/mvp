<?php
                        include '../../../../data/Connectiondata.php';  
                        if ((isset($_POST['Guardar']))) {
                            $respuesta=0;
                            $consulta= 'call RESPUESTASAVE('.$_POST['IdPregunta'].','.$_POST['Filtro'].',"'.$_POST['Respuesta'].'","'.$_POST['Observacion'].'"'.')';
                            if (($segmento = $conexion->query($consulta))) {
                                while ($obj = $segmento->fetch_object()) {
                                    if($obj->msn==1 || $obj->msn=='1' || $obj->msn==true){
                                        $respuesta =1; 
                                    }            
                                }
                                $segmento->close();
                            }    
                        echo $respuesta;
                        }  
                    ?>
