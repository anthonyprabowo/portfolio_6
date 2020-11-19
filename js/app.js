const overlay = document.getElementById('overlay');
const keyboard = document.getElementById('qwerty');
const keyrow = document.getElementsByClassName('keyrow');
const phrase = document.getElementById('phrase');
const scoreboard = document.getElementById('scoreboard');
const show = document.querySelector('.show');
const ul = phrase.querySelector('ul');
const lis = ul.children;
const ol = scoreboard.querySelector('ol');
const olList = ol.children;
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

// creating list element and append it to ul
function createLI(text) {
    const li = document.createElement('li');
    li.textContent = text;
    ul.appendChild(li);
}

// clearing previous list items (for new game)
function clearLI(){
    while(ul.firstElementChild !== null){
        ul.removeChild(ul.firstElementChild);
    }
}

// changing all heart img src back to liveHeart.png
function replenishHeart(){
    for(let i = 0; i < 5; i++){
        const img = olList[i].querySelector('img');
        img.src = "images/liveHeart.png"; 
    }
}

// getting random phrases from the array and returning it
function getRandomPhrase(arr){
    const randomNumber = Math.floor(Math.random()*5);
    return arr[randomNumber];
}

// creating phrase display
function createPhraseDisplay(){
    let gamePhrase = '';
    // getting one random phrases from the array
    gamePhrase = getRandomPhrase(phraseArray);
    for(let i = 0; i < gamePhrase.length; i++){
        createLI(gamePhrase[i]);
        // checking if the textContent of the list is space
        if(lis[i].textContent === ' '){
            lis[i].className = 'space'; // assign space class if the textContent is space
        } else {
            lis[i].className = 'letter';
        }
    }
}

// check if player win by completing all the boxes
function checkWin(){
    for(let i = 0; i < lis.length; i++){
        if(lis[i].className === 'letter'){
            return false;
        }
    }
    return true;
}

// remove existing p on the beginning of the game
function removeP(){
    const p = overlay.querySelector('p');
    // check if p is already deleted 
    // since if we're not checking, we're trying to remove a null and will crash the program
    if(p !== null){
        overlay.removeChild(p);
    } else {
        // don't do anything
    }
}

// remove h3 after the player win/lose
function removeh3(){
    const h3 = overlay.querySelector('h3');
    if(h3 !== null){
        overlay.removeChild(h3);
    } else {
        // do nothing since h3 doesn't exist yet
    }
}

// overlay display if the player win
function playerWin(){
    // clearing and resetting game stage
    clearLI();
    replenishHeart();
    removeP();
    // resetting livesLoss to 0
    livesLoss = 0;
    const h3 = document.createElement('h3');
    h3.textContent = 'You won!';
    overlay.style.display = '';
    overlay.className = 'win';
    button.textContent = 'Play Again';
    overlay.appendChild(h3);
}

// overlay display if the player lose
function playerLose(){
    // clearing and resetting game stage
    clearLI();
    replenishHeart();
    removeP();
    // reset livesLoss to 0
    livesLoss = 0;
    const h3 = document.createElement('h3');
    h3.textContent = 'You lose!';
    overlay.style.display = '';
    overlay.className = 'lose';
    button.textContent = 'Play Again';
    overlay.appendChild(h3);
    
}

// reset keyboard button
function buttonReset(){
    for(let i = 0; i < keyrow.length; i++){
        let keyboard = keyrow[i].querySelectorAll('button');
        for(let z = 0; z < keyboard.length; z++){
            keyboard[z].className = '';
        }
    }
}

// listener for the new game or play again button
overlay.addEventListener('click', (e) => {
    if(e.target.tagName === 'A'){
        overlay.style.display = 'none';
        createPhraseDisplay();
        buttonReset();
        removeh3();
    }
});

// listener for keyboard button
keyboard.addEventListener('click', (e) => {
    let found = false;
    const heartImg = olList[livesLoss].querySelector('img');
    if(e.target.tagName === 'BUTTON'){
        // check if the button is already chosen or not
        if(e.target.className === 'chosen'){
            alert('You chose that word already');
        } else{
            // assign chosen class if user chose a specific word
            e.target.className = 'chosen';
            // loop through the phrase list to check if we got a match or not
            for(let i = 0; i < lis.length; i++){
                if(e.target.textContent === lis[i].textContent.toLowerCase()){
                    lis[i].className += ' show';
                    found = true;
                }
            }
            // if the word is not found after the loop, player lose life
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

