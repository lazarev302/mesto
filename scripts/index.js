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

let formElement = popupProfileElement.querySelector(".form");
let nameInputElement = formElement.querySelector(".form__input_value_name");
let jobInputElement = formElement.querySelector(".form__input_value_job");
let profileTitleElement = document.querySelector(".profile__title");
let profileSubtitleElement = document.querySelector(".profile__subtitle");

function handleFormSubmit(evt) {
  evt.preventDefault();

  profileTitleElement.textContent = nameInputElement.value;
  profileSubtitleElement.textContent = jobInputElement.value;
  closeProfilePopup();
}

formElement.addEventListener("submit", handleFormSubmit);

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
