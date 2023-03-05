let popupElement = document.querySelector(".popup");
let popupCloseButtonElement = popupElement.querySelector(
  ".popup__close-button"
);
let popupOpenButtonElement = document.querySelector(".profile__edit-button");

let openPopup = function () {
  popupElement.classList.add("popup_opened");
};

let closePopup = function () {
  popupElement.classList.remove("popup_opened");
};

popupOpenButtonElement.addEventListener("click", openPopup);
popupCloseButtonElement.addEventListener("click", closePopup);

let formElement = popupElement.querySelector(".form");
let nameInputElement = formElement.querySelector(".form__input_value_name");
let jobInputElement = formElement.querySelector(".form__input_value_job");
let profileTitleElement = document.querySelector(".profile__title");
let profileSubtitleElement = document.querySelector(".profile__subtitle");

function handleFormSubmit(evt) {
  evt.preventDefault();

  profileTitleElement.textContent = nameInputElement.value;
  profileSubtitleElement.textContent = jobInputElement.value;
  popupElement.classList.remove("popup_opened");
}

formElement.addEventListener("submit", handleFormSubmit);
