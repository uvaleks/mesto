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

const generateCard = (cardData) => {
    const templateContent = cardTemplate.content.querySelector('.card').cloneNode(true);

    const cardTitle = templateContent.querySelector('.card__title');
    const cardPhoto = templateContent.querySelector('.card__photo');

    cardTitle.textContent = cardData.place;
    cardPhoto.src = cardData.link;
    cardPhoto.alt = cardData.place;

    const likeButton = templateContent.querySelector('.card__like-button');
    const deleteButton = templateContent.querySelector('.card__delete-button');
    

    const deleteCard = () => {
        templateContent.remove();
    };

    const likeCard = () => {
        likeButton.classList.toggle('card__like-button_active');
    };



    likeButton.addEventListener('click', likeCard);
    deleteButton.addEventListener('click', deleteCard);
 
    const popupPhoto = document.querySelector('.popup__type_photo');
    const closePhotoPopupButton = popupPhoto.querySelector('.popup__close-button');

    const togglePhotoPopup = (popup, src, title) => {
        const popupPhoto = popup.querySelector('.popup__photo');
        popupPhoto.src = src;

        const popupPhotoTitle = popup.querySelector('.popup__photo-title');
        popupPhotoTitle.textContent = title;
        popupPhoto.alt = title;

        if (popup.classList.contains("popup_opened") === false) {
            popup.classList.toggle('popup_opened');
        } else {
            popup.classList.toggle('popup_opened');
        }
        };

    const closePhotoPopup = (popup) => {
        popup.classList.remove('popup_opened');
    };

    cardPhoto.addEventListener('click', () => {
        togglePhotoPopup(popupPhoto, cardPhoto.src, cardPhoto.alt)
    });

    closePhotoPopupButton.addEventListener('click', () => {
        closePhotoPopup(popupPhoto);
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
const popupEditProfile = document.querySelector('.popup__type_edit');

const addButton = document.querySelector('.profile__add-button');
const popupAddCard = document.querySelector('.popup__type_add');

const cardInput = popupAddCard.querySelector('input[name="input-place"]');
const srcInput = popupAddCard.querySelector('input[name="input-link"]');

const togglePopup = (popup) => {
    if (popup.classList.contains("popup_opened") === false) {
    popup.classList.add('popup_opened');
    cardInput.value = '';
    srcInput.value = '';
    toggleSubmitButtonActivity('.popup__submit-button', 'popup__submit-button_disabled', popup.querySelector('.popup__edit-form'));
    } else {
    popup.classList.remove('popup_opened');
    }
}

editButton.addEventListener('click', () => {
    togglePopup(popupEditProfile);
}); 

const closeEditPopupButton = popupEditProfile.querySelector('.popup__close-button');

closeEditPopupButton.addEventListener('click', () => {
    togglePopup(popupEditProfile);
});

const closeAddPopupButton = popupAddCard.querySelector('.popup__close-button');

closeAddPopupButton.addEventListener('click', () => {
    togglePopup(popupAddCard);
});

addButton.addEventListener('click', () => {
    togglePopup(popupAddCard);
}); 

const profileName = document.querySelector('#profile-name')
const profileJob = document.querySelector('#profile-description')
const nameInput = popupEditProfile.querySelector('input[name="input-name"]');
const jobInput = popupEditProfile.querySelector('input[name="input-description"]');


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
    togglePopup(popupEditProfile);
}

function handleAddFormSubmit (evt) {

    evt.preventDefault();

    if ((imageExists(srcInput.value) !== 404) && (cardInput.value !== '')) {
        const place = cardInput.value;
        const link = srcInput.value;

        const createdCard = {
            place,
            link,
        };    
        togglePopup(popupAddCard);
        renderCard(generateCard(createdCard));
    } else if (imageExists(srcInput.value) === 404) {
        srcInput.value = '';
        srcInput.placeholder = 'Картинка не найдена';
    } else;
}

function imageExists(image_url){

    var http = new XMLHttpRequest();

    http.open('HEAD', image_url, false);
    http.send();
    return http.status;
}

popupEditProfile.addEventListener('submit', handleEditFormSubmit);
popupAddCard.addEventListener('submit', handleAddFormSubmit);