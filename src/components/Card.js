import { userId } from '../pages/index.js';

export default class Card {
    constructor (cardData, templateSelector, opener, delConfirmOpener, likeRemover, likePutter) {
        this._likePutter = likePutter;
        this._likeRemover = likeRemover;
        this._delConfirmOpener = delConfirmOpener;
        this._opener = opener;
        this._templateSelector = templateSelector;
        this._cardTemplate = document.querySelector(this._templateSelector);
        this._templateContent = this._cardTemplate.content.querySelector('.card').cloneNode(true);
        this._cardTitleElement = this._templateContent.querySelector('.card__title');
        this._cardTitle = cardData.name;
        this._cardImgElement = this._templateContent.querySelector('.card__photo');
        this._cardImgSrc = cardData.link;
        this._cardLikes = cardData.likes;
        this._cardLikesNum = cardData.likes.length;
        this._likeButton = this._templateContent.querySelector('.card__like-button');
        this._likesCounter = this._templateContent.querySelector('.card__like-counter');
        this._deleteButton = this._templateContent.querySelector('.card__delete-button');
        this._id = cardData._id;
    }

    deleteCard() {
        this._templateContent.remove();
        this._templateContent = null
    }

    _likeCard() {
        if (this._likeButton.classList.contains('card__like-button_active')) {
            this._likeRemover(this._id)
            .then((likes) => {
                this.updateLikes(likes);
            })
            this._likeButton.classList.remove('card__like-button_active')
        } else {
            this._likePutter(this._id)
            .then((likes) => {
                this.updateLikes(likes);
            });
            this._likeButton.classList.add('card__like-button_active')
        }
    }

    updateLikes(likes) {
        if (likes !== undefined) {
            likes !=  0
            ? this._likesCounter.textContent = likes
            : this._likesCounter.textContent = '';
        } else {
            this._cardLikesNum !=  0
            ? this._likesCounter.textContent = this._cardLikesNum
            : this._likesCounter.textContent = '';
        }
    }

    _setCardListenters() {
        this._likeButton.addEventListener('click', () => {
            this._likeCard();
        });

        if (this._deleteButton) {
            this._deleteButton.addEventListener('click', () => {
                this._delConfirmOpener(this._templateContent);
            })
        }

        this._cardImgElement.addEventListener('click', () => {
            this._opener(this._cardTitle, this._cardImgSrc);
        });
    }

    generateCard() {
        if (this._cardLikes.some(obj => obj._id === userId)) {
            this._likeButton.classList.add('card__like-button_active')
        };
        this._cardTitleElement.textContent = this._cardTitle;
        this._cardImgElement.src = this._cardImgSrc;
        this._cardImgElement.alt = this._cardTitle;
        this._templateContent.id = this._id;
        this._setCardListenters();
        this.updateLikes();
        return this._templateContent;     
    }
}


