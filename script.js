

var allCells = document.getElementsByClassName('cell');

var gameDisplay = document.getElementById('game-display');
var gameState = ['', '' , '', '', '' , '', '', '' , ''];
var gameActive = true;
var currentPlayer = 'X';
var gameRules = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

var xWin = 0;
var oWin = 0;

for(const cell of allCells) {
    cell.addEventListener('click', cellClicked);
}

gameDisplay.innerHTML = playerTurn();

function cellClicked (event) {
    //Klik na ćeliju

    var cellSelected = event.target;
    var cellIndex = parseInt(
        cellSelected.getAttribute('data-cell-index')
    );

    if(cellSelected.innerHTML==='X' || cellSelected.innerHTML==='0' || !gameActive)
        return;

    handleCellSelected(cellSelected, cellIndex);
    handleGameRules();
}

function handleCellSelected (cellSelected, cellIndex) {
    // Logika za popunjavanje gameState
        cellSelected.innerHTML = currentPlayer;
      
        gameState [cellIndex] = currentPlayer;
        
}

function handleGameRules() {
    var won = false;
    for(let i = 0; i <= 7; i++) {
        var rule = gameRules [i];
        var a = gameState [rule[0]]; 
        var b = gameState [rule[1]];
        var c = gameState [rule[2]];

        if( a === '' || b === '' || c=== '') {
            continue;
        }

        if(a === b && b === c) {
            won = true;

            /*if(currentPlayer === 'X') {
                xWin += 1;
                var xWinPlaceHolder = document.getElementById('x-score');
                xWinPlaceHolder.innerHTML = xWin;
            }

            else if (currentPlayer === '0') {
                oWin += 1;
                var oWinPlaceHolder = document.getElementById('o-score');
                oWinPlaceHolder.innerHTML = oWin;
            }*/
            break;
        }     
    }

    if(won && currentPlayer === 'X') {
        gameDisplay.innerHTML = winMessage();
        gameActive = false;
        xWin += 1;
        var xWinPlaceHolder = document.getElementById('x-score');
        xWinPlaceHolder.innerHTML = xWin;
        return;
    } 

    else if(won && currentPlayer === '0') {
        gameDisplay.innerHTML = winMessage();
        gameActive = false;
        oWin += 1;
        var oWinPlaceHolder = document.getElementById('o-score');
        oWinPlaceHolder.innerHTML = oWin;
        return;
    } 

    var draw = !gameState.includes('');

    if(draw) {
        gameDisplay.innerHTML = drawMessage();
        gameActive = false;
        return;
    }

    changePlayer();
}

function changePlayer () {
    currentPlayer = currentPlayer ==='X'? '0':'X';
    gameDisplay.innerHTML = playerTurn();
}


function winMessage () {
    return `Pobijedio je igrac ${currentPlayer}`;
}

function drawMessage () {
    return 'Nerijeseno je, pokusajte ponovo.';
}

function playerTurn () {
    return `Na potezu je igrac ${currentPlayer}`;
}

function restartGame () {
    currentPlayer = 'X';
    gameActive = true;
    gameState = ['', '' , '', '', '' , '', '', '' , ''];
    gameDisplay.innerHTML = playerTurn();
    for(const cell of allCells) {
        cell.innerHTML = '';
    }
}