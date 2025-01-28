//данные 
const config = {
  baseUrl: 'https://nomoreparties.co/v1/wff-cohort-30',
  headers: {
    authorization: '9a397971-ff34-46d3-bded-563e24a2fe6e', 
    'Content-Type': 'application/json'
  }
};

//функция обработки ответа с сервера
export function handleResponse(res) {
  if (!res.ok) {
    return Promise.reject(`Ошибка: ${res.status}`);
  }
  return res.json();
};

//функция получения данных о пользователе с сервера
export function getUserData() {
  return fetch(`${config.baseUrl}/users/me`, {
    method: 'GET',
    headers: config.headers,
  })
  .then((res) => handleResponse(res));
};

//функция отправки данных о редактировании профиля на сервер
export function updateDataProfile(name, about) {
  return fetch(`${config.baseUrl}/users/me`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({ name, about })
  })
  .then((res) => handleResponse(res));
};

//функция изменения аватара профиля
export function updateAvatarProfile(avatar) {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({ avatar })
  })
  .then((res) => handleResponse(res));
};

//функция получения карточек с сервера
export function getCardsFromServer() {
  return fetch(`${config.baseUrl}/cards`, {
    method: 'GET',
    headers: config.headers,
  })
  .then((res) => handleResponse(res));
};

//функция отправки новой карточки на сервер 
export function createNewCard(name, link) {
  return fetch(`${config.baseUrl}/cards`, {
    method: 'POST',
    headers: config.headers,
    body: JSON.stringify({ name, link })
  })
  .then((res) => handleResponse(res));
};

//функция удаления карточки с cервера
export function deleteCardFromServer(cardId) {
  return fetch(`${config.baseUrl}/cards/${cardId}`, {
    method: 'DELETE',
    headers: config.headers,
  })
  .then((res) => handleResponse(res));
};

//функция постановки лайка
export function addLikeOnCard(cardId) {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: 'PUT',
    headers: config.headers,
  })
  .then((res) => handleResponse(res));
};

//функция снятия лайка
export function removeLikeOnCard(cardId) {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: 'DELETE',
    headers: config.headers,
  })
  .then((res) => handleResponse(res));
};

