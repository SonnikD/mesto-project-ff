import { cardTemplate, openModalImage } from './index.js';
import { initialCards } from './cards.js';

// Функция создания карточки
function addCard(
  cardLinkValue,
  cardTitleValue,
  deletedFunction,
  likeFunction,
  clickImageFunction
) {
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  const cardImage = cardElement.querySelector('.card__image');

  cardImage.src = cardLinkValue;
  cardImage.alt = cardTitleValue;
  cardElement.querySelector('.card__title').textContent = cardTitleValue;

  cardElement
    .querySelector('.card__delete-button')
    .addEventListener('click', function () {
      deletedFunction(cardElement);
    });
  cardElement
    .querySelector('.card__like-button')
    .addEventListener('click', function () {
      likeFunction(cardElement);
    });
  cardElement;
  cardImage.addEventListener('click', function () {
    clickImageFunction(cardElement);
  });
  return cardElement;
}

// Функция удаления карточки
function deleteCard(cardElement) {
  cardElement.remove();
}

// Функция для лайка карточки
function setLike(cardElement) {
  const likeButton = cardElement.querySelector('.card__like-button');

  if (likeButton.classList.contains('card__like-button_is-active')) {
    likeButton.classList.remove('card__like-button_is-active');
  } else {
    likeButton.classList.add('card__like-button_is-active');
  }
}

// Функция просмотра изображения карточки
function viewCard(cardElement) {
  const cardLink = cardElement.querySelector('.card__image').src;
  const cardTitle = cardElement.querySelector('.card__title').textContent;

  document.querySelector('.popup__caption').textContent = cardTitle;
  document.querySelector('.popup__image').alt = cardTitle;
  document.querySelector('.popup__image').src = cardLink;

  openModalImage();
}

export { initialCards, addCard, deleteCard, setLike, viewCard };
