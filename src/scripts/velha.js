let board = [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""]
];
let currentPlayer = "X";
let gameOver = false;

const squares = document.querySelectorAll('.quadrado');
squares.forEach(square => {
    square.addEventListener('click', () => {
        const row = square.dataset.row;
        const col = square.dataset.col;
        playMove(row, col, square);
    });
});

function playMove(row, col, square) {
    if (board[row][col] === "" && !gameOver) {
        board[row][col] = currentPlayer;
        square.textContent = currentPlayer;
        square.style.color = currentPlayer === "X" ? "#D1347B" : "#093573";
        checkWinner();
        currentPlayer = currentPlayer === "X" ? "O" : "X";
    }
}

function checkWinner() {
    // Verificação de linhas e colunas
    for (let i = 0; i < 3; i++) {
        if (board[i][0] === board[i][1] && board[i][1] === board[i][2] && board[i][0] !== "") {
            highlightWinner(i, 0, i, 1, i, 2);
            return setGameOver(board[i][0]);
        }
        if (board[0][i] === board[1][i] && board[1][i] === board[2][i] && board[0][i] !== "") {
            highlightWinner(0, i, 1, i, 2, i);
            return setGameOver(board[0][i]);
        }
    }

    // Verificação de diagonais
    if (board[0][0] === board[1][1] && board[1][1] === board[2][2] && board[0][0] !== "") {
        highlightWinner(0, 0, 1, 1, 2, 2);
        return setGameOver(board[0][0]);
    }

    if (board[0][2] === board[1][1] && board[1][1] === board[2][0] && board[0][2] !== "") {
        highlightWinner(0, 2, 1, 1, 2, 0);
        return setGameOver(board[0][2]);
    }

    // Verificação de empate
    if (!board.flat().includes("")) {
        setGameOver("Empate");
    }
}

function highlightWinner(row1, col1, row2, col2, row3, col3) {
    const index1 = row1 * 3 + col1;
    const index2 = row2 * 3 + col2;
    const index3 = row3 * 3 + col3;

    squares[index1].classList.add('vitoria');
    squares[index2].classList.add('vitoria');
    squares[index3].classList.add('vitoria');
}

function setGameOver(winner) {
    gameOver = true;
    const winnerText = document.querySelector('.vencedor');
    if (winner === "Empate") {
        winnerText.textContent = "Empate!";
    } else {
        winnerText.textContent = "Vencedor: " + winner;
    }
}

function restartGame() {
    board = [
        ["", "", ""],
        ["", "", ""],
        ["", "", ""]
    ];
    currentPlayer = "X";
    gameOver = false;
    squares.forEach(square => {
        square.textContent = "";
        square.style.color = "rgba(0, 0, 0, 0)"; // reset da cor
        square.classList.remove('vitoria');
    });
    document.querySelector('.vencedor').textContent = "Vencedor: -";
}
