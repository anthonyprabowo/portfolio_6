const overlay = document.getElementById('overlay');
const keyboard = document.getElementById('qwerty');
const keyrow = document.getElementsByClassName('keyrow');
const phrase = document.getElementById('phrase');
const scoreboard = document.getElementById('scoreboard');
const show = document.querySelector('.show');
const ul = phrase.querySelector('ul');
const lis = ul.children;
const ol = scoreboard.querySelector('ol');
const h2 = overlay.querySelector('h2');
const button = overlay.querySelector('a');
let livesLoss = 0;

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

function clearLI(){
    while(ul.firstElementChild !== null){
        ul.removeChild(ul.firstElementChild);
    }
}

function createHeart(){
    for(let i = 0; i < 5; i++){
        const heartLi = document.createElement('li');
        heartLi.className = 'tries';
        const heartImg = document.createElement('img');
        heartImg['src'] = "images/liveHeart.png";
        heartImg['height'] = 35;
        heartImg['width'] = 30;
        heartLi.appendChild(heartImg);
        ol.appendChild(heartLi);
    }
}

function clearHeart(){
    while(ol.firstElementChild !== null){
        ol.removeChild(ol.firstElementChild);
    }
}

function restoreHeart(){
    for(let i = 0; i < 5; i++){
        scoreboard
    }
}

function getRandomPhrase(arr){
    const randomNumber = Math.floor(Math.random()*5);
    return arr[randomNumber];
}

function createPhraseDisplay(){
    let gamePhrase = '';
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

function removeP(){
    const p = overlay.querySelector('p');
    if(p !== null){
        overlay.removeChild(p);
    } else {
        // don't do anything
    }
}

function removeh3(){
    const h3 = overlay.querySelector('h3');
    if(h3 !== null){
        overlay.removeChild(h3);
    } else {
        // do nothing since h3 doesn't exist yet
    }
}

function playerWin(){
    clearLI();
    clearHeart();
    createHeart();
    livesLoss = 0;
    removeP();
    const h3 = document.createElement('h3');
    h3.textContent = 'You won!';
    overlay.style.display = '';
    overlay.className = 'win';
    button.textContent = 'Play Again';
    overlay.appendChild(h3);
}

function playerLose(){
    clearLI();
    clearHeart();
    createHeart();
    removeP();
    livesLoss = 0;
    const h3 = document.createElement('h3');
    h3.textContent = 'You lose!';
    overlay.style.display = '';
    overlay.className = 'lose';
    button.textContent = 'Play Again';
    overlay.appendChild(h3);
    
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
        removeh3();
    }
});

keyboard.addEventListener('click', (e) => {
    let found = false;
    const olList = ol.children;
    const heartImg = olList[livesLoss].querySelector('img');
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
                heartImg.src = "images/lostHeart.png";
                livesLoss++;
            }
        }
    }
    // check game condition
    // if player guess all words - they win
    // else if player lose all their hearts, they lose
    // else keep going
    if(checkWin()){
        playerWin();
    } else if(livesLoss === 5){
        playerLose();
    } else {
        // keep going
    }
});

