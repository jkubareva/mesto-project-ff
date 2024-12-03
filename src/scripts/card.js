// Функция создания карточки
export function createCard (dataCard, deleteCardCallback, likeCard, openImage) {
    const cardTemplate = document.querySelector('#card-template').content;
    const cardItem = cardTemplate.querySelector('.card').cloneNode(true);
    const cardImage = cardItem.querySelector('.card__image');
    const cardTitle = cardItem.querySelector('.card__title');
    const deleteButton = cardItem.querySelector('.card__delete-button');
    const likeButton = cardItem.querySelector('.card__like-button');

    cardImage.src = dataCard.link;
    cardImage.alt = dataCard.name;
    cardTitle.textContent = dataCard.name;

    deleteButton.addEventListener('click', function () {
      deleteCardCallback(cardItem);
    });

    likeButton.addEventListener('click', function () {
      likeCard(likeButton);
    });

    cardImage.addEventListener('click', function () {
        openImage(dataCard);
      });
  
    return cardItem;
  };
  
  // Функция удаления карточки
  export function deleteCard(card) {
    card.remove();
  };

  // Функция лайка карточки 
  export function likeCard(like) {
    like.classList.toggle('card__like-button_is-active');
  };