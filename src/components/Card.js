export default class Card {
  constructor(cardData, selectorTemplate, openImagePopup, openDeleteCard) {
    this._cardData = cardData;
    this._link = cardData.link;
    this._name = cardData.title;
    this._selectorTemplate = selectorTemplate;
    this._openImagePopup = openImagePopup;
    this._openDeleteCard = openDeleteCard;
  }

  _getTemplate() {
    const cardClone = document
      .querySelector(this._selectorTemplate)
      .content.querySelector(".card__list")
      .cloneNode(true);

    return cardClone;
  }

  _hendleOpenImagePopup = () => {
    this._openImagePopup(this._cardData);
  };

  removeCard() {
    this._cloneElement.remove();
  }

  createCard() {
    this._cloneElement = this._getTemplate();
    this._imageElement = this._cloneElement.querySelector(".card__image");
    this._titleElement = this._cloneElement.querySelector(".card__title");
    this._imageElement.src = this._link;
    this._imageElement.alt = this._name;
    this._titleElement.textContent = this._name;
    this._likeElement = this._cloneElement.querySelector(".card__like-button");
    this._deleteElement = this._cloneElement.querySelector(
      ".card__delete-button"
    );
    this._setEventListeners();
    return this._cloneElement;
  }

  _setEventListeners() {
    this._imageElement.addEventListener("click", this._hendleOpenImagePopup);
    this._likeElement.addEventListener("click", this._activeLike);
    this._deleteElement.addEventListener("click", this._hendleDelete);
  }

  //Лайк
  _activeLike = () => {
    this._likeElement.classList.toggle("card__like-button_active");
  };

  // Удаление
  _hendleDelete = () => {
    this._openDeleteCard(this);
  };
}
