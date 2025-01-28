
/*Данные для валидации
const classValidation = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
  };*/

// Функция для добавления класса error
function showInputError(formElement, inputElement, errorMessage, classValidation) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(classValidation.inputErrorClass);
  errorElement.classList.add(classValidation.errorClass);
  errorElement.textContent = errorMessage;
};

// Функция для удаления класса error
function hideInputError(formElement, inputElement, classValidation) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(classValidation.inputErrorClass);
  errorElement.classList.remove(classValidation.errorClass);
  errorElement.textContent = '';
  };

// Функция для провпрки валидности 
function checkInputValidity(formElement, inputElement, classValidation) {
  if (inputElement.validity.patternMismatch) {
    inputElement.setCustomValidity(inputElement.dataset.errorMessage);
  } else {
    inputElement.setCustomValidity('');
  }
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, classValidation);
  } else {
    hideInputError(formElement, inputElement, classValidation);
  }
}; 

//Функция навешивания слушателей на формы
function setEventListeners(formElement, classValidation) {
  const inputList = Array.from(formElement.querySelectorAll(classValidation.inputSelector));
  const buttonElement = formElement.querySelector(classValidation.submitButtonSelector);
  toggleButtonState(inputList, buttonElement, classValidation);
    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', function () {
        checkInputValidity(formElement, inputElement, classValidation);
        toggleButtonState(inputList, buttonElement, classValidation);
      });
    });
};

//Функция окрашивания кнопки 
function toggleButtonState(inputList, buttonElement, classValidation) {
  if (hasInvalidInput(inputList)) {
    buttonElement.disabled = true;
    buttonElement.classList.add(classValidation.inactiveButtonClass);
  } else {
    buttonElement.disabled = false;
    buttonElement.classList.remove(classValidation.inactiveButtonClass);
  }
};

//Функция проверки невалидныx форм
function hasInvalidInput(inputList) {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  })
};

//Функция включения валидации всех форм
export function enableValidation(classValidation) {
  const formList = Array.from(document.querySelectorAll(classValidation.formSelector));
  formList.forEach((formElement) => {
    setEventListeners(formElement, classValidation);
 });
};

//Функция очистки ошибок валидации форм
export function clearValidation(formElement, classValidation) {
  const inputList = Array.from(formElement.querySelectorAll(classValidation.inputSelector));
  const buttonElement = formElement.querySelector(classValidation.submitButtonSelector);
  toggleButtonState(inputList, buttonElement, classValidation);
  inputList.forEach((inputElement) => {
    hideInputError(formElement, inputElement, classValidation)
  });  
};
