import { openPhotoPopup } from './index.js';

export class Card {
    constructor (cardData, templateSelector) {
        this._templateSelector = templateSelector;
        this._cardTemplate = document.querySelector(this._templateSelector);
        this._templateContent = this._cardTemplate.content.querySelector('.card').cloneNode(true);
        this._cardTitleElement = this._templateContent.querySelector('.card__title');
        this._cardTitle = cardData.place;
        this._cardImgElement = this._templateContent.querySelector('.card__photo');
        this._cardImgSrc = cardData.link;
        this._likeButton = this._templateContent.querySelector('.card__like-button');
        this._deleteButton = this._templateContent.querySelector('.card__delete-button');
        this._popupPhoto = document.querySelector('.popup_type_photo');
    }

    _deleteCard(card) {
        card.remove();
    }

    _likeCard(like) {
        like.classList.toggle('card__like-button_active');
    }

    _setCardListenters(card) {
        this._likeButton.addEventListener('click', () => {
            this._likeCard(this._likeButton);
        })
        this._deleteButton.addEventListener('click', () => {
            this._deleteCard(this._templateContent);
        });
        this._cardImgElement.addEventListener('click', () => {
            openPhotoPopup(this._popupPhoto, this._cardImgElement.src, this._cardImgElement.alt)
        });
    }

    generateCard() {
        this._cardTitleElement.textContent = this._cardTitle;
        this._cardImgElement.src = this._cardImgSrc;
        this._cardImgElement.alt = this._cardTitle;

        this._setCardListenters(this._templateContent);

        return this._templateContent;
    }
}


