const breakPoint = 720;//px

const widthMobile = 92;//vw

const heightMobile = 80//vh
const heightDesktop = 66//vh

const marginMobile = 4;//vw
const marginDesktop = 4;//vw

const overlapWidthMobile = 25//%
const overlapWidthDesktop = 33//%

let cardWidth = 0;
let cardHeight = 0;
let margin = 0;
let overlap = 0;

let lastClickedCardIndex = -1;

const cardScroller = document.querySelector(".card-scroller");
const cards = document.querySelectorAll(".card");

for (let i = 0; i < cards.length; i++) {
    cards[i].addEventListener("click", OnCardClick);
    cards[i].cardIndex = i;
}

CalculateCardVariables();
SetAllCards();

window.addEventListener("resize", () => {
  CalculateCardVariables();
  SetAllCards();
});

function CalculateCardVariables () {
  if(window.innerWidth < breakPoint){
    cardWidth = window.innerWidth * (widthMobile/100);
    cardHeight = window.innerHeight * (heightMobile/100);
    margin = window.innerWidth * (marginMobile/100);
    overlap = cardWidth * (overlapWidthMobile/100);
  }else{
    cardHeight = window.innerHeight * (heightDesktop/100);
    cardWidth = cardHeight;
    margin = window.innerWidth * (marginDesktop/100);
    overlap = cardWidth * (overlapWidthDesktop/100);
  }
}

function SetAllCards () {
  cardScroller.style.height = `${cardHeight}px`;
  for (let i = 0; i < cards.length; i++) {
    SetCard(i);
  }
}

function SetCard (i) {
  cards[i].style.width = `${cardWidth}px`;
  cards[i].style.height = `${cardHeight}px`;
  cards[i].style.left = `${(cardWidth - overlap) * i + margin}px`;
}

function OnCardClick(e) {
  const cardIndex = e.currentTarget.cardIndex;

  if (lastClickedCardIndex !== cardIndex) {
    lastClickedCardIndex = cardIndex;
  } else {
    SetAllCards();
    lastClickedCardIndex = -1;
    return;
  }

  for (let i = 0; i < cards.length; i++) {
    if (i <= cardIndex) {
      SetCard(i);
    } else {
      cards[i].style.left = `${
        (cardWidth - overlap) * i + overlap + margin
      }px`;
    }
  }
}