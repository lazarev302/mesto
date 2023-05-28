const popupProfileOpenButtonElement = document.querySelector(
  ".profile__edit-button"
);
const popupPlaceOpenButtonElement = document.querySelector(
  ".profile__add-button"
);
const popupAvatarOpenButtonElevent = document.querySelector(
  ".profile__avatar-button"
);

const selectorTemplate = "#cardTemplate";
const popupProfileSelector = ".popup_profile";
const popupPlaceSelector = ".popup_place";
const popupImageSelector = ".popup_image";
const listElementsSelector = ".cards";
const popupAvatarSelector = ".popup_avatar";
const popupDeleteSelector = ".popup__delete";

const formsValidation = {};

const infoProfileConfig = {
  nameSelector: ".profile__title",
  jobSelector: ".profile__subtitle",
  avatarSelector: ".profile__avatar",
};

const validationConfig = {
  inputSelector: ".form__input",
  submitButtonSelector: ".form__button",
  inactiveButtonClass: "form__button_invalid",
  inputErrorClass: "form__input_error",
  spanErrorClass: ".form__error_type_",
};

export {
  popupProfileOpenButtonElement,
  popupPlaceOpenButtonElement,
  popupAvatarOpenButtonElevent,
  selectorTemplate,
  popupProfileSelector,
  popupPlaceSelector,
  popupImageSelector,
  listElementsSelector,
  popupAvatarSelector,
  popupDeleteSelector,
  infoProfileConfig,
  validationConfig,
  formsValidation,
};
