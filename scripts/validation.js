const hideValidationMessage = (config, errorElement) => {
    errorElement.textContent = '';
    errorElement.classList.remove(config.errorClass);
};

const setInputValidState = (config, input) => {
    input.classList.remove(config.inputErrorClass);
};

const showValidationMessage = (config, input, errorElement) => {
    errorElement.textContent = input.validationMessage;
    errorElement.classList.add(config.errorClass);
};

const setInputInvalidState = (config, input) => {
    input.classList.add(config.inputErrorClass);
};

const checkInputValidity = (config, input) => {
    const errorElement = document.querySelector(`.${input.name}-error`);

    if (input.validity.valid) {
        setInputValidState(config, input);
        hideValidationMessage(config, errorElement);
    } else {
        setInputInvalidState(config, input);
        showValidationMessage(config, input, errorElement);
    };
};

const enableSubmitButton = (inactiveButtonClass, submitButton) => {
    submitButton.removeAttribute('disabled');
    submitButton.classList.remove(inactiveButtonClass);
};

const disableSubmitButton = (inactiveButtonClass, submitButton) => {
    submitButton.setAttribute('disabled', '');
    submitButton.classList.add(inactiveButtonClass);
};

const hasInvalidInput = (form, inputSelector) => {
    const inputs = form.querySelectorAll(inputSelector);
    const inputsList = Array.from(inputs);

    return inputsList.some((inputElement) => { 
      return !inputElement.validity.valid;
    })
}; 

const toggleSubmitButtonActivity = (submitButtonSelector, inactiveButtonClass, form, inputSelector) => {
    const submitButton = form.querySelector(submitButtonSelector);

    if (!hasInvalidInput(form, inputSelector)) {
        enableSubmitButton(inactiveButtonClass, submitButton);
    } else {
        disableSubmitButton(inactiveButtonClass, submitButton);
    };
};

const setListenters = (config, formsList) => {
    formsList.forEach((form) => {
        const inputs = form.querySelectorAll(config.inputSelector);
        const inputsList = Array.from(inputs);

        toggleSubmitButtonActivity(config.submitButtonSelector, config.inactiveButtonClass, form, config.inputSelector);

        inputsList.forEach((input) => {
            setInputValidState(config, input);

            input.addEventListener('input', () => {
                checkInputValidity(config, input);
                toggleSubmitButtonActivity(config.submitButtonSelector, config.inactiveButtonClass, form, config.inputSelector);
            });

            editButton.addEventListener('click', () => {
                checkInputValidity(config, input);
                toggleSubmitButtonActivity(config.submitButtonSelector, config.inactiveButtonClass, form, config.inputSelector);
            });

        });
    });
};

const enableValidation = (config) => {
    const forms = document.querySelectorAll(config.formSelector);
    const formsList = Array.from(forms);

    setListenters(config, formsList);
};

enableValidation(
    {
    formSelector: '.popup__edit-form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__submit-button',
    inactiveButtonClass: 'popup__submit-button_disabled',
    inputErrorClass: 'popup__input_invalid',
    errorClass: 'popup__input-error_visible'
}
);
