<?php
session_start();
if ($_SESSION['usuario'] == "") {
    session_unset($_SESSION['usuario']);
    session_unset($_SESSION['nombres']);
    session_unset($_SESSION['desrol']);
    header('location: ../views/login.php');
}

?>

<body>
    <div class="container-scroller">
        <!-- partial:partials/_navbar.html -->
        <nav class="navbar col-lg-12 col-12 p-0 fixed-top d-flex flex-row">
            <div class="text-center navbar-brand-wrapper d-flex align-items-center justify-content-center">
                <a class="navbar-brand brand-logo" href="../views/begin.php"><img src="../templates/images/logo-white.svg" alt="logo" /></a>
                <a class="navbar-brand brand-logo-mini" href="../views/begin.php"><img src="../templates/images/logo-mini.svg" alt="logo" /></a>
            </div>
            <div class="navbar-menu-wrapper d-flex align-items-center justify-content-end">
                <button class="navbar-toggler navbar-toggler align-self-center" type="button" data-toggle="minimize">
                    <span class="mdi mdi-menu"></span>
                </button>
                <ul class="navbar-nav navbar-nav-right">
                    <li class="nav-item nav-search d-none d-lg-block">
                        <div class="input-group">
                            <div class="input-group-prepend">
                                <span class="input-group-text" id="search">
                                    <i class="mdi mdi-magnify"></i>
                                </span>
                            </div>
                            <input type="text" class="form-control" placeholder="Type to search" aria-label="search" aria-describedby="search">
                        </div>
                    </li>
                    <li class="nav-item nav-profile dropdown">
                        <a class="nav-link" href="#" data-toggle="dropdown" id="profileDropdown">
                            <img src="https://via.placeholder.com/31x31" alt="profile" />
                        </a>
                        <div class="dropdown-menu dropdown-menu-right navbar-dropdown" aria-labelledby="profileDropdown">
                            <a class="dropdown-item">
                                <i class="mdi mdi-settings text-primary"></i>
                                Cambiar contraseña
                            </a>
                            <a class="dropdown-item" href="../ajax/logoutC.php">
                                <i class="mdi mdi-logout text-primary"></i>
                                Salir
                            </a>
                        </div>
                    </li>
                </ul>
                <button class="navbar-toggler navbar-toggler-right d-lg-none align-self-center" type="button" data-toggle="offcanvas">
                    <span class="mdi mdi-menu"></span>
                </button>
            </div>
        </nav>
        <!-- partial -->
        <div class="container-fluid page-body-wrapper">
            <!-- partial:partials/_sidebar.html -->
            <nav class="sidebar sidebar-offcanvas" id="sidebar">
                <div class="sidebar-profile">
                    <div class="d-flex align-items-center justify-content-between">
                        <img src="https://via.placeholder.com/37x37" alt="profile">
                        <div class="profile-desc">
                            <span class="designation mb-0"><?php echo $_SESSION['nombres']; ?></span>
                            <p class="designation mb-0"><?php echo $_SESSION['desrol']; ?></p>
                        </div>
                    </div>
                </div>
                <ul class="nav">
                    <li class="nav-item">
                        <a class="nav-link" data-toggle="collapse" href="#dashboard" aria-expanded="false" aria-controls="dashboard">
                            <i class="mdi mdi-checkbox-blank-circle-outline menu-icon"></i>
                            <span class="menu-title">Dashboard</span>
                            <i class="menu-arrow"></i>
                        </a>
                        <div class="collapse" id="dashboard">
                            <ul class="nav flex-column sub-menu">
                                <li class="nav-item"> <a class="nav-link" href="./dashboardExperiencia.php">Experiencia</a></li>
                                <li class="nav-item"> <a class="nav-link" href="dashboardPromesaServicio.php">Promesa de Servicio</a>
                                </li>
                            </ul>
                        </div>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="cargaBase.php">
                            <i class="mdi mdi-puzzle menu-icon"></i>
                            <span class="menu-title">Carga de base</span>
                        </a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" data-toggle="collapse" href="#encuestas" aria-expanded="false" aria-controls="encuestas">
                            <i class="mdi mdi-checkbox-blank-circle-outline menu-icon"></i>
                            <span class="menu-title">Encuestas</span>
                            <i class="menu-arrow"></i>
                        </a>
                        <div class="collapse" id="encuestas">
                            <ul class="nav flex-column sub-menu">
                                <li class="nav-item"> <a class="nav-link" href="./generarEncuentas.php">Generar</a></li>
                                <li class="nav-item"> <a class="nav-link" href="./visualizarEncuestas.php">Visualizar</a></li>
                            </ul>
                        </div>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="./speechText.php">
                            <i class="mdi mdi-comment-alert menu-icon"></i>
                            <span class="menu-title">Speech to Text</span>
                        </a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" data-toggle="collapse" href="#administración" aria-expanded="false" aria-controls="administración">
                            <i class="mdi mdi-emoticon menu-icon"></i>
                            <span class="menu-title">Administración</span>
                            <i class="menu-arrow"></i>
                        </a>
                        <div class="collapse" id="administración">
                            <ul class="nav flex-column sub-menu">
                                <li class="nav-item"> <a class="nav-link" href="./aministracionUsuario.php">Usuario</a></li>
                                <li class="nav-item"> <a class="nav-link" href="./administracionAgencias.php">Agencias</a></li>
                            </ul>
                        </div>
                    </li>
                </ul>
            </nav>