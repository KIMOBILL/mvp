<html lang="en">
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
        <title>Formulario de prueba23</title>
    </head>
    <body">

        <div class="container rounded-3" id="objetos" style="backgroundColor:#ffffff;color:#000000"><div class="container" id="div1"><br><div class="row"><div class="col-2"></div><div class="col-8 text-start " style="word-wrap: break-word;"><label for="txtEmail1" class="form-label"><b>Correo Electronico</b></label></div><div class="col-2"></div></div><div class="row"><div class="col-2"></div><div class="col-8 text-start border border-dark rounded-3" style="word-wrap: break-word;"><br><input class="form-control" type="email" id="txtEmail1" placeholder="name@example.com" pattern="^[a-zA-Z0-9.!#$%&amp;’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:.[a-zA-Z0-9-]+)*$" title="insertar correos validos ejemplo: prueba@prueba.com" onkeyup="this.value = this.value.toLowerCase();"><br></div><div class="col-2"></div></div><br></div><div class="container" id="div2"><br><div class="row"><div class="col-2"></div><div class="col-8 text-start " style="word-wrap: break-word;"><label for="txtComent2" class="form-label"><b>Ingrese un Comentario sobre Nuestros Servicios</b></label></div><div class="col-2"></div></div><div class="row"><div class="col-2"></div><div class="col-8 text-start border border-dark rounded-3" style="word-wrap: break-word;"><br><textarea class="form-control" type="text" id="txtComent2" name="txtComent2" placeholder="Comentario..." title="Ingresar Comentario"></textarea><br></div><div class="col-2"></div></div><br></div></div>
    
<div class="container text-center"><br><br><br><button class="btn btn-outline-primary" onclick="Guardar();">ENVIAR ENCUESTA</button></div>
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js"></script>
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta3/dist/js/bootstrap.bundle.min.js" integrity="sha384-JEW9xMcG8R+pH31jmWH6WWP0WintQrMb4s7ZOdauHnUtxwoG2vI5DkLtS3qm9Ekf" crossorigin="anonymous"></script>
    </body>
</html>
