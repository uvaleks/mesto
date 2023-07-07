export default class UserInfo {
    constructor({ nameSelector, infoSelector, avatarSelector }) {
      this._name = document.querySelector(nameSelector);
      this._info = document.querySelector(infoSelector);
      this._avatar = document.querySelector(avatarSelector)
    }

    setUserInfo({ name, info, avatar }) {
      this._name.textContent = name;
      this._info.textContent = info;
      this._avatar.src = avatar;
    }
  }