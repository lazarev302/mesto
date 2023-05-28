export default class Card {
  constructor(
    cardData,
    selectorTemplate,
    openImagePopup,
    openDeleteCard,
    checkLike
  ) {
    this._cardData = cardData;
    this._link = cardData.link;
    this._name = cardData.name;
    this._myId = cardData.myid;
    this._ownerId = cardData.owner._id;
    this._likes = cardData.likes;
    this._likesLength = cardData.likes.length;
    this._checkLike = checkLike;
    this._cardId = cardData._id;
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
    this._counter = this._cloneElement.querySelector(".card__like-counter");
    this._deleteElement = this._cloneElement.querySelector(
      ".card__delete-button"
    );

    this._checkVisibleByDeleteButton();
    this._checkVisibleLikes();
    this._setEventListeners();
    return this._cloneElement;
  }

  _setEventListeners() {
    this._imageElement.addEventListener("click", this._hendleOpenImagePopup);
    this._likeElement.addEventListener("click", this._activeLike);
    this._deleteElement.addEventListener("click", this._hendleDelete);
  }

  _checkVisibleByDeleteButton() {
    if (this._myId !== this._ownerId) {
      this._deleteElement.remove();
    }
  }

  _checkVisibleLikes() {
    this._likes.forEach((element) => {
      if (element._id === this._myId) {
        this._likeElement.classList.add("card__like-button_active");
        return;
      }
    });

    this._counter.textContent = this._likesLength;
  }

  toggleLike(likes) {
    this._likeElement.classList.toggle("card__like-button_active");
    this._counter.textContent = likes.length;
  }

  _activeLike = () => {
    this._checkLike(this._likeElement, this._cardId);
  };

  _hendleDelete = () => {
    this._openDeleteCard({ card: this, cardId: this._cardId });
  };
}
