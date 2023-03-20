// Попап редактирования профиля открытие/закрытие
let popupProfileElement = document.querySelector(".popup_profile");
let popupProfileCloseButtonElement = popupProfileElement.querySelector(
  ".popup__close-button"
);
let popupProfileOpenButtonElement = document.querySelector(
  ".profile__edit-button"
);

let openProfilePopup = function () {
  popupProfileElement.classList.add("popup_opened");
  nameInputElement.value = profileTitleElement.textContent;
  jobInputElement.value = profileSubtitleElement.textContent;
};

let closeProfilePopup = function () {
  popupProfileElement.classList.remove("popup_opened");
};

popupProfileOpenButtonElement.addEventListener("click", openProfilePopup);
popupProfileCloseButtonElement.addEventListener("click", closeProfilePopup);

// Заполнение полей попапа редактирования профиля
let formProfileElement = popupProfileElement.querySelector(".form");
let nameInputElement = formProfileElement.querySelector(
  ".form__input_value_name"
);
let jobInputElement = formProfileElement.querySelector(
  ".form__input_value_job"
);
let profileTitleElement = document.querySelector(".profile__title");
let profileSubtitleElement = document.querySelector(".profile__subtitle");

function handleFormSubmit(evt) {
  evt.preventDefault();

  profileTitleElement.textContent = nameInputElement.value;
  profileSubtitleElement.textContent = jobInputElement.value;
  closeProfilePopup();
}

formProfileElement.addEventListener("submit", handleFormSubmit);

// Массив
let initialCards = [
  {
    name: "Архыз",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
  },
  {
    name: "Челябинская область",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
  },
  {
    name: "Иваново",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
  },
  {
    name: "Камчатка",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
  },
  {
    name: "Холмогорский район",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
  },
  {
    name: "Байкал",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
  },
];

// 6 карточек при загрузке страницы
let cardsContanier = document.querySelector(".elements");
let cardTemplate = cardsContanier.querySelector("#card-template").content;

function createCard(data) {
  let cloneElement = cardTemplate.cloneNode(true);
  cloneElement.querySelector(".card__title").textContent = data.name;
  cloneElement.querySelector(".card__image").src = data.link;
  cloneElement.querySelector(".card__image").alt = data.name;

  setEventListeners(cloneElement);
  addLikelisteners(cloneElement);
  addImagelisteners(cloneElement);

  cardsContanier.prepend(cloneElement);
}

initialCards.forEach(createCard);

// Удаление
function hendleDelete(evt) {
  const card = evt.target.closest(".card");
  card.remove();
}
function setEventListeners(cloneElement) {
  cloneElement
    .querySelector(".card__delete-button")
    .addEventListener("click", hendleDelete);
}

//Лайк
function activeLike(evt) {
  const likeElement = evt.target.classList.toggle("card__like-button_active");
}
function addLikelisteners(cloneElement) {
  cloneElement
    .querySelector(".card__like-button")
    .addEventListener("click", activeLike);
}

//Попап для добавления карточек открытие/закрытие
let popupPlaceElement = document.querySelector(".popup_place");
let popupPlaceCloseButtonElement = popupPlaceElement.querySelector(
  ".popup__close-button"
);
let popupPlaceOpenButtonElement = document.querySelector(
  ".profile__add-button"
);

let openPlacePopup = function () {
  popupPlaceElement.classList.add("popup_opened");
};

let closePlacePopup = function () {
  popupPlaceElement.classList.remove("popup_opened");
};

popupPlaceOpenButtonElement.addEventListener("click", openPlacePopup);
popupPlaceCloseButtonElement.addEventListener("click", closePlacePopup);

//Новая Карточка
let formPlaceElement = popupPlaceElement.querySelector(".form");
let placeInputElement = formPlaceElement.querySelector(
  ".form__input_value_name-place"
);
let imageInputElement = formPlaceElement.querySelector(
  ".form__input_value_url-image"
);

function handleCardSubmit(evt) {
  evt.preventDefault();

  let newCard = createCard({
    name: placeInputElement.value,
    link: imageInputElement.value,
  });

  renderCard();
  closePlacePopup();
}

formPlaceElement.addEventListener("submit", handleCardSubmit);

function renderCard() {
  createCard.prepend;
}

// Попап с картинкой открытие/закрытие
let popupImageElement = document.querySelector(".popup_image");
let popupImageCloseButtonElement = popupImageElement.querySelector(
  ".popup__close-button"
);
function openImagePopup(evt) {
  popupImageElement.classList.toggle("popup_opened");
  document.querySelector(".popup__enlarged-image").src = evt.target.src;
  document.querySelector(".popup__title").textContent = evt.target.alt;
}

function addImagelisteners(cloneElement) {
  cloneElement
    .querySelector(".card__image")
    .addEventListener("click", openImagePopup);
}

function closeImagePopup() {
  popupImageElement.classList.remove("popup_opened");
}
popupImageCloseButtonElement.addEventListener("click", closeImagePopup);
