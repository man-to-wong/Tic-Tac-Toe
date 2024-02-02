//Unentschieden muss noch implementiert werden
const body = document.querySelector('body');
const board = document.querySelector('#spielFeld');
const menu = document.querySelector('#menu');
const button = document.querySelector('#startButton');
const obenLinks = document.querySelector('#obenLinks'); //0
const obenMitte = document.querySelector('#obenMitte'); //1
const obenRechts = document.querySelector('#obenRechts'); //2
const mitteLinks = document.querySelector('#mitteLinks'); //3
const mitteMitte = document.querySelector('#mitteMitte'); //4
const mitteRechts = document.querySelector('#mitteRechts');//5
const untenLinks = document.querySelector('#untenLinks');//6
const untenMitte = document.querySelector('#untenMitte');//7
const untenRechts = document.querySelector('#untenRechts');//8
const fieldArray = [obenLinks, obenMitte, obenRechts, mitteLinks, mitteMitte, mitteRechts, untenLinks, untenMitte, untenRechts];
const x = 'x';
const o = 'o';
const blau = 'blau';
const rot = 'rot';

let turnCount = 1;
let over = false;
let turnText;
let turn;
let playersColor;


start();

function showBoard() {
    button.remove();
    for (let i = 0; i < fieldArray.length; i++) {
        fieldArray[i].setAttribute('onclick', 'executeTurn(this)');
    }
    turnOnBoard(true);
    showTurnText();

}
function start() {
    turnOnBoard(false);

}

function showTurnText() {
    playersColor = getPlayersColor();
    let pElement = document.createElement('p');
    pElement.id = 'turnText';
    pElement.innerHTML = "Spieler <span id='turnColor'>" + playersColor + '</span> ist am Zug.';
    menu.append(pElement);
    if (playersColor == 'rot') {
        document.querySelector('#turnColor').style.color = 'red';
    }
    else if (playersColor == 'blau') {
        document.querySelector('#turnColor').style.color = 'blue';
    }
    else {
        console.log('Es konnte keine Farbe ermitteln wrden');
    }
}

function refreshTurnText() {
    let garbage = document.querySelector('#turnText');
        garbage.remove();
    showTurnText();
}

function turnOnBoard(value) {

    switch (value) {
        case true:
            board.style.display = 'flex';
            break;
        case false:
            board.style.display = 'none';
            for (let i = 0; i < fieldArray.length; i++) {
                fieldArray[i].onclick = '';
            }
    }
}

function executeTurn(field) {
    if (over == true) {
        return;
    };
    turn = checkTurn();


    switch (turn) {
        case true: //player 1
            setMark(field, x);
            field.style.color = 'blue';
            break;
        case false: //player 2
            setMark(field, o);
            field.style.color = 'red';
            break;
    }
    setTimeout(() => { checkGameState(field.dataset.mark); }, 1000);
    ++turnCount;

    if(turnCount < 10) {
    refreshTurnText();
    }
}

function checkTurn() {
    if (turnCount % 2 == 1) {
        return true; //true = player1
    }
    else {
        return false; //false = player2
    }
}

function setMark(field, mark) {
    let pElement = document.createElement('p');
    if (field.dataset.mark !== 'unchecked') {
        alert('Das Feld wurde bereits ausgewählt!')
    }
    else {
        pElement.innerText = mark;
        field.append(pElement);
        field.dataset.mark = mark;
    }
}

function checkGameState(mark) {
    for (let i = 0; i < fieldArray.length; i++) {
        console.log('fieldArray[' + i + ']: ' + fieldArray[i].dataset.mark);
    }

    //Wincondition
    if ((fieldArray[0].dataset.mark == mark && fieldArray[1].dataset.mark == mark && fieldArray[2].dataset.mark == mark) ||
        (fieldArray[0].dataset.mark == mark && fieldArray[3].dataset.mark == mark && fieldArray[6].dataset.mark == mark) ||
        (fieldArray[6].dataset.mark == mark && fieldArray[7].dataset.mark == mark && fieldArray[8].dataset.mark == mark) ||
        (fieldArray[2].dataset.mark == mark && fieldArray[5].dataset.mark == mark && fieldArray[8].dataset.mark == mark) ||
        (fieldArray[3].dataset.mark == mark && fieldArray[4].dataset.mark == mark && fieldArray[5].dataset.mark == mark) ||
        (fieldArray[1].dataset.mark == mark && fieldArray[4].dataset.mark == mark && fieldArray[7].dataset.mark == mark) ||
        (fieldArray[0].dataset.mark == mark && fieldArray[4].dataset.mark == mark && fieldArray[8].dataset.mark == mark) ||
        (fieldArray[6].dataset.mark == mark && fieldArray[4].dataset.mark == mark && fieldArray[2].dataset.mark == mark)) {
        switch (mark) {
            case x:
                alert('Spieler Blau hat gewonnen');
                over = true;
                console.log('game ist over')
                break;
            case o:
                alert('Spieler Rot hat gewonnen!');
                over = true;
                console.log('game ist over')
                break;
        }
    }
    else if(turnCount == 10){
       turnText = document.querySelector('#turnText');
       turnText.textContent = 'Unentschieden!';
       over = true;
    
    }
    else {
        return;
    }
}

function getPlayersColor() {
    turn = checkTurn();
    if (turn == true) {
        return blau;
    }
    else {
        return rot;
    }
}




