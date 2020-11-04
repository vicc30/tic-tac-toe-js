const gameBoard = (() => {
    const boardSize = 3;

    const onLoad = () => {
        $(window).on('load', function () {
            $('#newGameModal').modal('show');
        });
        //prevent dismiss when click outside
        $('#newGameModal').modal({
            backdrop: 'static',
            keyboard: false
        })
    };

    const newGame = () => {
        //If there is a name already removes it before put a new one
        const playersRemove = document.getElementById('players')
        while (playersRemove.firstChild) {
            playersRemove.removeChild(playersRemove.lastChild);
        }


        playerX = document.getElementById("myForm").elements[0].value;
        playerO = document.getElementById("myForm").elements[1].value;

        console.log(playerX + " " + playerO);
        $('#newGameModal').modal('hide');
        const players = document.getElementById('players');
        //Append Player X name
        const playX = document.createElement('p');
        playX.id = `${playerX}`;
        playX.className = 'player'
        var textX = document.createTextNode(`Move X: ${playerX}`);
        playX.appendChild(textX);
        players.append(playX);
        //Append Player O Name
        const playO = document.createElement('p');
        playO.id = `${playerO}`;
        playO.className = 'player'
        var textX = document.createTextNode(`Move O: ${playerO}`);
        playO.appendChild(textX);
        players.append(playO);

        createBoard();
    };

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
        newGame,
        createBoard,
        gameOver,
        onLoad
    };
})();

const gamePlay = (() => {

    let selection = '';
    let nextMove = '';

    const selected = (select) => {
        reset();
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

        let winDigits = [];
        //where is going to add winner or draw line in HTML body
        const winnerP = document.getElementById('winner');

        winMoves.forEach((winLine) => {
            const winMove = (winLine.filter(item => winLine.includes(item) && squares.includes(item)));
            //continue if a win line matches
            if (winMove.length === 3) {
                console.log('win: ' + winLine);
                winDigits = winLine;
                var node = document.createElement("h3");
                node.id = "win";
                //conditional to get winner and name
                if (nextMove === 'X') {
                    var playerX = document.getElementById("myForm").elements[0].value;
                    var text = document.createTextNode(`Congrats \ ${playerX} \  Wins!`);
                } else {
                    var playerO = document.getElementById("myForm").elements[1].value;
                    var text = document.createTextNode(`Congrats \ ${playerO} \ Wins!`);
                }
                node.appendChild(text);
                winnerP.appendChild(node);
                gameBoard.gameOver();

                //if none matches and player moves are equal to 5 shows draw
            } else if (squares.length === 5 && winDigits != 3 && !document.getElementById("win")) {
                var node = document.createElement("h3");
                node.id = "win";
                var text = document.createTextNode("It is a Draw!");
                node.appendChild(text);
                winnerP.appendChild(node);
                gameBoard.gameOver();
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
    };

    const reset = () => {
        const gameBoardContainer = document.getElementById('board');
        while (gameBoardContainer.firstChild) {
            gameBoardContainer.removeChild(gameBoardContainer.lastChild);
        }
        const winner = document.getElementById('winner');
        if (winner) winner.innerText = '';
        selection = '';
        nextMove = '';
        selection = '';
        moves.xMoves = [];
        moves.oMoves = [];
        gameBoard.createBoard();
    };

    return {
        playMove,
        reset,
        selected
    };
})();

gameBoard.onLoad();
