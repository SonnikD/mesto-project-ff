import '../pages/index.css';
import { addCard, deleteCard, setLike } from './card.js';
import { openModal, closeModal } from './modal.js';
import { enableValidation, clearValidation } from './validation.js';
import {
  getInitialProfile,
  getInitialCards,
  patchProfile,
  postCards,
  patchImageProfile,
} from './api.js';

// DOM узлы
const placesList = document.querySelector('.places__list');
const popupFormEdit = document.forms['edit-profile'];
const popupFormAdd = document.forms['new-place'];
const popupFormUpdateProfile = document.forms['update'];
const nameInput = document.querySelector('.popup__input_type_name');
const jobInput = document.querySelector('.popup__input_type_description');
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const profileEditButton = document.querySelector('.profile__edit-button');
const profileAddButton = document.querySelector('.profile__add-button');
const popups = document.querySelectorAll('.popup');
const profileImage = document.querySelector('.profile__image');

const validationConfigEdit = {
  formSelector: '.popup_type_edit .popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible',
};

const validationConfigNewCard = {
  formSelector: '.popup_type_new-card .popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible',
};

const validationConfigUpdateProfile = {
  formSelector: '.popup_type_update-profile .popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible',
};

//Функция слушателя открытие модалки редактировования
function openModalEdit() {
  const popupContainerEdit = document.querySelector('.popup_type_edit');
  const formElement = document.querySelector(validationConfigEdit.formSelector);

  openModal(popupContainerEdit);
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;

  clearValidation(formElement, validationConfigEdit);
}

// Функция открытия модалки новой карточки
function openModalNewCard() {
  const popupContainerNewCard = document.querySelector('.popup_type_new-card');
  const formElement = document.querySelector(
    validationConfigNewCard.formSelector
  );

  openModal(popupContainerNewCard);
  formElement.reset();
  clearValidation(formElement, validationConfigNewCard);
}

function openModalUpdateProfile() {
  const popupContainer = document.querySelector('.popup_type_update-profile');
  const formElement = document.querySelector(
    validationConfigUpdateProfile.formSelector
  );

  openModal(popupContainer);
  formElement.reset();
  clearValidation(formElement, validationConfigUpdateProfile);
}

// Функция открытия модалки изображения
function openModalImage() {
  const popupContainerImage = document.querySelector('.popup_type_image');

  openModal(popupContainerImage);
}

// Функция просмотра изображения карточки
function viewCard(cardLinkValue, cardTitleValue) {
  document.querySelector('.popup__caption').textContent = cardTitleValue;
  document.querySelector('.popup__image').alt = cardTitleValue;
  document.querySelector('.popup__image').src = cardLinkValue;

  openModalImage();
}

// Функция слушателя отправки формы обновлениe фото
function handleFormSubmitUpdate(evt) {
  evt.preventDefault();

  const submitButton = evt.target.querySelector('.popup__button');
  const profileLinkValue = document.querySelector(
    '.popup__input_type_url_profile'
  ).value;

  renderLoading(true, submitButton);

  patchImageProfile(profileLinkValue)
    .then((dataProfile) => {
      profileImage.style.backgroundImage = `url(${dataProfile.avatar})`;
      closeModal();
    })
    .catch((err) => console.log(`Ошибка: ${err}`))
    .finally(() => {
      renderLoading(false, submitButton);
    });
}

// Функция слушателя отправки формы редактирования профиля
function handleFormSubmitEdit(evt) {
  evt.preventDefault();
  const submitButton = evt.target.querySelector('.popup__button');

  renderLoading(true, submitButton);

  patchProfile(nameInput.value, jobInput.value)
    .then((updatedData) => {
      profileTitle.textContent = updatedData.name;
      profileDescription.textContent = updatedData.about;
      closeModal();
    })
    .catch((err) => console.log(`Ошибка: ${err}`))
    .finally(() => {
      renderLoading(false, submitButton);
    });
}

// Функция слушателя отправки формы добавления карточки
function handleFormSubmitAdd(evt) {
  evt.preventDefault();

  const submitButton = evt.target.querySelector('.popup__button');
  const placeNameValue = document.querySelector(
    '.popup__input_type_card-name'
  ).value;
  const placeLinkValue = document.querySelector('.popup__input_type_url').value;

  renderLoading(true, submitButton);

  postCards(placeNameValue, placeLinkValue)
    .then((newCard) => {
      const card = addCard(
        newCard.link,
        newCard.name,
        newCard.likes,
        newCard._id,
        newCard.owner._id,
        userId,
        deleteCard,
        setLike,
        viewCard
      );
      placesList.prepend(card);
      popupFormAdd.reset();
      closeModal();
    })
    .catch((err) => console.log(`Ошибка: ${err}`))
    .finally(() => {
      renderLoading(false, submitButton);
    });
}

function renderLoading(isLoading, popupButton) {
  if (isLoading) {
    popupButton.textContent = 'Сохранение...';
  } else {
    popupButton.textContent = 'Сохранить';
  }
}

function renderProfile(dataProfile) {
  profileImage.style.backgroundImage = `url(${dataProfile.avatar})`;
  profileTitle.textContent = dataProfile.name;
  profileDescription.textContent = dataProfile.about;
}

function renderCards(dataCards, userId) {
  dataCards.forEach((cardElement) => {
    const card = addCard(
      cardElement.link,
      cardElement.name,
      cardElement.likes,
      cardElement._id,
      cardElement.owner._id,
      userId,
      deleteCard,
      setLike,
      viewCard
    );
    placesList.append(card);
  });
}

enableValidation(validationConfigEdit);
enableValidation(validationConfigNewCard);
enableValidation(validationConfigUpdateProfile);

// Слушатели
popupFormEdit.addEventListener('submit', handleFormSubmitEdit);
popupFormAdd.addEventListener('submit', handleFormSubmitAdd);
popupFormUpdateProfile.addEventListener('submit', handleFormSubmitUpdate);
profileEditButton.addEventListener('click', openModalEdit);
profileAddButton.addEventListener('click', openModalNewCard);
profileImage.addEventListener('click', openModalUpdateProfile);
let userId = null;

function initialization() {
  // Каждому модальному окну добавляется класс анимации
  popups.forEach((popup) => {
    popup.classList.add('popup_is-animated');
  });

  //Получаем с сервера карточки и данные о профиле
  Promise.all([getInitialProfile(), getInitialCards()])
    .then(([dataProfile, dataCards]) => {
      userId = dataProfile._id;
      renderProfile(dataProfile);
      renderCards(dataCards, userId);
    })
    .catch((err) => console.log(err));
}

initialization();

//код, который отвечает за загрузку карточек и данных пользователя при открытии страницы
