
/*
let links = document.querySelectorAll("a");
links.forEach((link,id) => {
    console.log("El id es: "+id+" el valor del link es: "+link);
    console.log(id)
    console.log(link);
});

*/

/*
let filas = document.querySelectorAll("tr");
filas.forEach((fila,id) => {
    console.log(fila.innerText);
    console.log(fila.rowIndex);
    console.log(fila.cells[1]);
    fila.cells[1].innerText = "New Content";

})
*/


/*
Al no usar lambas, this es el contexto que disparo el evento, en este caso la celda
si usamos expresiones lmabda, el contexto no cambia a uno local por lo que
this seria la pantalla completa
let celdas = document.querySelectorAll("td");
celdas.forEach(function(celda) {
    celda.addEventListener('click',function(){
        console.log(this);
    });
});

*/




//Obtener todos los elements con la clase close
let linksCerrar = document.querySelectorAll(".close");
//Recorrer todos los elementos que se nos retornen
linksCerrar.forEach(function(linkC){
    //se le añade un evento a cada uno de esos elementos
    linkC.addEventListener('click',function(ev){
        //Quien disparo el evento
        //console.log(ev.target);

        //se previene el comportamiento por default
        ev.preventDefault();

        //obtener el contenedor
        let content = document.querySelector(".content");

        //Se le quita la clase de aniamcion de entrada
        content.classList.remove("fadeInUp");
        content.classList.remove("animated");

        //Añadir clase de animacion de salida
        content.classList.add("animated");
        content.classList.add("fadeOutUp");

        window.setTimeout((ruta)=>{
            location.href = ruta;
        },600,"../index.html")

    });
});


//Obtener links de redireccionamiento
let linksRedir = document.querySelectorAll("tr > td > a");
//Añadir evento a cada uno para poner un timeOut en la transicion
linksRedir.forEach((linkR) =>{
    linkR.addEventListener("click",function(e){
        e.preventDefault();

        let content = document.querySelector(".content");
        content.classList.remove("fadeInDown");
        content.classList.remove("animated");
        //Añadir clase de animacion de salida
        content.classList.add("animated");
        content.classList.add("fadeOutDown");

        //ruta = linkR.getAttribute("href");
        ruta = linkR.href;
        window.setTimeout(function(ruta){
            location.href = ruta;
        },600,ruta);
    });
});





//Obtener todos los elements i que son las estrellas
let stars = document.querySelectorAll("table.tabla > tbody > tr > td > i");
let indice = 0;
stars.forEach(function(star){
//element.value es distinto de añadir el atributo "value"
    //star.value = indice;
    //star.setAttribute("value","valor");
//element.id es lo mismo que añadir el atributo "id"
    //star.setAttribute("id","id");
    //star.id = indice;

    star.id=indice;
    indice++;
    star.addEventListener('click',function(ev){
        //console.log("El valor mismo es: "+star.value);
        //console.log("EL atributo value es: "+star.getAttribute("value"));
        //console.log("EL atributo id es: "+star.getAttribute("id"));
        //console.log("El id mismo es: "+star.id);
        //console.log("La clase misma es: "+star.classList.value);
        let fila = Fila(star.id.toString());
        let elemento = Elemento(star.id);
        let indiceElemento = fila.indexOf(elemento);

        //console.log("ID: "+star.id+" se encuentra en la fila: "+numFila);
        //console.log(fila);
        //console.log(elemento);
        //console.log(indiceElemento);


        if (star.classList[0] == "fas") {
            for(let index = indiceElemento; index < fila.length; index++){
                const el = fila[index];
                if(el != star){ //empezar a vaciarlas en el elemento siguiente distinto a la estrella actual
                    let c1 = el.classList[0];
                    let c2 = el.classList[1];
                    el.classList.remove(c1,c2);
                    el.classList.add("far","fa-star");
                }
            }
        }else if(star.classList[0] == "far"){
            for(let index = indiceElemento; index>0; index--){
                const el = fila[index];
                let c1 = el.classList[0];
                let c2 = el.classList[1];
                el.classList.remove(c1,c2);
                el.classList.add("fas","fa-star");
            }
        }
    });

    star.addEventListener("mouseenter",function(){
        star.classList.remove("fa-star");
        star.classList.add("fa-star-half");
        /*
        //evaluamos si la estrella estaba llena(fas) o vacia (far)
        if(star.classList[0] == "fas"){
            star.classList.remove(star.classList[0],star.classList[1]);
            star.classList.add("fas");
        }else{
            star.classList.remove(star.classList[0],star.classList[1]);
            star.classList.add("far");
        }
        star.classList.add("fa-star-half");
        */
        //Creo que solo era neceasrio elimina la clasList[1] y añadir la fa-star-half
    });

    star.addEventListener("mouseleave",function(){
        star.classList.remove("fa-star-half");
        star.classList.add("fa-star");
        /*
        //Evaluamos si la estrella esta vacia o llena
        if(star.classList[0] == "fas"){
            star.classList.remove(star.classList[0],star.classList[1]);
            star.classList.add("fas",claseOr2);
        }else{
            star.classList.remove(star.classList[0],star.classList[1]);
            star.classList.add("far",claseOr2);
        }
        */
    });
});





//Crear arreglo de arreglos de 5 estrellas cada uno
//convirtiendo la NodeList en array
//f1 let starsArray = [...stars];
//f2 let starsArray = Array.prototype.slice.call(stars)
//f3 let starsArray = Array.from(stars);
const longitudPezados = 5;
let filaStars = [];
let starsArray = Array.from(stars);
for (let index = 0; index < stars.length; index += longitudPezados) {
    let pedazo = starsArray.slice(index,index+longitudPezados);
    filaStars.push(pedazo);
}


let Fila = function(indBuscar){
    let arregloR =null;
    filaStars.forEach((arreglo,indexArreglo)=>{
        arreglo.forEach((elemento,indexElemento)=>{
            if(indBuscar == elemento.getAttribute("id")){
                arregloR = arreglo;
            }
        });
    });
    return arregloR;
};

let Elemento = function(indBuscar){
    let elementoR =null;
    filaStars.forEach((arreglo,indexArreglo)=>{
        arreglo.forEach((elemento,indexElemento)=>{
            if(indBuscar == elemento.getAttribute("id")){
                elementoR = elemento;
            }
        });
    });
    return elementoR;
};
