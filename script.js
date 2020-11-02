const gameInit = (() => {
    const boardSize = 3;
    const createBoard = () => {
        const gameBoardContainer = document.getElementById('board');
        for (let i = 1; i <= boardSize * boardSize; i++) {
            const square = document.createElement('div');
            square.id = `${i}`;
            square.className = 'square';
            square.setAttribute("onclick", `gameBoard.playMove(this.id)`);
            gameBoardContainer.append(square);
        }
    };
    return {
        createBoard
    }
})();

const gameBoard = (() => {

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

        winMoves.forEach((winLine) => {
            const winMove = (winLine.filter(item => winLine.includes(item) && squares.includes(item)));
            if (winMove.length === 3) {
                console.log('win: ' + winLine);
                const winner = document.getElementById('winner');
                winner.append(`winner is: ${nextMove}`);
            }
        });
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
        return {
            nextMove
        }
    };
    return {
        playMove,
        selected
    }
})();

gameInit.createBoard();