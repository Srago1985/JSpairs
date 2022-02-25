const cards = document.querySelectorAll('.matches__card');

let isRotatedCard = false;
let noMoreTwo = false;
let firstCard;
let secondCard;

function rotateCard() {
    if (noMoreTwo) return;
    if (this === firstCard) return;
    this.classList.add('rotate');
    if (!isRotatedCard) {
        isRotatedCard = true;
        firstCard = this;
        return;
    } else {
        secondCard = this;
        checkMatches();
    }      
};

function checkMatches() {
    let isMatch = firstCard.dataset.number === secondCard.dataset.number;
    isMatch ? disableCards() : returnCards();
}

function disableCards() {
    firstCard.removeEventListener('click', rotateCard);
    secondCard.removeEventListener('click', rotateCard);
    resetCards();
};

function returnCards() {
    noMoreTwo = true;
    setTimeout (() => {
        firstCard.classList.remove('rotate');
        secondCard.classList.remove('rotate');
        resetCards();
    }, 1000);
}

function resetCards() {
    [isRotatedCard, noMoreTwo] = [false, false];
    [firstCard, secondCard] = [null, null]
}

(function shuffle() {
    cards.forEach(card => {
        let randomPosition = Math.floor(Math.random() * cards.length);
        card.style.order = randomPosition
    });
})();

cards.forEach(card => card.addEventListener('click', rotateCard));

const btn = document.querySelector('.reset');

function reloadGame() {
    if (confirm('Хотите начать новую игру?')) {
        btn.classList.remove('active')
        cards.forEach(card => card.classList.remove('rotate'));
        cards.forEach(card => {
            let randomPosition = Math.floor(Math.random() * cards.length);
            card.style.order = randomPosition
        });
    }
}

btn.addEventListener('click', reloadGame);

setTimeout(reloadGame, 60000);

