import { popupConfig } from '../utils/constants.js';

export default class Popup {
    constructor(popupSelector) {
        this._popup = document.querySelector(popupSelector);
    }
  
    open() {
        this._popup.classList.add(popupConfig.openedPopupClass);
        document.addEventListener('keydown', this._handleEscClose);
    }
  
    close() {
        this._popup.classList.remove(popupConfig.openedPopupClass);
        document.removeEventListener('keydown', this._handleEscClose);
    }
  
    _handleEscClose = (evt) => {
        if (evt.key === 'Escape') {
            this.close();
        }
    }

    setEventListeners() {
        this._popup.querySelector(popupConfig.popupCloseButtonSelector)
            .addEventListener('click', () => {
            this.close();
            });
    
        this._popup.addEventListener('mousedown', (evt) => {
            if (evt.target.classList.contains('popup')) {
            this.close();
            }
        });
    }
}