let gameBoard = (function() {
    const board = [];
    for (let i = 0; i < 9; i++) {
        board[i] = null;
    }
    const renderBoard = function() {
        for (let i = 0; i < 9; i++) {
            let gridCell = document.querySelector(`[data-position="${i}"]`);
            if (board[i] !== null) {
                gridCell.textContent = board[i];
            }
            else {
                gridCell.textContent = "";
            }
        }
    }
    const resetBoard = function() {
        for (let i = 0; i < 9; i++) {
            board[i] = null;
            renderBoard();
            gameStatus.cellsFilled = 0;
        }
    }
    return { board, renderBoard, resetBoard };
})();

const Player = function(name, symbol) {
    return { name, symbol };
}

let gameStatus =  {
    playerturn: "player1",
    p1Score: 0,
    tieScore: 0,
    p2Score: 0,
    cellsFilled: 0,
}

function renderPage(type) {
    const home = document.querySelector(".home-container");
    const game = document.querySelector(".game-container");
    const resultsContainer = document.querySelector(".results-container");
    const results = document.querySelector(".results-banner");
    const scores = document.querySelector(".scores");
    if (type === "game") {
        home.style.display = "none";
        game.style.display = "flex";
        gameBoard.resetBoard();
        renderNames();
        renderScores();
        scores.style.display = "flex";
        resultsContainer.style.display = "none";
        results.textContent = "";
    }
    else {
        home.style.display = "block";
        game.style.display = "none";
    }
}

function renderNames() {
    const { player1, player2 } = getPlayers();
    const player1Name = document.querySelector(".player-name");
    const player2Name = document.querySelector(".player2-name");
    player1Name.textContent = player1.name;
    player2Name.textContent = player2.name;
}

function renderScores() {
    const player1Score = document.querySelector(".player-score");
    const tieScore = document.querySelector(".tie-score");
    const player2Score = document.querySelector(".player2-score");
    player1Score.textContent = gameStatus.p1Score;
    tieScore.textContent = gameStatus.tieScore;
    player2Score.textContent = gameStatus.p2Score;
}

let activateButton = function() {
    let p1 = document.querySelector(".one-player");
    let p2 = document.querySelector(".two-player");
    let player2Input = document.querySelector(".player-2-input");

    // If p1 is already active, switch to p2
    if (p1.classList.contains("active")) {
        p1.classList.remove("active");
        p2.classList.add("active");
        player2Input.classList.remove("inactive");
    }
    else {
        p2.classList.remove("active");
        p1.classList.add("active");
        player2Input.classList.add("inactive");
    }
};

const getPlayers = function() {
    let p1Name = document.querySelector("input[name=p1]").value;
    let p2Name = document.querySelector("input[name=p2]").value;
    if (p1Name === "") {
        p1Name = "Player1";
    }
    if (p2Name === "") {
        p2Name = "Player2";
    }
    let player1 = Player(p1Name, "X");
    let player2 = Player(p2Name, "O");
    return { player1, player2 };
}

const renderTurn = function() {
    let player1 = document.querySelector(".player-container");
    let player2 = document.querySelector(".player2-container");
    if (gameStatus.playerturn === "player1") {
        player2.classList.remove("turn");
        player1.classList.add("turn");
    }
    else {
        player1.classList.remove("turn");
        player2.classList.add("turn");
    }
}

const checkGameOver = function() {
    const { board } = gameBoard;
    const { player1, player2 } = getPlayers();

    let checkWin = horizontalWin() || verticalWin() || diagonalWin();
    let checkDraw = draw();
    if (checkWin || checkDraw) {
        endGame();
    }

    function horizontalWin() {
        if (board[0] !== null && board[0] === board[1] && board[0] === board[2]) {
            return (player1.symbol === board[0]) ? (renderWin(player1.name), gameStatus.p1Score++) : (renderWin(player2.name), gameStatus.p2Score++);
        }
        else if (board[3] !== null && board[3] === board[4] && board[3] === board[5]) {
            return (player1.symbol === board[3]) ? (renderWin(player1.name), gameStatus.p1Score++) : (renderWin(player2.name), gameStatus.p2Score++);
        }
        else if (board[6] !== null && board[6] === board[7] && board[6] === board[8]) {
            return (player1.symbol === board[6]) ? (renderWin(player1.name), gameStatus.p1Score++) : (renderWin(player2.name), gameStatus.p2Score++);
        }
        return false;
    }
    function verticalWin() {
        if (board[0] !== null && board[0] === board[3] && board[0] === board[6]) {
            return (player1.symbol === board[0]) ? (renderWin(player1.name), gameStatus.p1Score++) : (renderWin(player2.name), gameStatus.p2Score++);
        }
        else if (board[1] !== null && board[1] === board[4] && board[1] === board[7]) {
            return (player1.symbol === board[1]) ? (renderWin(player1.name), gameStatus.p1Score++) : (renderWin(player2.name), gameStatus.p2Score++);
        }
        else if (board[2] !== null && board[2] === board[5] && board[2] === board[8]) {
            return (player1.symbol === board[2]) ? (renderWin(player1.name), gameStatus.p1Score++) : (renderWin(player2.name), gameStatus.p2Score++);
        }
        return false;
    }
    function diagonalWin() {
        if (board[0] !== null && board[0] === board[4] && board[0] === board[8]) {
            return (player1.symbol === board[0]) ? (renderWin(player1.name), gameStatus.p1Score++) : (renderWin(player2.name), gameStatus.p2Score++);
        }
        else if (board[2] !== null && board[2] === board[4] && board[2] === board[6]) {
            return (player1.symbol === board[2]) ? (renderWin(player1.name), gameStatus.p1Score++) : (renderWin(player2.name), gameStatus.p2Score++);
        }
        return false;
    }

    function draw() {
        if (gameStatus.cellsFilled === 9 && checkWin === false) {
            gameStatus.tieScore++;
            return renderDraw();
        }
        return false;
    }
}

function renderWin(name) {
    const resultsContainer = document.querySelector(".results-container");
    const results = document.querySelector(".results-banner");
    const scores = document.querySelector(".scores");
    scores.style.display = "none";
    resultsContainer.style.display = "flex";
    results.textContent = `${name} wins!`;
}

function renderDraw() {
    const resultsContainer = document.querySelector(".results-container");
    const results = document.querySelector(".results-banner");
    const scores = document.querySelector(".scores");
    scores.style.display = "none";
    resultsContainer.style.display = "flex";
    results.textContent = `It's a draw!`;
}

const mainGame = (function() {
    activateButton();
    renderTurn();
    let onePlayerBtn = document.querySelector(".one-player");
    onePlayerBtn.addEventListener("click", activateButton);
    
    let twoPlayerBtn = document.querySelector(".two-player");
    twoPlayerBtn.addEventListener("click", activateButton);

    let playBtn = document.querySelector(".play");
    playBtn.addEventListener("click", function() {
        getPlayers();
        renderPage("game");
    });
    
    let homeBtn = document.querySelector(".home-button");
    homeBtn.addEventListener("click", function() {
        renderPage("home");
    });

    let newGameBtn = document.querySelector(".newgame-button");
    newGameBtn.addEventListener("click", function() {
        startGame();
        renderPage("game");
    });

    let gridCells = document.querySelectorAll(".grid-cell");
    gridCells.forEach(cell => {
    cell.addEventListener("click", placeMove);
})
})();

function placeMove(e) {
    const { board } = gameBoard;
    const { player1, player2 } = getPlayers();
        if (board[e.target.getAttribute("data-position")] !== "X" && board[e.target.getAttribute("data-position")] !== "O") {
            if (gameStatus.playerturn === "player1") {
                board[e.target.getAttribute("data-position")] = player1.symbol;
                gameStatus.playerturn = "player2";
            }
            else {
                board[e.target.getAttribute("data-position")] = player2.symbol;
                gameStatus.playerturn = "player1";
            }
            gameStatus.cellsFilled++;
        }
        checkGameOver();
        gameBoard.renderBoard();
        renderTurn();
};


function endGame() {
    gameStatus.cellsFilled = 0;
    let gridCells = document.querySelectorAll(".grid-cell");
    gridCells.forEach(cell => {
    cell.removeEventListener("click", placeMove);
});
}

function startGame() {
        let gridCells = document.querySelectorAll(".grid-cell");
        gridCells.forEach(cell => {
        cell.addEventListener("click", placeMove);
    });
}



