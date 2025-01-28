import { deleteCardFromServer, addLikeOnCard, removeLikeOnCard } from './api.js';

// Функция создания карточки
export function createCard (dataCard, userId, deleteCardCallback, likeCard, openImage) {
    const cardTemplate = document.querySelector('#card-template').content;
    const cardItem = cardTemplate.querySelector('.card').cloneNode(true);

    const cardImage = cardItem.querySelector('.card__image');
    const cardTitle = cardItem.querySelector('.card__title');

    cardImage.src = dataCard.link;
    cardImage.alt = dataCard.name;
    cardTitle.textContent = dataCard.name;

    // УДАЛЕНИЕ
    const deleteButton = cardItem.querySelector('.card__delete-button');

    // убираем корзину, если она не принадлежит создателю
    if (dataCard.owner._id !== userId) {
      deleteButton.remove();
    } else {
      deleteButton.addEventListener('click', function () {
        deleteCardCallback(cardItem, dataCard._id);
      });
    };

    //ЛАЙК
    const likeButton = cardItem.querySelector('.card__like-button');
    const likeCounter = cardItem.querySelector('.card__like_counter');

    // количество лайков
    likeCounter.textContent = dataCard.likes ? dataCard.likes.length : 0;

    //проверяем есть ли лайк уже
    const isUserLike = dataCard.likes.some((like) => like._id === userId);
    if (isUserLike) {
      likeButton.classList.add("card__like-button_is-active");
    };

    likeButton.addEventListener('click', function () {
      likeCard(dataCard._id, userId, likeButton, likeCounter);
    });
    
    //ИЗОБРАЖЕНИЕ
    cardImage.addEventListener('click', function () {
        openImage(dataCard);
      });
  
    return cardItem;
  };
  
  // Функция удаления карточки
  export function deleteCard(cardItem, cardId) {
    deleteCardFromServer(cardId)
      .then(() => {
        cardItem.remove();
      })
      .catch((error) => {
        console.error(`Ошибка при удалении карточки: ${error}`);
      })
  };

  // Функция лайка карточки 
  export function likeCard(cardId, userId, likeButton, likeCounter) {
    const isLiked = likeButton.classList.contains('card__like-button_is-active');
    const likeDone = isLiked ? removeLikeOnCard : addLikeOnCard;
    
    likeDone(cardId)
      .then((likedCard) => {
        likeCounter.textContent = likedCard.likes.length;
         
        if (likedCard.likes.some((like) => like._id === userId)) {
          likeButton.classList.add("card__like-button_is-active");
        } else {
          likeButton.classList.remove("card__like-button_is-active");
        }
      })
      .catch((error) => {
        console.error(`Ошибка при постановке лайка: ${error}`);
      })
    };
