const overlay = document.getElementById('overlay');
const keyboard = document.getElementById('qwerty');
const keyrow = document.getElementsByClassName('keyrow');
const phrase = document.getElementById('phrase');
const scoreboard = document.getElementById('scoreboard');
const ul = phrase.querySelector('ul');
const lis = ul.children;
const ol = scoreboard.querySelector('ol');
const firstChild = ol.firstElementChild;
const h2 = overlay.querySelector('h2');
const button = overlay.querySelector('a');
let gamePhrase = '';

// initializing 5 content into the array
let phraseArray = [
    'Harry Potter',
    'Anthony Prabowo',
    'Buffalo Wild Wings',
    'Krave Fusion',
    'Puzzling'
];

function createLI(text) {
    const li = document.createElement('li');
    li.textContent = text;
    ul.appendChild(li);
}

function getRandomPhrase(arr){
    const randomNumber = Math.floor(Math.random()*5);
    return arr[randomNumber];
}

function createPhraseDisplay(){
    // getting one random phrases from the array
    gamePhrase = getRandomPhrase(phraseArray);
    for(let i = 0; i < gamePhrase.length; i++){
        createLI(gamePhrase[i]);
        if(lis[i].textContent === ' '){
            lis[i].className = 'space';
        } else {
            lis[i].className = 'letter';
        }
    }
}

function checkWin(){
    for(let i = 0; i < lis.length; i++){
        if(lis[i].className === 'letter'){
            return false;
        }
    }
    return true;
}

function playerWin(){
    overlay.style.display = '';
    overlay.style.backgroundColor = 'green';
    h2.textContent = 'You Won!';
    button.textContent = 'Play Again';
}

function playerLose(){
    overlay.style.display = '';
    overlay.style.backgroundColor = 'red';
    h2.textContent = 'You Lose!';
    button.textContent = 'Play Again';
}

function buttonReset(){
    for(let i = 0; i < keyrow.length; i++){
        let keyboard = keyrow[i].querySelectorAll('button');
        for(let z = 0; z < keyboard.length; z++){
            keyboard[z].className = '';
        }
    }
}

overlay.addEventListener('click', (e) => {
    if(e.target.tagName === 'A'){
        overlay.style.display = 'none';
        createPhraseDisplay();
        buttonReset();
    }
});

keyboard.addEventListener('click', (e) => {
    let found = false;
    if(e.target.tagName === 'BUTTON'){
        if(e.target.className === 'chosen'){
            alert('You chose that word already');
        } else{
            e.target.className = 'chosen';
            for(let i = 0; i < lis.length; i++){
                if(e.target.textContent === lis[i].textContent.toLowerCase()){
                    lis[i].className += ' show';
                    found = true;
                }
            }
            if(found === false){
                ol.removeChild(ol.firstElementChild);
            }
        }
    }

    // check game condition
    // if player guess all words - they win
    // else if player lose all their hearts, they lose
    // else keep going
    if(checkWin()){
        playerWin();
    } else if(ol.firstElementChild === null){
        playerLose();
    } else {
        // keep going
    }
});

