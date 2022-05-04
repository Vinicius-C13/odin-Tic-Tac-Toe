"use strict";

const Player = (sign) => {

    const getSign = () => {
        return sign;
    }

    return {getSign};
};

const gameBoard = (() => {
    const board = ["", "", "", "", "", "", "", "", ""];

    const setField = (index, sign) => {
        if(index>board.length) return;
        board[index] = sign;
    };

    const getField = (index, sign) => {
        if(index>board.length) return;
        return board[index];;
    };

    const reset = () => {
        for(let i=0; i < board.length; i++) {
            board[i] = "";
        }
    };

    return { setField, getField, reset}
})();

const displayController = (() => {
    const cellElements = document.querySelectorAll('.cell');
    const resultMessage = document.querySelector('#result-message');
    const resetButton = document.querySelector('#reset-button');

    cellElements.forEach((cell) => 
        cell.addEventListener('click', (e) => {
            if(gameController.getIsOver() || e.target.textContent !== "") return;
            gameController.playRound(parseInt(e.target.dataset.index));
            updateGameBoard();
            console.log('foi');
        })
    );

    resetButton.addEventListener('click', e => {
        gameBoard.reset();
        gameController.reset();
        updateGameBoard();
    });

    const updateGameBoard = () => {
        for(let i = 0; i < cellElements.length; i++){
            cellElements[i].textContent = gameBoard.getField(i);
        }
    } 

    const setResultMessage = (result)=>{
        if(result === "draw") {
            setMessageElement("It's a draw!")
        } else {
            setMessageElement(`Player ${result} has won!`)
        }
    }

    const setMessageElement = (message) => {
        resultMessage.textContent = message;
    };

    return { setResultMessage}
})();

const gameController = (() => {
    const PlayerX = Player("X");
    const PlayerO = Player("O");
    let round = 1;
    let isOver = false;

    const playRound = (fieldIndex) => {
        gameBoard.setField(fieldIndex, getCurrentPlayerSign());
        if (checkWinner(fieldIndex)) {
            displayController.setResultMessage(getCurrentPlayerSign());
            console.log(`Player ${getCurrentPlayerSign()} wins!`);
            isOver = true;
            return;
        }
        if (round === 9) {
            displayController.setResultMessage("draw");
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
            (index) => gameBoard.getField(index) === getCurrentPlayerSign()
          )
        );
    }

    const getIsOver = () => {
        return isOver;
    };

    const reset = () => {
        round = 1;
        isOver = false;
    };

    return { playRound, getIsOver, reset }
})();