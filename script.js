const html = document.querySelector("html");
const btnFoco = document.querySelector(".app__card-button--foco");
const btnCurto = document.querySelector(".app__card-button--curto");
const btnLongo = document.querySelector(".app__card-button--longo");
const imagemPrincipal = document.querySelector(".app__image");
const textoPrincipal = document.querySelector(".app__title");
const btns = document.querySelectorAll(".app__card-button");
const btnStartPause = document.querySelector("#start-pause");
const textoBtnIniciarPausar = document.querySelector("#start-pause span")
const imgBtnIniciarPausar = document.querySelector(".app__card-primary-butto-icon");
const inputToggleMusica = document.querySelector("#alternar-musica");
const timerTela = document.querySelector("#timer");
const musica = new Audio("./sons/luna-rise-part-one.mp3");
musica.loop = true;

let tempoDecorridoSegundos = 1500;
let intervaloId = null;

btnFoco.addEventListener("click",  () => {
    tempoDecorridoSegundos = 1500;
    alterarContexto("foco");
    btnFoco.classList.add("active");
});

btnCurto.addEventListener("click", () => {
    tempoDecorridoSegundos = 300;
    alterarContexto("descanso-curto");
    btnCurto.classList.add("active");
});

btnLongo.addEventListener("click", () => {
    tempoDecorridoSegundos = 900;
    alterarContexto("descanso-longo");
    btnLongo.classList.add("active");
});

inputToggleMusica.addEventListener("change", () => {
    if (musica.paused) {
        musica.play();
    } else {
        musica.pause();
    }
})

function alterarContexto(contexto) {
    mostraTempo();
    btns.forEach(btn => btn.classList.remove("active"))
    html.setAttribute("data-contexto", contexto);
    imagemPrincipal.setAttribute("src",`./imagens/${contexto}.png`);
    switch (contexto) {
        case "foco":
            textoPrincipal.innerHTML = `Otimize sua produtividade,<br />
            <strong class="app__title-strong">Mergulhe no que importa.</strong>`
        break;
        case "descanso-curto":
            textoPrincipal.innerHTML = `Que tal dar uma respirada?<br />
            <strong class="app__title-strong">Faça uma pausa curta!</strong>`
          break;
        case "descanso-longo":
            textoPrincipal.innerHTML = `Hora de voltar à superfíce.<br />
            <strong class="app__title-strong">Faça uma pausa longa.</strong>`
            break;
        default:
            break;

    }
}

const contagemRegressiva = () => {
    if (tempoDecorridoSegundos <= 0) {
        zerar();
        new Audio("./sons/beep.mp3").play();
        return
    }
    tempoDecorridoSegundos -= 1
    mostraTempo();
}

btnStartPause.addEventListener("click", iniciarPausar)

function iniciarPausar() {
    if (intervaloId) {
        zerar();
        new Audio("./sons/pause.mp3").play();
        return;
    }
    new Audio("./sons/play.wav").play();
    intervaloId = setInterval(contagemRegressiva, 1000); 
    textoBtnIniciarPausar.textContent = "Pausar";
    imgBtnIniciarPausar.setAttribute("src", "./imagens/pause.png");
}

function zerar() {
    clearInterval(intervaloId);
    textoBtnIniciarPausar.textContent = "Começar";
    imgBtnIniciarPausar.setAttribute("src", "./imagens/play_arrow.png");
    intervaloId = null;
}

function  mostraTempo() {
    const tempo = new Date(tempoDecorridoSegundos * 1000);
    const tempoFormatado = tempo.toLocaleString("pt-br",{minute:"2-digit",second:"2-digit"});
    timerTela.innerHTML = `${tempoFormatado}`;
}

mostraTempo();