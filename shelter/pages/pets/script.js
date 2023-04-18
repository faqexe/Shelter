"use strict";

async function getPagesetsData() {
  const response = await fetch("../../assets/js/pets.json");
  const pets = await response.json();
  return pets;
}

const pets = await getPagesetsData();

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
checkOpen.addEventListener("change", closeOpen);

// Pagination

// Create card

const createCard = (index) => {
  // Add card
  const card = document.createElement("div");
  card.classList.add("slider__element-card");

  // Add image
  const cardImage = document.createElement("div");
  cardImage.classList.add("card__image");
  let img = document.createElement("img");
  img.src = index.img;
  img.alt = index.name;
  cardImage.insertAdjacentElement("beforeend", img);

  card.insertAdjacentElement("beforeend", cardImage);

  // Add title
  const titleCard = document.createElement("div");
  titleCard.classList.add("card__title");
  let title = document.createElement("p");
  title.innerHTML = index.name;
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

// Generating cards for different screen resolutions

let totalCards = 8;

if (window.matchMedia("(max-width: 768px)").matches) {
  totalCards = 6;
}

if (window.matchMedia("(max-width: 656px)").matches) {
  totalCards = 3;
}

// Mix array

const mixed = (arr) => {
  for (let i = arr.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
};

// Creating an array of 48 cards

let arrLots = [];

for (let i = 0; i < 6; i++) {
  const firstArr = [pets[0], pets[1], pets[2], pets[3]];
  const secondArr = [pets[4], pets[5], pets[6], pets[7]];
  arrLots.push([mixed(firstArr), mixed(secondArr)]);
}

arrLots = arrLots.flat(2);

let totalPages = arrLots.length / totalCards;

// Create a final array

let finalArr = [];

const allPets = (cards) => {
  finalArr = [];
  totalPages = arrLots.length / cards;
  for (let i = 0; i <= arrLots.length; i += cards) {
    const pets = arrLots.slice(i, i + cards);
    finalArr.push(pets);
  }
};

allPets(totalCards);

// Resize window

window.addEventListener(
  "resize",
  () => {
    totalCards = 8;
    if (pageCount.innerHTML > totalCards) {
      pageCount.innerHTML = totalCards;
    }

    if (
      document.documentElement.clientWidth > 656 &&
      document.documentElement.clientWidth < 769
    ) {
      totalCards = 6;
      if (pageCount.innerHTML > totalCards) {
        pageCount.innerHTML = totalCards;
      }
    }
    if (document.documentElement.clientWidth <= 656) {
      totalCards = 3;
      if (pageCount.innerHTML > totalCards) {
        pageCount.innerHTML = totalCards;
      }
    }

    allPets(totalCards);
    navigation();
    getCards();
    getModalWindow();
  },
  true
);

// Navigation

const btnEndLeft = document.querySelector(".left-btn-double");
const btnLeft = document.querySelector(".left-btn-single");
const btnRight = document.querySelector(".right-btn-single");
const btnEndRight = document.querySelector(".right-btn-double");
let pageCount = document.querySelector(".page-counter");

const navigation = () => {
  if (pageCount.innerHTML == 1) {
    btnLeft.classList.remove("pagi-btn-active");
    btnLeft.classList.add("pagin-disable");
    btnEndLeft.classList.remove("pagi-btn-active");
    btnEndLeft.classList.add("pagin-disable");
    btnRight.classList.remove("pagin-disable");
    btnRight.classList.add("pagi-btn-active");
    btnEndRight.classList.remove("pagin-disable");
    btnEndRight.classList.add("pagi-btn-active");
  }

  if (pageCount.innerHTML == totalPages) {
    btnLeft.classList.remove("pagin-disable");
    btnLeft.classList.add("pagi-btn-active");
    btnEndLeft.classList.remove("pagin-disable");
    btnEndLeft.classList.add("pagi-btn-active");
    btnRight.classList.remove("pagi-btn-active");
    btnRight.classList.add("pagin-disable");
    btnEndRight.classList.remove("pagi-btn-active");
    btnEndRight.classList.add("pagin-disable");
  }

  if (pageCount.innerHTML < totalPages && pageCount.innerHTML > 1) {
    btnLeft.classList.remove("pagin-disable");
    btnLeft.classList.add("pagi-btn-active");
    btnEndLeft.classList.remove("pagin-disable");
    btnEndLeft.classList.add("pagi-btn-active");
    btnRight.classList.remove("pagin-disable");
    btnRight.classList.add("pagi-btn-active");
    btnEndRight.classList.remove("pagin-disable");
    btnEndRight.classList.add("pagi-btn-active");
  }
};

// Fill in the block with cards
// Forming the number of pages

const getCards = () => {
  const petsBlock = document.querySelector(".slider__cards");
  let count = Number(pageCount.innerHTML);
  let indexPage = finalArr[count - 1];
  petsBlock.innerHTML = "";
  for (let index of indexPage) {
    petsBlock.insertAdjacentElement("beforeend", createCard(index));
  }
};

getCards();
navigation();

// Check navigation buttons

btnLeft.addEventListener("click", () => {
  pageCount.innerHTML = Number(pageCount.innerHTML) - 1;
  getCards();
  navigation();
  getModalWindow();
});

btnEndLeft.addEventListener("click", () => {
  pageCount.innerHTML = 1;
  getCards();
  navigation();
  getModalWindow();
});

btnRight.addEventListener("click", () => {
  pageCount.innerHTML = Number(pageCount.innerHTML) + 1;
  getCards();
  navigation();
  getModalWindow();
});

btnEndRight.addEventListener("click", () => {
  pageCount.innerHTML = totalPages;
  getCards();
  navigation();
  getModalWindow();
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
