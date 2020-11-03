const gameBoard = (() => {
    const boardSize = 3;

    const createBoard = () => {
        const gameBoardContainer = document.getElementById('board');
        for (let i = 1; i <= boardSize * boardSize; i++) {
            const square = document.createElement('div');
            square.id = `${i}`;
            square.className = 'square';
            square.setAttribute("onclick", `gamePlay.playMove(this.id)`);
            gameBoardContainer.append(square);
        }
    };

    const gameOver = () => {
        for (let i = 1; i <= boardSize * boardSize; i++) {
            const square = document.getElementById(i);
            square.removeAttribute("onclick", `gamePlay.playMove(this.id)`);
        }
    };

    return {
        createBoard,
        gameOver
    };
})();

const gamePlay = (() => {

    let selection = '';
    let nextMove = '';

    const selected = (select) => {
        selection = select;
    };

    const moves = {
        xMoves: [],
        oMoves: []
    };

    const calculateWinner = (squares) => {
        const winMoves = [
            ["1", "2", "3"],
            ["4", "5", "6"],
            ["7", "8", "9"],
            ["1", "4", "7"],
            ["2", "5", "8"],
            ["3", "6", "9"],
            ["1", "5", "9"],
            ["3", "5", "7"]
        ];
        //where is going to add winner or draw line in HTML body
        const winnerP = document.getElementById('winner');

        if (squares.length === 5) {
            winnerP.append("It is a draw");
            gameBoard.gameOver();
        } else {
            winMoves.forEach((winLine) => {
                const winMove = (winLine.filter(item => winLine.includes(item) && squares.includes(item)));
                if (winMove.length === 3) {
                    console.log('win: ' + winLine);
                    winnerP.append(`winner is: ${nextMove}`);
                    gameBoard.gameOver();
                }
            });
        }
    }

    const playMove = (square) => {
        //If no selection starts with X
        selection === '' ? nextMove = 'X' : nextMove = selection;

        if (!document.getElementById(`${square}-moved`)) {
            const ubication = document.getElementById(square);
            const play = document.createElement('p');
            play.id = `${square}-moved`;
            ubication.append(play);
            const text = document.createTextNode(nextMove);
            play.appendChild(text);

            if (nextMove === 'X') {
                moves.xMoves.push(square);
                calculateWinner(moves.xMoves);
                selection = 'O';
            } else {
                moves.oMoves.push(square);
                calculateWinner(moves.oMoves);
                selection = 'X';
            }
        } else {
            alert('Space is taken, select other move!');
        }
    };

    const reset = () => {
        const gameBoardContainer = document.getElementById('board');
        while (gameBoardContainer.firstChild) {
            gameBoardContainer.removeChild(gameBoardContainer.lastChild);
        }
        gameBoard.createBoard();
        selection = '';
        nextMove = '';
        selection = '';
        moves.xMoves = [];
        moves.oMoves = [];
    };

    return {
        playMove,
        reset
    };
})();

gameBoard.createBoard();