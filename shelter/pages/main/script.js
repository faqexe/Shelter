"use strict";

async function getPetsData() {
  const response = await fetch("../../assets/js/pets.json");
  const pets = await response.json();
  return pets;
}

const pets = await getPetsData();

// Menu Burger

const bntBurger = document.querySelector(".burger__icon");
const burger = document.querySelector(".burger__menu");
const burgerLinks = document.querySelectorAll(".burger__menu-links");
const blackout = document.querySelector(".blackout");

// Open/close burger and stop scroll

bntBurger.addEventListener("click", function () {
  bntBurger.classList.toggle("burger__icon-active");
  burger.classList.toggle("burger__menu-active");
  blackout.classList.toggle("blackout-active");
  document.body.classList.toggle("block-body");
});

// Close burger when click body

window.addEventListener("click", function (e) {
  if (!bntBurger.contains(e.target) && !burger.contains(e.target)) {
    bntBurger.classList.remove("burger__icon-active");
    burger.classList.remove("burger__menu-active");
    blackout.classList.remove("blackout-active");
    document.body.classList.remove("block-body");
  }
});

// Close burger when click to link menu

burgerLinks.forEach((link) => {
  link.addEventListener("click", () => {
    bntBurger.classList.remove("burger__icon-active");
    burger.classList.remove("burger__menu-active");
    blackout.classList.remove("blackout-active");
    document.body.classList.remove("block-body");
  });
});

// Check open menu

const checkOpen = window.matchMedia("(min-width: 768px)");
function closeOpen(e) {
  if (e.matches) {
    bntBurger.classList.remove("burger__icon-active");
    burger.classList.remove("burger__menu-active");
    blackout.classList.remove("blackout-active");
    document.body.classList.remove("block-body");
  }
}

checkOpen.addEventListener('change', closeOpen);

// Slider

const btnLeft = document.querySelector(".arrow-left");
const btnRight = document.querySelector(".arrow-right");
const slider = document.querySelector(".slider__cards");
const cardBlockLeft = document.querySelector(".block-left");
const cardBlockCenter = document.querySelector(".block-center");
const cardBlockRight = document.querySelector(".block-right");
const cardsSliderBlock = document.querySelectorAll(".cards__block");

const createCard = (index) => {
  // Create card
  const card = document.createElement("div");
  card.classList.add("slider__element-card");

  // Add image
  const cardImage = document.createElement("div");
  cardImage.classList.add("card__image");
  let img = document.createElement("img");
  img.src = pets[index].img;
  img.alt = pets[index].name;
  cardImage.insertAdjacentElement("beforeend", img);

  card.insertAdjacentElement("beforeend", cardImage);

  // Add title
  const titleCard = document.createElement("div");
  titleCard.classList.add("card__title");
  let title = document.createElement("p");
  title.innerHTML = pets[index].name;
  titleCard.insertAdjacentElement("beforeend", title);

  card.insertAdjacentElement("beforeend", titleCard);

  // Add button
  const btnCard = document.createElement("div");
  btnCard.classList.add("card__button");
  let btn = document.createElement("button");
  btn.classList.add("card__button-link");
  btn.innerHTML = "Learn more";
  btnCard.insertAdjacentElement("beforeend", btn);

  card.insertAdjacentElement("beforeend", btnCard);

  return card;
};

// Get random array of values

const random = (min, max) => {
  let total = max - min + 1;
  let totalArr = [];
  let randomNums = [];
  let temp;

  while (total--) {
    totalArr.push(total + min);
  }

  while (totalArr.length) {
    temp = Math.floor(Math.random() * (totalArr.length - 1));
    randomNums.push(totalArr[temp]);
    totalArr.splice(temp, 1);
  }
  return randomNums;
};

// Generating cards for different screen resolutions

let lastNum;

function mediaWindow(count) {
  let namesArr = random(0, 7);
  let indexName = 0;
  for (let i of cardsSliderBlock) {
    i.innerHTML = "";
    for (let j = 1; j < count; j++) {
      if (indexName == 8) {
        indexName = 0;
      }
      i.insertAdjacentElement("beforeend", createCard(namesArr[indexName]));
      indexName++;
    }
  }
}

if (window.matchMedia("(max-width: 2970px)").matches) {
  lastNum = 3;
  mediaWindow(lastNum + 1);
}

if (window.matchMedia("(max-width: 1100px)").matches) {
  lastNum = 2;
  mediaWindow(lastNum + 1);
}

if (window.matchMedia("(max-width: 630px)").matches) {
  lastNum = 1;
  mediaWindow(lastNum + 1);
}

const goLeft = () => {
  slider.classList.add("toLeft");
  btnLeft.removeEventListener("click", goLeft);
  btnRight.removeEventListener("click", goRight);
};

const goRight = () => {
  slider.classList.add("toRight");
  btnLeft.removeEventListener("click", goLeft);
  btnRight.removeEventListener("click", goRight);
};

btnLeft.addEventListener("click", goLeft);
btnRight.addEventListener("click", goRight);

slider.addEventListener("animationend", (event) => {
  let change;
  let center;
  let centerArr = [];

  if (event.animationName === "moveToLeft") {
    slider.classList.remove("toLeft");
    change = cardBlockLeft;
    center = cardBlockCenter.innerHTML;
    cardBlockCenter.innerHTML = cardBlockLeft.innerHTML;
    cardBlockRight.innerHTML = center;
  } else {
    slider.classList.remove("toRight");
    change = cardBlockRight;
    center = cardBlockCenter.innerHTML;
    cardBlockCenter.innerHTML = cardBlockRight.innerHTML;
    cardBlockLeft.innerHTML = center;
  }

  for (let i = 0; i < lastNum; i++) {
    centerArr.push(
      document.querySelectorAll(".slider__element-card")[i + lastNum].innerHTML
    );
  }

  change.innerHTML = "";
  let namesArr = random(0, 7);
  let indexName = 0;
  let i = 0;
  while (i < lastNum) {
    if (indexName == 8) {
      indexName = 0;
    }
    let elem = createCard(namesArr[indexName]);
    if (!centerArr.includes(elem.innerHTML)) {
      change.insertAdjacentElement("beforeend", elem);
      i++;
    }
    indexName++;
  }

  getModalWindow();

  btnLeft.addEventListener("click", goLeft);
  btnRight.addEventListener("click", goRight);
});

// Modal

const modalWindow = document.querySelector(".modal__wrapper");
const modalContainer = document.querySelector(".modal__container");
const modalBtn = document.querySelector(".modal__button");

function getModalWindow() {
  const cardsPets = document.querySelectorAll(".slider__element-card");
  for (let i of cardsPets) {
    i.addEventListener("click", () => {
      modalWindow.classList.add("modal__active");
      document.documentElement.style.overflow = "hidden";

      const cardTitle = i.querySelector(".card__title p").innerHTML;
      const filterContentModal = pets.filter(
        (e) => e.name.indexOf(cardTitle) > -1
      );

      const imgBlock = document.createElement("div");
      imgBlock.classList.add("modal__image");
      const img = document.createElement("img");
      img.src = filterContentModal[0].img;
      img.alt = filterContentModal[0].name;
      imgBlock.insertAdjacentElement("beforeend", img);

      modalContainer.insertAdjacentElement("beforeend", imgBlock);

      const content = document.createElement("div");
      content.classList.add("modal__content");

      const petName = document.createElement("div");
      petName.classList.add("pet__name");
      petName.textContent = filterContentModal[0].name;

      const petType = document.createElement("div");
      petType.classList.add("pet__type");
      petType.textContent = `${filterContentModal[0].type} - ${filterContentModal[0].breed}`;

      const petDescription = document.createElement("div");
      petDescription.classList.add("pet__description");
      petDescription.textContent = filterContentModal[0].description;

      const petList = document.createElement("div");
      petList.classList.add("pet__list");
      petList.innerHTML = `
    <li class="pet__list-li"><span>Age:</span> ${filterContentModal[0].age}</li>
    <li class="pet__list-li"><span>Inoculations:</span> ${filterContentModal[0].inoculations}</li>
    <li class="pet__list-li"><span>Diseases:</span> ${filterContentModal[0].diseases}</li>
    <li class="pet__list-li"><span>Parasites:</span> ${filterContentModal[0].parasites}</li>
    `;

      content.insertAdjacentElement("beforeend", petName);
      content.insertAdjacentElement("beforeend", petType);
      content.insertAdjacentElement("beforeend", petDescription);
      content.insertAdjacentElement("beforeend", petList);

      modalContainer.insertAdjacentElement("beforeend", content);
    });
  }
}

getModalWindow();

modalBtn.addEventListener("click", () => {
  modalWindow.classList.remove("modal__active");
  document.documentElement.style.overflow = "";
  modalContainer.innerHTML = "";
});

modalWindow.addEventListener("click", (e) => {
  if (
    e.target == document.querySelector(".modal__window") ||
    e.target == document.querySelector(".modal__wrapper")
  ) {
    modalWindow.classList.remove("modal__active");
    document.documentElement.style.overflow = "";
    modalContainer.innerHTML = "";
  }
});
