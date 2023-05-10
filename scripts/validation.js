const validationConfig = {
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__submit-button',
    inactiveButtonClass: 'popup__submit-button_disabled',
    inputErrorClass: 'popup__input_invalid',
    errorClass: 'popup__input-error_visible'
}

class FormValidator {
    constructor (settings, formSelector) {
        this._formSelector = formSelector;
        this._form = document.querySelector(this._formSelector);
        this._inputSelector = settings.inputSelector;
        this._inputs = this._form.querySelectorAll(this._inputSelector);
        this._inputsList = Array.from(this._inputs);
        this._submitButtonSelector = settings.submitButtonSelector;
        this._submitButton = this._form.querySelector(this._submitButtonSelector);
        this._inactiveButtonClass = settings.inactiveButtonClass;
        this._inputErrorClass = settings.inputErrorClass;
        this._errorClass = settings.errorClass;
    }

    _hideValidationMessage(errorElement) {
        errorElement.textContent = '';
        errorElement.classList.remove(this._errorClass);
        errorElement.style.opacity = '0';
    }
    
    _setInputValidState(input) {
        input.classList.remove(this._inputErrorClass);
    }
    
    _showValidationMessage(input, errorElement) {
        errorElement.textContent = input.validationMessage;
        errorElement.classList.add(this._errorClass);
        errorElement.style.opacity = '1';
    }
    
    _setInputInvalidState(input) {
        input.classList.add(this._inputErrorClass);
    }
    
    _checkInputValidity(input) {
        const errorElement = this._form.querySelector(`.${input.name}-error`);

        if (input.validity.valid) {
            this._setInputValidState(input);
            this._hideValidationMessage(errorElement);
        } else {
            this._setInputInvalidState(input);
            this._showValidationMessage(input, errorElement);
        };
    }
    
    _enableSubmitButton() {
        this._submitButton.removeAttribute('disabled');
        this._submitButton.classList.remove(this._inactiveButtonClass);
    }
    
    _disableSubmitButton() {
        this._submitButton.setAttribute('disabled', '');
        this._submitButton.classList.add(this._inactiveButtonClass);
    }
    
    _hasInvalidInput() {    
        return this._inputsList.some((inputElement) => { 
          return !inputElement.validity.valid;
        })
    }

    _toggleSubmitButtonActivity() {
        if (!this._hasInvalidInput()) {
            this._enableSubmitButton();
        } else {
            this._disableSubmitButton();
        };
    }

    _setListenters() {
            this._toggleSubmitButtonActivity();
    
            this._inputsList.forEach((input) => {
                this._setInputValidState(input);

                input.addEventListener('input', () => {
                    this._checkInputValidity(input);
                    this._toggleSubmitButtonActivity();
                });
            });
    }

    enableValidation() {
        this._setListenters();
    }
}

const EditFormValidator = new FormValidator(validationConfig, '.popup__edit-form');

const AddFormValidator = new FormValidator(validationConfig, '.popup__add-form');

EditFormValidator.enableValidation();

AddFormValidator.enableValidation();

