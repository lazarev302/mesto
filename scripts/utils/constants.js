const initialCards = [
  {
    title: "Архыз",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
  },
  {
    title: "Челябинская область",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
  },
  {
    title: "Иваново",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
  },
  {
    title: "Камчатка",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
  },
  {
    title: "Холмогорский район",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
  },
  {
    title: "Байкал",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
  },
];

const popupProfileOpenButtonElement = document.querySelector(
  ".profile__edit-button"
);
const popupPlaceOpenButtonElement = document.querySelector(
  ".profile__add-button"
);

const selectorTemplate = "#cardTemplate";
const popupProfileSelector = ".popup_profile";
const popupPlaceSelector = ".popup_place";
const popupImageSelector = ".popup_image";
const listElementsSelector = ".cards";

const formsValidation = {};

const infoProfileConfig = {
  nameSelector: ".profile__title",
  jobSelector: ".profile__subtitle",
};

const validationConfig = {
  inputSelector: ".form__input",
  submitButtonSelector: ".form__button",
  inactiveButtonClass: "form__button_invalid",
  inputErrorClass: "form__input_error",
  spanErrorClass: ".form__error_type_",
};

export {
  initialCards,
  popupProfileOpenButtonElement,
  popupPlaceOpenButtonElement,
  selectorTemplate,
  popupProfileSelector,
  popupPlaceSelector,
  popupImageSelector,
  listElementsSelector,
  infoProfileConfig,
  validationConfig,
  formsValidation,
};
