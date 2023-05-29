import "./index.css";
import Card from "../components/Card.js";
import FormValidation from "../components/FormValidation.js";
import PopupWithImage from "../components/PopupWithImage.js";
import Section from "../components/Section.js";
import UserInfo from "../components/UserInfo.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupDeleteCard from "../components/PopupDeleteCard.js";
import Api from "../components/Api.js";
import {
  popupProfileOpenButtonElement,
  popupPlaceOpenButtonElement,
  popupAvatarOpenButtonElevent,
  selectorTemplate,
  popupProfileSelector,
  popupPlaceSelector,
  popupImageSelector,
  listElementsSelector,
  popupAvatarSelector,
  popupDeleteSelector,
  infoProfileConfig,
  validationConfig,
  formsValidation,
} from "../utils/constants.js";

const api = new Api({
  baseUrl: "https://mesto.nomoreparties.co/v1/cohort-66",
  headers: {
    authorization: "97a94a36-8f80-45a6-b120-5afadbd06461",
    "Content-Type": "application/json",
  },
});

function createNewCard(element) {
  const newCard = new Card(
    element,
    selectorTemplate,
    popupImage.open,
    deleteCard.open,
    (likeElement, cardId) => {
      if (likeElement.classList.contains("card__like-button_active")) {
        api
          .deleteLike(cardId)
          .then((res) => {
            newCard.toggleLike(res.likes);
          })
          .catch((error) => console.error(`Ошибка при снятии лайка ${error}`));
      } else {
        api
          .addLike(cardId)
          .then((res) => {
            newCard.toggleLike(res.likes);
          })
          .catch((error) =>
            console.error(`Ошибка при добавлении лайка ${error}`)
          );
      }
    }
  );
  return newCard.createCard();
}

const section = new Section((element) => {
  section.addItem(createNewCard(element));
}, listElementsSelector);

const popupProfile = new PopupWithForm(popupProfileSelector, (data) => {
  api
    .setUserInfo(data)
    .then((res) => {
      userInfo.setUserInfo({
        username: res.name,
        job: res.about,
        avatar: res.avatar,
      });
      popupProfile.close();
    })
    .catch((error) =>
      console.error(`Ошибка при редактировании профиля ${error}`)
    )
    .finally(() => popupProfile.renderLoading(false));
});

const userInfo = new UserInfo(infoProfileConfig);

const popupImage = new PopupWithImage(popupImageSelector);

const deleteCard = new PopupDeleteCard(
  popupDeleteSelector,
  ({ card, cardId }) => {
    api
      .deleteCard(cardId)
      .then(() => {
        card.removeCard();
        deleteCard.close();
      })
      .catch((error) => console.error(`Ошибка при удалении карточки ${error}`))
      .finally(() => deleteCard.renderLoading(false));
  }
);

const popupPlace = new PopupWithForm(popupPlaceSelector, (data) => {
  api
    .addCard(data)
    .then((dataCard) => {
      dataCard.myid = userInfo.getId();
      section.addItem(createNewCard(dataCard));
      popupPlace.close();
    })
    .catch((error) =>
      console.error(`Ошибка при создании новой карточки ${error}`)
    )
    .finally(() => popupPlace.renderLoading(false));
});

const popupAvatar = new PopupWithForm(popupAvatarSelector, (data) => {
  api
    .setNewAvatar(data)
    .then((res) => {
      userInfo.setUserInfo({
        username: res.name,
        job: res.about,
        avatar: res.avatar,
      });
      popupAvatar.close();
    })
    .catch((error) => console.error(`Ошибка при обновлении аватара ${error}`))
    .finally(() => popupAvatar.renderLoading(false));
});

function openProfilePopup() {
  formsValidation.formProfile.resetValidation();
  popupProfile.setInputsValue(userInfo.getUserInfo());
  popupProfile.open();
}

function openPlacePopup() {
  formsValidation.formPlace.resetValidation();
  popupPlace.open();
}

Array.from(document.forms).forEach((item) => {
  const form = new FormValidation(validationConfig, item);
  const name = item.getAttribute("name");
  formsValidation[name] = form;
  form.enableValidation();
});

popupProfile.setEventListeners();
popupPlace.setEventListeners();
popupImage.setEventListeners();
popupAvatar.setEventListeners();
deleteCard.setEventListeners();

popupProfileOpenButtonElement.addEventListener("click", openProfilePopup);
popupPlaceOpenButtonElement.addEventListener("click", openPlacePopup);
popupAvatarOpenButtonElevent.addEventListener("click", () => {
  formsValidation.formAvatar.resetValidation();
  popupAvatar.open();
});

Promise.all([api.getInfo(), api.getCards()])
  .then(([dataUser, dataCard]) => {
    dataCard.forEach((element) => (element.myid = dataUser._id));
    userInfo.setUserInfo({
      username: dataUser.name,
      job: dataUser.about,
      avatar: dataUser.avatar,
    });
    userInfo.setId(dataUser._id);
    section.renderItems(dataCard.reverse());
  })
  .catch((error) =>
    console.error(`Ошибка при создании начальных данных ${error}`)
  );
