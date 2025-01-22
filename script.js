console.log('Hello World!');

let oGameData = {};

function initGlobalObject() {
    oGameData.nickNamePlayerOne = '';
    oGameData.colorPlayerOne = '';
    oGameData.scorePlayerOne = 0;
    oGameData.nickNamePlayerTwo = '';
    oGameData.colorPlayerTo = '';
    oGameData.scorePlayerTwo = 0;
    oGameData.currentPlayer = '';
    oGameData.currentMove = 1;
    oGameData.flippedCard = '';
    oGameData.remainingCards = 16;
}

function validateForm() {

}

function initGame() {

}

function generateStartingPlayer() {

}

function executeMove(event) {

}

function gameOver(winner) {

}

function checkForWinner() {

}

function changePlayer() {

}

function generateGameField() {

}

//Fisher-Yates shuffle algorithm (https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array)
function shuffleDeck(deck) {
    let i, j, temp;
    for (i = deck.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        temp = deck[i];
        deck[i] = deck[j];
        deck[j] = temp;
    }

    return deck;
}