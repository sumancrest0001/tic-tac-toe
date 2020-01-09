let gameBoard = (function() {
    const board = [];
    for (let i = 0; i < 9; i++) {
        board[i] = null;
    }

    const getBoard = () => board;

    const renderBoard = function() {
        for (let i = 0; i < 9; i++) {
            if (board[i] !== null) {
                let gridCell = document.getElementById(`grid${i}`);
                gridCell.textContent = board[i];
            }
        }
    }

    const resetBoard = function() {
        for (let i = 0; i < 9; i++) {
            board[i] = null;
        }
    }
    return { getBoard, renderBoard, resetBoard };
})();


const Player = function(name, symbol) {
    return { name, symbol };
}

const numberOfPlayers = (function() {
    let onePlayerBtn = document.querySelector(".one-player");
    let players;
    if (onePlayerBtn.classList.contains("active")) {
        players = 1;
    }
    else {
        players = 2;
    }
    return { players };
})();


const renderGamePage = function() {
    let home = document.querySelector(".home-container");
    home.style.display = "none";
    let game = document.querySelector(".game-container");
    game.style.display = "flex";

    let gridCells = document.querySelectorAll(".grid-cell");
    gridCells.forEach(cell => {
    cell.addEventListener("click", updateBoard);
})
}

const renderHomePage = function() {
    let home = document.querySelector(".home-container");
    home.style.display = "block";
    let game = document.querySelector(".game-container");
    game.style.display = "none";

    let gridCells = document.querySelectorAll(".grid-cell");
    gridCells.forEach(cell => {
    cell.removeEventListener("click", updateBoard);
})
}


let toggleActive = function() {
    let p1 = document.querySelector(".one-player");
    let p2 = document.querySelector(".two-player");
    let player2Input = document.querySelector(".player-2-input");

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

const mainGame = (function() {
    toggleActive();
    let onePlayerBtn = document.querySelector(".one-player");
    onePlayerBtn.addEventListener("click", toggleActive);
    
    let twoPlayerBtn = document.querySelector(".two-player");
    twoPlayerBtn.addEventListener("click", toggleActive);

    let playBtn = document.querySelector(".play");
    playBtn.addEventListener("click", function() {
        getPlayers();
        renderGamePage();
    });
    
    let homeBtn = document.querySelector(".home-button");
    homeBtn.addEventListener("click", renderHomePage);



})();

const getPlayers = function() {
    let p1Name = document.querySelector("input[name=p1]").value;
    let p2Name = document.querySelector("input[name=p2]").value;
    if (p1Name === "") {
        p1Name = "player1";
    }
    if (p2Name === "") {
        p2Name = "player2";
    }
    let player1 = Player(p1Name, "X");
    let player2 = Player(p2Name, "O");
    return { player1, player2 };
}



