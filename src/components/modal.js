// Функция открытия модального окна
function openModal(container) {
  const closeButton = container.querySelector('.popup__close');

  document.addEventListener('keydown', closeModalEsc);
  closeButton.addEventListener('click', closeModal);
  container.addEventListener('click', closeModalOverlay);

  container.classList.add('popup_is-opened');
}

// Функция закрытия модального окна
function closeModal() {
  const container = document.querySelector('.popup_is-opened');
  const closeButton = container.querySelector('.popup__close');

  if (container) {
    closeButton.removeEventListener('click', closeModal);
    document.removeEventListener('keydown', closeModalEsc);
    container.removeEventListener('click', closeModalOverlay);

    container.classList.remove('popup_is-opened');
  }
}

// Функция закрытия модального окна по кнопке Ecs
function closeModalEsc(evt) {
  if (evt.key === 'Escape') {
    closeModal();
  }
}

//Функция клика по оверлею
function closeModalOverlay(evt) {
  if (evt.target === evt.currentTarget) {
    closeModal();
  }
}
export { openModal, closeModal };
