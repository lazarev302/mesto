import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, submitFunction) {
    super(popupSelector);
    this._submitFunction = submitFunction;
    this._form = this._popup.querySelector(".form");
    this._inputList = this._form.querySelectorAll(".form__input");
    this._formButton = this._form.querySelector(".form__button");
    this._defaultTextButton = this._formButton.textContent;
  }

  _getInputsValue() {
    this._values = {};
    this._inputList.forEach((input) => {
      this._values[input.name] = input.value;
    });
    return this._values;
  }

  setInputsValue(dataUser) {
    this._inputList.forEach((input) => {
      input.value = dataUser[input.name];
    });
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this.renderLoading(true);
      this._submitFunction(this._getInputsValue());
    });
  }

  renderLoading(bulean, textLoading = "Сохранение...") {
    if (bulean) {
      this._formButton.textContent = textLoading;
    } else {
      this._formButton.textContent = this._defaultTextButton;
    }
  }

  close() {
    super.close();
    this._form.reset();
  }
}
