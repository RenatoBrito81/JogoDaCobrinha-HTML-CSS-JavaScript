var canvas = document.getElementById("cobrinha");
var contexto = canvas.getContext("2d");
var caixa = 32;
var cobrinha = [{
    eixoX: 8 * 32,
    eixoY: 8 * 32
}];

var fruta = {
    eixoX: Math.floor(Math.random() * 15 + 1) * caixa,
    eixoY: Math.floor(Math.random() * 15 + 1) * caixa
}

var direcao = "direita";

ranking = [];

/*var ranking = [
    {pontos: 10, velocidade: 10, borda: false},
    {pontos: 7, velocidade: 8, borda: true},
    {pontos: 5, velocidade: 5, borda: true},
    {pontos: 2, velocidade: 2, borda: true},
    {pontos: 1, velocidade: 1, borda: false}
];*/

//Função para criar a área do jogo
function criarAreaJogo(){
    contexto.fillStyle = "lightgreen";
    contexto.fillRect(0, 0, (16 * caixa), (16 * caixa));
}
criarAreaJogo();

//Função para criar a cobrinha
function criarCobrinha(){
    for(cob of cobrinha){
        contexto.fillStyle = "green";
        contexto.fillRect(cob.eixoX, cob.eixoY, caixa, caixa);
    }
}

//Função para criar a frutinha
function criarFrutinha(){
    //Cria frutinha na tela
    contexto.fillStyle = "red";
    contexto.fillRect(fruta.eixoX, fruta.eixoY, caixa, caixa);
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

    //*** excluir daqui para baixo (testes)
    //console.log(event.keyCode);
    if(event.keyCode === 65){
        //a
        document.getElementById("borda-infinita").disabled = true;
    }
    if(event.keyCode === 66){
        //b
        document.getElementById("borda-infinita").disabled = false;
    }
    if(event.keyCode === 67){
        //c
        var aux = document.getElementById("lista-velocidades");
        alert(aux.value);
    }
    if(event.keyCode === 68){
        //d
        //
    }
    if(event.keyCode === 69){
        //e
        //
    }
});

//Função para movimentar a cobrinha
function movimentarCobrinha(){
    //Verifica a posição da cabeça e a direção escolhida
    if(cobrinha[0].eixoX > (15 * caixa) && direcao === "direita") cobrinha[0].eixoX = 0;
    if(cobrinha[0].eixoX < 0 && direcao === "esquerda") cobrinha[0].eixoX = 15 * caixa;
    if(cobrinha[0].eixoY > (15 * caixa) && direcao === "descer") cobrinha[0].eixoY = 0;
    if(cobrinha[0].eixoY < 0 && direcao === "subir") cobrinha[0].eixoY = 15 * caixa;

    //Verifica se a cabeça se choca com o corpo
    for (let i = 1; i < cobrinha.length; i++) {
        if(cobrinha[0].eixoX === cobrinha[i].eixoX && cobrinha[0].eixoY === cobrinha[i].eixoY){
            clearInterval(movimentar);
            alert("Game Over!");
        }
    }

    //Cria área do jogo
    criarAreaJogo();

    //Cria cobrinha na área do jogo
    criarCobrinha();

    //Cria frutinha na área do jogo
    criarFrutinha();

    //Armazena a posição da cabeça da cobrinha
    let posicaoEixoX = cobrinha[0].eixoX;
    let posicaoEixoY = cobrinha[0].eixoY;

    //Verifica a direção da cobrinha
    if(direcao == "direita") posicaoEixoX += caixa;
    if(direcao == "esquerda") posicaoEixoX -= caixa;
    if(direcao == "subir") posicaoEixoY -= caixa;
    if(direcao == "descer") posicaoEixoY += caixa;

    //Verifica se a cobrinha pegou a frutinha
    if(posicaoEixoX !== fruta.eixoX || posicaoEixoY !== fruta.eixoY){
        //Retira última posicao do array da cobrinha
        cobrinha.pop();
    }
    else{
        //Define uma nova posição para a frutinha
        fruta.eixoX = Math.floor(Math.random() * 15 + 1) * caixa;
        fruta.eixoY = Math.floor(Math.random() * 15 + 1) * caixa;
    }

    //Incluí nova posição no inicio do array da cobrinha
    cobrinha.unshift({
        eixoX: posicaoEixoX,
        eixoY: posicaoEixoY
    });
}

//Função para fazer os movimentos da cobrinha
var movimentar = setInterval(movimentarCobrinha, 500);

//Função para resetar o ranking
function resetarRanking(){
    //Referência a tabela do ranking
    let tab = document.getElementById("tabela-ranking");
    
    //Exclui as linhas enquanto houver linhas além do cabeçalho
    while(tab.rows.length>1){
        tab.deleteRow(tab.rows.length-1);
    }
}

//Função para atualizar a tabela do ranking
function atualizarRanking(){
    //Referência a tabela do ranking
    let tab = document.getElementById("tabela-ranking");

    //Reseta o ranking
    resetarRanking();

    //Itera no array com o ranking
    for(const rank of ranking){
        console.log(rank.pontos, rank.velocidade, rank.borda);
        var novaLinha = tab.insertRow(tab.rows.length);
        
        var celulaPosicao = novaLinha.insertCell(0);
        celulaPosicao.innerHTML = tab.rows.length-1 + "°";

        var celulaPontos = novaLinha.insertCell(1);
        celulaPontos.innerHTML = rank.pontos;

        var celulaVelocidade = novaLinha.insertCell(2);
        celulaVelocidade.innerHTML = rank.velocidade;

        var celulaBorda = novaLinha.insertCell(3);
        celulaBorda.innerHTML = (rank.borda) ? "Ativada" : "Desativada";
    }
}