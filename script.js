const gameInit = (() => {
    const boardSize = 3;
    const createBoard = () => {
        const gameBoardContainer = document.getElementById('board');
        for (let i = 1; i <= boardSize*boardSize; i++) {
            const square = document.createElement('div');
            square.id = `square-${i}`;
            square.className = 'square';
            gameBoardContainer.append(square);
        }
    }
    return {
        createBoard
    }
})();

gameInit.createBoard();