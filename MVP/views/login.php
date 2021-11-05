<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <meta http-equiv="X-UA-Compatible" content="ie=edge">

    <title>MVP KIMOBILL</title>
    <link rel="shortcut icon" href="layout/img/kimobill.png">
    <link href="https://fonts.googleapis.com/css?family=Karla:400,700&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://cdn.materialdesignicons.com/4.8.95/css/materialdesignicons.min.css">
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css">
    <link href="../templates/css/login.css" rel="stylesheet" type="text/css" />
    <link rel="preconnect" href="https://fonts.gstatic.com">
    <link href="https://fonts.googleapis.com/css2?family=Josefin+Sans:ital,wght@0,400;0,500;0,700;1,300&display=swap" rel="stylesheet">

    <script src="https://unpkg.com/sweetalert/dist/sweetalert.min.js"></script>
    <script src="scripts/validaciones.js" type="text/javascript"></script>
    <script src="scripts/login.js" type="text/javascript"></script>

    <style type="text/css">
        #divlogin {
            width: 400px;
            height: 600px;
            margin-top: -280px;
            margin-left: -200px;
            left: 50%;
            top: 50%;
            position: absolute;
        }
    </style>
</head>

<body style="font-family: 'Josefin Sans', sans-serif; background-color:#FFFFFF">
    <div class="container">
        <form action="../ajax/loginC.php" name="login" id="login" method="post">
            <div id="divlogin" class="border border-info border-5 rounded-3 text-center" style="width: 400px; height:530px; background-color:#FFFFFF">
                <center>
                    <img src="../templates/images/login/0.png" id="imagenlogin" name="imagenlogin">
                </center>
                <br>
                <h5></h5>
                <br>
                <div class="container">
                    <div class="container">
                        <div class="form-group">
                            <input type="text" name="txtUsuario" id="txtUsuario" class="form-control" placeholder="Usuario" onKeyUp="usuario(this);" onfocus="usuario(this);">
                        </div>
                        <div class="form-group">
                            <input type="password" name="txtPass" id="txtPass" class="form-control" placeholder="Contraseña" onkeypress="valKey(event);" onKeyUp="password();" onfocus="password();">
                        </div><br>
                    </div>
                </div>
                <div class="container">
                    <input class="btn btn-outline-primary mb-4" type="submit" value="Iniciar Sesion"><br>
                </div>
            </div>
        </form>
    </div>
    <script src="https://code.jquery.com/jquery-3.4.1.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js"></script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/js/bootstrap.min.js"></script>
</body>

</html>