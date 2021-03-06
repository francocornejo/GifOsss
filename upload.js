const apiKey = "FMXGQlWs92shetc16S7nUVKOraMO8csR"
const defaultUrl = "https://api.giphy.com/v1/gifs"
const apiUpload = "https://upload.giphy.com/v1/gifs"
const windowHide = document.getElementsByClassName("window")
const btnCancelar = document.getElementsByClassName("btnCancelar")
const btnComenzar = document.getElementsByClassName("btnComenzar")
const windowCamaraHide = document.getElementsByClassName("windowCamaraHide")
const windowCamara = document.getElementsByClassName("windowCamara")[0];
const titulo = document.getElementById("titulo");
const btnCapturar = document.getElementById("btnCapturar")
const divLogo = document.getElementById("divLogo")
const logoMasListoHide = document.getElementsByClassName("logoMasListo")[0];
const video = document.getElementsByClassName("video")[0];
const logoCamara = document.getElementById("logoCamara")
const camaraInterno = document.getElementById("camaraInterno")
const btnListoGuardar = document.getElementById("btnListo")
const btnListo = document.getElementsByClassName("btnListo")[0];
const logoFlex = document.getElementsByClassName("logoFlex")[0];
const gifPreview = document.getElementById("gifPreview");
const btnSubir = document.getElementById("btnSubir");
const btnRepetir = document.getElementById("btnRepetir");
const contPreview = document.getElementsByClassName("contPreview")[0];
const contenedorSubiendo = document.getElementById('contenedorSubiendo');
const progressBar1cont = document.querySelector('#bar1');
const progressBar2cont = document.querySelector('#bar2');
const progressBar1 = document.querySelectorAll('#bar1 .progressBarPart');
const btnCancelarSubiendo = document.getElementById("btnCancelarSubiendo");
const btnConfirmarRepetir = document.getElementById("btnConfirmarRepetir");
const contenedorFinal = document.getElementsByClassName("contenedorFinal")[0];
const timer = document.getElementsByClassName("timer")[0];
const otroGif = document.getElementById("otroGif");
const ultimoBoton = document.getElementById("ultimoBoton");
const botonAdentro1 = document.getElementById("botonAdentro1");
const botonAdentro2 = document.getElementById("botonAdentro2");
const mostrarInicio = document.getElementsByClassName("window")[0];
const contenedorGifos = document.getElementsByClassName("contenedorGifos")[0];
const dropDownArrow = document.getElementById("dropdown");
const containThemes = document.getElementsByClassName("buttonSaylor");
const day = document.getElementById("day")
const night = document.getElementById("night")
const misGifos = document.getElementsByClassName("mis_gifos")[0];
var stream;
var recorder;
var blob;

window.addEventListener('load', () => {
    recorrerGif();
})

misGifos.addEventListener('click', () => {
    windowHide[0].classList.add("windowHide")
})

//Reemplaza Ventana inicial por la de Camara
btnComenzar[0].addEventListener("click", () => {
    windowHide[0].classList.add("windowHide")
    windowCamaraHide[0].classList.remove("windowCamaraHide")
    contenedorGifos.style.display = "none";
    getStreamAndRecord();
})

btnCapturar.addEventListener("click", () =>{
        logoMasListoHide.style.display = "block"
        divLogo.style.display = "none"
        captureButtonCallback();
});

btnListo.addEventListener('click', () =>{
    contPreview.style.display = "block"
    windowCamara.classList.add("windowCamaraHide")
    console.log("dejo de grabar y guardo")
    stopGif();
});

btnRepetir.addEventListener('click', () => {
    location.reload();
})

btnSubir.addEventListener('click', () => {
    btnConfirmarRepetir.style.display = "none";
    contPreview.style.display = "none";
    progressBarEffect(progressBar1);
    contenedorSubiendo.style.display = "block";
    setTimeout(function() {
        contenedorSubiendo.style.display = "none";
        contenedorFinal.style.display = "block";
    }, 3000);
})

btnCancelarSubiendo.addEventListener('click', () => {
    location.reload();
    eliminarGif();
})


//--------------FUNCIONES------------

function getStreamAndRecord() {
    navigator.mediaDevices.getUserMedia({
        audio: false,
        video: {
            height: {
                max: 434,
                exact: 434
            },
            width: {
                max: 838,
                exact: 838
            }
        }
    })
        .then(function (cameraResponse) {
            stream = cameraResponse;
            video.srcObject = stream;
            video.play()
        })
        .catch(() =>{
            alert("Necesitas una camara para continuar")
        })
}

function captureButtonCallback(){
    recorder = RecordRTC(stream, {
        type: 'gif',
        frameRate: 1,
        quality: 10,
        width: 360,
        hidden: 240,
        onGifRecordingStarted: () => {
        console.log('started')
        },
    })
    recorder.startRecording()
    recorder.camera = stream;
    titulo.innerHTML = `<p>Capturando tu gifo <img src="assets/close.svg" alt="cierre"></p>`
}

function uploadGif(data){
    fetch('https://upload.giphy.com/v1/gifs'+ '?api_key=' + apiKey, {
        method: 'POST',
        body: data,
    }).then (resp => {
        return resp.json();
    }).then(respuesta => {
        fetch(`https://api.giphy.com/v1/gifs/${respuesta.data.id}?api_key=${apiKey}`)
        .then(resp => {
            return resp.json();
        }).then(respuesta => {
            let gifUrl = respuesta.data.images.fixed_height.url;
            localStorage.setItem(`gif${respuesta.data.id}`,`${gifUrl}`)
            botonAdentro1.addEventListener('click', async()=> {
                await navigator.clipboard.writeText(respuesta.data.images.fixed_height.url)
                alert("Se copio el link en el clipboard")
            })
            botonAdentro2.addEventListener('click', () => {
                let a = document.createElement('a');
                a.download = "myGif.gif";
                a.href = window.URL.createObjectURL(blob);
                a.dataset.dowloadurl = ['application/octet-stream', a.dowload, a.href].join(':')
                a.click()
            })
            ultimoBoton.addEventListener('click', () => {
                location.reload();
            })
        })
    })
}

//agregar gif a Mis Guifos
function recorrerGif() {
    for (var i=0; i < localStorage.length; i++){
        let keys = localStorage.key(i)
        if(keys.startsWith("Gif")){
            let item = localStorage.getItem(keys)
            let gifCreado = document.createElement("img");
            gifCreado.classList.add("gifCreado");
            gifCreado.src = item
            contenedorGifos.appendChild(gifCreado);
        }
    }
}

function eliminarGif(){
    let item = localStorage.getItem("Gif")
    let gifsArray = nuevoArray[item];
    let gifCorrecto = nuevoArray.pop()
}

function stopRecordingCallback(){
    console.log("dejo de grabar")
    recorder.camera.stop()
    blob = recorder.getBlob();
    gifPreview.src = URL.createObjectURL(blob);
    otroGif.src = URL.createObjectURL(blob)
    let form = new FormData()
    form.append('file', blob, 'myGif.gif');
    recorder.destroy();
    recorder = null;
    gifPreview.style.display = "block";
    video.classList.add("videoHide")
    btnSubir.addEventListener("click", () => {
        uploadGif(form);
    })
};

const stopGif = () => {
    recorder.stopRecording(stopRecordingCallback);
};

//Barra progreso Subir gif
function progressBarEffect(bar) {
	let cont = 0;
	setInterval(() => {
		if (cont < bar.length) {
			bar[cont].classList.toggle('progressBarPartEnabled');
			cont++;
		} else {
			cont = 0;
		}
    }, 100);
    progressBar1cont.classList.toggle("visible");
}


//Cambio de color "DAY" a "NIGHT"
day.addEventListener("click", () => {   
    document.getElementsByTagName("body")[0].classList.add("day_theme")    
    document.getElementsByTagName("body")[0].classList.remove("night_theme")
    document.getElementsByClassName("logoLight")[0].src="./gifOF_logo.png"
    containThemes[0].classList.toggle("hideSaylor")
    document.getElementsByClassName("camaraLogoInterno")[0].src="./assets/camera.svg"
})

night.addEventListener("click", () => {   
    document.getElementsByTagName("body")[0].classList.remove("day_theme")  
    document.getElementsByTagName("body")[0].classList.add("night_theme")    
    document.getElementsByClassName("logoLight")[0].src="./gifOF_logo_dark.png";
    containThemes[0].classList.toggle("hideSaylor")
    document.getElementsByClassName("camaraLogoInterno")[0].src="./assets/camera_light.svg"
})

dropDownArrow.addEventListener("click", () =>{
    containThemes[0].classList.toggle("hideSaylor")
})
