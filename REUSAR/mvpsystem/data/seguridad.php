<?php
if(isset($_SESSION['IdUser'])==true){
   if(($_SESSION['IdUser']=="")||($_SESSION['IdUser']=="NULL")){
       header("Location: salir.php");
   }  
}else{
    header("Location: salir.php");
}
