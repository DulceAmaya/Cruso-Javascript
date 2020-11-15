let peliculas = ["Titanic", "Cenicienta", "Pulp Fiction", "Avatar", "Joker", "Toy Story", "Avengers", "Cars", "Batman Inicia", "Baby Driver", "Shrek", "Lalaland", "Monsters Inc", "El Padrino", "Sharknado", "Mulan", "Megamente", "Iron Man", "El transportador", "Enredados", "La Familia Adams", "Interestelar", "Venom", "Jumanji"];

let letras = [];
let intentos = 1;
let letrasUsadas = [];
let letrasFaltantes = 0;
let puntaje = 0;

/*
 * Función que comienza el juego. Selecciona aleatoriamente una palabra del arreglo de palabras existente.
 */
function comenzarJuego(){
    const indice = Math.floor(Math.random() * peliculas.length);
    nuevaPalabra(peliculas[indice]);
    letraSeleccionada();
}

/*
 * Función que crea las casillas para una nueva palabra;
 */
function nuevaPalabra(cadena){
    //Creamos un arreglo de letras con la palabra seleccionada.
    letras = Array.from(cadena);

    //Para cada letra en el arreglo letras, si letra es distinta de " ", incrementamos en 1 letrasFaltantes.
    letras.forEach(letra => {
        if(letra !== " ")
            letrasFaltantes++;
    });

    //Obtenemos el contenedor donde irán las casillas.
    let contenedor = document.getElementsByClassName("contenedor-palabra");

    //Por cada letra en el arreglo creamos una casilla.
    letras.forEach(letra => {
        let casilla = document.createElement("div");
        //Si hay un espacio creamos un div con la clase "espacio".
        if(letra === " ")
            //Le asignamos dos clases al elemento.
            casilla.setAttribute("class", "palabra espacio");

        //En otro caso creamos el div con la clase "letra".
        else
            //Le asignamos dos clases al elemento.
            casilla.setAttribute("class", "palabra letra");
        contenedor[0].appendChild(casilla);
    });
}

/*
 * Función que detecta cuando una letra ha sido seleccionada.
 */
function letraSeleccionada(){
    //Esta expresión regular acepta letras mayúsculas, minúsculas y con acentos.
    let letraValida = /^[A-Za-zÁ-ú]+$/;

    //Obtenemos el elemento input
    let input = document.getElementById("entrada-letra");

    input.addEventListener("input", (e) => {
        //El atributo e.data nos permite obtener el texto ingresado por el usuario.
        let letra = e.data;
        //Verificamos que la entrada del usuario sea aceptada por la expresión regular.
        if(letra.match(letraValida)){
            //Si es así, llamamos a la función encargada de continuar con el juego
            letraIngresada(letra);
        }
        //Si no es una letra válida, no hacemos nada.

        //Vamos a limpiar el campo de entrada después de 300 milisengundos.
        setTimeout(() => {input.value="";},300);
    });
}

/*
 * Función que verificia si la letra ingresada es válida.
*/
function letraIngresada(letra){
    //Si la letra ya fue utilizada muestra una alerta.
    if(letrasUsadas.includes(letra))
        alert("Esa letra ya la has usado");
    //En otro caso verifica si la letra ingresada es correcta.
    else{
        if(incluyeLetra(letra))
            letraCorrecta(letra);
        else
            letraIncorrecta();
        //Agregamos la letra utilizada al arreglo.
        letrasUsadas.push(letra);
    }
}

/*
 * Función auxiliar que busca si la palabra incluye una letra, mayúscula o minúscula
 */
function incluyeLetra(letra){
    //En cuanto encuetra la primer ocurrencia de letra en el arreglo letras (ya sea mayúscula o minúscula) devuelve true.
    let n = 0;
    while(n < letras.length){
        if(letras[n] == letra || letras[n] == letra.toUpperCase())
            return true;

        n++;
    }
    //Si no encontró ninguna, devuelve false.
    return false;
}

/*
 * Función auxiliar que devuleve un arreglo con los índices del arreglo letras donde aparece l.
 */
function getIndices(letra){
    let indices = [];

    for(let i = 0; i < letras.length; i++){
        //Para la letra en la posición i, si es igual a la letra ingresada por el usuario, agregamos el índice a i al arreglo.
        if(letras[i] === letra || letras[i] === letra.toUpperCase())
            indices.push(i);
    }

    return indices;
}

/*
 * Función para cuando la letra seleccionada es correcta.
 */
function letraCorrecta(letra){
    //Obtenemos los índices donde aparece letra.
    let indices = getIndices(letra)
    //Si la letra es correcta disminuimos el contador de letras faltantes.
    letrasFaltantes -= indices.length;
    let casillas = document.getElementsByClassName("palabra");
    //Por cada índice en donde aparece la letra la mostramos en la casilla correspondiente.
    for(let i = 0; i < indices.length; i++){
        let casilla = casillas[indices[i]];
        let texto = document.createTextNode(letras[indices[i]]);
        casilla.appendChild(texto);
    }

    if(letrasFaltantes == 0)
        ganar();
}

comenzarJuego();
