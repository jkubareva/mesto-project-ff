
// Функции открытия и закрытия попапа
export function openModal(popup) {
  popup.classList.add('popup_is-opened');
  popup.classList.add('popup_is-animated');
  document.addEventListener('keydown', closeModalEsc);
  popup.addEventListener('click', closeModalClick);
  popup.addEventListener('click', closeModalOverlay);
};

export function closeModal(popup) {
  popup.classList.remove('popup_is-opened');
  popup.classList.add('popup_is-animated');
  document.removeEventListener('keydown', closeModalEsc);
  popup.removeEventListener('click', closeModalClick);
  popup.removeEventListener('click', closeModalOverlay);
};

// Функция закрытия по нажатию на крестик, esc и оверлэй
function closeModalClick(evt) {
  if (evt.target.classList.contains('popup__close')) {
    closeModal(document.querySelector('.popup_is-opened'));
  }
};

function closeModalEsc(evt) {
  if (evt.key === 'Escape') {
    closeModal(document.querySelector('.popup_is-opened'));
  }
};

function closeModalOverlay(evt) {
  if (evt.target.classList.contains('popup'))
    closeModal(document.querySelector('.popup_is-opened'));
};

