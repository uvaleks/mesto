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

function refreshEditForm() {
    const userInfo = MestoUserInfo.getUserInfo();
    nameInput.value = userInfo.name;
    descriptionInput.value = userInfo.info;
    EditFormValidator.refreshValidityState();
}

editButton.addEventListener('click', () => {
    EditFormPopup.open();
}); 

const refreshAddForm = () => {
    cardInput.value = '';
    srcInput.value = '';
    AddFormValidator.refreshValidityState();
    AddFormValidator.toggleSubmitButtonActivity();
};

addButton.addEventListener('click', () => {
    AddFormPopup.open();
});

const profileName = document.querySelector('#profile-name')
const profileDescription = document.querySelector('#profile-description')
const nameInput = popupEditProfile.querySelector('input[name="input-name"]');
const descriptionInput = popupEditProfile.querySelector('input[name="input-description"]');

function handleEditFormSubmit ({ 'input-name': name, 'input-description': description }) {
    profileName.textContent = name;
    profileDescription.textContent = description;
}

function handleAddFormSubmit() {
    const place = cardInput.value;
    const link = srcInput.value;
    const card = {
        place,
        link,
    };
    MestoSection.addItem(renderer(card));
}

const EditFormPopup = new PopupWithForm({popupSelector: '.popup_type_edit', submitter: handleEditFormSubmit, refresher: refreshEditForm});
EditFormPopup.setEventListeners();

const AddFormPopup = new PopupWithForm({popupSelector: '.popup_type_add', submitter: handleAddFormSubmit, refresher: refreshAddForm});
AddFormPopup.setEventListeners();

const MestoUserInfo = new UserInfo({ nameSelector: '#profile-name', infoSelector: '#profile-description' });

const EditFormValidator = new FormValidator(validationConfig, '.popup__edit-form');
const AddFormValidator = new FormValidator(validationConfig, '.popup__add-form');

EditFormValidator.enableValidation();
AddFormValidator.enableValidation();

const opener = (cardTitle, cardImgSrc) => {
    PhotoPopup.open(cardTitle, cardImgSrc);
}

const createCard = (card) => {
    return new Card(card, '.card-template', opener).generateCard();
};

const renderer = (card) => {
    return createCard(card);
}

const MestoSection = new Section({items: initialCards, renderer}, '.elements');
MestoSection.renderItems();

const PhotoPopup = new PopupWithImage('.popup_type_photo');
PhotoPopup.setEventListeners();