import '../pages/index.css';
import {
  initialCards,
  addCard,
  deleteCard,
  setLike,
  viewCard,
} from './card.js';
import { openModal, closeModal } from './modal.js';

// DOM узлы
const cardTemplate = document.querySelector('#card-template').content;
const placesList = document.querySelector('.places__list');
const popupFormEdit = document.forms['edit-profile'];
const popupFormAdd = document.forms['new-place'];
const nameInput = document.querySelector('.popup__input_type_name');
const jobInput = document.querySelector('.popup__input_type_description');
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const profileEditButton = document.querySelector('.profile__edit-button');
const profileAddButton = document.querySelector('.profile__add-button');

//Функция слушателя открытие модалки редактировования
function openModalEdit() {
  const popupContainerEdit = document.querySelector('.popup_type_edit');

  openModal(popupContainerEdit);

  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;
}

// Функция открытия модалки новой карточки
function openModalNewCard() {
  const popupContainerNewCard = document.querySelector('.popup_type_new-card');

  openModal(popupContainerNewCard);
}

// Функция открытия модалки изображения
function openModalImage() {
  const popupContainerImage = document.querySelector('.popup_type_image');

  openModal(popupContainerImage);
}

// Функция слушателя отправки формы редактирования профиля
function handleFormSubmitEdit(evt) {
  evt.preventDefault();
  profileTitle.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;
  closeModal();
}

// Функция слушателя отправки формы добавления карточки
function handleFormSubmitAdd(evt) {
  evt.preventDefault();
  const placeNameValue = document.querySelector(
    '.popup__input_type_card-name'
  ).value;
  const placeLinkValue = document.querySelector('.popup__input_type_url').value;

  const card = addCard(
    placeLinkValue,
    placeNameValue,
    deleteCard,
    setLike,
    viewCard
  );

  initialCards.unshift({ name: placeNameValue, link: placeLinkValue });
  placesList.prepend(card);
  popupFormAdd.reset();
  closeModal();
}

//TODO: Слушатели
popupFormEdit.addEventListener('submit', handleFormSubmitEdit);
popupFormAdd.addEventListener('submit', handleFormSubmitAdd);
profileEditButton.addEventListener('click', openModalEdit);
profileAddButton.addEventListener('click', openModalNewCard);

// TODO:Вывести карточки на страницу
initialCards.forEach((element) => {
  const card = addCard(
    element.link,
    element.name,
    deleteCard,
    setLike,
    viewCard
  );
  placesList.append(card);
});

export { cardTemplate, openModalImage };
