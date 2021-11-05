<?php

define('METHOD','AES-256-CBC');
define('SECRET_KEY','Kimobill@2021');
define('SECRET_IV','101712');

//echo Passwords::encryption("Admin@123");

class Passwords{
    
        public static function encryption($string){
                $output=FALSE;
                $key=hash('sha256', SECRET_KEY);
                $iv=substr(hash('sha256', SECRET_IV), 0, 16);
                $output=openssl_encrypt($string, METHOD, $key, 0, $iv);
                $output=base64_encode($output);
                return $output;
        }
        public static function decryption($string){
                $key=hash('sha256', SECRET_KEY);
                $iv=substr(hash('sha256', SECRET_IV), 0, 16);
                $output=openssl_decrypt(base64_decode($string), METHOD, $key, 0, $iv);
                return $output;
        }
}

