// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;

// @todo: DOM узлы
const plasesList = document.querySelector('.places__list');

// @todo: Функция создания карточки
function createCard (dataCard, deleteCardCallback) {
  const cardItem = cardTemplate.querySelector('.card').cloneNode(true);

  const cardImage = cardItem.querySelector('.card__image');
  cardImage.src = dataCard.link;
  cardImage.alt = dataCard.name;

  cardItem.querySelector('.card__title').textContent = dataCard.name;

  cardItem.querySelector('.card__delete-button').addEventListener('click', function () {
    deleteCardCallback(cardItem);
  })

  return cardItem;
}

// @todo: Функция удаления карточки

function deleteCard (card) {
    card.remove();
}

// @todo: Вывести карточки на страницу

initialCards.forEach(function (item) {
  plasesList.append(createCard(item, deleteCard));
});