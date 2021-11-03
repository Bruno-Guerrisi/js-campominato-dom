/*
L’utente indica un livello di difficoltà in base al quale viene generata una griglia di gioco quadrata, in cui ogni cella contiene un numero tra quelli compresi in un range:

con difficoltà 1 => tra 1 e 100
con difficoltà 2 => tra 1 e 81
con difficoltà 3 => tra 1 e 49

Il computer deve generare 16 numeri casuali nello stesso range della difficoltà prescelta: le bombe.

I numeri nella lista delle bombe non possono essere duplicati.
In seguito l’utente clicca su ogni cella: se il numero è presente nella lista dei numeri generati - abbiamo calpestato una bomba - la cella si colora di rosso e la partita termina, altrimenti la cella cliccata si colora di azzurro e l’utente può continuare a cliccare sulle altre celle.

La partita termina quando il giocatore clicca su una bomba o raggiunge il numero massimo possibile di numeri consentiti.

Al termine della partita il software deve scoprire tutte le bombe e comunicare il punteggio, cioè il numero di volte che l’utente ha inserito un numero consentito.
Scriviamo prima cosa vogliamo fare passo passo in italiano, dividiamo il lavoro in micro problemi. */



const difficult = document.getElementById('difficult');

const buttPlay = document.getElementById('playGame');

const containerBox = document.querySelector('.container-box');

const attempsText = document.getElementById('attemps');

let size = 0;
let numberCell = 0 ;

buttPlay.addEventListener('click', function (){

    containerBox.innerHTML = '';

    let difficultGrid = difficult.value;
    console.log(difficultGrid);

    switch (difficultGrid) {

        case '1':
            size = 100;
            numberCell = 10;
            break;

        case '2':
            size = 81;
            numberCell = 9;
            break;

        case '3':
            size = 49;
            numberCell = 7;
    }

    /* gen bomb */
    const bomb = genBomb(size);

    /* attemps */
    const attemps = [];
    const maxAttemps = size - bomb.length;
    console.log(maxAttemps);

    /* gen square */
    for (let i = 1; i <= size; i++) {

        /* generate square */
        const square = genSquare(numberCell, i);
        containerBox.append(square);

        /* square click */
        square.addEventListener('click', () => {

            clickSquare(square, bomb, attemps, maxAttemps, attempsText, containerBox);

        });
    }

});


/* FUNCTION */

/* function to generate square */
function genSquare(numCell, num) {

    const node = document.createElement('div');
    node.classList.add('square');
    node.style.width =`calc(100% / ${numCell})`
    node.style.height =`calc(100% / ${numCell})`

    node.innerHTML = (num);

    return node;
}


/* bomb function */
function genBomb(maxCell) {
    
    const arrBomb = [];

    while (arrBomb.length < 16) {

        const randNumBomb = Math.floor(Math.random() * (maxCell - 1 + 1)) + 1;

        if(!arrBomb.includes(randNumBomb)){

            arrBomb.push(randNumBomb);
        }
    }

    return arrBomb;
}


/* click square */
function clickSquare(square, bomb, attemps, maxAttemps, attempsText, containerBox) {

    const number = parseInt(square.innerHTML);
    console.log(number);
    
    if (bomb.includes(number)){

        square.classList.add('bomb');
        clickBomb(bomb, square, attemps, maxAttemps)

        attemps.push(number);
        attempsText.innerHTML = `Hai perso dopo ${attemps.length} tentativi`;

        containerBox.classList.add('gameOver');

    } else {

        square.classList.add('click');

        attemps.push(number);

        maxAttemps = maxAttemps - attemps.length;
        console.log(maxAttemps);
        
        attempsText.innerHTML = `tentativi rimanenti: ${maxAttemps}`;
    }

    if (attemps.length === maxAttemps) {
        alert('Hai vinto, sei incredibile!')
    }
    
}


/* click on bomb */
function clickBomb(bomb, attemps, maxAttemps) {

    const allSquare = document.querySelectorAll('.square');

    for (let i = 0; i < allSquare.length; i++) {

        const square = allSquare[i];
        const valueSquare = parseInt(square.innerHTML);

        if (bomb.includes(valueSquare)) {

            square.classList.add('bomb');
        }
    }

    return allSquare;
}

