import Popup from './Popup.js';

export default class PopupDeleteConfirm extends Popup {
    constructor({popupSelector, submitter}) {
        super(popupSelector);
        this._form = this._popup.querySelector('.popup__form');
        this._submitter = submitter;
    }

    open(card) {           
        console.log('Open delete confirm popup for card with ID' + card.getAttribute("id"));
        this._card = card;
        super.open()
    }

    setEventListeners() {
        super.setEventListeners();
        this._form.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._submitter(this._card);
            this.close();
        });
    }
  }
  