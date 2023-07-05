import './index.css';

import Api from '../components/Api.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import { validationConfig, initialCards } from '../utils/constants.js';
import PopupDeleteConfirm from '../components/PopupDeleteConfirm';

const editButton = document.querySelector('.profile__edit-button');
const popupEditProfile = document.querySelector('.popup_type_edit');

const addButton = document.querySelector('.profile__add-button');
//const popupAddCard = document.querySelector('.popup_type_add');

// const cardInput = popupAddCard.querySelector('input[name="input-place"]');
// const srcInput = popupAddCard.querySelector('input[name="input-link"]');

const nameInput = popupEditProfile.querySelector('input[name="input-name"]');
const descriptionInput = popupEditProfile.querySelector('input[name="input-description"]');

const api = new Api({
    baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-68',
    headers: {
      authorization: 'b14febf0-0b28-4e38-a9e1-9974acb9fa00'
    }
  });

const mestoUserInfo = new UserInfo({ nameSelector: '#profile-name', infoSelector: '#profile-description' });

export let userId = '';

const loadUserInfo = () => {
    api.getUserInfo()
    .then((info) => {
        mestoUserInfo.setUserInfo({name: info.name, info: info.about})
        userId = info._id
    })
    .catch((err) => {
        console.error(err);
    });
}

loadUserInfo();

const opener = (cardTitle, cardImgSrc) => {
    photoPopup.open(cardTitle, cardImgSrc);
}

const delConfirmOpener = (card) => {
    deleteCardPopup.open(card);
}

const likeRemover = (id) => {
    return api.deleteLike(id)
    .then((info) => {
        console.log(info.likes.length);
        let likes = info.likes.length;
        return likes;
    })
    .catch((err) => {
        console.error(err);
    });
};

const likePutter = (id) => {
    return api.putLike(id)
    .then((info) => {
        console.log(info.likes.length);
        let likes = info.likes.length;
        return likes;
    })
    .catch((err) => {
        console.error(err);
    })
}


const createCard = (card) => {
    return new Card(card, '.card-template', opener, delConfirmOpener, likeRemover, likePutter).generateCard()
};

const createOwnCard = (card) => {
    return new Card(card, '.own-card-template', opener, delConfirmOpener, likeRemover, likePutter).generateCard()
};

const mestoSection = new Section({items: initialCards, renderer: createCard, rendererForOwn: createOwnCard}, '.elements');

const renderInitialCards = () => {
    api.getInitialCards()
    .then((info) => {
        mestoSection.renderItems(info);
    })
    .catch((err) => {
        console.error(err);
    });
}

renderInitialCards();

const renderPostedCard = ({name, link}) => {
    api.postCard({name, link})
    .then(() => {
        cardsContainer.innerHTML = '';
        renderInitialCards();
    })
    .catch((err) => {
        console.error(err);
    });
}

const postUserInfo = ({name, info}) => {
    api.patchUserInfo({name, info})
    .catch((err) => {
        console.error(err);
    });
}

function refreshEditForm() {
    api.getUserInfo()
    .then((info) => {
        nameInput.value = info.name;
        descriptionInput.value = info.about;
    })
    .catch((err) => {
        console.error(err);
    });
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
    postUserInfo({name, info: description});
    mestoUserInfo.setUserInfo({name, info: description});
}

function handleAddFormSubmit({ 'input-place': name, 'input-link': link }) {
    renderPostedCard({name, link});
}

const cardsContainer = document.querySelector('.elements');

function handleDeleteCardFormSubmit(card) {
    api.deleteCard(card.getAttribute("id"))
    .then(() => {
        cardsContainer.innerHTML = '';
        renderInitialCards();
    })
    .catch((err) => {
        console.error(err);
    });
}

const editFormPopup = new PopupWithForm({popupSelector: '.popup_type_edit', submitter: handleEditFormSubmit, refresher: refreshEditForm});
editFormPopup.setEventListeners();

const addFormPopup = new PopupWithForm({popupSelector: '.popup_type_add', submitter: handleAddFormSubmit, refresher: refreshAddForm});
addFormPopup.setEventListeners();

const deleteCardPopup = new PopupDeleteConfirm({popupSelector: '.popup_type_confirm-delete', submitter: handleDeleteCardFormSubmit});
deleteCardPopup.setEventListeners();

const editFormValidator = new FormValidator(validationConfig, '.popup__edit-form');
const addFormValidator = new FormValidator(validationConfig, '.popup__add-form');

editFormValidator.enableValidation();
addFormValidator.enableValidation();

const photoPopup = new PopupWithImage('.popup_type_photo');
photoPopup.setEventListeners();