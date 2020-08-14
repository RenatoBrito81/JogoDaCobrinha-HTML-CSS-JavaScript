var canvas = document.getElementById("cobrinha");
var contexto = canvas.getContext("2d");
var caixa = 32;
var cobrinha = [{
    eixoX: 8 * 32,
    eixoY: 8 * 32
}];

var direcao = "direita";

//Função para criar a área do jogo
function criarAreaJogo(){
    contexto.fillStyle = "lightgreen";
    contexto.fillRect(0, 0, (16 * caixa), (16 * caixa));
}

//Função para criar a cobrinha
function criarCobrinha(){
    for(cob of cobrinha){
        contexto.fillStyle = "green";
        contexto.fillRect(cob.eixoX, cob.eixoY, caixa, caixa);
    }
}

//Cria evento para verificar o teclado
document.addEventListener("keydown", (event) => {
    //Seta para esquerda
    if(event.keyCode === 37 && direcao !== "direita") direcao = "esquerda";

    //Seta para cima
    if(event.keyCode === 38 && direcao !== "descer") direcao = "subir";

    //Seta para direita
    if(event.keyCode === 39 && direcao !== "esquerda") direcao = "direita";

    //seta para baixo
    if(event.keyCode === 40 && direcao !== "subir") direcao = "descer";
});

//Função para movimentar a cobrinha
function movimentarCobrinha(){
    //Verifica a posição da cabeça e a direção escolhida
    if(cobrinha[0].eixoX > (15 * caixa) && direcao === "direita") cobrinha[0].eixoX = 0;
    if(cobrinha[0].eixoX < 0 && direcao === "esquerda") cobrinha[0].eixoX = 15 * caixa;
    if(cobrinha[0].eixoY > (15 * caixa) && direcao === "descer") cobrinha[0].eixoY = 0;
    if(cobrinha[0].eixoY < 0 && direcao === "subir") cobrinha[0].eixoY = 15 * caixa;

    //Cria área do jogo
    criarAreaJogo();

    //Cria cobrinha na área do jogo
    criarCobrinha();

    //***
    let posicaoEixoX = cobrinha[0].eixoX;
    let posicaoEixoY = cobrinha[0].eixoY;

    //***
    if(direcao == "direita") posicaoEixoX += caixa;
    if(direcao == "esquerda") posicaoEixoX -= caixa;
    if(direcao == "subir") posicaoEixoY -= caixa;
    if(direcao == "descer") posicaoEixoY += caixa;

    //Retira última posicao do array da cobrinha
    cobrinha.pop();

    //Incluí nova posição no inicio do array da cobrinha
    cobrinha.unshift({
        eixoX: posicaoEixoX,
        eixoY: posicaoEixoY
    });
}

//Função para fazer os movimentos da cobrinha
var movimentar = setInterval(movimentarCobrinha, 250);