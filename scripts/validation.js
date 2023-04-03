const validationConfig = {
  formSelector: ".form",
  inputSelector: ".form__input",
  submitButtonSelector: ".form__button",
  inactiveButtonClass: "form__button_invalid",
  inputErrorClass: "form__input_error", //- border
  errorClass: "form__error", // - span
};

const enableValidation = ({ formSelector, ...rest }) => {
  const forms = Array.from(document.querySelectorAll(formSelector));
  forms.forEach((form) => {
    form.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });
    setEventListeners(form, rest);
  });
};

const setEventListeners = (
  form,
  { inputSelector, submitButtonSelector, ...rest }
) => {
  const formInputs = Array.from(form.querySelectorAll(inputSelector));
  const formButton = form.querySelector(submitButtonSelector);
  disableButton(formButton, rest);
  formInputs.forEach((input) => {
    input.addEventListener("input", () => {
      checkInputValidity(input, rest);
      if (hasInvalidInput(formInputs)) {
        disableButton(formButton, rest);
      } else {
        enableButton(formButton, rest);
      }
    });
  });
};

const checkInputValidity = (input, { inputErrorClass, ...rest }) => {
  const cuttentInputErrorContanier = document.querySelector(
    `#${input.id}-error`
  );
  if (input.checkValidity()) {
    cuttentInputErrorContanier.textContent = "";
    input.classList.remove(inputErrorClass);
  } else {
    cuttentInputErrorContanier.textContent = input.validationMessage;
    input.classList.add(inputErrorClass);
  }
};

const hasInvalidInput = (formInputs) => {
  return formInputs.some((item) => !item.validity.valid);
};

const enableButton = (button, { inactiveButtonClass, activeButtonClass }) => {
  button.classList.remove(inactiveButtonClass);
  button.disabled = false;
};

const disableButton = (button, { inactiveButtonClass, activeButtonClass }) => {
  button.classList.add(inactiveButtonClass);
  button.disabled = true;
};

enableValidation(validationConfig);
