import Section from '../components/Section.js';
import Popup from '../components/Popup.js';
import PopupWithImage from '../components/PopupWithImage.js';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import { validationConfig, initialCards } from '../utils/constants.js';

const editButton = document.querySelector('.profile__edit-button');
const popupEditProfile = document.querySelector('.popup_type_edit');

const addButton = document.querySelector('.profile__add-button');
const popupAddCard = document.querySelector('.popup_type_add');

const cardInput = popupAddCard.querySelector('input[name="input-place"]');
const srcInput = popupAddCard.querySelector('input[name="input-link"]');

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

editButton.addEventListener('click', () => {
    refreshEditForm();
    EditPopup.open();
}); 

addButton.addEventListener('click', () => {
    refreshAddForm();
    AddPopup.open();
});

const profileName = document.querySelector('#profile-name')
const profileJob = document.querySelector('#profile-description')
const nameInput = popupEditProfile.querySelector('input[name="input-name"]');
const jobInput = popupEditProfile.querySelector('input[name="input-description"]');

function handleEditFormSubmit (evt) {
    evt.preventDefault();
    profileName.textContent = nameInput.value;
    profileJob.textContent = jobInput.value;
    EditPopup.close();
}

function handleAddFormSubmit (evt) {

    evt.preventDefault();

    const place = cardInput.value;
    const link = srcInput.value;

    const card = {
        place,
        link,
    };   
    AddPopup.close();
    renderCard(createCard(card));
}

const cardGrid = document.querySelector('.elements');

const renderCard = (generatedCard) => {
    cardGrid.prepend(generatedCard);
};

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

const EditPopup = new Popup('.popup_type_edit');
EditPopup.setEventListeners();

const AddPopup = new Popup('.popup_type_add');
AddPopup.setEventListeners();

export const PhotoPopup = new PopupWithImage('.popup_type_photo');
PhotoPopup.setEventListeners();