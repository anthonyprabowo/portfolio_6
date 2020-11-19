const overlay = document.getElementById('overlay');

overlay.addEventListener('click', (e) => {
    if(e.target.tagName === 'A'){
        overlay.style.display = 'none';
    }
})