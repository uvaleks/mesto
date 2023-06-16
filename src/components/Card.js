export default class Card {
    constructor (cardData, templateSelector, opener) {
        this._opener = opener;
        this._templateSelector = templateSelector;
        this._cardTemplate = document.querySelector(this._templateSelector);
        this._templateContent = this._cardTemplate.content.querySelector('.card').cloneNode(true);
        this._cardTitleElement = this._templateContent.querySelector('.card__title');
        this._cardTitle = cardData.name;
        this._cardImgElement = this._templateContent.querySelector('.card__photo');
        this._cardImgSrc = cardData.link;
        this._cardLikesNum = cardData.likes.length;
        this._likeButton = this._templateContent.querySelector('.card__like-button');
        this._likesCounter = this._templateContent.querySelector('.card__like-counter');
        this._deleteButton = this._templateContent.querySelector('.card__delete-button');
    }

    _deleteCard() {
        this._templateContent.remove();
        this._templateContent = null;
    }

    _likeCard() {
        this._likeButton.classList.toggle('card__like-button_active');
        this.updateLikes();
    }

    updateLikes() {
        this._cardLikesNum !=  0
        ? this._likesCounter.textContent = this._cardLikesNum
        : this._likesCounter.textContent = '';
        
    }

    _setCardListenters() {
        this._likeButton.addEventListener('click', () => {
            this._likeCard();
        })
        this._deleteButton.addEventListener('click', () => {
            this._deleteCard();
        });
        this._cardImgElement.addEventListener('click', () => {
            this._opener(this._cardTitle, this._cardImgSrc);
        });
    }

    generateCard() {
        this._cardTitleElement.textContent = this._cardTitle;
        this._cardImgElement.src = this._cardImgSrc;
        this._cardImgElement.alt = this._cardTitle;

        this._setCardListenters();

        return this._templateContent;
    }
}


