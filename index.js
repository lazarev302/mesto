import Card from "./scripts/components/Card.js";
import FormValidation from "./scripts/components/FormValidation.js";
import PopupWithImage from "./scripts/components/PopupWithImage.js";
import Section from "./scripts/components/Section.js";
import UserInfo from "./scripts/components/UserInfo.js";
import PopupWithForm from "./scripts/components/PopupWithForm.js";
import {
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
} from "./scripts/utils/constants.js";

// Профиль
const userInfo = new UserInfo(infoProfileConfig);

// Закрытие по Esc и Overlay
const popupImage = new PopupWithImage(popupImageSelector);

//Создание карточек
const section = new Section(
  {
    items: initialCards,
    renderer: (element) => {
      const newCard = new Card(element, selectorTemplate, popupImage.open);
      return newCard.createCard();
    },
  },
  listElementsSelector
);
section.addCardByArray();

const popupProfile = new PopupWithForm(popupProfileSelector, (evt) => {
  evt.preventDefault();
  userInfo.setUserInfo(popupProfile.getInputsValue());
  popupProfile.close();
});

const popupPlace = new PopupWithForm(popupPlaceSelector, (evt) => {
  evt.preventDefault();
  section.addItem(section.renderer(popupPlace.getInputsValue()));
  popupPlace.close();
});

Array.from(document.forms).forEach((item) => {
  const form = new FormValidation(validationConfig, item);
  const name = item.getAttribute("name");
  formsValidation[name] = form;
  form.enableValidation();
});

console.log(formsValidation);

popupProfile.setEventListeners();
popupPlace.setEventListeners();
popupImage.setEventListeners();

//Открытие форм
popupProfileOpenButtonElement.addEventListener("click", openProfilePopup);
popupPlaceOpenButtonElement.addEventListener("click", openPlacePopup);

//Редактирование профиля
function openProfilePopup() {
  formsValidation.formProfile.resetValidation();
  popupProfile.setInputsValue(userInfo.getUserInfo());
  popupProfile.open();
}
//Новая карточка
function openPlacePopup() {
  formsValidation.formPlace.resetValidation();
  popupPlace.open();
}
