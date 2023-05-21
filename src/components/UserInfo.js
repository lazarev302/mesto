export default class UserInfo {
  constructor(infoProfileConfig) {
    this._profileName = document.querySelector(infoProfileConfig.nameSelector);
    this._profileJob = document.querySelector(infoProfileConfig.jobSelector);
  }

  getUserInfo() {
    return {
      name: this._profileName.textContent,
      job: this._profileJob.textContent,
    };
  }

  setUserInfo(dataUser) {
    this._profileName.textContent = dataUser.name;
    this._profileJob.textContent = dataUser.job;
  }
}
