// Попап редактирования профиля
const popupProfileElement = document.querySelector(".popup_profile");
const popupProfileCloseButtonElement = popupProfileElement.querySelector(
  ".popup__close-button"
);
const popupProfileOpenButtonElement = document.querySelector(
  ".profile__edit-button"
);

function openPopup(popup) {
  popup.classList.add("popup_opened");
}
function closePopup(popup) {
  popup.classList.remove("popup_opened");
}

function openProfilePopup() {
  openPopup(popupProfileElement);
  nameInputElement.value = profileTitleElement.textContent;
  jobInputElement.value = profileSubtitleElement.textContent;
}

function closeProfilePopup() {
  closePopup(popupProfileElement);
}

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

function submitEditProfileForm(evt) {
  evt.preventDefault();

  profileTitleElement.textContent = nameInputElement.value;
  profileSubtitleElement.textContent = jobInputElement.value;
  closeProfilePopup();
}

formProfileElement.addEventListener("submit", submitEditProfileForm);

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
  const image = cloneElement.querySelector(".card__image");
  const title = cloneElement.querySelector(".card__title");
  title.textContent = data.name;
  image.src = data.link;
  image.alt = data.name;

  setEventListener(cloneElement);
  addLikelisteners(cloneElement);
  addImagelisteners(cloneElement);
  return cloneElement;
}

function addCard(element) {
  const newCard = createCard(element);
  cardsContanier.prepend(newCard);
}

function renderInitialCards() {
  initialCards.forEach(addCard);
}

renderInitialCards();

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

// Удаление
function hendleDelete(evt) {
  const card = evt.target.closest(".card");
  card.remove();
}
function setEventListener(cloneElement) {
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

function openPlacePopup() {
  openPopup(popupPlaceElement);
}

function closePlacePopup() {
  closePopup(popupPlaceElement);
  formPlaceElement.reset();
}

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
  openPopup(popupImageElement);
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
  closePopup(popupImageElement);
}
popupImageCloseButtonElement.addEventListener("click", closeImagePopup);
