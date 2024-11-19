//Функция отображения ошибки
function showInputError(formElement, inputElement, errorMessage, obj) {
  const errorElement = formElement.querySelector(
    `.${inputElement.name}-input-error`
  );
  inputElement.classList.add(obj.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(obj.errorClass);
}

//Функция скрытия ошибки
function hideInputError(formElement, inputElement, obj) {
  const errorElement = formElement.querySelector(
    `.${inputElement.name}-input-error`
  );
  inputElement.classList.remove(obj.inputErrorClass);
  errorElement.classList.remove(obj.errorClass);
  errorElement.textContent = '';
  inputElement.setCustomValidity('');
}

// Функция для проверки валидации на поле ввода
function checkInputValidity(formElement, inputElement, obj) {
  if (inputElement.validity.patternMismatch) {
    inputElement.setCustomValidity(inputElement.dataset.errorMessage);
  } else {
    inputElement.setCustomValidity('');
  }

  if (!inputElement.validity.valid) {
    showInputError(
      formElement,
      inputElement,
      inputElement.validationMessage,
      obj
    );
  } else {
    hideInputError(formElement, inputElement, obj);
  }
}

// Функция для проверки наличия невалидных полей ввода в форме
function hasInvalidInput(inputArray) {
  return inputArray.some((inputElement) => {
    return !inputElement.validity.valid;
  });
}

// Функция для изменения состояния кнопки в форме
function toggleButtonState(inputArray, buttonElement, obj) {
  if (hasInvalidInput(inputArray)) {
    buttonElement.classList.add(obj.inactiveButtonClass);
  } else {
    buttonElement.classList.remove(obj.inactiveButtonClass);
  }
}

// Функция для установки обработчиков событий для всех полей формы
function setEventListeners(obj) {
  const formElement = document.querySelector(obj.formSelector);
  const inputArray = Array.from(
    formElement.querySelectorAll(obj.inputSelector)
  );
  const buttonElement = formElement.querySelector(obj.submitButtonSelector);

  toggleButtonState(inputArray, buttonElement, obj);
  inputArray.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      checkInputValidity(formElement, inputElement, obj);
      toggleButtonState(inputArray, buttonElement, obj);
    });
  });
}

//Функция включения валидации формы
function enableValidation(obj) {
  setEventListeners(obj);
}

//Функция очистки ошибок валидации формы
function clearValidation(formElement, obj) {
  const inputArray = Array.from(
    formElement.querySelectorAll(obj.inputSelector)
  );
  const buttonElement = formElement.querySelector(obj.submitButtonSelector);

  inputArray.forEach((inputElement) => {
    hideInputError(formElement, inputElement, obj);
  });

  toggleButtonState(inputArray, buttonElement, obj);
}

export { enableValidation, clearValidation };
