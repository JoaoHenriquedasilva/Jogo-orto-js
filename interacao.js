// azuis == 1
// verdes == 2
// brancas == 0

function tratarClick(click){
    let elementoclick = click.target;
    let linha = parseInt(click.target.dataset.linha);
    let coluna = parseInt(click.target.dataset.coluna);

    if(elementoclick.classList.contains('destaque')){
        console.log('Você quer mover para cá!');

        let pecaAntiga = document.querySelector('[data-linha="' + pecaSelecionada.linha + '"][data-coluna="' + pecaSelecionada.coluna + '"]');

        matriz[linha][coluna] = jogadorAtual;
        matriz[pecaSelecionada.linha][pecaSelecionada.coluna] = 0;

        if(jogadorAtual == 1){
            elementoclick.classList.remove('branco', 'destaque');
            elementoclick.classList.add('azul');
            pecaAntiga.classList.remove('azul');
            pecaAntiga.classList.add('branco');
        }else{
            elementoclick.classList.remove('branco', 'destaque');
            elementoclick.classList.add('verde');
            pecaAntiga.classList.remove('verde');
            pecaAntiga.classList.add('branco');
        }


        vitoria();
        pecaSelecionada = null;
        jogadorAtual = (jogadorAtual == 1) ? 2 : 1;
        document.getElementById('mensagem').innerText = "Vez do Jogador " + (jogadorAtual == 1 ? "Azul" : "Verde");

        document.querySelectorAll('.destaque').forEach(p => p.classList.remove('destaque'));

        return;
    }



    if(matriz[linha][coluna] != jogadorAtual){
        let aviso = document.getElementById('mensagem');
        aviso.innerText = "ERRO! está peça não é a sua, escolha uma peça valida";
    }else{
        pecaSelecionada = {linha,coluna};
        document.querySelectorAll('.destaque').forEach(peca => peca.classList.remove('destaque'));
        for(let a = 0; a < matriz.length;a++){
            for(let b = 0; b < matriz[a].length;b++){
                if(matriz[a][b] == 0 && (a == linha || b == coluna)){
                    let resposta = document.querySelector('[data-linha="' + a + '"][data-coluna="' + b + '"]')

                    resposta.classList.add('destaque');
                }
            
            }


        }

    }

}

function vitoria(){
    for(let v = 0; v < matriz.length;v++){
        for(let s = 0; s < 2;s++){
            if (matriz[v][s] !== 0 && matriz[v][s] === matriz[v][s+1] && matriz[v][s] === matriz[v][s+2]) {

                alert("O Jogador " + (matriz[v][s] == 1 ? "Azul" : "Verde") + " GANHOU!");
                location.reload(); // Reinicia o jogo
                return;
            }
        }
    }

    for (let s = 0; s < 4; s++) {
        for (let v = 0; v < 2; v++) {
            if (matriz[v][s] !== 0 && 
                matriz[v][s] === matriz[v+1][s] && 
                matriz[v][s] === matriz[v+2][s]) {
                
                alert("O Jogador " + (matriz[v][s] == 1 ? "Azul" : "Verde") + " GANHOU!");
                location.reload();
                return;
            }
        }
    }
}


let matriz = [
    [0,0,0,0],
    [0,0,0,0],
    [0,0,0,0],
    [0,0,0,0]
];

let jogadorAtual = 1;
let pecaSelecionada = null;
let tamanho = matriz.length; 

const elementotabuleiro = document.getElementById('tabuleiro');

for(let i = 0; i < matriz.length;i++){

    for(let k = 0; k < matriz[i].length;k++){
        if(i > 0 && i < tamanho - 1 && k > 0 && k < tamanho - 1 ){
            matriz[i][k] = 0;
        }
        else{
            if((i + k) % 2 == 0){
                matriz[i][k] = 2;
            }
            else{
                matriz[i][k] = 1;
            }
        }
        let peca = document.createElement('div');

        if(matriz[i][k] == 0){
            peca.classList.add('branco');
            peca.classList.add('quadrado');
            peca.dataset.linha = i;
            peca.dataset.coluna = k;
        }
        if(matriz[i][k] == 1){
            peca.classList.add('azul');
            peca.classList.add('quadrado');
            peca.dataset.linha = i;
            peca.dataset.coluna = k;
        }
        if(matriz[i][k] == 2 ){
            peca.classList.add('verde');
            peca.classList.add('quadrado');
            peca.dataset.linha = i;
            peca.dataset.coluna = k;
        }
        peca.addEventListener('click',tratarClick);


        elementotabuleiro.appendChild(peca);
    }
}






