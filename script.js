//Cache
let xTurn = true;
let currentClass = 'x-class';

//Factory Function
const Player = (name, symbolClass)=>{
    const play = (cell)=> {
        cell.classList.add(symbolClass);
    };
    const celebration = ()=> {return `${name} wins!`}
    
    return{play, celebration}
};
const xPlayer = Player('X', 'x-class');
const oPlayer = Player('O', 'o-class');



//Module to control the board
const board = (()=> { 
    const boardCells = Array.from(document.querySelectorAll('.cell'));
    
    //All winning combinations
    const winningCombinations = [
        [0, 1, 2],
        [0, 3, 6],
        [0, 4, 8],
        [1, 4, 7],
        [2, 4, 6],
        [2, 5, 8],
        [3, 4, 5],
        [6, 7, 8]
    ];

    boardCells.forEach((cell)=>{
    cell.addEventListener('click', ()=>handleClick.makeMove(cell), {once: true});
    });

    return {boardCells, winningCombinations}
})();


//Module that store all main functions
const handleClick = (()=>{
    
    //Execute the play
    const makeMove = (cell)=>{
        if(xTurn){xPlayer.play(cell)}
        else{oPlayer.play(cell)}

        if(checkWin(currentClass)){
            endGame('win')
        } else if (checkDraw()){
            endGame('draw')
        } else {
            changeTurns()
        };
        console.log(`${xTurn? "Bola":"Xiss"}`)
    };

    //Check if someone win
    const checkWin = (currentClass)=>{
        return board.winningCombinations.some(combination => {
            return combination.every(index => {
                return board.boardCells[index].classList.contains(currentClass)
            })
        })
    }

    //Check if draw
    const checkDraw = ()=>{
        return [...board.boardCells].every(cell => {
            return cell.classList.contains('x-class') || cell.classList.contains('o-class');
        })
    }

    //Change the Turns
    const changeTurns = () => { 
        xTurn = !xTurn;
        if(xTurn){
            currentClass = 'x-class';
        }
        else {
            currentClass = 'o-class';
        }
        controlUI.igniteClassChange();
    };

    //Finish the game
    const endGame = (result)=>{
        if(result == 'win') {
            controlUI.showEndScreen(`${xTurn ? xPlayer.celebration() : oPlayer.celebration()}`);
        } else {
            controlUI.showEndScreen("It's Draw");
        }
    }

    //Public function return
    return {makeMove, currentClass}
})();

const controlUI = (() =>{
    const changeClass = ()=>{
        const board = document.querySelector('#board');

        if(xTurn){
            board.classList.remove('o');
            board.classList.add('x');
        } else {
            board.classList.remove('x');
            board.classList.add('o');
        }
    };

    const showEndScreen = (message)=>{
        document.querySelector('.end-screen').style.display = 'flex';
        document.querySelector('#result-message').textContent = `${message}`;
    };

    const igniteClassChange = ()=> changeClass();

    return {igniteClassChange, showEndScreen};
})();

controlUI.igniteClassChange();