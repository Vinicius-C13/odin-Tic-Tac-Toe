let turn = '';
let xturn = true;

const board = (()=> {  //Primeiro: Preciso fazer isso aqui voltar a funcionar
    const places = Array.from(document.querySelectorAll('.place'));

    places.forEach((item)=>{
        item.addEventListener('click', ()=> controlTurn.changeTurn(item), {once: true});
    });

    return {places}
})();

/*Segundo: Acho interessante ter outra função que controla o flow do jogo para alternar entre os jogadores,
essa pode ser um module - eu acho.*/ 
//PS: Esse não podia ser um module porque ativava a função play() antes do esperado.

const controlTurn = (()=>{

    const changeTurn = (playLoc)=> {
        if(xturn === true) {
        xPlayer.play(playLoc);
        xturn = false;
    }else{
        oPlayer.play(playLoc);
        xturn = true;
    }};
    return {changeTurn}
})();

/*Acho interessante ter uma factory function "player" que vai definir o valor da jogada do jogador e vai
adicionar todas as habilidades necessárias a ele*/

const Player = (name, symbol)=>{
    const play = (item)=> {
        item.textContent = symbol;
    };
    return{name, play}
};

const xPlayer = Player('player 1', 'x');
const oPlayer = Player('player 2', 'o');



/*Como eu acho que deve funcionar: A função do tabuleiro tem o eventListener, então, tudo começa por ela.

Ao ouvir um clique, essa função vai chamar a função de controle de flow passando o e.target como parametro.

Então, a função controle de flow vai decidir que quem é a vez e vai acionar o devido o jogador, ou seja,
ela vai chamar o objeto do jogador criado a partir da factory function e vai executar algum método
que vai fazer a jogada com o valor certo ("x" ou "o").

Terceiro:
Dúvidas: 
  - Ainda tenho algumas dúvidas sobre como encaixar a função que impede que um jogador jogue no mesmo 
    lugar de novo (acho que deve ir na função responsável pelo tabuleiro, que tem o eventlistener)]

  - Também tenho dúvidas sobre como declarar o campeão.
    Essa aqui eu vou esperar terminar o que eu tenho planejado pra depois pensar sobre.
*/