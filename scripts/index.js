const initialCards = [
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

const cardTemplate = document.querySelector('.card-template');
const cardGrid = document.querySelector('.elements');

const popupPhoto = document.querySelector('.popup_type_photo');
const popupPhotoImg = popupPhoto.querySelector('.popup__photo');
const popupPhotoTitle = popupPhoto.querySelector('.popup__photo-title');

const likeCard = (e) => {
    e.target.classList.toggle('card__like-button_active');
};

const closeButtonList = document.querySelectorAll('.popup__close-button');

closeButtonList.forEach((closeButton) => {
    closeButton.addEventListener('click', () => {
        closePopup();
    });
});

const generateCard = (cardData) => {
    const templateContent = cardTemplate.content.querySelector('.card').cloneNode(true);

    const cardTitle = templateContent.querySelector('.card__title');
    const cardPhoto = templateContent.querySelector('.card__photo');

    cardTitle.textContent = cardData.place;
    cardPhoto.src = cardData.link;
    cardPhoto.alt = cardData.place;

    const likeButton = templateContent.querySelector('.card__like-button');
    const deleteButton = templateContent.querySelector('.card__delete-button');

    likeButton.addEventListener('click', likeCard);
    deleteButton.addEventListener('click', () => {
            templateContent.remove();
    });

    const openPhotoPopup = (src, alt) => {
        popupPhotoImg.src = src;
        popupPhotoTitle.textContent = alt;
        popupPhotoImg.alt = alt;

        openPopup(popupPhoto);
    };

    cardPhoto.addEventListener('click', () => {
        openPhotoPopup(cardPhoto.src, cardPhoto.alt)
    });

    return templateContent;
};

const renderCard = (createdCard) => {
    cardGrid.prepend(createdCard);
};

initialCards.forEach((initalCard) => {
    const createdCard = generateCard(initalCard);
    renderCard(createdCard);
});

const editButton = document.querySelector('.profile__edit-button');
const popupEditProfile = document.querySelector('.popup_type_edit');

const addButton = document.querySelector('.profile__add-button');
const popupAddCard = document.querySelector('.popup_type_add');
const inputPlaceError = popupAddCard.querySelector('.input-place-error');
const inputLinkError = popupAddCard.querySelector('.input-link-error');

const cardInput = popupAddCard.querySelector('input[name="input-place"]');
const srcInput = popupAddCard.querySelector('input[name="input-link"]');

const getCurrentPopup = () => {
    const openedPopup = document.querySelector('.popup_opened');
    return openedPopup;
};

const checkClickForClosingCondition = (e) => {
    if (e.target === getCurrentPopup()) {
        closePopup();
    };
};

const checkKeydownForClosingCondition = (e) => {
    if (e.key === 'Escape') {
        closePopup();
    };
};

const inputsList = document.querySelectorAll('.popup__input');
const errorsList = document.querySelectorAll('.popup__input-error');

const clearValidationMessages = () => {
    inputsList.forEach((input) => {
        input.classList.remove('popup__input_invalid');
    });
    errorsList.forEach((error) => {
        error.classList.remove('popup__input-error_visible');
    }); 
};

const closePopup = () => {
    const popupToClose = getCurrentPopup();

    popupToClose.removeEventListener('click', checkClickForClosingCondition);
    document.removeEventListener('keydown', checkKeydownForClosingCondition);
    popupToClose.classList.remove('popup_opened');
};

const profileName = document.querySelector('#profile-name')
const profileJob = document.querySelector('#profile-description')
const nameInput = popupEditProfile.querySelector('input[name="input-name"]');
const jobInput = popupEditProfile.querySelector('input[name="input-description"]');

const prepareAddCardPopup = (popup) => {
    cardInput.value = '';
    srcInput.value = '';
    clearValidationMessages();
    toggleSubmitButtonActivity('.popup__submit-button', 'popup__submit-button_disabled', popup.querySelector('.popup__edit-form'), '.popup__input');
};

const prepareEditProfilePopup = (popup) => {
    nameInput.value = profileName.textContent;
    jobInput.value = profileJob.textContent;
    toggleSubmitButtonActivity('.popup__submit-button', 'popup__submit-button_disabled', popup.querySelector('.popup__edit-form'), '.popup__input');
};

const definePopupForPrep = (popup) => {
    if (popup.classList.contains('popup_type_add')) {
        prepareAddCardPopup(popup);
    } else if (popup.classList.contains('popup_type_edit')) {
        prepareEditProfilePopup(popup);
    };
};

const openPopup = (popup) => {
    popup.classList.add('popup_opened');
    definePopupForPrep(popup);
    popup.addEventListener('click', checkClickForClosingCondition);
    document.addEventListener('keydown', checkKeydownForClosingCondition);
};

editButton.addEventListener('click', () => {
    openPopup(popupEditProfile);
}); 

addButton.addEventListener('click', () => {
    openPopup(popupAddCard);
}); 

function handleEditFormSubmit (evt) {
    evt.preventDefault();
    if (nameInput.value !== '') {
        profileName.textContent = nameInput.value;
        nameInput.value = profileName.textContent;
    } else; 
    if (jobInput.value !== '') {
        profileJob.textContent = jobInput.value;
        jobInput.value = profileJob.textContent;
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
 
    renderCard(generateCard(createdCard));
    closePopup();
}

popupEditProfile.addEventListener('submit', handleEditFormSubmit);
popupAddCard.addEventListener('submit', handleAddFormSubmit);

