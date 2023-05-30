import './index.css';

import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import { validationConfig, initialCards } from '../utils/constants.js';

const editButton = document.querySelector('.profile__edit-button');
const popupEditProfile = document.querySelector('.popup_type_edit');

const addButton = document.querySelector('.profile__add-button');
const popupAddCard = document.querySelector('.popup_type_add');

const cardInput = popupAddCard.querySelector('input[name="input-place"]');
const srcInput = popupAddCard.querySelector('input[name="input-link"]');

const nameInput = popupEditProfile.querySelector('input[name="input-name"]');
const descriptionInput = popupEditProfile.querySelector('input[name="input-description"]');


function refreshEditForm() {
    const userInfo = mestoUserInfo.getUserInfo();
    nameInput.value = userInfo.name;
    descriptionInput.value = userInfo.info;
    editFormValidator.refreshValidityState();
}

editButton.addEventListener('click', () => {
    editFormPopup.open();
}); 

const refreshAddForm = () => {
    addFormValidator.refreshValidityState();
    addFormValidator.toggleSubmitButtonActivity();
};

addButton.addEventListener('click', () => {
    addFormPopup.open();
});

function handleEditFormSubmit ({ 'input-name': name, 'input-description': description }) {
    mestoUserInfo.setUserInfo({name, info: description});
}

function handleAddFormSubmit({ 'input-place': place, 'input-link': link }) {
    mestoSection.addItem(renderer({place, link}));
}

const editFormPopup = new PopupWithForm({popupSelector: '.popup_type_edit', submitter: handleEditFormSubmit, refresher: refreshEditForm});
editFormPopup.setEventListeners();

const addFormPopup = new PopupWithForm({popupSelector: '.popup_type_add', submitter: handleAddFormSubmit, refresher: refreshAddForm});
addFormPopup.setEventListeners();

const mestoUserInfo = new UserInfo({ nameSelector: '#profile-name', infoSelector: '#profile-description' });

const editFormValidator = new FormValidator(validationConfig, '.popup__edit-form');
const addFormValidator = new FormValidator(validationConfig, '.popup__add-form');

editFormValidator.enableValidation();
addFormValidator.enableValidation();

const opener = (cardTitle, cardImgSrc) => {
    photoPopup.open(cardTitle, cardImgSrc);
}

const createCard = (card) => {
    return new Card(card, '.card-template', opener).generateCard();
};

const renderer = createCard

const mestoSection = new Section({items: initialCards, renderer}, '.elements');
mestoSection.renderItems();

const photoPopup = new PopupWithImage('.popup_type_photo');
photoPopup.setEventListeners();