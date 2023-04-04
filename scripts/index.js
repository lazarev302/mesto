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
const popupProfileCloseButtonElement = popupProfileElement.querySelector(
  ".popup__close-button"
);
const popupProfileOpenButtonElement = document.querySelector(
  ".profile__edit-button"
);
const popupPlaceCloseButtonElement = popupPlaceElement.querySelector(
  ".popup__close-button"
);
const popupPlaceOpenButtonElement = document.querySelector(
  ".profile__add-button"
);
const popupImageCloseButtonElement = popupImageElement.querySelector(
  ".popup__close-button"
);
//Заголовки для формы редактирования профиля
const profileTitleElement = document.querySelector(".profile__title");
const profileSubtitleElement = document.querySelector(".profile__subtitle");
//Масштабирование картинки
const enlargedImageElement = document.querySelector(".popup__enlarged-image");
const imageCaptionElement = document.querySelector(".popup__title");
// Карточки при загрузке страницы
const cardsContanier = document.querySelector(".elements");
const cardTemplate = cardsContanier.querySelector("#card-template").content;

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

//Функции
//Универсальная функция открытия
function openPopup(popup) {
  popup.classList.add("popup_opened");
  document.addEventListener("keydown", closePopupEsc);
}
//Редактирование профиля
const openProfilePopup = function () {
  openPopup(popupProfileElement);
  nameInputElement.value = profileTitleElement.textContent;
  jobInputElement.value = profileSubtitleElement.textContent;
};
//Новая карточка
const openPlacePopup = function () {
  openPopup(popupPlaceElement);
};
//Масштабирование картинки
function openImagePopup(evt) {
  openPopup(popupImageElement);
  enlargedImageElement.src = evt.target.src;
  enlargedImageElement.alt = evt.target.alt;
  imageCaptionElement.textContent = evt.target.alt;
}

//Универсальная функция закрытия
function closePopup(popup) {
  popup.classList.remove("popup_opened");
  document.addEventListener("keydown", closePopupEsc);
}
//Закрытие клавишей Esc
function closePopupEsc(evt) {
  if (evt.key === "Escape") {
    const popupOpened = document.querySelector(".popup_opened");
    closePopup(popupOpened);
  }
}
//Редактирование профиля
function closeProfilePopup() {
  closePopup(popupProfileElement);
}
//Новая карточка
function closePlacePopup() {
  closePopup(popupPlaceElement);
  formPlaceElement.reset();
}
//Масштабирование картинки
function closeImagePopup() {
  closePopup(popupImageElement);
}

// Клонирование карточек
function createCard(data) {
  const cloneElement = cardTemplate.cloneNode(true);
  const image = cloneElement.querySelector(".card__image");
  const title = cloneElement.querySelector(".card__title");

  title.textContent = data.name;
  image.src = data.link;
  image.alt = data.name;

  const likeElement = cloneElement.querySelector(".card__like-button");
  likeElement.addEventListener("click", activeLike);

  const deliteElement = cloneElement.querySelector(".card__delete-button");
  deliteElement.addEventListener("click", hendleDelete);

  const openBigImageElement = cloneElement.querySelector(".card__image");
  openBigImageElement.addEventListener("click", openImagePopup);

  return cloneElement;
}
//Создание
function addCard(element) {
  const newCard = createCard(element);
  cardsContanier.prepend(newCard);
}
//Отрисовка
function render() {
  initialCards.forEach(addCard);
}

render();
//Отправка карточки
function handleCardSubmit(evt) {
  evt.preventDefault();
  const formButtonPlace = popupPlaceElement.querySelector(".form__button");
  addCard({
    name: placeInputElement.value,
    link: imageInputElement.value,
  });
  disableButton(formButtonPlace, validationConfig);
  closePlacePopup();
}
//Отправка формы редактирования профиля
function handleFormSubmit(evt) {
  evt.preventDefault();
  profileTitleElement.textContent = nameInputElement.value;
  profileSubtitleElement.textContent = jobInputElement.value;
  closeProfilePopup();
}

// Удаление
function hendleDelete(evt) {
  evt.target.closest(".card").remove();
}

//Лайк
function activeLike(evt) {
  evt.target.classList.toggle("card__like-button_active");
}

//Слушатели
//Редактирование профиля
popupProfileOpenButtonElement.addEventListener("click", openProfilePopup);
popupProfileCloseButtonElement.addEventListener("click", closeProfilePopup);
formProfileElement.addEventListener("submit", handleFormSubmit);
//Новая Карточка
popupPlaceOpenButtonElement.addEventListener("click", openPlacePopup);
popupPlaceCloseButtonElement.addEventListener("click", closePlacePopup);
formPlaceElement.addEventListener("submit", handleCardSubmit);
//Масштабирование картинки
popupImageCloseButtonElement.addEventListener("click", closeImagePopup);
