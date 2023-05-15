import { Card } from './Card.js';
import { FormValidator } from './FormValidator.js';

export const validationConfig = {
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__submit-button',
    inactiveButtonClass: 'popup__submit-button_disabled',
    inputErrorClass: 'popup__input_invalid',
    errorClass: 'popup__input-error_visible'
}

export const initialCards = [
    {
      place: 'Карадаг',
      link: 'images/karadag.png'
    },
    {
      place: 'Старая Русса',
      link: 'images/staraya-russa.png'
    },
    {
      place: 'Никола-Ленивец',
      link: 'images/nikola-lenivets.png'
    },
    {
      place: 'Байкал',
      link: 'images/baikal.png'
    },
    {
      place: 'Соловки',
      link: 'images/solovki.png'
    },
    {
      place: 'Териберка',
      link: 'images/teriberka.png'
    }
]; 

const popupPhotoWrapper = document.querySelector('.popup_type_photo');
const popupPhoto = document.querySelector('.popup__photo');
const popupPhotoTitle = document.querySelector('.popup__photo-title');

export const openPhotoPopup = (src, title) => {
    popupPhoto.src = src;
    popupPhotoTitle.textContent = title;
    popupPhoto.alt = title;
    openPopup(popupPhotoWrapper);
};

const editButton = document.querySelector('.profile__edit-button');
const popupEditProfile = document.querySelector('.popup_type_edit');

const addButton = document.querySelector('.profile__add-button');
const popupAddCard = document.querySelector('.popup_type_add');

const cardInput = popupAddCard.querySelector('input[name="input-place"]');
const srcInput = popupAddCard.querySelector('input[name="input-link"]');

const findOpenPopup = () => { 
    const openedPopup = document.querySelector('.popup_opened'); 
    return openedPopup; 
}; 

const checkClickForClosingCondition = (e) => {
    if (e.target.classList.contains('popup')) {
        closePopup(e.target);
    };
};

const checkKeydownForClosingCondition = (e) => {
    if (e.key === 'Escape') {
        closePopup(findOpenPopup());
    };
};

const refreshEditForm = () => {
    nameInput.value = profileName.textContent;
    jobInput.value = profileJob.textContent;
    editFormValidator.refreshValidityState();
};

const refreshAddForm = () => {
    cardInput.value = '';
    srcInput.value = '';
    addFormValidator.refreshValidityState();
    addFormValidator.toggleSubmitButtonActivity();
};

const closePopup = (popup) => {
    popup.removeEventListener('click', checkClickForClosingCondition); 
    document.removeEventListener('keydown', checkKeydownForClosingCondition); 
    popup.classList.remove('popup_opened');
};

const openPopup = (popup) => {
    if (popup.classList.contains('popup_type_edit')) {
        refreshEditForm();
    } else if (popup.classList.contains('popup_type_add')) {
        refreshAddForm();
    };
    popup.classList.add('popup_opened');
    popup.addEventListener('click', checkClickForClosingCondition);
    document.addEventListener('keydown', checkKeydownForClosingCondition);
};

editButton.addEventListener('click', () => {
    openPopup(popupEditProfile);
}); 

const closePopupButtonList = document.querySelectorAll('.popup__close-button');


closePopupButtonList.forEach((closePopupButton) => {
    closePopupButton.addEventListener('click', () => {
        closePopup(findOpenPopup());
    });
});

addButton.addEventListener('click', () => {
    openPopup(popupAddCard);
}); 

const profileName = document.querySelector('#profile-name')
const profileJob = document.querySelector('#profile-description')
const nameInput = popupEditProfile.querySelector('input[name="input-name"]');
const jobInput = popupEditProfile.querySelector('input[name="input-description"]');

function handleEditFormSubmit (evt) {
    evt.preventDefault();
    profileName.textContent = nameInput.value;
    profileJob.textContent = jobInput.value;
    closePopup(popupEditProfile);
}

function handleAddFormSubmit (evt) {

    evt.preventDefault();

    const place = cardInput.value;
    const link = srcInput.value;

    const card = {
        place,
        link,
    };   
    closePopup(popupAddCard);
    renderCard(createCard(card).generateCard());
}

popupEditProfile.addEventListener('submit', handleEditFormSubmit);
popupAddCard.addEventListener('submit', handleAddFormSubmit);

const createCard = (card) => {
    return new Card(card, '.card-template');
};

const editFormValidator = new FormValidator(validationConfig, '.popup__edit-form');

const addFormValidator = new FormValidator(validationConfig, '.popup__add-form');

editFormValidator.enableValidation();

addFormValidator.enableValidation();

const cardGrid = document.querySelector('.elements');

const renderCard = (generatedCard) => {
    cardGrid.prepend(generatedCard);
};

initialCards.forEach((initalCard) => {
    renderCard(createCard(initalCard).generateCard());
});