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

export const openPhotoPopup = (popup, src, title) => {
    const popupPhoto = popup.querySelector('.popup__photo');
    popupPhoto.src = src;

    const popupPhotoTitle = popup.querySelector('.popup__photo-title');
    popupPhotoTitle.textContent = title;
    popupPhoto.alt = title;

    popup.classList.add('popup_opened');

    popup.addEventListener('click', checkClickForClosingCondition);

    document.addEventListener('keydown', checkKeydownForClosingCondition);
};

const editButton = document.querySelector('.profile__edit-button');
const popupEditProfile = document.querySelector('.popup__type_edit');

const addButton = document.querySelector('.profile__add-button');
const popupAddCard = document.querySelector('.popup__type_add');

const cardInput = popupAddCard.querySelector('input[name="input-place"]');
const srcInput = popupAddCard.querySelector('input[name="input-link"]');

const findOpenPopup = () => {
    const openedPopup = document.querySelector('.popup_opened');
    return openedPopup;
};

const checkClickForClosingCondition = (e) => {
    if (e.target === findOpenPopup()) {
        closePopup();
    };
};

const checkKeydownForClosingCondition = (e) => {
    if (e.key === 'Escape') {
        closePopup();
    };
};

const refreshForm = () => {
    cardInput.value = '';
    cardInput.classList.remove(validationConfig.inputErrorClass);
    document.querySelector(`.${cardInput.name}-error`).classList.remove(validationConfig.errorClass);

    srcInput.value = '';
    srcInput.classList.remove(validationConfig.inputErrorClass);
    document.querySelector(`.${srcInput.name}-error`).classList.remove(validationConfig.errorClass);

    nameInput.value = profileName.textContent;
    jobInput.value = profileJob.textContent;
};

const closePopup = () => {
    if (findOpenPopup() !== null) {
    findOpenPopup().removeEventListener('click', checkClickForClosingCondition);
    document.removeEventListener('keydown', checkKeydownForClosingCondition);
    findOpenPopup().classList.remove('popup_opened');
    refreshForm();
    };
};

const openPopup = (popup) => {
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
        closePopup();
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
    if (nameInput.value !== '') {
        profileName.textContent = nameInput.value;
    } else; 
    if (jobInput.value !== '') {
        profileJob.textContent = jobInput.value;
    } else; 
    closePopup();
}

function handleAddFormSubmit (evt) {

    evt.preventDefault();

    const place = cardInput.value;
    const link = srcInput.value;

    const createdCard = {
        place,
        link,
    };   

    closePopup();
    const newCard = new Card(createdCard, '.card-template');
    renderCard(newCard.generateCard());
}

popupEditProfile.addEventListener('submit', handleEditFormSubmit);
popupAddCard.addEventListener('submit', handleAddFormSubmit);


const EditFormValidator = new FormValidator(validationConfig, '.popup__edit-form');

const AddFormValidator = new FormValidator(validationConfig, '.popup__add-form');

EditFormValidator.enableValidation();

AddFormValidator.enableValidation();

const cardGrid = document.querySelector('.elements');

const renderCard = (generatedCard) => {
    cardGrid.prepend(generatedCard);
};

initialCards.forEach((initalCard) => {
    const newCard = new Card(initalCard, '.card-template');
    renderCard(newCard.generateCard());
});
