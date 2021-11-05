
                function Guardar(){
                    if(traerId()>0){
                    
                    var arrayInput = new Array();
                    var cont=0;                    
                    var arrayAux = new Array();
                    arrayAux["Pregunta"]=19412;
                    arrayAux["Input"]="txtEmail1";
                    arrayAux["Tipo"]="text";
                    cont=arrayInput.length;
                    arrayInput[cont]=arrayAux;                    
                                        
                    var arrayAux = new Array();
                    arrayAux["Pregunta"]=19413;
                    arrayAux["Input"]="txtComent2";
                    arrayAux["Tipo"]="text";
                    cont=arrayInput.length;
                    arrayInput[cont]=arrayAux;                    
                    var recorrer=arrayInput.length;
                    var ax=0;
                    var regsave=0;
                    while(ax<recorrer){
                        var respu=0;
                        respu=PreguntaSave(arrayInput[ax]["Pregunta"],arrayInput[ax]["Input"],arrayInput[ax]["Tipo"]);                        
                        var cont=0;
                        var cont2=0;
                        while(cont=0){                            
                            var id = setInterval(function(){
                                if(respu==1){                              
                                    regsave+=1;                                    
                                    cont=cont+1;
                                    clearInterval(id); 
                                }else{
                                    if(cont2<=3){
                                        cont2=cont2+1;
                                    }else{                                        
                                        cont=1;
                                        clearInterval(id);                                    
                                    }                               
                                }
                            }, 1000);
                        }; 
                        ax=ax+1;
                    };
                     swal("CORRECTO...!", "El Registro Fue Creado sin Problemas.. ", "success").then((value) => {

                            window.location.href="http://www.kimobill.com";
                        });
                    //console.log(regsave);
                    //if(recorrer==regsave){
                        //swal("CORRECTO...!", "El Registro Fue Creado sin Problemas.. ", "success").then((value) => {

                           // window.location.href="http://www.kimobill.com";
                        //});
                    //}else{
                       // swal("ERROR...!", "No se pudo Concluir el Proceso Intentelo Mas Tarde", "warning");
                    //}
                }else{
                    swal("ERROR...!", "No existe un ID de proceso es un formulario de vista previa", "warning");
                }
                }
                
     
            function obtenerValorParametro(sParametroNombre) {
            var sPaginaURL = window.location.search.substring(1);
             var sURLVariables = sPaginaURL.split('&');
              for (var i = 0; i < sURLVariables.length; i++) {
                var sParametro = sURLVariables[i].split('=');
                if (sParametro[0] == sParametroNombre) {
                  return sParametro[1];
                }
              }
             return null;
            }


            function traerDato(name){
                var intradio=document.getElementsByName(name);    
                for(var i=0; i < intradio.length;i++) {
                    if (intradio[i].checked) {
                        return intradio[i].value;
                    }
                }
            }

            function vercheck(name){
                var checkbox= document.getElementById(name);
                //Si está marcada ejecuta la condición verdadera.
                if(checkbox.checked){
                    return ($("input:checkbox[name="+name+"]:checked").val());
                }
                //Si se ha desmarcado se ejecuta el siguiente mensaje.
                else{
                    return "";
                }
            }
            function traerId(){
                var valor = obtenerValorParametro("Id");
                var DataGet=0;
                if (valor){
                    DataGet=parseInt(valor);                            
                }
                return DataGet;
            }

            function PreguntaSave(Pregunta,Input,Tipo){
                var resPregunta="";
                switch (Tipo) {
                case "text":
                    resPregunta=document.getElementById(Input).value ;
                    break;
                case "option":
                    resPregunta=traerDato(Input);
                    break;
                case "select":
                    resPregunta=$('"#'+Input+'"').val();
                    break;
                case "check":
                    resPregunta=vercheck(Input);
                    break;
                }
                var parametros = {"Guardar": true,"IdPregunta":Pregunta,"Filtro":traerId(),"Respuesta":resPregunta,"Observacion":""};
                console.log(parametros);
                var respuesta=0;
                $.ajax({
                    data: parametros, url: "ajax/encuesta.php", type: "POST",
                    success: function (response){
                        if(response==1 || response=="1"){                        
                            respuesta=1; 
                        }
                    }
                });
                return respuesta;
            }
            
