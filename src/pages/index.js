import Section from '../components/Section.js';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import { validationConfig, initialCards } from '../utils/constants.js';

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
    document.removeEventListener('keydown', checkKeydownForClosingCondition); 
    popup.classList.remove('popup_opened');
};

const openPopup = (popup) => {
    popup.classList.add('popup_opened');
    document.addEventListener('keydown', checkKeydownForClosingCondition);
};

editButton.addEventListener('click', () => {
    refreshEditForm();
    openPopup(popupEditProfile);
}); 

addButton.addEventListener('click', () => {
    refreshAddForm();
    openPopup(popupAddCard);
});

const closePopupButtonList = document.querySelectorAll('.popup__close-button');

closePopupButtonList.forEach(button => {
    const buttonsPopup = button.closest('.popup');
    button.addEventListener('click', () => closePopup(buttonsPopup));
});

document.querySelectorAll('.popup').forEach(popup => {
    popup.addEventListener('click', checkClickForClosingCondition);
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
    renderCard(createCard(card));
}

popupEditProfile.addEventListener('submit', handleEditFormSubmit);
popupAddCard.addEventListener('submit', handleAddFormSubmit);

const editFormValidator = new FormValidator(validationConfig, '.popup__edit-form');
const addFormValidator = new FormValidator(validationConfig, '.popup__add-form');

editFormValidator.enableValidation();
addFormValidator.enableValidation();

const createCard = (card) => {
    return new Card(card, '.card-template').generateCard();
};

const renderer = (initalCard) => {
    return createCard(initalCard);
}

new Section({items: initialCards, renderer}, '.elements').renderItems();