import Popup from "./Popup.js";

export default class PopupDeleteCard extends Popup {
  constructor(popupSelector, submitFunction) {
    super(popupSelector);
    this._submitFunction = submitFunction;
    this._form = this._popup.querySelector(".form");
    this._formButton = this._form.querySelector(".form__button");
    this._defaultTextButton = this._formButton.textContent;
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._formButton.textContent = `Удаление...`;
      this._submitFunction({ card: this._element, cardId: this._cardId });
    });
  }

  textButtonLoading() {
    this._formButton.textContent = this._defaultTextButton;
  }

  open = ({ card, cardId }) => {
    super.open();
    this._element = card;
    this._cardId = cardId;
  };
}
