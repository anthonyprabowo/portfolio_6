const overlay = document.getElementById('overlay');
const keyboard = document.getElementById('qwerty');
const phrase = document.getElementById('phrase');
const scoreboard = document.getElementById('scoreboard');
const ul = phrase.querySelector('ul');
const lis = ul.children;
const ol = scoreboard.querySelector('ol');
const firstChild = ol.firstElementChild;
let gameState = true;
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
    const gamePhrase = getRandomPhrase(phraseArray);
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

createPhraseDisplay();

overlay.addEventListener('click', (e) => {
    if(e.target.tagName === 'A'){
        overlay.style.display = 'none';
    }
});

keyboard.addEventListener('click', (e) => {
    let found = false;
    if(e.target.tagName === 'BUTTON'){
        e.target.className = 'chosen';
        for(let i = 0; i < lis.length; i++){
            if(e.target.textContent === lis[i].textContent.toLowerCase()){
                lis[i].className += ' show';
                found = true;
                
            } else {
                found = false;
            }
        }
    }
});

