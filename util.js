let board = [];
let boardSize = 4;
const players = ['*','#'];
let occupiedPlaces = [];
let totalTurns = boardSize*boardSize;
let isPlayerWin = false;
let maxNum = totalTurns - 1;
function createBoard(){
    board = [];
    var num = 0;
    for (let i=0 ; i< boardSize ;i++){
        board.push([]);
        for(let j=0 ; j< boardSize ;j++){
            board[i].push(num);
            num++;
        }
    }
}
function displayBoard() {
    for(let i = 0; i < boardSize; i++) {
        let row = '';
        for(let j = 0; j < boardSize; j++) {
            row += board[i][j] + '|';
        }
        console.log(row);
    }
    console.log();
}

function isInValidPlace(place){
   if(typeof playerPlace !== 'number' || playerPlace < 0 ||  playerPlace > maxNum || occupiedPlaces.includes(playerPlace)){
        if(occupiedPlaces.includes(playerPlace)){
            alert('Please already Occupied');
        }else
            alert('Invalid Input!!!');
        return true;
   }else
        return false;
}
function checkForWin() {
    for (let i = 0; i < board.length; i++) {
        if (checkRowWin(i, players[0])) {
            alert('Player 1 WINS!!!');
            isPlayerWin = true;
            return;
        } else if (checkRowWin(i, players[1])) {
            alert('Player 2 WINS!!!');
            isPlayerWin = true;
            return;
        }
    }

    for (let i = 0; i < board[0].length; i++) {
        if (checkColumnWin(i, players[0])) {
            alert('Player 1 WINS!!!');
            isPlayerWin = true;
            return;
        } else if (checkColumnWin(i, players[1])) {
            alert('Player 2 WINS!!!');
            isPlayerWin = true;
            return;
        }
    }

    if (checkDiagonalWin(players[0])) {
        alert('Player 1 WINS!!!');
        isPlayerWin = true;
        return;
    } else if (checkDiagonalWin(players[1])) {
        alert('Player 2 WINS!!!');
        isPlayerWin = true;
        return;
    }

    if(occupiedPlaces.length===totalTurns && !isPlayerWin){
        alert('Game DRAWS!!!');
        return;
    }
    
}

function checkRowWin(row, playerSymbol) {
    for (let i = 0; i < board[row].length; i++) {
        if (board[row][i] !== playerSymbol) {
            return false;
        }
    }
    return true;
}

function checkColumnWin(column, playerSymbol) {
    for (let i = 0; i < board.length; i++) {
        if (board[i][column] !== playerSymbol) {
            return false;
        }
    }
    return true;
}

function checkDiagonalWin(playerSymbol) {
    for (let i = 0; i < boardSize; i++) {
        if (board[i][i] !== playerSymbol) {
            break;
        }
        if (i === boardSize - 1) {
            return true;
        }
    }

    for (let i = 0; i < boardSize; i++) {
        if (board[i][board[0].length - 1 - i] !== playerSymbol) {
            break;
        }
        if (i === boardSize - 1) {
            return true;
        }
    }

    return false;
}

console.log('\t\t\t\tWelcome to Tic Tac Toe!!!');
do{
    let result = prompt('Enter the board Size:');
    var size = isNaN(parseInt(result)) ? 'x' : parseInt(result);
}while (typeof size !== 'number' || size <= 0)
boardSize = size;
console.log('Player 1 Symbol: '+ players[0]);
console.log('Player 2 Symbol: '+ players[1]);
let currentPlayer = 1;
createBoard();
displayBoard();
for(let i=0;i<totalTurns && !isPlayerWin ;i++){
    console.log('PLAYER '+currentPlayer+' TURN:');
    do {
        let promptResult = prompt(`Player ${currentPlayer} TURN: Enter the position from 0-8 where you want to place your SYMBOL (${players[currentPlayer-1]})`);
        var playerPlace = isNaN(parseInt(promptResult)) ? 'x' : parseInt(promptResult);
    }while (isInValidPlace(playerPlace));
    occupiedPlaces.push(playerPlace);
    board[parseInt(playerPlace/boardSize)][playerPlace%boardSize] = players[currentPlayer-1];
    displayBoard();
    checkForWin();
    currentPlayer = (currentPlayer === 1) ? 2 : 1;
}


