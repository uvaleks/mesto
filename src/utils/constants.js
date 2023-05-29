export const popupConfig = {
    openedPopupClass: 'popup_opened',
    popupCloseButtonSelector: '.popup__close-button'
}

export const validationConfig = {
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__submit-button',
    inactiveButtonClass: 'popup__submit-button_disabled',
    inputErrorClass: 'popup__input_invalid',
    errorClass: 'popup__input-error_visible'
}

const karadag = new URL('../images/karadag.png', import.meta.url);
const starayaRussa = new URL('../images/staraya-russa.png', import.meta.url);
const nicolaLenivets = new URL('../images/nikola-lenivets.png', import.meta.url);
const baikal = new URL('../images/baikal.png', import.meta.url);
const solovki = new URL('../images/solovki.png', import.meta.url);
const teriberka = new URL('../images/teriberka.png', import.meta.url)

export const initialCards = [
    {
      place: 'Карадаг',
      link: karadag
    },
    {
      place: 'Старая Русса',
      link: starayaRussa
    },
    {
      place: 'Никола-Ленивец',
      link: nicolaLenivets
    },
    {
      place: 'Байкал',
      link: baikal
    },
    {
      place: 'Соловки',
      link: solovki
    },
    {
      place: 'Териберка',
      link: teriberka
    }
];