<!--========== NAV ==========-->
<div class="nav" id="navbar">
    <nav class="nav__container">
        <div>
            <a href="panel.php" class="nav__link nav__logo">                        
                <span class="nav__logo-name"><img src="layout/img/LOGO-KX-METRICS.png" width="250"></span>
            </a>

            <div class="nav__list">
                <div class="nav__items">
                    <!--                            <h3 class="nav__subtitle">Menu</h3>-->
                        <a href="panel.php" class="nav__link active">
                        <i class='bx bx-home nav__icon' ></i>
                        <span class="nav__name">Inicio</span>
                    </a>
                    <a href="informativo.php" class="nav__link">
                        <i class='fas fa-tachometer-alt nav__icon' ></i>
                        <span class="nav__name">Indicadores de XP</span>
                    </a>
                    <a href="analisis.php" class="nav__link">
                        <i class='fas fa-chart-bar nav__icon' ></i>
                        <span class="nav__name">Analisis de Datos</span>
                    </a>
                                            
                    
                </div>                        

                <div class="nav__items">
                    <!--                            <h3 class="nav__subtitle">Profile</h3>-->
                    <a href="panel.php" class="nav__link">
                        <i class='bx bx-message-rounded nav__icon' ></i>
                        <span class="nav__name">Mensajes</span>
                    </a>

                    <div class="nav__dropdown">
                        <a href="" class="nav__link">
                            <i class='bx bx-bell nav__icon' ></i>
                            <span class="nav__name">Notificaciones</span>
                            <i class='bx bx-chevron-down nav__icon nav__dropdown-icon'></i>
                        </a>

                        <div class="nav__dropdown-collapse">
                            <div class="nav__dropdown-content">
                                <a href="#" class="nav__dropdown-item"><i class='bx bx-bell' ></i> Blocked</a>
                                <a href="#" class="nav__dropdown-item"><i class='bx bx-bell' ></i> Silenced</a>
                                <a href="#" class="nav__dropdown-item"><i class='bx bx-bell' ></i> Publish</a>
                                <a href="#" class="nav__dropdown-item"><i class='bx bx-bell' ></i> Program</a>
                            </div>
                        </div>

                    </div>

                </div>




            </div>
        </div>
        <div class="nav__logout">
            <div class="nav__dropdown">
                <a href="" class="nav__link">
                    <i class=' fas fa-street-view fa-1x  nav__icon' ></i>
                    <span class="nav__name">Usuario</span>
                    <i class='bx bx-chevron-down nav__icon nav__dropdown-icon'></i>
                </a>

                <div class="nav__dropdown-collapse">
                    <div class="nav__dropdown-content">
                        <a href="cambioclave.php" class="nav__dropdown-item"><i class='fas fa-key' ></i> Clave</a>
                        <a href="informacion.php" class="nav__dropdown-item"><i class='fas fa-user-edit' ></i> Información</a>
                    </div>
                </div>
            </div>
        </div>
        <a href="salir.php" class="nav__link nav__logout">
            <i class='bx bx-log-out nav__icon' ></i>
            <span class="nav__name">Cerrar Sesion</span>
        </a>
    </nav>
</div>

