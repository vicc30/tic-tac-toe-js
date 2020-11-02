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
    const selected = (select) => {
        selection = select;
    };
    const xMoves = [];
    const oMoves = [];
    const playMove = (square) => {
        let nextMove = '';
        //If no selection starts with X
        selection === '' ? nextMove = 'X' : nextMove = selection;

        if (!document.getElementById(`${square}-moved`)) {
            const ubication = document.getElementById(square);
            const play = document.createElement('p');
            play.id = `${square}-moved`;
            ubication.append(play);
            const text = document.createTextNode(nextMove);
            play.appendChild(text);

            if(nextMove==='X'){
                xMoves.push(square);
                selection='O';
            } else {
                oMoves.push(square);
                selection='X';
            }
            console.log('O moves:' + oMoves);
            console.log('X moves:'+xMoves);
        } else {
            alert('Select other move');
        }
    };
    return {
        playMove,
        selected
    }
})();

gameInit.createBoard();