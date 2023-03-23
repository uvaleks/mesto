let editButton = document.querySelector('.profile__edit-button')
let profileName = document.querySelector('.profile__profile-name')
let profileJob = document.querySelector('.profile__profile-description')
let formElement = document.querySelector('.popup')
let nameInput = formElement.querySelector('.popup__input_content_name')
let jobInput = formElement.querySelector('.popup__input_content_description')
let closeButton = formElement.querySelector('.popup__close-button')

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