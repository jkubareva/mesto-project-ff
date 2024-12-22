import './pages/index.css';
import { initialCards } from './scripts/cards.js';
import { createCard, deleteCard, likeCard } from './scripts/card.js';
import { openModal, closeModal } from './scripts/modal.js';
import { enableValidation, clearValidation } from './scripts/validation.js';

// Глобальные переменные
const plasesList = document.querySelector('.places__list');

// Вывести карточки на страницу
initialCards.forEach(function (dataCard) {
  plasesList.append(createCard(dataCard, deleteCard, likeCard, openImage));
});

// Переменные "Редактировать профиль"
const profileEditButton = document.querySelector('.profile__edit-button');
const popupEditProfile = document.querySelector('.popup_type_edit');
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const profileFormElement = document.querySelector('.popup__form[name="edit-profile"]');
const nameProfileInput = profileFormElement.querySelector('.popup__input_type_name');
const jobProfileInput = profileFormElement.querySelector('.popup__input_type_description');

// Открытие формы "Редактировать профиль"
profileEditButton.addEventListener('click', function() {
  clearValidation(profileFormElement, classValidation);
  nameProfileInput.value = profileTitle.textContent;
  jobProfileInput.value = profileDescription.textContent;

  openModal(popupEditProfile);
});


// Обработчик «отправки» формы "Редактировать профиль"
function handleFormSubmit(evt) {
  evt.preventDefault();
  const nameValue = nameProfileInput.value;
  const jobValue = jobProfileInput.value;

  profileTitle.textContent = nameValue;
  profileDescription.textContent = jobValue;

  closeModal(popupEditProfile);
};

// Прикрепляем обработчик к форме
profileFormElement.addEventListener('submit', handleFormSubmit);

// Переменные "Добавать карточку"
const profileAddButton = document.querySelector('.profile__add-button');
const popupNewCard = document.querySelector('.popup_type_new-card');
const newCardItem = document.querySelector('.popup__form[name="new-place"]');
const placeNameCardInput = newCardItem.querySelector('input[name="place-name"]');
const placeLinkCardInput = newCardItem.querySelector('input[name="link"]');

//Открытие формы "Добавить карточку"
profileAddButton.addEventListener('click', function() {
  clearValidation(popupNewCard, classValidation);
  openModal(popupNewCard);
});

// Обработчик «отправки» формы "Добавать карточку"
function handleCardSubmit(evt) {
  evt.preventDefault();
  const newCard = {
  name: placeNameCardInput.value,
  link: placeLinkCardInput.value
  };
  plasesList.prepend(createCard(newCard, deleteCard, likeCard, openImage));
    newCardItem.reset();

    closeModal(popupNewCard);
};

// Прикрепляем обработчик к форме:
newCardItem.addEventListener('submit', handleCardSubmit);

// Переменные "Открытия изображения"
const popupImage = document.querySelector('.popup_type_image');
const popupImageCaption = popupImage.querySelector('.popup__caption');
const popupImageData = popupImage.querySelector('.popup__image');

//Функция, которая обрабатывает клик по изображению и закрытие окна
function openImage(dataCard) {
  popupImageCaption.textContent = dataCard.name;
  popupImageData.src = dataCard.link;
  popupImageData.alt = dataCard.name;

  openModal(popupImage); 
};

closeModal(popupImage);

//Валидация 
//Данные для валидации
const classValidation = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};

enableValidation(classValidation);




 