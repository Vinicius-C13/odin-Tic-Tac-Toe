"use strict";

const Player = (signClass) => {

    const getSign = () => {
        return signClass;
    }

    return {getSign};
};


//Controls game board
const gameBoard = (() => {
    const board = [{}, {}, {}, {}, {}, {}, {}, {}, {}];

    const setField = (index, sign) => {
        if(index>board.length) return;
        board[index].name = sign;
    };

    const getField = (index, sign) => {
        if(index>board.length) return;
        return board[index];
    };

    const reset = () => {
        for(let i=0; i < board.length; i++) {
            delete board[i].name;
        }
    };

    return { setField, getField, reset}
})();

//Controls UI
const displayController = (() => {
    const cellElements = document.querySelectorAll('.cell');
    const classNames = ['x-class', 'o-class'];
    const endScreen = document.querySelector('#end-screen');
    const resultMessage = document.querySelector('#result-message');
    const resetButton = document.querySelector('#reset-button');

    cellElements.forEach((cell) => 
        cell.addEventListener('click', (e) => {
            if(gameController.getIsOver() || 
               classNames.some(className => e.target.classList.contains(className))
              ) return;
            gameController.playRound(parseInt(e.target.dataset.index));
            updateGameBoard();
            console.log('foi'); //Retirar
        })
    );

    resetButton.addEventListener('click', e => {
        gameBoard.reset();
        gameController.reset();
        reset();
    });

    const updateGameBoard = () => {
        for(let i = 0; i < cellElements.length; i++){
            cellElements[i].classList.add(gameBoard.getField(i).name);
        };
    };

    const reset = () => {
        for(let i = 0; i < cellElements.length; i++){
            cellElements[i].classList.remove('x-class', 'o-class');
        };
    };

    const setResultMessage = (result)=>{
        if(result === "draw") {
            setMessageElement("It's a draw!");
            console.log("It's a draw!");
        } else {
            setMessageElement(`Player ${result} has won!`);
            console.log(`Player ${result} has Won!`);
        }
    }

    const setMessageElement = (message) => {
        resultMessage.textContent = message;
    };

    const showEndScreen = (show) => {
        if(show) {
            endScreen.style.display = 'flex';
        } else {endScreen.style.display = 'none';}
    };

    return { setResultMessage, showEndScreen}
})();

//Constrols game flow
const gameController = (() => {
    const PlayerX = Player("x-class");
    const PlayerO = Player("o-class");
    let round = 1;
    let isOver = false;

    const playRound = (fieldIndex) => {
        gameBoard.setField(fieldIndex, getCurrentPlayerSign());
        if (checkWinner(fieldIndex)) {
            displayController.setResultMessage(getCurrentPlayerSign() === 'x-class' ? 'X':'O');
            displayController.showEndScreen(true);
            isOver = true;
            return;
        }
        if (round === 9) {
            displayController.setResultMessage("draw");
            displayController.showEndScreen(true);
            isOver = true;
            return;
        }
        round++;
    };

    const getCurrentPlayerSign = () => {
        return round % 2 === 1 ? PlayerX.getSign() : PlayerO.getSign();
    }

    const checkWinner = (fieldIndex) => {
        const winConditions = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6]
        ];

        return winConditions.filter((combination) => combination.includes(fieldIndex))
        .some((possibleCombination) =>
          possibleCombination.every(
            (index) => gameBoard.getField(index).name === getCurrentPlayerSign()
          )
        );
    }

    const getIsOver = () => {
        return isOver;
    };

    const reset = () => {
        round = 1;
        isOver = false;
        displayController.showEndScreen(false)
    };

    return { playRound, getIsOver, reset }
})();