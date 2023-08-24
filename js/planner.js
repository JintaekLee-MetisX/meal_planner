const firstCard = document.querySelector("#first-card");
const secondCard = document.querySelector("#second-card");

const planner = document.querySelector('#planner');
const firstGreeting = document.querySelector("#first-card #greeting");
const secondGreeting = document.querySelector("#second-card div #greeting");

const HIDDEN_CLASS_NAME = "d-none";

function onMenuButtonClick(event) {
  event.preventDefault();
  firstCard.classList.add(HIDDEN_CLASS_NAME);
  secondCard.classList.remove(HIDDEN_CLASS_NAME);
  secondGreeting.innerText = `안녕하세요!`;
  getRestaurantList();
}

planner.addEventListener("submit", onMenuButtonClick);
