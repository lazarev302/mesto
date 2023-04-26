export default class FormValidation {
  constructor(validationConfig, form) {
    this._form = form;
    this._inputSelector = validationConfig.inputSelector;
    this._submitButtonSelector = validationConfig.submitButtonSelector;
    this._inactiveButtonClass = validationConfig.inactiveButtonClass;
    this._inputErrorClass = validationConfig.inputErrorClass;
    this._spanErrorClass = validationConfig.spanErrorClass;
    this._formInputs = Array.from(form.querySelectorAll(this._inputSelector));
    this._formButton = form.querySelector(this._submitButtonSelector);
  }

  enableValidation() {
    this._setEventListeners();
  }
  //Обработчик input на каждое поле
  _setEventListeners() {
    this._formInputs.forEach((input) => {
      input.addEventListener("input", () => {
        this._checkInputValidity(input);
        this._toggleFormButton();
      });
    });
  }
  // Контейнер текста ошибки для каждого поля
  _checkInputValidity(input) {
    const currentInputErrorContanier = this._form.querySelector(
      `${this._spanErrorClass}${input.name}`
    );
    if (input.validity.valid) {
      this._hideErrorMessage(input, currentInputErrorContanier);
    } else {
      this._cshowErrorMessage(input, currentInputErrorContanier);
    }
  }
  //Cкрыть сообщение об ошибке
  _hideErrorMessage(input, currentInputErrorContanier) {
    input.classList.remove(this._inputErrorClass);
    currentInputErrorContanier.textContent = " ";
  }
  //Показать сообщение об ошибке
  _cshowErrorMessage(input, currentInputErrorContanier) {
    input.classList.add(this._inputErrorClass);
    currentInputErrorContanier.textContent = input.validationMessage;
  }
  //Проверка на наличие невалидных полей
  _hasInvalidInput() {
    return this._formInputs.some((item) => !item.validity.valid);
  }

  _toggleFormButton() {
    if (this._hasInvalidInput()) {
      this._disableButton();
    } else {
      this._enableButton();
    }
  }

  //Активная кнопка
  _enableButton() {
    this._formButton.classList.remove(this._inactiveButtonClass);
    this._formButton.disabled = false;
  }

  //Неактивная кнопка
  _disableButton() {
    this._formButton.classList.add(this._inactiveButtonClass);
    this._formButton.disabled = true;
  }
  //Сброс ошибок
  resetValidation() {
    this._formInputs.forEach((input) => {
      const currentInputErrorContanier = this._form.querySelector(
        `${this._spanErrorClass}${input.name}`
      );
      if (!input.validity.valid) {
        this._hideErrorMessage(input, currentInputErrorContanier);
      }
    });
    this._disableButton();
    this._form.reset();
  }
}
