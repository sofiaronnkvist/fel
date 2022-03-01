const overlapWidth = 20;
let lastClickedCardIndex = -1;

const cards = document.querySelectorAll(".card");
const cardWidth = cards[0].clientWidth;

for (let i = 0; i < cards.length; i++) {
  setCardInitState(i);
  cards[i].addEventListener("click", OnCardClick);
  cards[i].cardIndex = i;
}
function OnCardClick(e) {
  const cardIndex = e.currentTarget.cardIndex;

  if (lastClickedCardIndex !== cardIndex) {
    lastClickedCardIndex = cardIndex;
  } else {
    for (let i = 0; i < cards.length; i++) {
      setCardInitState(i);
    }
    lastClickedCardIndex = -1;
    return;
  }

  for (let i = 0; i < cards.length; i++) {
    if (i <= cardIndex) {
      setCardInitState(i);
    } else {
      cards[i].style.left = `${
        (cardWidth - overlapWidth) * i + overlapWidth
      }px`;
    }
  }
}

function setCardInitState(i) {
  cards[i].style.left = `${(cardWidth - overlapWidth) * i}px`;
}
