const grid = document.querySelector('.grid');
const spanPlayer = document.querySelector('.player');
const timer = document.querySelector('.timer');

const personagens = [
  'beth',
  'jerry',
  'jessica',
  'morty',
  'pessoa-passaro',
  'pickle-rick',
  'rick',
  'summer',
  'meeseeks',
  'scroopy'
];

const createElement = (tag, className) => {
  const element = document.createElement(tag);
  element.className = className;
  return element;
}

let firstCard = '';
let secondCard = '';

const checkEndGame = () => {
  const disabledCards = document.querySelectorAll('.disabled-card');
  if (disabledCards.length  == 20) {
    clearInterval(this.loop);
    alert(`Parabéns ${spanPlayer.innerHTML}!, seu tempo foi ${timer.innerHTML}`);
  }
}

checkCardsIguais = () => {
  const firstPersonagem = firstCard.getAttribute('data-personagem');
  const secondPersonagem = secondCard.getAttribute('data-personagem');

  if(firstPersonagem == secondPersonagem){
    firstCard.firstChild.classList.add('disabled-card');
    secondCard.firstChild.classList.add('disabled-card');
    
    firstCard = '';
    secondCard = '';

    checkEndGame();
  } else {
    setTimeout(() => {
      firstCard.classList.remove('revela-card');
      secondCard.classList.remove('revela-card');
      
      firstCard = '';
      secondCard = '';
    }, 500);
  }
}
 
const revelaCard = ({ target }) => {
  if(target.parentNode.className.includes('revela-card')){
    return;
  }

  if (firstCard == '') {
    target.parentNode.classList.add('revela-card');
    firstCard = target.parentNode;
  } else if (secondCard == '') {
    target.parentNode.classList.add('revela-card');
    secondCard = target.parentNode;
  }

  checkCardsIguais();
}

const createCard = (personagem) => {
  const card = createElement('div', 'card');
  const front = createElement('div', 'face front');
  const back = createElement('div', 'face back');

  front.style.backgroundImage = `url('../img/${personagem}.png')`;

  card.appendChild(front);
  card.appendChild(back);
  
  card.addEventListener('click', revelaCard);
  card.setAttribute('data-personagem', personagem);

  return card;
}

const loadGame = () => {

  const duplicateCards = [ ...personagens, ...personagens ];

  const embaralharCards = duplicateCards.sort(() => Math.random() - 0.5);

  embaralharCards.forEach((personagem) => {
    const card =  createCard(personagem);
    grid.appendChild(card);
  });
}

const startTimer = () => {
 this.loop = setInterval(() => {
    const currentTime = +timer.innerHTML;
    timer.innerHTML = currentTime + 1;
  }, 1000);
}

window.onload = () => {
  spanPlayer.innerHTML = localStorage.getItem('player');
  startTimer();
  loadGame(); 
}