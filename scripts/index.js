let editButton = document.querySelector('.profile__edit-button')
let profileName = document.querySelector('.profile__profile-name')
let profileJob = document.querySelector('.profile__profile-description')
let formElement = document.querySelector('.popup')
let nameInput = formElement.querySelector('.popup__input_content_name')
let jobInput = formElement.querySelector('.popup__input_content_description')
let closeButton = formElement.querySelector('.popup__close-button')

const initialCards = [
    {
      name: 'Карадаг',
      link: 'images/karadag.png'
    },
    {
      name: 'Старая Русса',
      link: 'images/staraya-russa.png'
    },
    {
      name: 'Никола-Ленивец',
      link: 'images/nikola-lenivets.png'
    },
    {
      name: 'Байкал',
      link: 'images/baikal.png'
    },
    {
      name: 'Соловки',
      link: 'images/solovki.png'
    },
    {
      name: 'Териберка',
      link: 'images/teriberka.png'
    }
]; 

const cardTemplate = document.querySelector('.card-template');
const cardGrid = document.querySelector('.elements');

const generateCard = (cardData) => {
    const templateContent = cardTemplate.content.querySelector('.card').cloneNode(true);

    const cardTitle = templateContent.querySelector('.card__title');
    const cardPhoto = templateContent.querySelector('.card__photo');

    cardTitle.textContent = cardData.name;
    cardPhoto.src = cardData.link;
    cardPhoto.alt = cardData.name;

    return templateContent;
};

const renderCard = (createdCard) => {
    cardGrid.prepend(createdCard);
};

initialCards.forEach((initalCard) => {
    const createdCard = generateCard(initalCard);
    renderCard(createdCard);
});


function togglePopup () {
    if (formElement.classList.contains("popup_opened") === false) {
    nameInput.value = profileName.textContent;
    jobInput.value = profileJob.textContent;
    formElement.classList.toggle('popup_opened');
    } else {
    formElement.classList.toggle('popup_opened');
    }
}

editButton.addEventListener('click', togglePopup); 
closeButton.addEventListener('click', togglePopup); 

function handleFormSubmit (evt) {
    evt.preventDefault();
    profileName.textContent = nameInput.value;
    profileJob.textContent = jobInput.value;
    togglePopup();
}

formElement.addEventListener('submit', handleFormSubmit); 