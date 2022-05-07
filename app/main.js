//----JS-------


window.onload = () => {

    //VARIABLES
    
    let woeid = "";
    let misCiudades_rep = [];

    
    if(localStorage.getItem("lugares")){
        misCiudades_rep = JSON.parse(localStorage.getItem("lugares"));
    }



    //CARGAR CIUDADES EN LOCAL STORAGE

    let addSaved = document.querySelector(".lista_ciudades");
    
    if(misCiudades_rep == ""){
        //if ciudades_rep viene vacío es porque todavía no he guardado nada
        // me geolocalizo, veo en qué ciudad estoy y la añado
        if(navigator.geolocation){
            function success(pos) {
                let crd = pos.coords;

                fetch(`https://www.metaweather.com/api/location/search/?lattlong=${crd.latitude},${crd.longitude}`)
                    .then(res => res.json())
                    .then((res) => {
                        addSaved.innerHTML += `<li class="savedLocate">${res[0].title}
                            <span class="mdi mdi-trash-can"></span>
                        </li>`;
                        
                        misCiudades_rep.push(res[0].title);
                        localStorage.setItem("lugares", JSON.stringify(misCiudades_rep));
                        clickstoCities();
                    })
            };
              
            function error(err) {
                console.warn('ERROR(' + err.code + '): ' + err.message);
            };
              
            navigator.geolocation.getCurrentPosition(success, error);
        }
    }else{
        //recorrer las ciudades guardadas y pintarlas todas
        misCiudades_rep.forEach(element => {
            addSaved.innerHTML += `<li class="savedLocate">${element}
            <span class="mdi mdi-trash-can"></span>    
            </li>`;    
        });
        clickstoCities();
    }
    
    function clickstoCities(){
        let pulseGuardada = document.querySelectorAll(".savedLocate");
        
        
        for (let g=0; g<pulseGuardada.length;g++) {
            pulseGuardada[g].addEventListener('click', (p) => {
                pulsoG = p.target;
                ciudad_guardada = pulsoG.textContent;
                capturarDatos (ciudad_guardada);
            });
            
            pulseGuardada[g].children[0].addEventListener("click",(e) => {                
                e.stopPropagation();                
                borrarCiudad(e.path[1].textContent);
            })
        };
        capturarDatos(pulseGuardada[0].textContent);
    }
    
    
    function borrarCiudad(city){
                
        const index = misCiudades_rep.indexOf(city.trim());
        if (index > -1) {
            misCiudades_rep.splice(index, 1);                     

            addSaved.innerHTML = "";
            misCiudades_rep.forEach(element => {
                addSaved.innerHTML += `<li class="savedLocate">${element}
                <span class="mdi mdi-trash-can"></span>    
                </li>`;    
            });

            localStorage.setItem("lugares", JSON.stringify(misCiudades_rep));                                    
            clickstoCities();    
        }
    }

    
    
    //ARRAYS DE CONTENIDO (PODRÍA SER UN OBJETO PERO NO ME DA LA VIDA)

    //ILUSTRACIONES
    let ilustra = ["assets/images/clear.svg", 
    "assets/images/hail.svg", 
    "assets/images/heavy_cloud.svg", 
    "assets/images/heavy_rain.svg", 
    "assets/images/hot.svg", 
    "assets/images/light_cloud.svg", 
    "assets/images/light_rain.svg", 
    "assets/images/snow.svg", 
    "assets/images/showers.svg", 
    "assets/images/sleet.svg", 
    "assets/images/thunderstorm.svg"]

   //ICONOS
    let pictograma = ["assets/images/bike.svg", 
        "assets/images/shield.svg", 
        "assets/images/disco.svg",
        "assets/images/soup.svg",
        "assets/images/botella.svg",
        "assets/images/umbrella.svg",
        "assets/images/lluvia.svg",
        "assets/images/snowman.svg",
        "assets/images/charco.svg",
        "assets/images/coat.svg",
        "assets/images/ghost.svg"]

    //ALT ICONOS
    let alternativo = ["icono clear", 
        "icono hail", 
        "icono heavy cloud", 
        "icono heavy rain", 
        "icono hot", 
        "icono light cloud", 
        "icono light rain", 
        "icono snow", 
        "icono showers", 
        "icono sleet", 
        "icono thunderstorm"]

    //ACTIVIDADES
    let actividades = ["Take a bike ride",
        "Take cover",
        "Put your french records on",
        "Eat some hot soup",
        "Drink plenty of water",
        "Grab an umbrella just in case",
        "Feel rain drops in your face",
        "Make a snowman",
        "Go dance under rain",
        "Don't forget your rain coat",
        "Tell scary stories"]

    //ALT ICONOS
        let altActividad = ["bici", 
        "escudo", 
        "disco vinilo", 
        "sopa caliente", 
        "botella de agua", 
        "paraguas", 
        "gotas de lluvia", 
        "muñeco de nieve", 
        "charco", 
        "impermeable", 
        "fantasma"]


    //COLORES
        let colores = [
            //negro, 0
            "black",
            //blanco, 1
            "white",
            //gris, 2
            "#B1B1B1",
            //azul oscuro desaturado, 3
            "#0F2C3A",
            //azul oscuro saturado, 4
            "#072E66",
            //azul medio desaturado, 5
            "#25668F",
            //azul medio saturado, 6
            "#0E5CE5",
            //azul claro saturado, 7
            "#33AAE5",
            //azul claro_saturado dos, 8 
            "#0087E7",
            //rojo medio saturado, 9
            "#E20613",
            //verde medio saturado, 10
            "#5A7F19",
            //verde claro saturado, 11
            "#88C726",
            //amarillo medio saturado, 12
            "#FFC629",
            //amarillo claro saturado, 13
            "#FFED00"
        ]


    //MOSTRAR DATOS OCULTOS
        let mostrarOculto = document.querySelector("#mostrar");
        
        mostrarOculto.addEventListener("click", ()=> {
            let cazarMenu = document.querySelector("#datosOcultos");
            cazarMenu.classList.toggle("visible");
            let capturarIlustra = document.querySelector("#climaToy") ;
            capturarIlustra.classList.toggle ("opacidad");
    
        });


    //MOSTRAR LOCATIONS EN VERSIÓN MÓVIL
        let mostrarLocations= document.querySelector("#sumarMovil");
        mostrarLocations.addEventListener("click", ()=> {
            let cazaLocations= document.querySelector(".datos_dos");
            cazaLocations.classList.toggle("visible_locations");
            // let ocultaPrincipal= document.querySelector(".datos_uno")
            // ocultaPrincipal.classList.add("oculto");
        })

    //OCULTAR LOCATIONS EN VERSIÓN MÓVIL

        let ocultarLocations = document.querySelector("#esconderCiudades");
        ocultarLocations.addEventListener("click", ()=> {
            let cazaDatosDos = document.querySelector(".datos_dos");
            cazaDatosDos.classList.remove("visible_locations");
            
            
        } )


    //BÚSQUEDA DE LOCATIONS
    let buscar = document.querySelector(".sort");
    buscar.addEventListener("click", () => {
        let search = document.querySelector("#search");
        let busqueda=search.value;

        fetch(`https://www.metaweather.com/api/location/search/?query=${busqueda}`)
        .then(res => res.json())
        .then((res) => {
            // console.log(res.length)
            if(res.length != 0){
                //que haga lo que hace
                  //RESULTADO DE BÚSQUEDA
            let searchList = document.querySelector("#lista_busqueda");
            searchList.innerHTML = `<li class="item_busqueda"><span>${busqueda}</span><button class="btn_suma"><img id="sumar" src="assets/images/sumar_ciudades.svg" alt="sumar ciudad"></button></li>`; 
            search.value="";

            //AÑADIR A LOCALIZACIONES
            let addLocate = document.querySelector("#sumar");
            addLocate.addEventListener("click", () => {
                
               
                misCiudades_rep.push(`${busqueda}`);          
                
                localStorage.setItem("lugares", JSON.stringify(misCiudades_rep));
                        
                addSaved.innerHTML+= `<li class="savedLocate">${busqueda}
                    <span class="mdi mdi-trash-can"></span> 
                </li>`;
                clickstoCities();
                capturarDatos (busqueda);
                
           
                //FIN AÑADIR LOCALIZACIONES
                
            });
            }else{
                alert("esa ciudad no existe");
                search.value = "";
            }
        })
    })




// FUNCIÓN FETCH
    function capturarDatos(ciudad) {
         //CAPTURA DE DATOS 
         fetch(`https://www.metaweather.com/api/location/search/?query=${ciudad}`)
         .then(res => res.json())
         .then(res => {
             woeid = res[0].woeid;
             fetch(`https://www.metaweather.com/api/location/${woeid}`)
             .then(res => res.json())
             .then(res => {

            

             //----PINTADO DE DATOS---------

                 //pinta CIUDAD
                 let clima_ciudad = res.title;
                 let ciudad = document.querySelector("#city");
                 ciudad.textContent = `${clima_ciudad}`;

                 //pinta ESTADO GENERAL
                 let clima_estado = res.consolidated_weather[0].weather_state_name;
                 let estado = document.querySelector("#estado_clima");
                 estado.textContent = `${clima_estado}`;

                 //capturar ELEMENTOS A PINTAR
                 let pintaIcono = document.querySelector(".icono_clima");
                 let pintaFondo = document.querySelectorAll(".fondo");
                 let pintaPicto = document.querySelector(".picto");
                 let pintaActividad = document.querySelector(".nombre_actividad"); 
                 
                 
                 //FUNCIÓN PINTAR ELEMENTOS
                 function paintElements(a) {
                     pintaIcono.src = `${ilustra[a]}`;
                     pintaIcono.alt = `${alternativo[a]}`
                     pintaPicto.src = `${pictograma[a]}`;
                     pintaPicto.alt = `${altActividad[a]}`;
                     pintaActividad.textContent = `${actividades[a]}`;
                 }

                 //FUNCIÓN PINTAR FONDO Y TEXTO
                 function fondoTexto(f,t) {
                    for (fondo = 0; fondo < pintaFondo.length; fondo++) {
                        pintaFondo[fondo].style.backgroundColor = f;
                        pintaFondo[fondo].style.color = t;
                    }
                 }
                                 
                 switch (clima_estado) {

                     case "Clear":
                        paintElements(0);
                        fondoTexto(colores[11],colores[0]);
                         break;

                     case "Hail":
                        paintElements(1);
                        fondoTexto(colores[8],colores[1]);
                         break;

                     case "Heavy Cloud":
                        paintElements(2);
                        fondoTexto(colores[6],colores[1]);
                         break;

                     case "Heavy Rain":
                        paintElements(3);
                        fondoTexto(colores[5],colores[1]);
                         break;

                     case "Light Cloud":
                         paintElements(5);
                         fondoTexto(colores[6],colores[1]);
                         break;

                     case "Light Rain":
                        paintElements(6);
                        fondoTexto(colores[7],colores[1]);
                         break;

                     case "Snow":
                        paintElements(7);
                        fondoTexto(colores[8],colores[1]);
                         break;

                     case "Showers":
                        paintElements(8);
                        fondoTexto(colores[7],colores[1]);
                         break;

                     case "Sleet":
                        paintElements(9);
                        fondoTexto(colores[5],colores[1]);
                         break;

                     case "Thunderstorm":
                        paintElements(10);
                        fondoTexto(colores[5],colores[1]);
                         break;

                     default:
                         pintaIcono.innerHTML = `<h1 class="falta_icono">Falta icono</h1>`;
                         break;

                 }
                 

                 //pinta FECHA
                 let clima_fecha = res.consolidated_weather[0].applicable_date;
                 let fecha = document.querySelector("#date");
                 fecha.textContent = `${clima_fecha}`;

                 //pinta GRADOS
                 let clima_grados = res.consolidated_weather[0].the_temp;
                 let grados = document.querySelector("#degrees");
                 grados.textContent = `${clima_grados.toFixed(2)} ºC`;

                 //pinta TEMP MINIMA
                 let clima_minima = res.consolidated_weather[0].min_temp;
                 let minima = document.querySelector("#min");
                 minima.textContent = `min temp: ${clima_minima.toFixed(2)} ºC`;
                 
                 //pinta TEMP MÁXIMA
                 let clima_maxima = res.consolidated_weather[0].max_temp;
                 let maxima = document.querySelector("#max");
                 maxima.textContent = `max temp: ${clima_maxima.toFixed(2)} ºC`;

                 //pinta VELOCIDAD VIENTO
                 let clima_viento = res.consolidated_weather[0].wind_speed;
                 let viento = document.querySelector("#wind");
                 viento.textContent = `wind speed: ${clima_viento.toFixed(2)} km/h`;

                 //pinta HUMEDAD
                 let clima_humedad = res.consolidated_weather[0].humidity;
                 let humedad = document.querySelector("#hum");
                 humedad.textContent = `humidity: ${clima_humedad}%`;
                                 
             })
         
         });
         //FIN CAPTURA DE DATOS 
         
    };
// FINAL FUNCIÓN FETCH




//CIERRE WINDOW ONLOAD. NO BORRAR.
}





