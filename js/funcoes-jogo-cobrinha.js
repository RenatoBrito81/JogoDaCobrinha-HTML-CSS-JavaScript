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

//Função para movimentar a cobrinha
function movimentarCobrinha(){
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