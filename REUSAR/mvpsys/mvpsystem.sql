-- phpMyAdmin SQL Dump
-- version 5.1.0
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 28-10-2021 a las 20:15:11
-- Versión del servidor: 10.4.18-MariaDB
-- Versión de PHP: 8.0.3

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `mvpsystem`
--

DELIMITER $$
--
-- Procedimientos
--
CREATE DEFINER=`root`@`localhost` PROCEDURE `ENCUESTADELETE` (IN `$Encuesta` INT)  BEGIN
declare $msn boolean default false;
declare $codigo int default 0;
DECLARE varfinal int DEFAULT 0;
declare $nombre text default "";
DECLARE cursor1 CURSOR FOR SELECT pre_id FROM tbl_preguntas where enc_id=$Encuesta;
DECLARE CONTINUE HANDLER FOR NOT FOUND SET varfinal = 1;

if(exists(select * from tbl_encuestas where enc_id=$Encuesta))then
	set $nombre=(select enc_nom from tbl_encuestas where enc_id=$Encuesta);
	if(exists(select * from tbl_preguntas where enc_id=$Encuesta))then
		OPEN cursor1;
		  bucle: LOOP
			FETCH cursor1 INTO $codigo;
			IF varfinal = 1 THEN
			  LEAVE bucle;
			END IF;
			DELETE FROM tbl_respuestas WHERE pre_id = $codigo;
			DELETE FROM tbl_detalle WHERE pre_id = $codigo;  
		  END LOOP bucle;
		CLOSE cursor1;
		DELETE FROM tbl_preguntas WHERE enc_id = $Encuesta;
	end if;
	if(exists(select * from tbl_filtros where enc_id=$Encuesta)) then
		DELETE FROM tbl_filtros WHERE enc_id = $Encuesta;
	end if;    
	DELETE FROM tbl_encuestas WHERE enc_id = $Encuesta;
    set $msn=true;
end if;

select $msn as msn , $nombre as Nombre;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `ENCUESTASAVE` (IN `$Nombre` TEXT, IN `$Empresa` INT, IN `$Url` TEXT)  BEGIN
declare $msn boolean default false;
declare $codigo int default 0;
if(not exists(select * from tbl_encuestas where enc_nom=$Nombre and emp_id=$Empresa))then
insert into tbl_encuestas(emp_id,enc_nom,enc_fecha,enc_url,enc_est) values($Empresa,$nombre,CURDATE(),$Url,1);
set $codigo =(select enc_id from tbl_encuestas where enc_nom=$Nombre and emp_id=$Empresa);
set $msn=true;
end if;
select $msn as msn, $codigo as IdEncuesta;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `FILTROESTADO` (IN `$id` INT, IN `$estado` INT)  BEGIN
declare $msn boolean default false;
declare $idIndicador int default 0;
declare $codigo int default 0;
if (exists(select * from tbl_filtros where filtro_id=$id))then
update tbl_filtros set
filtro_est=$estado
where (filtro_id=$id);
set $msn=true;
end if;
select $msn as msn;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `FILTROFULLSAVE` (IN `$Empresa` INT, IN `$Encuesta` INT, IN `$Canal` INT, IN `$Seccion` INT, IN `$Otros` INT)  BEGIN
declare $msn boolean default false;
declare $codigo int default 0;
declare $contreg int default 0;
declare $contsave int default 0;
DECLARE idAgencia int;
DECLARE varfinal int DEFAULT 0;
DECLARE cursor1 CURSOR FOR SELECT codigo FROM view_agencias where idempresa=$Empresa;
DECLARE CONTINUE HANDLER FOR NOT FOUND SET varfinal = 1;
OPEN cursor1;
  bucle: LOOP
    FETCH cursor1 INTO idAgencia;
    IF varfinal = 1 THEN
      LEAVE bucle;
    END IF;
    set $contreg=$contreg+1;
    if(not exists(select * from tbl_filtros where enc_id=$Encuesta and age_id=idAgencia and can_id=$Canal and sec_id=$Seccion and otr_id=$Otros))then
		insert into tbl_filtros(enc_id,age_id,can_id,sec_id,otr_id,filtro_est) values($Encuesta,idAgencia,$Canal,$Seccion,$Otros,1);
        set $contsave=$contsave+1;
	end if;
  END LOOP bucle;
CLOSE cursor1;
if ($contreg>0 and $contsave>0) then
set $msn=true;
end if;
select $msn as msn;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `FILTROSAVE` (IN `$Encuesta` INT, IN `$Agencia` INT, IN `$Canal` INT, IN `$Seccion` INT, IN `$Otros` INT)  BEGIN
declare $msn boolean default false;
declare $codigo int default 0;
if(not exists(select * from tbl_filtros where enc_id=$Encuesta and age_id=$Agencia and can_id=$Canal and sec_id=$Seccion and otr_id=$Otros))then
insert into tbl_filtros(enc_id,age_id,can_id,sec_id,otr_id,filtro_est) values($Encuesta,$Agencia,$Canal,$Seccion,$Otros,1);
set $msn=true;
end if;
select $msn as msn;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `LOGIN` (IN `$_usuario` VARCHAR(100), IN `$_passwords` TEXT)  BEGIN
/*VARIABLES DE AYUDA*/
declare $_msn boolean default false;
declare $cod_personal int default 0;
declare $nombres text default "";
declare $cod_rol int default 0;
declare $rol text default "";
declare $cod_empresa int default 0;
declare $empresa varchar(200) default "";
declare $web varchar(200) default "" ;
/*PROCESO DE VERIFICACION DE CREDENCIALES*/
    if(exists (select * from view_login where usuario=$_usuario and clave=$_passwords and est_personal=1 and est_clave=1 ))then
		set $cod_empresa=(select cod_empresa from view_login where usuario=$_usuario and clave=$_passwords and est_personal=1 and est_clave=1);
        set $empresa=(select empresa from view_login where usuario=$_usuario and clave=$_passwords and est_personal=1 and est_clave=1);
        set $web=(select web from view_login where usuario=$_usuario and clave=$_passwords and est_personal=1 and est_clave=1);
        set $cod_personal=(select cod_personal from view_login where usuario=$_usuario and clave=$_passwords and est_personal=1 and est_clave=1);
        set $nombres=(select nombres from view_login where usuario=$_usuario and clave=$_passwords and est_personal=1 and est_clave=1);
        set $cod_rol=(select cod_rol from view_login where usuario=$_usuario and clave=$_passwords and est_personal=1 and est_clave=1);
        set $rol=(select rol from view_login where usuario=$_usuario and clave=$_passwords and est_personal=1 and est_clave=1);
		set $_msn=true;
		else
			set $cod_empresa='0';
			set $cod_personal='0';
            set $cod_rol='0';
		end if;
select $_msn as msn, $cod_empresa as CodEmp,$empresa as Empresa,$web as Web,$cod_personal as CodPer,$nombres as Nombres,$cod_rol as CodRol,$rol as Rol;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `MENU` (IN `$IdRol` INT)  BEGIN
declare $_msn boolean default false;
declare $priv_id int default 0;
declare $menu_id int default 0;
declare $menu_nom text default "null";
declare $menu_ico text default "null";
declare $menu_url text default "null";
declare $menu_pad int default 0;
if(exists(select * from tbl_privilegios where $idRol=rol_id))then
select 
pr.priv_id as id,
pr.menu_id as codigo,
me.menu_nom as menu,
me.menu_ico as icono,
me.menu_url as url,
me.menu_pad as padre
from  tbl_roles as ro  
inner join tbl_privilegios as pr on ($idRol=pr.rol_id and pr.priv_est=1)
inner join tbl_menu as me on (pr.menu_id=me.menu_id and me.menu_est=1)
order by pr.priv_id asc;
else
select 
$priv_id as id,
$menu_id as codigo,
$menu_nom as menu,
$menu_ico as icono,
$menu_url as url,
$menu_pad as padre;
end if;

END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `PREGUNTASAVE` (IN `$Empresa` INT, IN `$Encuesta` INT, IN `$Nombre` TEXT, IN `$Indicador` TEXT)  BEGIN
declare $msn boolean default false;
declare $idIndicador int default 0;
declare $codigo int default 0;
set $idIndicador =(select codigo from view_indicadores where cod_empresa=$empresa and siglas=$Indicador);
insert into tbl_preguntas(enc_id,eind_id,pre_des,pre_est) values($Encuesta,$idIndicador,$Nombre,1);
set $codigo =(select pre_id from tbl_preguntas where enc_id=$Encuesta and eind_id=$idIndicador and pre_des=$Nombre);
set $msn=true;
select $msn as msn, $codigo as IdPregunta;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `PRIVILEGIOS` (IN `$IdRol` INT, IN `$Pagina` TEXT)  BEGIN
declare $_msn boolean default false;
declare $priv_insert int default 0;
declare $priv_update int default 0;
declare $priv_delete int default 0;
if(exists(select * from view_privilegios where $IdRol=cod_rol and url=$Pagina))then
select insertar as Insertar,modificar as Modificar,eliminar as Eliminar
from   view_privilegios where ($IdRol=cod_rol and url=$Pagina);
else
select 
$priv_insert as Insertar,
$priv_update as Modificar,
$priv_delete as Eliminar;
end if;

END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `RESPUESTASAVE` (IN `IdPregunta` INT, IN `IdFiltro` INT, IN `Respuesta` TEXT, IN `Observacion` TEXT)  BEGIN
declare $msn boolean default false;
if(IdFiltro>0)then
	insert into tbl_respuestas(pre_id,filtro_cod,res_fecha,res_respuesta,res_observacion) values(IdPregunta,IdFiltro,CURDATE(),Respuesta,Observacion);
    set $msn=true;
end if;
select $msn as msn;
END$$

DELIMITER ;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tbl_agencias`
--

CREATE TABLE `tbl_agencias` (
  `AGE_ID` int(11) NOT NULL,
  `PROV_ID` int(11) DEFAULT NULL,
  `AGE_NOM` varchar(100) DEFAULT NULL,
  `AGE_DIR` text DEFAULT NULL,
  `AGE_TEL` varchar(15) DEFAULT NULL,
  `AGE_EST` tinyint(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `tbl_agencias`
--

INSERT INTO `tbl_agencias` (`AGE_ID`, `PROV_ID`, `AGE_NOM`, `AGE_DIR`, `AGE_TEL`, `AGE_EST`) VALUES
(1, 3, 'COCHAPAMBA', 'prensa y samorz', '0222222222', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tbl_auditoria`
--

CREATE TABLE `tbl_auditoria` (
  `AUD_ID` int(11) NOT NULL,
  `PER_ID` int(11) DEFAULT NULL,
  `AUD_FECHA` date DEFAULT NULL,
  `AUD_HORA` time DEFAULT NULL,
  `AUD_TABLA` text DEFAULT NULL,
  `AUD_REGISTRO` int(11) DEFAULT NULL,
  `AUD_OPERACION` varchar(100) DEFAULT NULL,
  `AUD_VANTERIOR` text DEFAULT NULL,
  `AUD_VNUEVO` text DEFAULT NULL,
  `AUD_IP` varchar(15) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tbl_canales`
--

CREATE TABLE `tbl_canales` (
  `CAN_ID` int(11) NOT NULL,
  `CAN_NOM` varchar(100) DEFAULT NULL,
  `CAN_EST` tinyint(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `tbl_canales`
--

INSERT INTO `tbl_canales` (`CAN_ID`, `CAN_NOM`, `CAN_EST`) VALUES
(1, 'Correo Electronico', 1),
(2, 'SMS', 1),
(3, 'WhatsApp', 1),
(4, 'Facebook', 1),
(5, 'Call Center', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tbl_detalle`
--

CREATE TABLE `tbl_detalle` (
  `DETA_ID` int(11) NOT NULL,
  `PRE_ID` int(11) DEFAULT NULL,
  `DETA_NOM` varchar(200) DEFAULT NULL,
  `DETA_VALOR` varchar(200) DEFAULT NULL,
  `DETA_EST` tinyint(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tbl_eindicadores`
--

CREATE TABLE `tbl_eindicadores` (
  `EIND_ID` int(11) NOT NULL,
  `IND_ID` int(11) DEFAULT NULL,
  `EMP_ID` int(11) DEFAULT NULL,
  `EIND_MCP` int(11) DEFAULT NULL,
  `EIND_COMP` varchar(3) DEFAULT NULL,
  `EIND_EST` tinyint(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `tbl_eindicadores`
--

INSERT INTO `tbl_eindicadores` (`EIND_ID`, `IND_ID`, `EMP_ID`, `EIND_MCP`, `EIND_COMP`, `EIND_EST`) VALUES
(1, 1, 1, 0, 'nul', 1),
(2, 2, 1, 8, '>=', 1),
(3, 3, 1, 4, '>=', 1),
(4, 4, 1, 8, '>=', 1),
(5, 5, 1, 8, '>=', 1),
(6, 6, 1, 8, '>=', 1),
(7, 7, 1, 8, '>=', 1),
(8, 8, 1, 8, '>=', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tbl_empresas`
--

CREATE TABLE `tbl_empresas` (
  `EMP_ID` int(11) NOT NULL,
  `EMP_NOM` varchar(200) DEFAULT NULL,
  `EMP_DIREC` varchar(200) DEFAULT NULL,
  `EMP_MAIL` varchar(100) DEFAULT NULL,
  `EMP_WEB` varchar(200) DEFAULT NULL,
  `EMP_EST` tinyint(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `tbl_empresas`
--

INSERT INTO `tbl_empresas` (`EMP_ID`, `EMP_NOM`, `EMP_DIREC`, `EMP_MAIL`, `EMP_WEB`, `EMP_EST`) VALUES
(1, 'KIMOBILL', 'RUIZ DE CASTILLA', 'seleccion@kimobill.com', 'www.kimobill.com', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tbl_encuestas`
--

CREATE TABLE `tbl_encuestas` (
  `ENC_ID` int(11) NOT NULL,
  `EMP_ID` int(11) DEFAULT NULL,
  `ENC_NOM` varchar(100) DEFAULT NULL,
  `ENC_FECHA` date DEFAULT NULL,
  `ENC_URL` text DEFAULT NULL,
  `ENC_EST` tinyint(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `tbl_encuestas`
--

INSERT INTO `tbl_encuestas` (`ENC_ID`, `EMP_ID`, `ENC_NOM`, `ENC_FECHA`, `ENC_URL`, `ENC_EST`) VALUES
(63, 1, 'prueba23', '2021-08-06', 'prueba23.php', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tbl_filtros`
--

CREATE TABLE `tbl_filtros` (
  `FILTRO_ID` int(11) NOT NULL,
  `CAN_ID` int(11) DEFAULT NULL,
  `OTR_ID` int(11) DEFAULT NULL,
  `ENC_ID` int(11) DEFAULT NULL,
  `SEC_ID` int(11) DEFAULT NULL,
  `AGE_ID` int(11) DEFAULT NULL,
  `FILTRO_EST` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `tbl_filtros`
--

INSERT INTO `tbl_filtros` (`FILTRO_ID`, `CAN_ID`, `OTR_ID`, `ENC_ID`, `SEC_ID`, `AGE_ID`, `FILTRO_EST`) VALUES
(22, 1, 1, 63, 2, 1, 1),
(23, 4, 1, 63, 3, 1, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tbl_indicadores`
--

CREATE TABLE `tbl_indicadores` (
  `IND_ID` int(11) NOT NULL,
  `TIN_ID` int(11) DEFAULT NULL,
  `IND_NOM` varchar(100) DEFAULT NULL,
  `IND_NCORTO` varchar(10) DEFAULT NULL,
  `IND_EST` tinyint(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `tbl_indicadores`
--

INSERT INTO `tbl_indicadores` (`IND_ID`, `TIN_ID`, `IND_NOM`, `IND_NCORTO`, `IND_EST`) VALUES
(1, 3, 'Informativa', 'INF', 1),
(2, 1, 'Satisfacción General', 'INS', 1),
(3, 1, 'Esfuerzo', 'CES', 1),
(4, 2, 'Recompra', 'REC', 1),
(5, 2, 'Bioseguridad', 'BIO', 1),
(6, 2, 'Amabilidad', 'AMA', 1),
(7, 2, 'Agilidad', 'AGI', 1),
(8, 1, 'Recomendación', 'NPS', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tbl_menu`
--

CREATE TABLE `tbl_menu` (
  `MENU_ID` int(11) NOT NULL,
  `MENU_NOM` varchar(100) DEFAULT NULL,
  `MENU_ICO` varchar(100) DEFAULT NULL,
  `MENU_URL` text DEFAULT NULL,
  `MENU_PAD` int(11) DEFAULT NULL,
  `MENU_EST` tinyint(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `tbl_menu`
--

INSERT INTO `tbl_menu` (`MENU_ID`, `MENU_NOM`, `MENU_ICO`, `MENU_URL`, `MENU_PAD`, `MENU_EST`) VALUES
(1, 'EMPRESA', 'mdi mdi-checkbox-blank-circle-outline', '#', 1, 1),
(2, 'ENCUESTAS', 'mdi mdi-checkbox-blank-circle-outline', 'menu.php', 2, 1),
(3, 'Ver Todas', NULL, 'encuestas.php', 2, 1),
(4, 'Crear', NULL, 'formulario.php', 2, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tbl_otros`
--

CREATE TABLE `tbl_otros` (
  `OTR_ID` int(11) NOT NULL,
  `OTR_NOM` varchar(100) DEFAULT NULL,
  `OTR_EST` tinyint(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `tbl_otros`
--

INSERT INTO `tbl_otros` (`OTR_ID`, `OTR_NOM`, `OTR_EST`) VALUES
(1, 'Todos', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tbl_pais`
--

CREATE TABLE `tbl_pais` (
  `PAIS_ID` int(11) NOT NULL,
  `PAIS_NOM` varchar(100) DEFAULT NULL,
  `PAIS_EST` tinyint(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `tbl_pais`
--

INSERT INTO `tbl_pais` (`PAIS_ID`, `PAIS_NOM`, `PAIS_EST`) VALUES
(1, 'ECUADOR', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tbl_passwords`
--

CREATE TABLE `tbl_passwords` (
  `PASS_ID` int(11) NOT NULL,
  `PER_ID` int(11) DEFAULT NULL,
  `PASS_NOM` text DEFAULT NULL,
  `PASS_EST` tinyint(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `tbl_passwords`
--

INSERT INTO `tbl_passwords` (`PASS_ID`, `PER_ID`, `PASS_NOM`, `PASS_EST`) VALUES
(1, 1, 'dm9xZloxM2JVNU5ZWklpK2tiR2FZQT09', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tbl_peragencias`
--

CREATE TABLE `tbl_peragencias` (
  `PAGE_ID` int(11) NOT NULL,
  `AGE_ID` int(11) DEFAULT NULL,
  `PER_ID` int(11) DEFAULT NULL,
  `PAGE_FINI` date DEFAULT NULL,
  `PAGE_FFIN` date DEFAULT NULL,
  `PAGE_FMOD` date DEFAULT NULL,
  `PAGE_EST` tinyint(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `tbl_peragencias`
--

INSERT INTO `tbl_peragencias` (`PAGE_ID`, `AGE_ID`, `PER_ID`, `PAGE_FINI`, `PAGE_FFIN`, `PAGE_FMOD`, `PAGE_EST`) VALUES
(1, 1, 1, NULL, NULL, NULL, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tbl_personal`
--

CREATE TABLE `tbl_personal` (
  `PER_ID` int(11) NOT NULL,
  `EMP_ID` int(11) DEFAULT NULL,
  `ROL_ID` int(11) DEFAULT NULL,
  `PER_NOM1` varchar(100) DEFAULT NULL,
  `PER_NOM2` varchar(100) DEFAULT NULL,
  `PER_APE1` varchar(100) DEFAULT NULL,
  `PER_APE2` varchar(100) DEFAULT NULL,
  `PER_USER` varchar(100) DEFAULT NULL,
  `PER_DNI` varchar(15) DEFAULT NULL,
  `PER_DIR` text DEFAULT NULL,
  `PER_TEL` varchar(15) DEFAULT NULL,
  `PER_CEL` varchar(15) DEFAULT NULL,
  `PER_MAIL` text DEFAULT NULL,
  `PER_EST` tinyint(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `tbl_personal`
--

INSERT INTO `tbl_personal` (`PER_ID`, `EMP_ID`, `ROL_ID`, `PER_NOM1`, `PER_NOM2`, `PER_APE1`, `PER_APE2`, `PER_USER`, `PER_DNI`, `PER_DIR`, `PER_TEL`, `PER_CEL`, `PER_MAIL`, `PER_EST`) VALUES
(1, 1, 1, 'CARLOS', 'ARMANDO', 'QUILO', 'ZAMBRANO', 'Cquilo', '1721812905', 'COMITE DEL PUEBLO', '022222222', '0985791218', 'developer_engineer@kimobill.com', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tbl_preguntas`
--

CREATE TABLE `tbl_preguntas` (
  `PRE_ID` int(11) NOT NULL,
  `ENC_ID` int(11) DEFAULT NULL,
  `EIND_ID` int(11) DEFAULT NULL,
  `PRE_DES` text DEFAULT NULL,
  `PRE_EST` tinyint(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `tbl_preguntas`
--

INSERT INTO `tbl_preguntas` (`PRE_ID`, `ENC_ID`, `EIND_ID`, `PRE_DES`, `PRE_EST`) VALUES
(19412, 63, 1, 'Correo Electronico', 1),
(19413, 63, 1, 'Ingrese un Comentario sobre Nuestros Servicios', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tbl_preseguridad`
--

CREATE TABLE `tbl_preseguridad` (
  `PSE_ID` int(11) NOT NULL,
  `PSE_NOM` text DEFAULT NULL,
  `PSE_EST` tinyint(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tbl_privilegios`
--

CREATE TABLE `tbl_privilegios` (
  `PRIV_ID` int(11) NOT NULL,
  `ROL_ID` int(11) DEFAULT NULL,
  `MENU_ID` int(11) DEFAULT NULL,
  `PRIV_INSERT` tinyint(1) DEFAULT NULL,
  `PRIV_UPDATE` tinyint(1) DEFAULT NULL,
  `PRIV_DELETE` tinyint(1) DEFAULT NULL,
  `PRIV_EST` tinyint(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `tbl_privilegios`
--

INSERT INTO `tbl_privilegios` (`PRIV_ID`, `ROL_ID`, `MENU_ID`, `PRIV_INSERT`, `PRIV_UPDATE`, `PRIV_DELETE`, `PRIV_EST`) VALUES
(1, 1, 1, 1, 1, 1, 1),
(2, 1, 2, 1, 1, 1, 1),
(3, 1, 3, 1, 1, 1, 1),
(4, 1, 4, 1, 1, 1, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tbl_provincia`
--

CREATE TABLE `tbl_provincia` (
  `PROV_ID` int(11) NOT NULL,
  `REG_ID` int(11) DEFAULT NULL,
  `PAIS_ID` int(11) DEFAULT NULL,
  `PROV_NOM` varchar(100) DEFAULT NULL,
  `PRO_EST` tinyint(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `tbl_provincia`
--

INSERT INTO `tbl_provincia` (`PROV_ID`, `REG_ID`, `PAIS_ID`, `PROV_NOM`, `PRO_EST`) VALUES
(1, 1, 1, 'CUENCA', 1),
(2, 1, 1, 'GUAYAQUIL', 1),
(3, 1, 1, 'PICHINCHA', 1),
(4, 1, 1, 'TENA', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tbl_region`
--

CREATE TABLE `tbl_region` (
  `REG_ID` int(11) NOT NULL,
  `REG_NOM` varchar(100) DEFAULT NULL,
  `REG_EST` tinyint(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `tbl_region`
--

INSERT INTO `tbl_region` (`REG_ID`, `REG_NOM`, `REG_EST`) VALUES
(1, 'COSTA', 1),
(2, 'SIERRA', 1),
(3, 'ORIENTE', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tbl_respuestas`
--

CREATE TABLE `tbl_respuestas` (
  `RES_ID` int(11) NOT NULL,
  `PRE_ID` int(11) DEFAULT NULL,
  `FILTRO_COD` int(11) DEFAULT NULL,
  `RES_FECHA` date DEFAULT NULL,
  `RES_RESPUESTA` text DEFAULT NULL,
  `RES_OBSERVACION` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `tbl_respuestas`
--

INSERT INTO `tbl_respuestas` (`RES_ID`, `PRE_ID`, `FILTRO_COD`, `RES_FECHA`, `RES_RESPUESTA`, `RES_OBSERVACION`) VALUES
(48029, 19412, 22, '2021-08-06', 'ghghjghj', ''),
(48030, 19413, 22, '2021-08-06', 'hgjghjghjghj', '');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tbl_resseguridad`
--

CREATE TABLE `tbl_resseguridad` (
  `RSE_ID` int(11) NOT NULL,
  `PER_ID` int(11) DEFAULT NULL,
  `PSE_ID` int(11) DEFAULT NULL,
  `RSE_NOM` text DEFAULT NULL,
  `RSE_EST` tinyint(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tbl_roles`
--

CREATE TABLE `tbl_roles` (
  `ROL_ID` int(11) NOT NULL,
  `ROL_NOM` varchar(100) DEFAULT NULL,
  `ROL_EST` tinyint(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `tbl_roles`
--

INSERT INTO `tbl_roles` (`ROL_ID`, `ROL_NOM`, `ROL_EST`) VALUES
(1, 'ADMINISTRADOR', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tbl_seccion`
--

CREATE TABLE `tbl_seccion` (
  `SEC_ID` int(11) NOT NULL,
  `SEC_NOM` varchar(100) DEFAULT NULL,
  `SEC_EST` tinyint(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `tbl_seccion`
--

INSERT INTO `tbl_seccion` (`SEC_ID`, `SEC_NOM`, `SEC_EST`) VALUES
(1, 'Cajas', 1),
(2, 'Negocios', 1),
(3, 'Servicios', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tbl_timeconexion`
--

CREATE TABLE `tbl_timeconexion` (
  `TCO_ID` int(11) NOT NULL,
  `PER_ID` int(11) DEFAULT NULL,
  `TCO_IP` varchar(15) DEFAULT NULL,
  `TCO_SESSION` text DEFAULT NULL,
  `TCO_FECHA` date DEFAULT NULL,
  `TCO_HINICIO` time DEFAULT NULL,
  `TCO_HFINAL` time DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tbl_tipoindicadores`
--

CREATE TABLE `tbl_tipoindicadores` (
  `TIN_ID` int(11) NOT NULL,
  `TIN_NOM` varchar(100) DEFAULT NULL,
  `TIN_EST` tinyint(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `tbl_tipoindicadores`
--

INSERT INTO `tbl_tipoindicadores` (`TIN_ID`, `TIN_NOM`, `TIN_EST`) VALUES
(1, 'Experiencia', 1),
(2, 'Promesa de Servicio', 1),
(3, 'Informativo', 1);

-- --------------------------------------------------------

--
-- Estructura Stand-in para la vista `view_agencias`
-- (Véase abajo para la vista actual)
--
CREATE TABLE `view_agencias` (
`idempresa` int(11)
,`codigo` int(11)
,`nombre` varchar(100)
,`direccion` text
,`telefono` varchar(15)
,`estado` tinyint(1)
);

-- --------------------------------------------------------

--
-- Estructura Stand-in para la vista `view_encuestas`
-- (Véase abajo para la vista actual)
--
CREATE TABLE `view_encuestas` (
`cod_encuesta` int(11)
,`cod_tipoindicador` int(11)
,`tipo_indicador` varchar(100)
,`cod_indicador` int(11)
,`indicador` varchar(100)
,`indicador_ncorto` varchar(10)
,`val_mini_com` int(11)
,`comparativo` varchar(3)
,`cod_pregunta` int(11)
,`pregunta` text
,`cod_respuesta` int(11)
,`respuesta` text
,`observacion` text
,`fecha` date
,`cod_filtro` int(11)
);

-- --------------------------------------------------------

--
-- Estructura Stand-in para la vista `view_encuestasfull`
-- (Véase abajo para la vista actual)
--
CREATE TABLE `view_encuestasfull` (
`cod_personal` int(11)
,`personal` varchar(403)
,`cod_agencia` int(11)
,`agencia` varchar(100)
,`cod_filtro` int(11)
,`cod_encuesta` int(11)
,`encuesta` varchar(100)
,`principalurl` text
,`url` mediumtext
,`esta_encuesta` tinyint(1)
,`cod_canales` int(11)
,`canales` varchar(100)
,`cod_seccion` int(11)
,`seccion` varchar(100)
,`cod_otro` int(11)
,`otros` varchar(100)
,`esta_filtro` tinyint(1)
);

-- --------------------------------------------------------

--
-- Estructura Stand-in para la vista `view_filtros`
-- (Véase abajo para la vista actual)
--
CREATE TABLE `view_filtros` (
`cod_filtro` int(11)
,`cod_encuesta` int(11)
,`encuesta` varchar(100)
,`url` mediumtext
,`cod_agencia` int(11)
,`agencia` varchar(100)
,`cod_canales` int(11)
,`canales` varchar(100)
,`cod_seccion` int(11)
,`seccion` varchar(100)
,`cod_otro` int(11)
,`otros` varchar(100)
,`esta_filtro` tinyint(1)
);

-- --------------------------------------------------------

--
-- Estructura Stand-in para la vista `view_indicadores`
-- (Véase abajo para la vista actual)
--
CREATE TABLE `view_indicadores` (
`codigo` int(11)
,`cod_empresa` int(11)
,`empresa` varchar(200)
,`cod_tipoindicador` int(11)
,`tipo_indicador` varchar(100)
,`esta_tipoindicador` tinyint(1)
,`cod_indicador` int(11)
,`indicador` varchar(100)
,`siglas` varchar(10)
,`esta_indicador` tinyint(1)
,`val_min` int(11)
,`comparativo` varchar(3)
,`estado` tinyint(1)
);

-- --------------------------------------------------------

--
-- Estructura Stand-in para la vista `view_infoencuestas`
-- (Véase abajo para la vista actual)
--
CREATE TABLE `view_infoencuestas` (
`idempresa` int(11)
,`cod_encuesta` int(11)
,`encuesta` varchar(100)
,`fecha` date
,`url` text
,`esta_encuesta` tinyint(1)
);

-- --------------------------------------------------------

--
-- Estructura Stand-in para la vista `view_login`
-- (Véase abajo para la vista actual)
--
CREATE TABLE `view_login` (
`cod_empresa` int(11)
,`empresa` varchar(200)
,`web` varchar(200)
,`cod_personal` int(11)
,`cod_rol` int(11)
,`rol` varchar(100)
,`nombres` varchar(201)
,`usuario` varchar(100)
,`clave` text
,`est_personal` tinyint(1)
,`est_clave` tinyint(1)
);

-- --------------------------------------------------------

--
-- Estructura Stand-in para la vista `view_preseguridad`
-- (Véase abajo para la vista actual)
--
CREATE TABLE `view_preseguridad` (
`cod_personal` int(11)
,`usuario` varchar(100)
,`correo` text
,`clave` text
,`est_personal` tinyint(1)
,`pregunta` text
,`respuesta` text
);

-- --------------------------------------------------------

--
-- Estructura Stand-in para la vista `view_privilegios`
-- (Véase abajo para la vista actual)
--
CREATE TABLE `view_privilegios` (
`id` int(11)
,`cod_rol` int(11)
,`descripcion` varchar(100)
,`cod_menu` int(11)
,`menu` varchar(100)
,`url` text
,`nivel` int(11)
,`insertar` tinyint(1)
,`modificar` tinyint(1)
,`eliminar` tinyint(1)
,`esta_rol` tinyint(1)
,`est_menu` tinyint(1)
,`esta_privilegio` tinyint(1)
);

-- --------------------------------------------------------

--
-- Estructura para la vista `view_agencias`
--
DROP TABLE IF EXISTS `view_agencias`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `view_agencias`  AS SELECT DISTINCT `emp`.`EMP_ID` AS `idempresa`, `age`.`AGE_ID` AS `codigo`, `age`.`AGE_NOM` AS `nombre`, `age`.`AGE_DIR` AS `direccion`, `age`.`AGE_TEL` AS `telefono`, `age`.`AGE_EST` AS `estado` FROM (((`tbl_empresas` `emp` join `tbl_personal` `per` on(`per`.`EMP_ID` = `emp`.`EMP_ID`)) join `tbl_peragencias` `pea` on(`pea`.`PER_ID` = `per`.`PER_ID`)) join `tbl_agencias` `age` on(`age`.`AGE_ID` = `pea`.`PAGE_ID`)) ORDER BY `age`.`AGE_NOM` ASC ;

-- --------------------------------------------------------

--
-- Estructura para la vista `view_encuestas`
--
DROP TABLE IF EXISTS `view_encuestas`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `view_encuestas`  AS SELECT `en`.`ENC_ID` AS `cod_encuesta`, `ti`.`TIN_ID` AS `cod_tipoindicador`, `ti`.`TIN_NOM` AS `tipo_indicador`, `ei`.`IND_ID` AS `cod_indicador`, `ind`.`IND_NOM` AS `indicador`, `ind`.`IND_NCORTO` AS `indicador_ncorto`, `ei`.`EIND_MCP` AS `val_mini_com`, `ei`.`EIND_COMP` AS `comparativo`, `pr`.`PRE_ID` AS `cod_pregunta`, `pr`.`PRE_DES` AS `pregunta`, `re`.`RES_ID` AS `cod_respuesta`, `re`.`RES_RESPUESTA` AS `respuesta`, `re`.`RES_OBSERVACION` AS `observacion`, `re`.`RES_FECHA` AS `fecha`, `re`.`FILTRO_COD` AS `cod_filtro` FROM (((((`tbl_encuestas` `en` join `tbl_preguntas` `pr` on(`en`.`ENC_ID` = `pr`.`ENC_ID`)) join `tbl_respuestas` `re` on(`re`.`PRE_ID` = `pr`.`PRE_ID`)) join `tbl_eindicadores` `ei` on(`ei`.`EIND_ID` = `pr`.`EIND_ID`)) join `tbl_indicadores` `ind` on(`ei`.`IND_ID` = `ind`.`IND_ID`)) join `tbl_tipoindicadores` `ti` on(`ti`.`TIN_ID` = `ind`.`TIN_ID`)) ORDER BY `en`.`ENC_ID` ASC ;

-- --------------------------------------------------------

--
-- Estructura para la vista `view_encuestasfull`
--
DROP TABLE IF EXISTS `view_encuestasfull`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `view_encuestasfull`  AS SELECT `pe`.`PER_ID` AS `cod_personal`, concat(`pe`.`PER_NOM1`,' ',`pe`.`PER_NOM2`,' ',`pe`.`PER_APE1`,' ',`pe`.`PER_NOM1`) AS `personal`, `pa`.`AGE_ID` AS `cod_agencia`, `ag`.`AGE_NOM` AS `agencia`, `fi`.`FILTRO_ID` AS `cod_filtro`, `en`.`ENC_ID` AS `cod_encuesta`, `en`.`ENC_NOM` AS `encuesta`, `en`.`ENC_URL` AS `principalurl`, concat(`en`.`ENC_URL`,'?Id=',`fi`.`FILTRO_ID`) AS `url`, `en`.`ENC_EST` AS `esta_encuesta`, `ca`.`CAN_ID` AS `cod_canales`, `ca`.`CAN_NOM` AS `canales`, `se`.`SEC_ID` AS `cod_seccion`, `se`.`SEC_NOM` AS `seccion`, `ot`.`OTR_ID` AS `cod_otro`, `ot`.`OTR_NOM` AS `otros`, `fi`.`FILTRO_EST` AS `esta_filtro` FROM (((((((`tbl_personal` `pe` join `tbl_peragencias` `pa` on(`pe`.`PER_ID` = `pa`.`PER_ID`)) join `tbl_agencias` `ag` on(`ag`.`AGE_ID` = `pa`.`AGE_ID`)) join `tbl_filtros` `fi` on(`ag`.`AGE_ID` = `fi`.`AGE_ID`)) join `tbl_encuestas` `en` on(`en`.`ENC_ID` = `fi`.`ENC_ID`)) join `tbl_canales` `ca` on(`ca`.`CAN_ID` = `fi`.`CAN_ID`)) join `tbl_seccion` `se` on(`se`.`SEC_ID` = `fi`.`SEC_ID`)) join `tbl_otros` `ot` on(`ot`.`OTR_ID` = `fi`.`OTR_ID`)) ORDER BY `pe`.`PER_ID` ASC ;

-- --------------------------------------------------------

--
-- Estructura para la vista `view_filtros`
--
DROP TABLE IF EXISTS `view_filtros`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `view_filtros`  AS SELECT `fi`.`FILTRO_ID` AS `cod_filtro`, `en`.`ENC_ID` AS `cod_encuesta`, `en`.`ENC_NOM` AS `encuesta`, concat(`en`.`ENC_URL`,'?Id=',`fi`.`FILTRO_ID`) AS `url`, `ag`.`AGE_ID` AS `cod_agencia`, `ag`.`AGE_NOM` AS `agencia`, `ca`.`CAN_ID` AS `cod_canales`, `ca`.`CAN_NOM` AS `canales`, `se`.`SEC_ID` AS `cod_seccion`, `se`.`SEC_NOM` AS `seccion`, `ot`.`OTR_ID` AS `cod_otro`, `ot`.`OTR_NOM` AS `otros`, `fi`.`FILTRO_EST` AS `esta_filtro` FROM (((((`tbl_encuestas` `en` join `tbl_filtros` `fi` on(`en`.`ENC_ID` = `fi`.`ENC_ID`)) join `tbl_agencias` `ag` on(`ag`.`AGE_ID` = `fi`.`AGE_ID`)) join `tbl_canales` `ca` on(`ca`.`CAN_ID` = `fi`.`CAN_ID`)) join `tbl_seccion` `se` on(`se`.`SEC_ID` = `fi`.`SEC_ID`)) join `tbl_otros` `ot` on(`ot`.`OTR_ID` = `fi`.`OTR_ID`)) ORDER BY `en`.`ENC_ID` ASC ;

-- --------------------------------------------------------

--
-- Estructura para la vista `view_indicadores`
--
DROP TABLE IF EXISTS `view_indicadores`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `view_indicadores`  AS SELECT `ei`.`EIND_ID` AS `codigo`, `em`.`EMP_ID` AS `cod_empresa`, `em`.`EMP_NOM` AS `empresa`, `ti`.`TIN_ID` AS `cod_tipoindicador`, `ti`.`TIN_NOM` AS `tipo_indicador`, `ti`.`TIN_EST` AS `esta_tipoindicador`, `ei`.`IND_ID` AS `cod_indicador`, `ind`.`IND_NOM` AS `indicador`, `ind`.`IND_NCORTO` AS `siglas`, `ind`.`IND_EST` AS `esta_indicador`, `ei`.`EIND_MCP` AS `val_min`, `ei`.`EIND_COMP` AS `comparativo`, `ei`.`EIND_EST` AS `estado` FROM (((`tbl_empresas` `em` join `tbl_eindicadores` `ei` on(`em`.`EMP_ID` = `ei`.`EMP_ID`)) join `tbl_indicadores` `ind` on(`ei`.`IND_ID` = `ind`.`IND_ID`)) join `tbl_tipoindicadores` `ti` on(`ti`.`TIN_ID` = `ind`.`TIN_ID`)) ORDER BY `em`.`EMP_ID` ASC ;

-- --------------------------------------------------------

--
-- Estructura para la vista `view_infoencuestas`
--
DROP TABLE IF EXISTS `view_infoencuestas`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `view_infoencuestas`  AS SELECT `emp`.`EMP_ID` AS `idempresa`, `enc`.`ENC_ID` AS `cod_encuesta`, `enc`.`ENC_NOM` AS `encuesta`, `enc`.`ENC_FECHA` AS `fecha`, `enc`.`ENC_URL` AS `url`, `enc`.`ENC_EST` AS `esta_encuesta` FROM (`tbl_empresas` `emp` join `tbl_encuestas` `enc` on(`emp`.`EMP_ID` = `enc`.`EMP_ID`)) ORDER BY `enc`.`ENC_FECHA` ASC ;

-- --------------------------------------------------------

--
-- Estructura para la vista `view_login`
--
DROP TABLE IF EXISTS `view_login`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `view_login`  AS SELECT `em`.`EMP_ID` AS `cod_empresa`, `em`.`EMP_NOM` AS `empresa`, `em`.`EMP_WEB` AS `web`, `pe`.`PER_ID` AS `cod_personal`, `pe`.`ROL_ID` AS `cod_rol`, `ro`.`ROL_NOM` AS `rol`, concat(`pe`.`PER_NOM1`,' ',`pe`.`PER_APE1`) AS `nombres`, `pe`.`PER_USER` AS `usuario`, `pa`.`PASS_NOM` AS `clave`, `pe`.`PER_EST` AS `est_personal`, `pa`.`PASS_EST` AS `est_clave` FROM (((`tbl_personal` `pe` join `tbl_passwords` `pa` on(`pe`.`PER_ID` = `pa`.`PER_ID`)) join `tbl_empresas` `em` on(`em`.`EMP_ID` = `pe`.`EMP_ID`)) join `tbl_roles` `ro` on(`ro`.`ROL_ID` = `pe`.`ROL_ID`)) ORDER BY `pe`.`PER_ID` ASC ;

-- --------------------------------------------------------

--
-- Estructura para la vista `view_preseguridad`
--
DROP TABLE IF EXISTS `view_preseguridad`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `view_preseguridad`  AS SELECT `pe`.`PER_ID` AS `cod_personal`, `pe`.`PER_USER` AS `usuario`, `pe`.`PER_MAIL` AS `correo`, `pa`.`PASS_NOM` AS `clave`, `pe`.`PER_EST` AS `est_personal`, `pr`.`PSE_NOM` AS `pregunta`, `re`.`RSE_NOM` AS `respuesta` FROM (((`tbl_personal` `pe` join `tbl_passwords` `pa` on(`pe`.`PER_ID` = `pa`.`PER_ID` and `pa`.`PASS_EST` = 0)) join `tbl_resseguridad` `re` on(`pe`.`PER_ID` = `re`.`PER_ID`)) join `tbl_preseguridad` `pr` on(`re`.`PSE_ID` = `pr`.`PSE_ID`)) ORDER BY `pe`.`PER_ID` ASC ;

-- --------------------------------------------------------

--
-- Estructura para la vista `view_privilegios`
--
DROP TABLE IF EXISTS `view_privilegios`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `view_privilegios`  AS SELECT `pr`.`PRIV_ID` AS `id`, `ro`.`ROL_ID` AS `cod_rol`, `ro`.`ROL_NOM` AS `descripcion`, `pr`.`MENU_ID` AS `cod_menu`, `me`.`MENU_NOM` AS `menu`, `me`.`MENU_URL` AS `url`, `me`.`MENU_PAD` AS `nivel`, `pr`.`PRIV_INSERT` AS `insertar`, `pr`.`PRIV_UPDATE` AS `modificar`, `pr`.`PRIV_DELETE` AS `eliminar`, `ro`.`ROL_EST` AS `esta_rol`, `me`.`MENU_EST` AS `est_menu`, `pr`.`PRIV_EST` AS `esta_privilegio` FROM ((`tbl_roles` `ro` join `tbl_privilegios` `pr` on(`ro`.`ROL_ID` = `pr`.`ROL_ID`)) join `tbl_menu` `me` on(`pr`.`MENU_ID` = `me`.`MENU_ID`)) ORDER BY `ro`.`ROL_ID` ASC ;

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `tbl_agencias`
--
ALTER TABLE `tbl_agencias`
  ADD PRIMARY KEY (`AGE_ID`),
  ADD KEY `FK_TBL_PROVINCIA_TBL_AGENCIA` (`PROV_ID`);

--
-- Indices de la tabla `tbl_auditoria`
--
ALTER TABLE `tbl_auditoria`
  ADD PRIMARY KEY (`AUD_ID`),
  ADD KEY `FK_TBL_PERSONAL_A_TBL_AUDITORIA` (`PER_ID`);

--
-- Indices de la tabla `tbl_canales`
--
ALTER TABLE `tbl_canales`
  ADD PRIMARY KEY (`CAN_ID`);

--
-- Indices de la tabla `tbl_detalle`
--
ALTER TABLE `tbl_detalle`
  ADD PRIMARY KEY (`DETA_ID`),
  ADD KEY `FK_TBL_PREGUNTAS_TBL_DETALLE` (`PRE_ID`);

--
-- Indices de la tabla `tbl_eindicadores`
--
ALTER TABLE `tbl_eindicadores`
  ADD PRIMARY KEY (`EIND_ID`),
  ADD KEY `FK_TBL_EMPRESAS_A_TBL_EINDICADORES` (`EMP_ID`),
  ADD KEY `FK_TBL_INDICADORES_A_TBL_EINDICADORES` (`IND_ID`);

--
-- Indices de la tabla `tbl_empresas`
--
ALTER TABLE `tbl_empresas`
  ADD PRIMARY KEY (`EMP_ID`);

--
-- Indices de la tabla `tbl_encuestas`
--
ALTER TABLE `tbl_encuestas`
  ADD PRIMARY KEY (`ENC_ID`),
  ADD KEY `FK_TBL_EMPRESAS_A_TBL_ENCUESTAS` (`EMP_ID`);

--
-- Indices de la tabla `tbl_filtros`
--
ALTER TABLE `tbl_filtros`
  ADD PRIMARY KEY (`FILTRO_ID`),
  ADD KEY `FK_RBL_ENCUESTAS_A_TBL_FILTROS` (`ENC_ID`),
  ADD KEY `FK_RELATIONSHIP_14` (`OTR_ID`),
  ADD KEY `FK_TBL_AGENCIAS_A_TBL_FILTROS` (`AGE_ID`),
  ADD KEY `FK_TBL_CNALES_A_TBL_FILTROS` (`CAN_ID`),
  ADD KEY `FK_TBL_SELECCION_A_TBL_FILTROS` (`SEC_ID`);

--
-- Indices de la tabla `tbl_indicadores`
--
ALTER TABLE `tbl_indicadores`
  ADD PRIMARY KEY (`IND_ID`),
  ADD KEY `FK_TBL_TINDICADORES_A_TBL_INDICADORES` (`TIN_ID`);

--
-- Indices de la tabla `tbl_menu`
--
ALTER TABLE `tbl_menu`
  ADD PRIMARY KEY (`MENU_ID`);

--
-- Indices de la tabla `tbl_otros`
--
ALTER TABLE `tbl_otros`
  ADD PRIMARY KEY (`OTR_ID`);

--
-- Indices de la tabla `tbl_pais`
--
ALTER TABLE `tbl_pais`
  ADD PRIMARY KEY (`PAIS_ID`);

--
-- Indices de la tabla `tbl_passwords`
--
ALTER TABLE `tbl_passwords`
  ADD PRIMARY KEY (`PASS_ID`),
  ADD KEY `FK_TBL_PERSONAL_A_TBL_PASSWORDS` (`PER_ID`);

--
-- Indices de la tabla `tbl_peragencias`
--
ALTER TABLE `tbl_peragencias`
  ADD PRIMARY KEY (`PAGE_ID`),
  ADD KEY `FK_TBL_AGENCIAS_A_TBL_PERAGENCIAS` (`AGE_ID`),
  ADD KEY `FK_TBL_PERSONAL_A_TBL_PAGENCIAS` (`PER_ID`);

--
-- Indices de la tabla `tbl_personal`
--
ALTER TABLE `tbl_personal`
  ADD PRIMARY KEY (`PER_ID`),
  ADD KEY `FK_TBL_EMPRESAS_A_TBL_PERSONAL` (`EMP_ID`),
  ADD KEY `FK_TBL_ROLES_A_TBL_PERSONAL` (`ROL_ID`);

--
-- Indices de la tabla `tbl_preguntas`
--
ALTER TABLE `tbl_preguntas`
  ADD PRIMARY KEY (`PRE_ID`),
  ADD KEY `FK_TBL_ENCUESTAS_A_TBL_PREGUNTAS` (`ENC_ID`),
  ADD KEY `FK_TBL_INDICADORES_A_TBL_PREGUNTAS` (`EIND_ID`);

--
-- Indices de la tabla `tbl_preseguridad`
--
ALTER TABLE `tbl_preseguridad`
  ADD PRIMARY KEY (`PSE_ID`);

--
-- Indices de la tabla `tbl_privilegios`
--
ALTER TABLE `tbl_privilegios`
  ADD PRIMARY KEY (`PRIV_ID`),
  ADD KEY `FK_TBL_MENU_A_TBL_PRIVILEGIOS` (`MENU_ID`),
  ADD KEY `FK_TBL_ROLES_A_TBL_PRIVILEGIOS` (`ROL_ID`);

--
-- Indices de la tabla `tbl_provincia`
--
ALTER TABLE `tbl_provincia`
  ADD PRIMARY KEY (`PROV_ID`),
  ADD KEY `FK_TBL_PAIS_A_TBL_PROVINCIA` (`PAIS_ID`),
  ADD KEY `FK_TBL_REGION_A_TBL_PROVINCIA` (`REG_ID`);

--
-- Indices de la tabla `tbl_region`
--
ALTER TABLE `tbl_region`
  ADD PRIMARY KEY (`REG_ID`);

--
-- Indices de la tabla `tbl_respuestas`
--
ALTER TABLE `tbl_respuestas`
  ADD PRIMARY KEY (`RES_ID`),
  ADD KEY `FK_TBL_PREGUNTAS_A_TBL_RESPUESTAS` (`PRE_ID`);

--
-- Indices de la tabla `tbl_resseguridad`
--
ALTER TABLE `tbl_resseguridad`
  ADD PRIMARY KEY (`RSE_ID`),
  ADD KEY `FK_TBL_PERSONAL_A_TBL_RESSEGURIDAD` (`PER_ID`),
  ADD KEY `FK_TBL_PRESEGURIDAD_A_TBL_RESSEGURIDAD` (`PSE_ID`);

--
-- Indices de la tabla `tbl_roles`
--
ALTER TABLE `tbl_roles`
  ADD PRIMARY KEY (`ROL_ID`);

--
-- Indices de la tabla `tbl_seccion`
--
ALTER TABLE `tbl_seccion`
  ADD PRIMARY KEY (`SEC_ID`);

--
-- Indices de la tabla `tbl_timeconexion`
--
ALTER TABLE `tbl_timeconexion`
  ADD PRIMARY KEY (`TCO_ID`),
  ADD KEY `FK_TBL_PERSONAL_A_TBL_TIMECONEXION` (`PER_ID`);

--
-- Indices de la tabla `tbl_tipoindicadores`
--
ALTER TABLE `tbl_tipoindicadores`
  ADD PRIMARY KEY (`TIN_ID`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `tbl_agencias`
--
ALTER TABLE `tbl_agencias`
  MODIFY `AGE_ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `tbl_auditoria`
--
ALTER TABLE `tbl_auditoria`
  MODIFY `AUD_ID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `tbl_canales`
--
ALTER TABLE `tbl_canales`
  MODIFY `CAN_ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `tbl_detalle`
--
ALTER TABLE `tbl_detalle`
  MODIFY `DETA_ID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `tbl_eindicadores`
--
ALTER TABLE `tbl_eindicadores`
  MODIFY `EIND_ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT de la tabla `tbl_empresas`
--
ALTER TABLE `tbl_empresas`
  MODIFY `EMP_ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `tbl_encuestas`
--
ALTER TABLE `tbl_encuestas`
  MODIFY `ENC_ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=64;

--
-- AUTO_INCREMENT de la tabla `tbl_filtros`
--
ALTER TABLE `tbl_filtros`
  MODIFY `FILTRO_ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;

--
-- AUTO_INCREMENT de la tabla `tbl_indicadores`
--
ALTER TABLE `tbl_indicadores`
  MODIFY `IND_ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT de la tabla `tbl_menu`
--
ALTER TABLE `tbl_menu`
  MODIFY `MENU_ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `tbl_otros`
--
ALTER TABLE `tbl_otros`
  MODIFY `OTR_ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `tbl_pais`
--
ALTER TABLE `tbl_pais`
  MODIFY `PAIS_ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `tbl_passwords`
--
ALTER TABLE `tbl_passwords`
  MODIFY `PASS_ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `tbl_peragencias`
--
ALTER TABLE `tbl_peragencias`
  MODIFY `PAGE_ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `tbl_personal`
--
ALTER TABLE `tbl_personal`
  MODIFY `PER_ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `tbl_preguntas`
--
ALTER TABLE `tbl_preguntas`
  MODIFY `PRE_ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19414;

--
-- AUTO_INCREMENT de la tabla `tbl_preseguridad`
--
ALTER TABLE `tbl_preseguridad`
  MODIFY `PSE_ID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `tbl_privilegios`
--
ALTER TABLE `tbl_privilegios`
  MODIFY `PRIV_ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `tbl_provincia`
--
ALTER TABLE `tbl_provincia`
  MODIFY `PROV_ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `tbl_region`
--
ALTER TABLE `tbl_region`
  MODIFY `REG_ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `tbl_respuestas`
--
ALTER TABLE `tbl_respuestas`
  MODIFY `RES_ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=48031;

--
-- AUTO_INCREMENT de la tabla `tbl_resseguridad`
--
ALTER TABLE `tbl_resseguridad`
  MODIFY `RSE_ID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `tbl_roles`
--
ALTER TABLE `tbl_roles`
  MODIFY `ROL_ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `tbl_seccion`
--
ALTER TABLE `tbl_seccion`
  MODIFY `SEC_ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `tbl_timeconexion`
--
ALTER TABLE `tbl_timeconexion`
  MODIFY `TCO_ID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `tbl_tipoindicadores`
--
ALTER TABLE `tbl_tipoindicadores`
  MODIFY `TIN_ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `tbl_agencias`
--
ALTER TABLE `tbl_agencias`
  ADD CONSTRAINT `FK_TBL_PROVINCIA_TBL_AGENCIA` FOREIGN KEY (`PROV_ID`) REFERENCES `tbl_provincia` (`PROV_ID`);

--
-- Filtros para la tabla `tbl_auditoria`
--
ALTER TABLE `tbl_auditoria`
  ADD CONSTRAINT `FK_TBL_PERSONAL_A_TBL_AUDITORIA` FOREIGN KEY (`PER_ID`) REFERENCES `tbl_personal` (`PER_ID`);

--
-- Filtros para la tabla `tbl_detalle`
--
ALTER TABLE `tbl_detalle`
  ADD CONSTRAINT `FK_TBL_PREGUNTAS_TBL_DETALLE` FOREIGN KEY (`PRE_ID`) REFERENCES `tbl_preguntas` (`PRE_ID`);

--
-- Filtros para la tabla `tbl_eindicadores`
--
ALTER TABLE `tbl_eindicadores`
  ADD CONSTRAINT `FK_TBL_EMPRESAS_A_TBL_EINDICADORES` FOREIGN KEY (`EMP_ID`) REFERENCES `tbl_empresas` (`EMP_ID`),
  ADD CONSTRAINT `FK_TBL_INDICADORES_A_TBL_EINDICADORES` FOREIGN KEY (`IND_ID`) REFERENCES `tbl_indicadores` (`IND_ID`);

--
-- Filtros para la tabla `tbl_encuestas`
--
ALTER TABLE `tbl_encuestas`
  ADD CONSTRAINT `FK_TBL_EMPRESAS_A_TBL_ENCUESTAS` FOREIGN KEY (`EMP_ID`) REFERENCES `tbl_empresas` (`EMP_ID`);

--
-- Filtros para la tabla `tbl_filtros`
--
ALTER TABLE `tbl_filtros`
  ADD CONSTRAINT `FK_RBL_ENCUESTAS_A_TBL_FILTROS` FOREIGN KEY (`ENC_ID`) REFERENCES `tbl_encuestas` (`ENC_ID`),
  ADD CONSTRAINT `FK_RELATIONSHIP_14` FOREIGN KEY (`OTR_ID`) REFERENCES `tbl_otros` (`OTR_ID`),
  ADD CONSTRAINT `FK_TBL_AGENCIAS_A_TBL_FILTROS` FOREIGN KEY (`AGE_ID`) REFERENCES `tbl_agencias` (`AGE_ID`),
  ADD CONSTRAINT `FK_TBL_CNALES_A_TBL_FILTROS` FOREIGN KEY (`CAN_ID`) REFERENCES `tbl_canales` (`CAN_ID`),
  ADD CONSTRAINT `FK_TBL_SELECCION_A_TBL_FILTROS` FOREIGN KEY (`SEC_ID`) REFERENCES `tbl_seccion` (`SEC_ID`);

--
-- Filtros para la tabla `tbl_indicadores`
--
ALTER TABLE `tbl_indicadores`
  ADD CONSTRAINT `FK_TBL_TINDICADORES_A_TBL_INDICADORES` FOREIGN KEY (`TIN_ID`) REFERENCES `tbl_tipoindicadores` (`TIN_ID`);

--
-- Filtros para la tabla `tbl_passwords`
--
ALTER TABLE `tbl_passwords`
  ADD CONSTRAINT `FK_TBL_PERSONAL_A_TBL_PASSWORDS` FOREIGN KEY (`PER_ID`) REFERENCES `tbl_personal` (`PER_ID`);

--
-- Filtros para la tabla `tbl_peragencias`
--
ALTER TABLE `tbl_peragencias`
  ADD CONSTRAINT `FK_TBL_AGENCIAS_A_TBL_PERAGENCIAS` FOREIGN KEY (`AGE_ID`) REFERENCES `tbl_agencias` (`AGE_ID`),
  ADD CONSTRAINT `FK_TBL_PERSONAL_A_TBL_PAGENCIAS` FOREIGN KEY (`PER_ID`) REFERENCES `tbl_personal` (`PER_ID`);

--
-- Filtros para la tabla `tbl_personal`
--
ALTER TABLE `tbl_personal`
  ADD CONSTRAINT `FK_TBL_EMPRESAS_A_TBL_PERSONAL` FOREIGN KEY (`EMP_ID`) REFERENCES `tbl_empresas` (`EMP_ID`),
  ADD CONSTRAINT `FK_TBL_ROLES_A_TBL_PERSONAL` FOREIGN KEY (`ROL_ID`) REFERENCES `tbl_roles` (`ROL_ID`);

--
-- Filtros para la tabla `tbl_preguntas`
--
ALTER TABLE `tbl_preguntas`
  ADD CONSTRAINT `FK_TBL_ENCUESTAS_A_TBL_PREGUNTAS` FOREIGN KEY (`ENC_ID`) REFERENCES `tbl_encuestas` (`ENC_ID`),
  ADD CONSTRAINT `FK_TBL_INDICADORES_A_TBL_PREGUNTAS` FOREIGN KEY (`EIND_ID`) REFERENCES `tbl_eindicadores` (`EIND_ID`);

--
-- Filtros para la tabla `tbl_privilegios`
--
ALTER TABLE `tbl_privilegios`
  ADD CONSTRAINT `FK_TBL_MENU_A_TBL_PRIVILEGIOS` FOREIGN KEY (`MENU_ID`) REFERENCES `tbl_menu` (`MENU_ID`),
  ADD CONSTRAINT `FK_TBL_ROLES_A_TBL_PRIVILEGIOS` FOREIGN KEY (`ROL_ID`) REFERENCES `tbl_roles` (`ROL_ID`);

--
-- Filtros para la tabla `tbl_provincia`
--
ALTER TABLE `tbl_provincia`
  ADD CONSTRAINT `FK_TBL_PAIS_A_TBL_PROVINCIA` FOREIGN KEY (`PAIS_ID`) REFERENCES `tbl_pais` (`PAIS_ID`),
  ADD CONSTRAINT `FK_TBL_REGION_A_TBL_PROVINCIA` FOREIGN KEY (`REG_ID`) REFERENCES `tbl_region` (`REG_ID`);

--
-- Filtros para la tabla `tbl_respuestas`
--
ALTER TABLE `tbl_respuestas`
  ADD CONSTRAINT `FK_TBL_PREGUNTAS_A_TBL_RESPUESTAS` FOREIGN KEY (`PRE_ID`) REFERENCES `tbl_preguntas` (`PRE_ID`);

--
-- Filtros para la tabla `tbl_resseguridad`
--
ALTER TABLE `tbl_resseguridad`
  ADD CONSTRAINT `FK_TBL_PERSONAL_A_TBL_RESSEGURIDAD` FOREIGN KEY (`PER_ID`) REFERENCES `tbl_personal` (`PER_ID`),
  ADD CONSTRAINT `FK_TBL_PRESEGURIDAD_A_TBL_RESSEGURIDAD` FOREIGN KEY (`PSE_ID`) REFERENCES `tbl_preseguridad` (`PSE_ID`);

--
-- Filtros para la tabla `tbl_timeconexion`
--
ALTER TABLE `tbl_timeconexion`
  ADD CONSTRAINT `FK_TBL_PERSONAL_A_TBL_TIMECONEXION` FOREIGN KEY (`PER_ID`) REFERENCES `tbl_personal` (`PER_ID`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
