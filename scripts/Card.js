export default class Card {
  constructor(data, selectorTemplate, openImagePopup) {
    this._data = data;
    this._link = data.link;
    this._name = data.name;
    this._selectorTemplate = selectorTemplate;
    this._openImagePopup = openImagePopup;
  }

  _getTemplate() {
    const cardClone = document
      .querySelector(this._selectorTemplate)
      .content.querySelector(".card__list")
      .cloneNode(true);

    return cardClone;
  }

  _hendleOpenImagePopup = () => {
    this._openImagePopup(this._data);
  };

  createCard() {
    this._cloneElement = this._getTemplate();
    this._imageElement = this._cloneElement.querySelector(".card__image");
    this._imageElement.addEventListener("click", this._hendleOpenImagePopup);
    this._titleElement = this._cloneElement.querySelector(".card__title");
    this._imageElement.src = this._link;
    this._imageElement.alt = this._name;
    this._titleElement.textContent = this._name;

    this._likeElement = this._cloneElement.querySelector(".card__like-button");
    this._likeElement.addEventListener("click", this._activeLike);

    this._deliteElement = this._cloneElement.querySelector(
      ".card__delete-button"
    );
    this._deliteElement.addEventListener("click", this._hendleDelete);

    return this._cloneElement;
  }

  //Лайк
  _activeLike(evt) {
    evt.target.classList.toggle("card__like-button_active");
  }

  // Удаление
  _hendleDelete(evt) {
    evt.target.closest(".card__list").remove();
  }
}
