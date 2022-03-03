
    let container = document.createElement('div');
    let board = document.createElement('div');    
    let form = document.createElement('form');
    let input = document.createElement('input');
    input.type = 'number';
    let startButton = document.createElement('button');    
    startButton.innerHTML = 'Начать игру';
    startButton.classList.add('start')
    board.classList.add('matches__game');
    input.placeholder = 'Введите 4, 6 или 8';
    let resetButton = document.createElement('button');
    resetButton.classList.add('reset','hidden');
    resetButton.innerHTML = 'Сброс';      
    

    document.body.append(container);
    container.append(board)
    container.append(form);
    form.append(startButton);
    form.append(input);
    form.append(resetButton)

    board,
    input,
    form,
    startButton;

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
        const countPairs = Math.pow(input.value, 2) / 2;            
            let array = createShufflePairs(countPairs);
            for (let i = 0; i < array.length; i++) {
                let createCard = document.createElement('div');
                createCard.classList.add('matches__card');
                createCard.dataset.number = array[i];
                if (countPairs == 8) {
                    createCard.style.width = (283 + 'px');
                    createCard.style.height = (283 + 'px');
                } else if (countPairs == 18) {
                    createCard.style.width = (187 + 'px');
                    createCard.style.height = (187 + 'px');
                } else {
                    createCard.style.width = (139 + 'px');
                    createCard.style.height = (139 + 'px');
                };
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
                setTimeout(() => {
                    firstCard.classList.remove('rotate');
                    secondCard.classList.remove('rotate');
                    resetCards();
                }, 1000);
            }

            function resetCards() {
                [isRotatedCard, noMoreTwo] = [false, false];
                [firstCard, secondCard] = [null, null]
            }

            cards.forEach(card => card.addEventListener('click', rotateCard));          
    }

    startButton.addEventListener('click', createCards);
    startButton.addEventListener('click', function (start) {
        start.preventDefault();
        startButton.classList.add('hidden');
        resetButton.classList.remove('hidden');
        input.classList.add('hidden');

    })


