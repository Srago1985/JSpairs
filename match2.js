
    let container = document.createElement('div');
    let board = document.createElement('div');    
    let form = document.createElement('form');
    let input = document.createElement('input');
    input.type = 'number';
    let startButton = document.createElement('button'); 
    /* startButton.type = 'submit'; */
    startButton.innerHTML = 'Начать игру';
    board.classList.add('matches__game');
    input.placeholder = 'Введите четное число от 4 до 8';
    
    

    document.body.append(container);
    container.append(board)
    container.append(form);
    form.append(startButton);
    form.append(input);

    board,
    input,
    form,
    startButton;

    const countPairs = Math.pow(input.value, 2) / 2; //не могу понять, почему возвращает 0 

    const getPairs = (countPairs) => {
        let arr = [];
        for (i = 0; i < countPairs; i++) {
            arr.push(i);
            arr.push(i);            
        }
        return arr
    }
    
    const createShufflePairs = (countPairs) => {
        const pairs = getPairs(countPairs);
        let j, temp;
        for (let i = pairs.length - 1; i > 0; i--) {
            j = Math.floor(Math.random() * (i + 1));
            temp = pairs[j];
            pairs[j] = pairs[i];
            pairs[i] = temp;
        }
        return pairs
    }
    
    const createCards = () => {        
        let array = createShufflePairs(countPairs); 
        for(let i = 0; i < array.length; i++) {            
            let createCard = document.createElement('div');
            createCard.classList.add('matches__card');
            createCard.dataset.number = array[i];                                        
            board.append(createCard);
            let shirt = document.createElement('img');
            shirt.src = 'img/shirt.jpg';
            shirt.classList.add('back__face')
            createCard.append(shirt);
            let front = document.createElement('div');
            front.classList.add('front__face')
            front.innerHTML = array[i];
            createCard.append(front);
             
        }
    }

    startButton.addEventListener('click', createCards);
    startButton.addEventListener('click', function (start) {
        start.preventDefault();
    })


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

/* (function shuffle() {
    cards.forEach(card => {
        let randomPosition = Math.floor(Math.random() * cards.length);
        card.style.order = randomPosition
    });
})(); */

cards.forEach(card => card.addEventListener('click', rotateCard));

const btn = document.querySelector('.reset');

function reloadGame() {
    if (confirm('Хотите начать новую игру?')) {
        btn.classList.remove('active')
        createCards();
    }
}

/* btn.addEventListener('click', reloadGame); */

/* setTimeout(reloadGame, 60000); */
