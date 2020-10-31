const gameInit = (() => {
    const boardSize = 3;
    const selection = 'X';
    const createBoard = () => {
        const gameBoardContainer = document.getElementById('board');
        for (let i = 1; i <= boardSize * boardSize; i++) {
            const square = document.createElement('div');
            square.id = `square-${i}`;
            square.className = 'square';
            square.setAttribute("onclick", `gameInit.playMove(this.id)`);
            gameBoardContainer.append(square);
        }
    };

    const playMove = (square) => {
        if (!document.getElementById(`${square}-moved`)) {
            const ubication = document.getElementById(square);
            const play = document.createElement('p');
            play.id = `${square}-moved`;
            ubication.append(play);
            const text = document.createTextNode(selection);
            play.appendChild(text);
        } else {
            alert('Select other move');
        }
    };
    return {
        createBoard,
        playMove
    }
})();

gameInit.createBoard();