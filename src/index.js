import './pages/index.css';
import { createCard, deleteCard, likeCard } from './scripts/card.js';
import { openModal, closeModal } from './scripts/modal.js';
import { enableValidation, clearValidation } from './scripts/validation.js';
import { handleResponse, getUserData, updateDataProfile, updateAvatarProfile, 
  getCardsFromServer, createNewCard } from './scripts/api.js';

// Глобальные переменные
const plasesList = document.querySelector('.places__list');
let userId; 

// получение данных профиля и данных карточек с сервера
Promise.all([getUserData(), getCardsFromServer()])
  .then(([userData, cardsFromServer]) => {
    userId = userData._id
    
    profileTitle.textContent = userData.name
    profileDescription.textContent = userData.about
    profileAvatar.style.backgroundImage = `url(${userData.avatar})`

    cardsFromServer.forEach(function (dataCard) {plasesList.append(createCard(dataCard, userId, deleteCard, likeCard, openImage));
    });
  })
  .catch(handleResponse);

  // Переменные "Добавать карточку"
const profileAddButton = document.querySelector('.profile__add-button');
const popupNewCard = document.querySelector('.popup_type_new-card');
const newCardItem = document.querySelector('.popup__form[name="new-place"]');
const placeNameCardInput = newCardItem.querySelector('input[name="place-name"]');
const placeLinkCardInput = newCardItem.querySelector('input[name="link"]');

// Открытие формы "Добавить карточку"
profileAddButton.addEventListener('click', function() {
  openModal(popupNewCard);
});

// Обработчик «отправки» формы "Добавать карточку"
function handleCardSubmit(evt) {
  evt.preventDefault();
  const popupButtonSafe = popupEditProfile.querySelector('.popup__button');
  popupButtonSafe.textContent = 'Сохранение...';

  createNewCard(placeNameCardInput.value, placeLinkCardInput.value)
    .then((dataCardNew) => {
      const serverNewCardData = createCard(dataCardNew, userId, deleteCard, likeCard,  openImage)
      plasesList.prepend(serverNewCardData);
      
      closeModal(popupNewCard);
      newCardItem.reset();
      clearValidation(newCardItem, classValidation);
    })
    .catch((error) => {
      console.error(`Ошибка при добавлении карточки: ${error}`);
    })
    .finally(() => {
      popupButtonSafe.textContent = 'Сохранить';
    })
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
  nameProfileInput.value = profileTitle.textContent;
  jobProfileInput.value = profileDescription.textContent;
  
  openModal(popupEditProfile);
});

// Обработчик «отправки» формы "Редактировать профиль"
function handleProfileSubmit(evt) {
  evt.preventDefault();

  const nameValue = nameProfileInput.value;
  const jobValue = jobProfileInput.value;

  const popupButtonSafe = popupEditProfile.querySelector('.popup__button');
  popupButtonSafe.textContent = 'Сохранение...';

  updateDataProfile(nameValue, jobValue)
    .then((res) => {
      profileTitle.textContent = res.name;
      profileDescription.textContent = res.about;
      
      closeModal(popupEditProfile);
      clearValidation(profileFormElement, classValidation);
    })
    .catch((error) => {
      console.error(`Ошибка при обновлении профиля: ${error}`);
    })
    .finally(() => {
      popupButtonSafe.textContent = 'Сохранить';
    })
};

// Прикрепляем обработчик к форме
profileFormElement.addEventListener('submit', handleProfileSubmit);

// Переменные "Обновить аватар"
const profileAvatar = document.querySelector('.profile__image');
const popupAvatar = document.querySelector('.popup_type-avatar');
const popupAvatarForm = document.querySelector('.popup__form[name="edit-avatar"]');
const popupAvatarInput = popupAvatarForm.querySelector('.popup__input_type_avatar');

// Открытие формы "Обновить аватар"
profileAvatar.addEventListener('click', function() {
  clearValidation(popupAvatarForm, classValidation);  
  popupAvatarForm.reset(); 
  openModal(popupAvatar);
});

// Обработчик «отправки» формы "Обновить аватар"
function handleAvatarSubmit(evt) {
  evt.preventDefault();
  
  const popupButtonSafe = popupAvatar.querySelector('.popup__button');
  popupButtonSafe.textContent = 'Сохранение...';

  updateAvatarProfile(popupAvatarInput.value)
    .then((res) => {
      profileAvatar.style.backgroundImage = `url(${res.avatar})`;

      closeModal(popupAvatar);
      popupAvatarForm.reset();
      clearValidation(popupAvatarForm, classValidation); 
    })
    .catch((error) => {
      console.error(`Ошибка при обновлении аватара: ${error}`);
    })
    .finally(() => {
      popupButtonSafe.textContent = 'Сохранить';
    })
};

// Прикрепляем обработчик к форме
popupAvatarForm.addEventListener('submit', handleAvatarSubmit);

// Валидация 
// Данные для валидации
const classValidation = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};

enableValidation(classValidation);
