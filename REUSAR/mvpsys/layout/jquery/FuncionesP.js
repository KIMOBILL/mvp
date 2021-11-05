

function DataUsuario() {
    var parametros = {"DataUser": true};
    $.ajax({
        type: 'POST',
        url: 'ajax/login.php',
        dataType: "json",
        data: parametros,
        success: function (data) {
            console.log(data);
            document.querySelector('#NomUser').innerText = data[0]["Nombre"];
            document.querySelector('#NomRol').innerText = data[0]["Rol"];            
            DataPrivilegios();
        }
    });
}

function DataMenu() {
    var parametros = {"DataMenu": true};
    $.ajax({
        type: 'POST',
        url: 'ajax/Menu.php',
        dataType: "json",
        data: parametros,
        success: function (data) {
            console.log(data);
            var script='<div class="sidebar-profile">'+
            '<div class="d-flex align-items-center justify-content-between">'+
              '<img src="https://via.placeholder.com/37x37" alt="profile">'+
              '<div class="profile-desc">'+
                '<p id="NomUser" class="name mb-0"></p>'+
                '<p id="NomRol" class="designation mb-0"></p>'+
              '</div>'+
            '</div>'+
           '</div>'+
           '<ul class="nav">'+
            '<li class="nav-item">'+
                '<a class="nav-link" href="panel.php">'+
                  '<i class="mdi mdi-shield-half-full menu-icon"></i>'+
                  '<span class="menu-title">Dashboard</span>'+
                '</a>'+
            '</li>';
            for(var i=0;i<data.length;i++){
                if(data[i]["Codigo"]===data[i]["Padre"]){
                    var ListMenu=SubMenu(data,data[i]["Codigo"]);
                    if(ListMenu.length===0){
                        script+='<li class="nav-item">'+
                        '<a class="nav-link" href="'+data[i]["Url"]+'">'+
                          '<i class="'+data[i]["Icono"]+' menu-icon"></i>'+
                          '<span class="menu-title">'+data[i]["Menu"]+'</span>'+
                        '</a>'+
                      '</li>';
                    }else{
                        script+='<li class="nav-item">'+
                        '<a class="nav-link" data-toggle="collapse" href="#'+data[i]["Menu"]+'" aria-expanded="false" aria-controls="'+data[i]["Menu"]+'">'+
                          '<i class="'+data[i]["Icono"]+' menu-icon"></i>'+
                          '<span class="menu-title">'+data[i]["Menu"]+'</span>'+
                          '<i class="menu-arrow"></i>'+
                        '</a>'+
                        '<div class="collapse" id="'+data[i]["Menu"]+'">'+
                          '<ul class="nav flex-column sub-menu">';
                            for(var j=0;j<ListMenu.length;j++){
                                script+='<li class="nav-item"> <a class="nav-link" href="'+ListMenu[j]["Url"]+'">'+ListMenu[j]["Menu"]+'</a></li>';
                            }
                          script+='</ul>'+
                        '</div>'+
                     '</li>';
                    }
                }
            }
            script+='<li class="nav-item">'+
            '<a class="nav-link" href="salir.php">'+
              '<i class="mdi mdi-logout menu-icon"></i>'+
              '<span class="menu-title">Logout</span>'+
            '</a>'+
          '</li>'+
        '</ul>';
        $("#sidebar").html(script);
            DataUsuario();
        }
    });
}
function SubMenu(base,Principal){
    var respuesta = new Array();
    for(var ax=0;ax<base.length;ax++){
        if(base[ax]["Codigo"]!==Principal && base[ax]["Padre"]===Principal ){
            var datos = new Array();
            datos['Url']=base[ax]["Url"];
            datos['Menu']=base[ax]["Menu"];
            var cont=respuesta.length;
            respuesta[cont]=datos;
        }
    }
    return respuesta;
}

function DataPrivilegios() {
    var titlepage = escape(getPageTitle());
    var namepage = getNameURLWeb();
    var parametros = {"DataPrivilegios": true,"NamePage": namepage};
    $.ajax({
        type: 'POST',
        url: 'ajax/Privilegios.php',
        dataType: "json",
        data: parametros,
        success: function (data) {
            console.log(data);
        }
    });

}

function getPageTitle() {
    var t = document.getElementsByTagName('title')[0];
    if (!!t.childNodes.length) {
        return t.firstChild.data;
    } else if (t.innerHTML) {
        return t.innerHTML;
    }
}
function getNameURLWeb() {
    var sPath = window.location.pathname;
    var sPage = sPath.substring(sPath.lastIndexOf('/') + 1);
    return sPage;
}
