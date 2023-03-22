let editButton = document.querySelector('.profile__edit-button')
let profileName = document.querySelector('.profile__profile-name')
let profileJob = document.querySelector('.profile__profile-description')
let formElement = document.querySelector('.popup')
let nameInput = formElement.querySelector('.popup__input-name')
let jobInput = formElement.querySelector('.popup__input-description')
let closeButton = formElement.querySelector('.popup__close-button')

function togglePopup () {
        formElement.classList.toggle('popup_opened')
}

editButton.addEventListener('click', togglePopup); 
closeButton.addEventListener('click', togglePopup); 

function handleFormSubmit (evt) {
    evt.preventDefault();
    profileName.textContent = nameInput.value;
    nameInput.placeholder = nameInput.value;
    profileJob.textContent = jobInput.value;
    jobInput.placeholder = jobInput.value;
}

formElement.addEventListener('submit', handleFormSubmit); 