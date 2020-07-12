    var selectCiudades = document.getElementById("selectCiudad");
    var selectTipo = document.getElementById("selectTipo");
    var divContenido = document.getElementById('divResultadosBusqueda');
    var divContenido1 = document.getElementById('divResultadosBusqueda1');

    let plantilla ='';

   function cargarListas(){

        let arrayCiudades=[];
        let arrayTiposVivienda=[];
        let myObj = [];
        let myObj1 = [];        

        $.getJSON( "data-1.json", function( data ) {
            data.forEach(el => !(el.Ciudad in myObj) && (myObj[el.Ciudad] = true) && arrayCiudades.push(el.Ciudad))
            data.forEach(el => !(el.Tipo in myObj1) && (myObj1[el.Tipo] = true) && arrayTiposVivienda.push(el.Tipo))
            arrayCiudades.map((ciudad,i) => {
                selectCiudades.innerHTML += "<option value='"+(i+1)+"'>"+ciudad+"</option>"; 
            });
            arrayTiposVivienda.map((tipos,i) => {
                selectTipo.innerHTML += "<option value='"+(i+1)+"'>"+tipos+"</option>"; 
            });
        });  
 };

    function cargarBienes(){
        const url = "data-1.json";         
        $.getJSON(url, function (data) {  
            cargarDatos(data);
        }); 
    }
    function filtrarBienes() {     
             
        var select = selectCiudades.options[selectCiudades.selectedIndex].text;        
        var select2 = selectTipo.options[selectTipo.selectedIndex].text;
          if(selectCiudades.value != "" && selectTipo.value != ""){
            const url = "data-1.json";         
            $.getJSON(url, function (data) {       
               
                var newArr = data.filter(function(res){
                     return (res.Ciudad===select && res.Tipo==select2);
                 });                      
                 cargarDatos(newArr);                          
            }); 
          }else {
              alert("Selecciones los campos de las litas");
          }
    }
    function traerBienes(){       
        $.ajax({
            type: 'GET',
            url: 'http://localhost/intelcost_bienes/Controller/controller_mostrar_bienes.php',
            dataType: 'html'            
        }).done(function(respuesta){                        
                var myJSON = JSON.parse(respuesta);
                cargarDatosBienes(myJSON);              
        });
    }
    function cargarDatosBienes(dataFiltro) {
        document.getElementById("divResultadosBusqueda1").innerHTML="";   
        dataFiltro.map((data,i)=>{
            var fila=document.createElement('div');
            fila.className="row card";
            plantilla= `
                <div class="col s4">
                <img src="img/home.jpg" width="180px" height="130px"></img>
                </div>
                <div class="col s6">
                    <div class="col">
                        <span class="col s15"><b>Direccion:</b> ${data.Direccion}</span>               
                    </div>
                    <div class="col">
                        <span class="col s15"><b>Ciudad:</b> ${data.Ciudad}</span>               
                    </div>
                    <div class="col">
                        <span class="col s15"><b>Telefono:</b> ${data.Telefono}</span>                
                    </div>
                    <div class="col">
                        <span class="col s15"><b>Codigo Postal:</b> ${data.Codigo_Postal}</span>
                    </div>
                    <div class="col">
                        <span class="col s15"><b>Tipo:</b> ${data.Tipo}</span>
                    </div>
                    <div class="col">
                        <span class="col s15"><b>Precio:</b> ${data.Precio}</span>               
                    </div>                    
                </div>
            `;
            fila.innerHTML=plantilla;
            divContenido1.appendChild(fila);
        })
    }
    function cargarDatos(dataFiltro) {
    document.getElementById("divResultadosBusqueda").innerHTML="";   
    dataFiltro.map((data,i)=>{
        var fila=document.createElement('div');
        fila.className="row card";
        plantilla= `
            <div class="col s4">
            <img src="img/home.jpg" width="180px" height="130px"></img>
            </div>
            <div class="col s6">
                <div class="col">
                    <span class="col s15"><b>Direccion:</b> ${data.Direccion}</span>               
                </div>
                <div class="col">
                    <span class="col s15"><b>Ciudad:</b> ${data.Ciudad}</span>               
                </div>
                <div class="col">
                    <span class="col s15"><b>Telefono:</b> ${data.Telefono}</span>                
                </div>
                <div class="col">
                    <span class="col s15"><b>Codigo Postal:</b> ${data.Codigo_Postal}</span>
                </div>
                <div class="col">
                    <span class="col s15"><b>Tipo:</b> ${data.Tipo}</span>
                </div>
                <div class="col">
                    <span class="col s15"><b>Precio:</b> ${data.Precio}</span>               
                </div>
                <div class="botonField col">
                    <input type="button" class="btn white" value="guardar" data-contenido="${data.Id}" onclick="guardar(this)">
                </div>
            </div>
        `;
        fila.innerHTML=plantilla;
        divContenido.appendChild(fila);
    })
}
    function guardar(e){
        
        const url = "data-1.json";         
        $.getJSON(url, function (data) {      
        
            var newArr = data.filter(function(res){                              
                return  (res.Id===parseInt(e.dataset.contenido));
            });             
            console.log(newArr);  
            $.ajax({ 
                type: 'POST', 
                url: 'http://localhost/intelcost_bienes/Controller/controller_bienes.php',                
                data: {json: newArr},
                dataType: 'json'                
            }).done(function(respuesta){
                if(respuesta=="ok"){
                    alert("REGISTRO INSERTAADO !!!!");
                }else{
                    alert("REGISTRO NO INSERTAADO !!!!");
                }
            });
                                 
        })
    }
               





