// Попап редактирования профиля открытие/закрытие
const popupProfileElement = document.querySelector(".popup_profile");
const popupProfileCloseButtonElement = popupProfileElement.querySelector(
  ".popup__close-button"
);
const popupProfileOpenButtonElement = document.querySelector(
  ".profile__edit-button"
);

const openProfilePopup = function () {
  popupProfileElement.classList.add("popup_opened");
  nameInputElement.value = profileTitleElement.textContent;
  jobInputElement.value = profileSubtitleElement.textContent;
};

const closeProfilePopup = function () {
  popupProfileElement.classList.remove("popup_opened");
};

popupProfileOpenButtonElement.addEventListener("click", openProfilePopup);
popupProfileCloseButtonElement.addEventListener("click", closeProfilePopup);

// Заполнение полей попапа редактирования профиля
const formProfileElement = popupProfileElement.querySelector(".form");
const nameInputElement = formProfileElement.querySelector(
  ".form__input_value_name"
);
const jobInputElement = formProfileElement.querySelector(
  ".form__input_value_job"
);
const profileTitleElement = document.querySelector(".profile__title");
const profileSubtitleElement = document.querySelector(".profile__subtitle");

function handleFormSubmit(evt) {
  evt.preventDefault();

  profileTitleElement.textContent = nameInputElement.value;
  profileSubtitleElement.textContent = jobInputElement.value;
  closeProfilePopup();
}

formProfileElement.addEventListener("submit", handleFormSubmit);

// Массив
const initialCards = [
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
const cardsContanier = document.querySelector(".elements");
const cardTemplate = cardsContanier.querySelector("#card-template").content;

function createCard(data) {
  const cloneElement = cardTemplate.cloneNode(true);
  cloneElement.querySelector(".card__title").textContent = data.name;
  cloneElement.querySelector(".card__image").src = data.link;
  cloneElement.querySelector(".card__image").alt = data.name;

  setEventListeners(cloneElement);
  addLikelisteners(cloneElement);
  addImagelisteners(cloneElement);
  return cloneElement;
}

function addCard(element) {
  const newCard = createCard(element);
  cardsContanier.prepend(newCard);
}

function render() {
  initialCards.forEach(addCard);
}

render();

function handleCardSubmit(evt) {
  evt.preventDefault();

  addCard({
    name: placeInputElement.value,
    link: imageInputElement.value,
  });

  closePlacePopup();
}

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
const popupPlaceElement = document.querySelector(".popup_place");
const popupPlaceCloseButtonElement = popupPlaceElement.querySelector(
  ".popup__close-button"
);
const popupPlaceOpenButtonElement = document.querySelector(
  ".profile__add-button"
);

const openPlacePopup = function () {
  popupPlaceElement.classList.add("popup_opened");
};

const closePlacePopup = function () {
  popupPlaceElement.classList.remove("popup_opened");
};

popupPlaceOpenButtonElement.addEventListener("click", openPlacePopup);
popupPlaceCloseButtonElement.addEventListener("click", closePlacePopup);

//Новая Карточка
const formPlaceElement = popupPlaceElement.querySelector(".form");
const placeInputElement = formPlaceElement.querySelector(
  ".form__input_value_name-place"
);
const imageInputElement = formPlaceElement.querySelector(
  ".form__input_value_url-image"
);

formPlaceElement.addEventListener("submit", handleCardSubmit);

// Попап с картинкой открытие/закрытие
const popupImageElement = document.querySelector(".popup_image");
const popupImageCloseButtonElement = popupImageElement.querySelector(
  ".popup__close-button"
);
const enlargedImageElement = document.querySelector(".popup__enlarged-image");
const imageCaptionElement = document.querySelector(".popup__title");

function openImagePopup(evt) {
  popupImageElement.classList.toggle("popup_opened");
  enlargedImageElement.src = evt.target.src;
  enlargedImageElement.alt = evt.target.alt;
  imageCaptionElement.textContent = evt.target.alt;
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
