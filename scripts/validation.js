const validationConfig = {
  formSelector: ".form",
  inputSelector: ".form__input",
  submitButtonSelector: ".form__button",
  inactiveButtonClass: "form__button_invalid",
  inputErrorClass: "form__input_error",
};

//Обработчик submit на каждую форму, отключить перезагрузку страницы при submit
const enableValidation = ({ formSelector, ...rest }) => {
  const forms = Array.from(document.querySelectorAll(formSelector));
  forms.forEach((form) => {
    form.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });
    setEventListeners(form, rest);
  });
};

//Обработчик input на каждое поле
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

// Контейнер текста ошибки для каждого поля
const checkInputValidity = (input, { inputErrorClass, ...rest }) => {
  const cuttentInputErrorContanier = document.querySelector(
    `#${input.id}-error`
  );
  if (input.validity.valid) {
    hideErrorMessage(input, cuttentInputErrorContanier, {
      inputErrorClass,
      ...rest,
    });
  } else {
    cshowErrorMessage(input, cuttentInputErrorContanier, {
      inputErrorClass,
      ...rest,
    });
  }
};
//Cкрыть сообщение об ошибке
const hideErrorMessage = (
  input,
  cuttentInputErrorContanier,
  { inputErrorClass, ...rest }
) => {
  cuttentInputErrorContanier.textContent = "";
  input.classList.remove(inputErrorClass);
};
//Показать сообщение об ошибке
const cshowErrorMessage = (
  input,
  cuttentInputErrorContanier,
  { inputErrorClass, ...rest }
) => {
  input.classList.add(inputErrorClass);
  cuttentInputErrorContanier.textContent = input.validationMessage;
};

//Проверка на наличие невалидных полей
const hasInvalidInput = (formInputs) => {
  return formInputs.some((item) => !item.validity.valid);
};

//Активная кнопка
const enableButton = (button, { inactiveButtonClass }) => {
  button.classList.remove(inactiveButtonClass);
  button.disabled = false;
};

//Неактивная кнопка
const disableButton = (button, { inactiveButtonClass }) => {
  button.classList.add(inactiveButtonClass);
  button.disabled = true;
};

//Вызов функции проверки
enableValidation(validationConfig);
