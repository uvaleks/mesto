import Popup from './Popup.js';
import { refreshUserInfo } from '../pages/index.js';

export default class PopupWithForm extends Popup {
    constructor({popupSelector, submitCallback}) {
        super(popupSelector);
        this._form = this._popup.querySelector('.popup__edit-form');
        this._inputList = Array.from(this._form.querySelectorAll('.popup__input'));
        this._submitCallback = submitCallback;
    }
  
    _getInputValues() {
        const values = {};
        this._inputList.forEach(input => {
            values[input.name] = input.value;
        });
        return values;
    }
  
    setEventListeners() {
        super.setEventListeners();
        this._form.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._submitCallback(this._getInputValues());
            this.close();
        });
    }
  
    close() {
        super.close();
        //this._form.reset();
    }

    open() {
        refreshUserInfo();
        super.open();
      }
  }
  