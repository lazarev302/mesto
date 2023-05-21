import "./index.css";
import Card from "../components/Card.js";
import FormValidation from "../components/FormValidation.js";
import PopupWithImage from "../components/PopupWithImage.js";
import Section from "../components/Section.js";
import UserInfo from "../components/UserInfo.js";
import PopupWithForm from "../components/PopupWithForm.js";
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
} from "../utils/constants.js";

const userInfo = new UserInfo(infoProfileConfig);

const popupImage = new PopupWithImage(popupImageSelector);

function createNewCard(element) {
  const newCard = new Card(element, selectorTemplate, popupImage.open);
  return newCard.createCard();
}

const section = new Section(
  {
    items: initialCards,
    renderer: (element) => {
      section.addItem(createNewCard(element));
    },
  },
  listElementsSelector
);

section.addCardByArray();

const popupProfile = new PopupWithForm(popupProfileSelector, (data) => {
  userInfo.setUserInfo(data);
});

const popupPlace = new PopupWithForm(popupPlaceSelector, (data) => {
  section.addItem(createNewCard(data));
});

function openProfilePopup() {
  formsValidation.formProfile.resetValidation();
  popupProfile.setInputsValue(userInfo.getUserInfo());
  popupProfile.open();
}

function openPlacePopup() {
  formsValidation.formPlace.resetValidation();
  popupPlace.open();
}

Array.from(document.forms).forEach((item) => {
  const form = new FormValidation(validationConfig, item);
  const name = item.getAttribute("name");
  formsValidation[name] = form;
  form.enableValidation();
});

popupProfile.setEventListeners();
popupPlace.setEventListeners();
popupImage.setEventListeners();

popupProfileOpenButtonElement.addEventListener("click", openProfilePopup);
popupPlaceOpenButtonElement.addEventListener("click", openPlacePopup);
