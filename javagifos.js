const apiKey = "FMXGQlWs92shetc16S7nUVKOraMO8csR"
const link_giphy = "http://api.giphy.com/v1/gifs/search?q="
const searchBar = document.getElementById("searchBar")
const searchButton = document.getElementById("searchButton")
const textoBusqueda = document.getElementById("textSearch")
const dropDownArrow = document.getElementById("dropdown")
const containThemes = document.getElementsByClassName("buttonSaylor")
const day = document.getElementById("day")
const night = document.getElementById("night")
const searchResault = document.getElementById("gifs")
const trendingGiphy = 'https://api.giphy.com/v1/gifs/trending?api_key='
const gifTendencias = document.getElementById("gifTendencias")
const barEjemplos = document.getElementsByClassName("barEjemplos")
const containBox = document.getElementById("containBox")
const arraySugerencias = ["MotoGP" , "Skyline" , "Kawasaki" , "Messi"]
const hideButtonTag = document.getElementsByClassName("buttonTagDiv")
const tendencias = document.getElementById("Tendencias")
const sugerencias = document.getElementById("Sugerencias")
const buttonVer = document.getElementsByClassName("buttonVer")
const lupa = document.getElementsByClassName("lupa")

//Funcion de busqueda para traer los gif
function getSearchResults(search) {
    const found = fetch(link_giphy + search + '&api_key=' + apiKey)
        .then((response) => {
            return response.json()
        }).then(data => {
            return data
        })
        .catch((error) => {
            return error
        })
            return found
}

//funcion para traer las tendencias de giphy
function getTrendingSearch() {    
    const found = fetch(trendingGiphy + apiKey)        
    .then((response) => {
            return response.json()        
        }).then(data => {
            return data        
        })
        .catch((error) => {
            return error       
        })
            return found
}

//funcion para que cargen las tendencias en la pantalla de inicio
window.addEventListener("load", ()=> {
    getTrendingSearch()
        .then(resultado =>{
            const arrayFiltrado = resultado.data
            for(i=0; i<=16 ; i++){
                let containGif = document.createElement("img")
                containGif.classList.add("containGifSearch")
                containGif.src=arrayFiltrado[i].images.original.url
                gifTendencias.appendChild(containGif)
            }
        })
})

//trae gif cuando clickeamos en "Ver mas"
barEjemplos[0].addEventListener("mousedown", (element) =>{
   getSearchResults(element.target.dataset.search)
        .then((resultado) => {            
            busqueda(resultado, element.target.dataset.search)
            hideButtonTag[0].classList.remove("hideButtonTag")
            barEjemplos[0].classList.add("barEjemplosHide")
            tendencias.classList.add("tendenciasHide")
            sugerencias.classList.add("sugerenciasHide")
    })
        .catch ((error) =>{
            console.log(error)
    })        
})

hideButtonTag[0].addEventListener("click", (element)=>{
    getSearchResults(element.target.dataset.search)
    .then((resultado) => {            
        busqueda(resultado, element.target.dataset.search)
        hideButtonTag[0].classList.remove("hideButtonTag")
        barEjemplos[0].classList.add("barEjemplosHide")
        tendencias.classList.add("tendenciasHide")
        sugerencias.classList.add("sugerenciasHide")
})
    .catch ((error) =>{
        console.log(error)
})        
})

//-----------------Sugerencias----------
window.addEventListener("load", () =>{
    arraySugerencias.forEach(suggest => {
        getSearchResults(suggest)
        .then((resultado) => {
       let primerGif = resultado.data[0]
       let div = document.createElement("div")
       div.classList.add('titleBox')
       div.innerHTML= `<p class="letter">#${suggest}<img src='./assets/button3.svg' class="closeButton"></p>
                        <div><img class= "imgSuggest" src = ${primerGif.images.fixed_height.url}>
                        <button class="buttonVer" data-search= ${suggest}>Ver Mas</button></div>`
        containBox.appendChild(div)
    })
        .catch ((error) =>{
            console.log(error)
    })  
    })
})

//funcionalidad boton buscar
containBox.addEventListener ("click", (elemento)=>{
    console.log(elemento)
    if (elemento.target.localName == "button"){
        getSearchResults(elemento.target.dataset.search)
        .then((resultado) => {
            busqueda(resultado, elemento.target.dataset.search)   
            hideButtonTag[0].classList.remove("hideButtonTag")
            barEjemplos[0].classList.add("barEjemplosHide")
            tendencias.classList.add("tendenciasHide")
            sugerencias.classList.add("sugerenciasHide")            
    })
        .catch ((error) =>{
            console.log(error)
    })        
    }
})

//Evento para el boton de busqueda y agrega botones ejemplos
searchButton.addEventListener('click', () => {
    //console.log(searchBar.value)
    getSearchResults(searchBar.value)
        .then((resultado) => {
            busqueda(resultado, searchBar.value)   
            hideButtonTag[0].classList.remove("hideButtonTag")
            barEjemplos[0].classList.add("barEjemplosHide")
            tendencias.classList.add("tendenciasHide")
            sugerencias.classList.add("sugerenciasHide")     
            
    })
        .catch ((error) =>{
            console.log(error)
    })        
})

// Funcion para traer los gifs, y reemplazar la seccion de tendencias.
function busqueda(response, searchText){       
    if (response.data.length > 0){        
        searchResault.innerHTML = `<input id='textSearch' type='search' placeholder='${searchText}'>`        
        console.log (response)
        let arrayFiltrado = response.data      
            for (let i =0 ; i<16 ; i++){
            let gif = document.createElement("img")
            gif.classList.add("vacia")
            gif.src = arrayFiltrado[i].images.original.url
            searchResault.appendChild(gif)
        }            
        searchResault.classList.remove("gifHide")
        searchResault.scrollIntoView()
    }
}

//Cambio de color "DAY" a "NIGHT"
day.addEventListener("click", () => {   
    document.getElementsByTagName("body")[0].classList.add("day_theme")    
    document.getElementsByTagName("body")[0].classList.remove("night_theme")
    document.getElementsByClassName("logoLight")[0].src="./gifOF_logo.png"
    containThemes[0].classList.toggle("hideSaylor")
})

night.addEventListener("click", () => {   
    document.getElementsByTagName("body")[0].classList.remove("day_theme")  
    document.getElementsByTagName("body")[0].classList.add("night_theme")    
    document.getElementsByClassName("logoLight")[0].src="./gifOF_logo_dark.png";
    containThemes[0].classList.toggle("hideSaylor")
})

dropDownArrow.addEventListener("click", () =>{
    containThemes[0].classList.toggle("hideSaylor")
})


//funcion para poner y ocultar " barEjemplos"
searchBar.addEventListener("input" , () =>{   
    if (searchBar.value == ""){
        barEjemplos[0].classList.add("barEjemplosHide")
        searchButton.classList.remove("colorSearch")
        lupa[0].classList.remove("lupaNegra")
        //lupa.src="./assets/lupa.svg"
    }
    else{
        barEjemplos[0].classList.remove("barEjemplosHide")
        searchButton.classList.add("colorSearch")
        lupa[0].classList.add("lupaNegra")
        
    }
})