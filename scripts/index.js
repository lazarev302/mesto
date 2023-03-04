let popupElement = document.querySelector(".popup");
let popupCloseButtonElement = popupElement.querySelector(
  ".popup__close-button"
);
let popupOpenButtonElement = document.querySelector(".profile__edit-button");

let togglePopupVisibiliti = function () {
  popupElement.classList.toggle("popup_opened");
};

popupOpenButtonElement.addEventListener("click", togglePopupVisibiliti);
popupCloseButtonElement.addEventListener("click", togglePopupVisibiliti);

let formElement = popupElement.querySelector(".form");
let nameInputElement = formElement.querySelector(".form__input-name");
let jobInputElement = formElement.querySelector(".form__input-job");
let saveButtonElement = formElement.querySelector(".form__handlers");

function handleFormSubmit(evt) {
  evt.preventDefault();

  nameInput = formElement.querySelector(".form__input-name").value;
  jobInput = formElement.querySelector(".form__input-job").value;

  document.querySelector(".profile__title");
  document.querySelector(".profile__subtitle");

  document.querySelector(".profile__title").textContent = nameInput;
  document.querySelector(".profile__subtitle").textContent = jobInput;
}

formElement.addEventListener("submit", handleFormSubmit);
saveButtonElement.addEventListener("click", togglePopupVisibiliti);
