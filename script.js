const log = (msg) => console.log(msg);

let oGameData = {};

prepGame();

function prepGame() {
    log('prepGame()');
    document.querySelector('#newGame').addEventListener('click', initGame);
}

function initGlobalObject() {
    oGameData.nickNamePlayerOne = '';
    oGameData.colorPlayerOne = '';
    oGameData.scorePlayerOne = 0;
    oGameData.nickNamePlayerTwo = '';
    oGameData.colorPlayerTwo = '';
    oGameData.scorePlayerTwo = 0;
    oGameData.currentPlayer = '';
    oGameData.currentMove = 1;
    oGameData.flippedCard = '';
    oGameData.remainingCards = 16;
}

function collectPlayerDetails() {
    log('collectPlayerDetails()');
    oGameData.nickNamePlayerOne = document.querySelector('#nick_1').value;
    oGameData.nickNamePlayerTwo = document.querySelector('#nick_2').value;
    oGameData.colorPlayerOne = document.querySelector('#color_1').value;
    oGameData.colorPlayerTwo = document.querySelector('#color_2').value;
}

function initGame(event) {
    log('initGame()');
    initGlobalObject();
    collectPlayerDetails();

    document.querySelector('#form').classList.add('d-none');
    document.querySelector('#errorMsg').textContent = '';

    generateGameField();
    generateStartingPlayer();

    document.querySelector('#gameTable').addEventListener('click', executeMove);
}

function generateStartingPlayer() {
    log('generateStartingPlayer()');
    let playerName = '';
    const random = Math.random();
    if(random < 0.5) {
        oGameData.currentPlayer = 1;
        playerName = oGameData.nickNamePlayerOne;
    } else {
        oGameData.currentPlayer = 2;
        playerName = oGameData.nickNamePlayerTwo;
    }
    document.querySelector('#msg').textContent = `Aktuell spelare är ${playerName}`;
}

function executeMove(event) {
    log('executeMove()');
    log(event.target);
    if(event.target.tagName === 'TD') {
        if(event.target.firstChild.dataset.cardInplay) {
            event.target.firstChild.classList.toggle('d-none');
            if(oGameData.currentMove === 1) {
                oGameData.currentMove++;
                oGameData.flippedCard = event.target.firstChild;
            } else {
                if(oGameData.flippedCard.dataset.cardId === event.target.firstChild.dataset.cardId) {
                    oGameData.flippedCard.dataset.cardInplay = false;
                    event.target.firstChild.dataset.cardInplay = false;

                    if(oGameData.currentPlayer === 1) {
                        oGameData.scorePlayerOne++;
                        oGameData.flippedCard.style.border = `3px solid ${oGameData.colorPlayerOne}`;
                        event.target.firstChild.style.border = `3px solid ${oGameData.colorPlayerOne}`;
                    } else {
                        oGameData.scorePlayerTwo++;
                        oGameData.flippedCard.style.border = `3px solid ${oGameData.colorPlayerTwo}`;
                        event.target.firstChild.style.border = `3px solid ${oGameData.colorPlayerTwo}`;
                    }

                    oGameData.remainingCards -= 2;
                    oGameData.currentMove--;
                } else {
                    setTimeout(() => {
                        event.target.firstChild.classList.toggle('d-none');
                        oGameData.flippedCard.classList.toggle('d-none');
                        changePlayer();
                    }, 1500);
                }
                const winner = checkForWinner();
                if(winner !== 0) {
                    gameOver(winner);
                }
            }
        }
    }
    log(oGameData);
}

function gameOver(winner) {
    log('gameOver()');

    document.querySelector('#form').classList.remove('d-none');
    document.querySelector('#gameTable').removeEventListener('click', executeMove);

    let winnerName = '';
    if(winner === 1) {
        winnerName = oGameData.nickNamePlayerOne;
    } else if(winner === 2) {
        winnerName = oGameData.nickNamePlayerTwo;
    } else {
        winnerName = 'Ingen';
    }

    document.querySelector('#msg').textContent = `${winnerName} vann!`
}

function checkForWinner() {
    if(oGameData.remainingCards === 0) {
        if(oGameData.scorePlayerOne > oGameData.scorePlayerTwo) {
            return 1;
        } else if(oGameData.scorePlayerOne < oGameData.scorePlayerTwo) {
            return 2;
        } else {    
            return 3;
        }
    } else {
        return 0;
    }
}

function changePlayer() {
    log('changePlayer()');
    oGameData.currentMove--;
    if(oGameData.currentPlayer === 1) {
        oGameData.currentPlayer = 2;
        document.querySelector('#msg').textContent = `Aktuell spelare är ${oGameData.nickNamePlayerTwo}`;
    } else {
        oGameData.currentPlayer = 1;
        document.querySelector('#msg').textContent = `Aktuell spelare är ${oGameData.nickNamePlayerOne}`;
    }
}

function generateGameField() {
    log('generateGameField()');

    const gameAreaRef = document.querySelector('#gameArea');
    gameAreaRef.innerHTML = '';
    gameAreaRef.classList.add('row', 'justify-content-center', 'mt-5');

    const tableRef = document.createElement('table');
    tableRef.id = 'gameTable';
    tableRef.classList.add('ml-0', 'mr-0');

    const deck = createDeck();

    for(let i = 0 ; i < 4; i++) {
        const rowRef = document.createElement('tr');
        for(let j = 0; j < 4; j++) {
            const tdRef = document.createElement('td');
            tdRef.style = 'width: 100px; height: 160px; border: 1px solid darkgrey; font-size: 50px; text-align: center; background-color: #CCCCCC';
            let card = deck.pop();

            const imgRef = document.createElement('img');
            // imgRef.setAttribute('data-card-id', 1);
            // imgRef.getAttribute('data-card-id');
            imgRef.dataset.cardId = card.value;
            imgRef.dataset.cardInplay = true;
            imgRef.src = card.imageUrl;
            imgRef.classList.add('w-100', 'd-none');
            tdRef.appendChild(imgRef);

            rowRef.appendChild(tdRef);
        }

        tableRef.appendChild(rowRef);
    }
    gameAreaRef.appendChild(tableRef);
}

function createDeck() {
    log('createDeck()');
    const deck = [];

    for(let i = 1; i <= 8; i++) {
        for(let j = 0; j < 2; j++) {
            const card = {
                value : i,
                imageUrl : `./images/${i}.jpg`
            }
            deck.push(card);
        }
    }
    // deck = shuffleDeck(deck);
    return shuffleDeck(deck);
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