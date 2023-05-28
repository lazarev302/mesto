import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._popupImage = this._popup.querySelector(".popup__enlarged-image");
    this._popupImageCaption = this._popup.querySelector(".popup__title");
  }

  open = (cardData) => {
    this._popupImage.src = cardData.link;
    this._popupImage.alt = cardData.title;
    this._popupImageCaption.textContent = cardData.name;
    super.open();
  };
}
