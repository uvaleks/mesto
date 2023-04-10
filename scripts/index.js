const cardGrid = document.querySelector('.elements');

const cardTemplate = document.querySelector('.card-template');

const profileName = document.querySelector('#profile-name');
const profileJob = document.querySelector('#profile-description');
const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');

const popupEditProfile = document.querySelector('.popup_type_edit');
const closeEditPopupButton = popupEditProfile.querySelector('.popup__close-button');
const nameInput = popupEditProfile.querySelector('input[name="input-name"]');
const jobInput = popupEditProfile.querySelector('input[name="input-description"]');


const popupAddCard = document.querySelector('.popup_type_add');
const closeAddPopupButton = popupAddCard.querySelector('.popup__close-button');
const cardInput = popupAddCard.querySelector('input[name="input-place"]');
const srcInput = popupAddCard.querySelector('input[name="input-link"]');

const popupPhoto = document.querySelector('.popup_type_photo');
const closePhotoPopupButton = popupPhoto.querySelector('.popup__close-button');


const openPopup = (popup) => {
    popup.classList.add('popup_opened');
};

const closePopup = (popup) => {
    popup.classList.remove('popup_opened');
    const closedPopupForm = popup.querySelector('.popup__edit-form');
    if (closedPopupForm !== null) {
        closedPopupForm.reset();
    };
};

const generateCard = (cardData) => {
    const templateContent = cardTemplate.content.querySelector('.card').cloneNode(true);
    const cardTitle = templateContent.querySelector('.card__title');
    const cardPhoto = templateContent.querySelector('.card__photo');
    const likeButton = templateContent.querySelector('.card__like-button');
    const deleteButton = templateContent.querySelector('.card__delete-button');

    cardTitle.textContent = cardData.place;
    cardPhoto.src = cardData.link;
    cardPhoto.alt = cardData.place;

    const deleteCard = () => {
        templateContent.remove();
    };

    const likeCard = () => {
        likeButton.classList.toggle('card__like-button_active');
    };

    likeButton.addEventListener('click', likeCard);
    deleteButton.addEventListener('click', deleteCard);

    const createPhotoPopup = (popup, src, title) => {
        const popupPhoto = popup.querySelector('.popup__photo');
        popupPhoto.src = src;

        const popupPhotoTitle = popup.querySelector('.popup__photo-title');
        popupPhotoTitle.textContent = title;
        popupPhoto.alt = title;

        openPopup(popup);
    };

        cardPhoto.addEventListener('click', () => {
            createPhotoPopup(popupPhoto, cardPhoto.src, cardPhoto.alt)
        });

        closePhotoPopupButton.addEventListener('click', () => {
            closePopup(popupPhoto);
        });

        return templateContent;
};

const renderCard = (createdCard) => {
    cardGrid.prepend(createdCard);
};

const renderInitialCard = (createdCard) => {
    cardGrid.append(createdCard);
};

const handleEditFormSubmit = (evt) => {
    evt.preventDefault();
    if (nameInput.value !== '') {
        profileName.textContent = nameInput.value;
    }; 
    if (jobInput.value !== '') {
        profileJob.textContent = jobInput.value;
    }; 
    closePopup(popupEditProfile);
};

const handleAddFormSubmit = (evt) => {
    evt.preventDefault();
    const place = cardInput.value;
    const link = srcInput.value;
    const createdCard = {
        place,
        link,
    };
    closePopup(popupAddCard);
    renderCard(generateCard(createdCard));
};

initialCards.forEach((initalCard) => {
    const createdCard = generateCard(initalCard);
    renderInitialCard(createdCard);
});

editButton.addEventListener('click', () => {
    openPopup(popupEditProfile);
}); 

closeEditPopupButton.addEventListener('click', () => {
    closePopup(popupEditProfile);
});

popupEditProfile.addEventListener('submit', handleEditFormSubmit);

addButton.addEventListener('click', () => {
    openPopup(popupAddCard);
}); 

closeAddPopupButton.addEventListener('click', () => {
    closePopup(popupAddCard);
});

popupAddCard.addEventListener('submit', handleAddFormSubmit);