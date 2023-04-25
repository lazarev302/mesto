import Card from "./Card.js";
import FormValidation from "./FormValidation.js";
//Попапы
const popupProfileElement = document.querySelector(".popup_profile");
const popupPlaceElement = document.querySelector(".popup_place");
const popupImageElement = document.querySelector(".popup_image");
//Формы
const formProfileElement = popupProfileElement.querySelector(".form");
const formPlaceElement = popupPlaceElement.querySelector(".form");
//Инпуты
const nameInputElement = formProfileElement.querySelector(
  ".form__input_value_name"
);
const jobInputElement = formProfileElement.querySelector(
  ".form__input_value_job"
);
const placeInputElement = formPlaceElement.querySelector(
  ".form__input_value_name-place"
);
const imageInputElement = formPlaceElement.querySelector(
  ".form__input_value_url-image"
);
//Кнопки
const popupProfileOpenButtonElement = document.querySelector(
  ".profile__edit-button"
);
const popupPlaceOpenButtonElement = document.querySelector(
  ".profile__add-button"
);
const popupCloseButton = document.querySelectorAll(".popup__close-button");

//Заголовки для формы редактирования профиля
const profileTitleElement = document.querySelector(".profile__title");
const profileSubtitleElement = document.querySelector(".profile__subtitle");
//Масштабирование картинки
const enlargedImageElement = document.querySelector(".popup__enlarged-image");
const imageCaptionElement = document.querySelector(".popup__title");
// Карточки при загрузке страницы
const cardsContanier = document.querySelector(".cards");
const selectorTemplate = "#cardTemplate";
// Валидация
const validationConfig = {
  inputSelector: ".form__input",
  submitButtonSelector: ".form__button",
  inactiveButtonClass: "form__button_invalid",
  inputErrorClass: "form__input_error",
  spanErrorClass: ".form__error_type_",
};

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

//Универсальная функция открытия
function openPopup(popup) {
  popup.classList.add("popup_opened");
  document.addEventListener("keydown", closePopupEsc);
}
//Редактирование профиля
function openProfilePopup() {
  formProfileValidation.resetError();
  openPopup(popupProfileElement);
  nameInputElement.value = profileTitleElement.textContent;
  jobInputElement.value = profileSubtitleElement.textContent;
}
//Новая карточка
function openPlacePopup() {
  formPlaceValidation.resetError();
  openPopup(popupPlaceElement);
}
//Масштабирование картинки
function openImagePopup(data) {
  openPopup(popupImageElement);
  enlargedImageElement.src = data.link;
  enlargedImageElement.alt = data.name;
  imageCaptionElement.textContent = data.name;
}

//Универсальная функция закрытия
function closePopup(popup) {
  popup.classList.remove("popup_opened");
  document.removeEventListener("keydown", closePopupEsc);
}
//Закрытие клавишей Esc
function closePopupEsc(evt) {
  if (evt.key === "Escape") {
    const popup = document.querySelector(".popup_opened");
    closePopup(popup);
  }
}
//Закрытие кликом на Overlay
function closePopupOverlay(evt) {
  if (evt.target === evt.currentTarget) {
    closePopup(evt.target);
  }
}
//Редактирование профиля
function closeProfilePopup() {
  closePopup(popupProfileElement);
}
//Новая карточка
function closePlacePopup() {
  closePopup(popupPlaceElement);
}

// Клонирование карточек
function createNewCard(item) {
  const newCard = new Card(item, selectorTemplate, openImagePopup);
  const card = newCard.createCard();
  return card;
}

//Создание контейнера
function addCard(cardsContanier, newCard) {
  cardsContanier.prepend(newCard);
}

//Создание карточек из массива
function render() {
  initialCards.forEach((item) => {
    addCard(cardsContanier, createNewCard(item));
  });
}
render();

//Создание новой карточки
function handleCardSubmit(evt) {
  evt.preventDefault();
  const cardName = {
    name: placeInputElement.value,
    link: imageInputElement.value,
  };
  addCard(cardsContanier, createNewCard(cardName));
  closePlacePopup();
}
//Отправка формы редактирования профиля
function handleFormSubmit(evt) {
  evt.preventDefault();
  profileTitleElement.textContent = nameInputElement.value;
  profileSubtitleElement.textContent = jobInputElement.value;
  closeProfilePopup();
}

//Создание классов валидации для каждой формы
const formProfileValidation = new FormValidation(
  validationConfig,
  formProfileElement
);
const formPlaceValidation = new FormValidation(
  validationConfig,
  formPlaceElement
);

//Валидация форм
formProfileValidation.enableValidation();
formPlaceValidation.enableValidation();
//Открытие форм
popupProfileOpenButtonElement.addEventListener("click", openProfilePopup);
popupPlaceOpenButtonElement.addEventListener("click", openPlacePopup);
//Отправка форм
formProfileElement.addEventListener("submit", handleFormSubmit);
formPlaceElement.addEventListener("submit", handleCardSubmit);
//Закрытие форм
popupCloseButton.forEach((item) => {
  const closeElements = item.closest(".popup");
  item.addEventListener("click", () => closePopup(closeElements));
  closeElements.addEventListener("mousedown", closePopupOverlay);
});
