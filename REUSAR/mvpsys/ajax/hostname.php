<?php
function url_conexion(){
  if(isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] === 'on') {
    $url = "https://"; 
  }else{
    $url = "http://"; 
  }
//  $urlFinal=$url . $_SERVER['HTTP_HOST']."/mvpsys/data/Connectiondata.php";
  $urlFinal="......../data/Connectiondata.php";
  return $urlFinal;
 }