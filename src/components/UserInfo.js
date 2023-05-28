export default class UserInfo {
  constructor(infoProfileConfig) {
    this._profileName = document.querySelector(infoProfileConfig.nameSelector);
    this._profileJob = document.querySelector(infoProfileConfig.jobSelector);
    this._popupAvatar = document.querySelector(
      infoProfileConfig.avatarSelector
    );
  }

  getUserInfo() {
    return {
      username: this._profileName.textContent,
      job: this._profileJob.textContent,
    };
  }

  setUserInfo({ avatar, username, job }) {
    this._popupAvatar.src = avatar;
    this._profileName.textContent = username;
    this._profileJob.textContent = job;
  }
}
