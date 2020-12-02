const apiKey = "FMXGQlWs92shetc16S7nUVKOraMO8csR"
const defaultUrl = "https://api.giphy.com/v1/gifs"
const apiUpload = "https://upload.giphy.com/v1/gifs"
const windowHide = document.getElementsByClassName("window")
const btnCancellar = document.getElementsByClassName("btnCancelar")
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
const contPreview = document.getElementsByClassName("contPreview")[0];
var stream;
var recorder;
var blob;

//Reemplaza Ventana inicial por la de Camara
btnComenzar[0].addEventListener("click", () => {
    windowHide[0].classList.add("windowHide")
    windowCamaraHide[0].classList.remove("windowCamaraHide")
    getStreamAndRecord();
})

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
    titulo.innerHTML = "Capturando Tu Gifo";
}

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

function stopRecordingCallback(){
    console.log("dejo de grabar")
    recorder.camera.stop()
    blob = recorder.getBlob();
    gifPreview.src = URL.createObjectURL(blob)
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
        })
    })
}


/*
//Funcion stoprecordin nueva
function stopRecordingCallBack(){
    recorder.camera.stop();
    blob = recorder.getBlob();
//previewGif mirar github
    previewGif.src = URL.createObjectURL(blob)
    otroGif.src = URL.createObjectURL(blob)
    let form = new FormData();
    form.append('file', blob, 'myGif.gif');
    recorder.destroy();
    recorder = null;
    previewGif.style.display = 'block';
    subir.addEventListener('click', () => {
    uploadGif(form);
    })
}

function uploadGif(data){
    fetch('https://upload.giphy.com/v1/gifs' + '?api_key=' + apiKey, {
    method: 'POST', // or 'PUT'
    body: data,
  }).then(resp => {
    return resp.json();
  }).then(respuesta => {
    fetch(`https://api.giphy.com/v1/gifs/${respuesta.data.id}?api_key=${apiKey}`)
    .then(resp => {
        return resp.json();
    }).then(respuesta => {
        let gifUrl = respuesta.data.images.fixed_height.url;
        localStorage.setItem(`Gif${respuesta.data.id}`,`${gifUrl}`)
        botonAdentro1.addEventListener("click",async()=>{
        await navigator.clipboard.writeText(respuesta.data.images.fixed_height.url)
        alert("se copio el link en el clipboard")
    })
    botonAdentro2.addEventListener("click",() => {
        let a = document.createElement('a');
        a.download = 'myGif.gif';
        a.href = window.URL.createObjectURL(blob);
        a.dataset.downloadurl = ['application/octet-stream', a.download, a.href].join(':');
        a.click();
    })
    ultimoBoton.addEventListener("click",()=>{
        location.reload();
    })
  })
})
}

//devuelve el gif
function recorrerStorage(){
    for(var i = 0; i < localStorage.length; i++){
        let keys = localStorage.key(i)
        if(keys.startsWith("Gif")){
            let item = localStorage.getItem(keys)
            let gifCreado = document.createElement("img");
            gifCreado.classList.add("gifCreado");
            gifCreado.src = item
            contenedorGif.appendChild(gifCreado)
        }
    }
}*/





/*
else linea 66
divLogo.innerHTML= `<div id= "divLogo" class="logoMasListo logoMasListoHide">
                    <div class="logoFlex">
                        <div id="logoCamara" class="logoListo">
                            <img id="camaraInterno" class="logoRecording" src="./assets/recording.svg" alt="">
                        </div>
                        <button id="btnCapturar btnListo" class="btnListo"><p>Listo</p></button>
                    </div>
                    <div class="timer"><p>00:00:03:06</p></div>` */
