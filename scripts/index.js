// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;

// @todo: DOM узлы
const placesList = document.querySelector('.places__list');

// @todo: Функция создания карточки
function addCard(cardLinkValue, cardTitleValue, deleteCardFunction) {
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  cardElement.querySelector('.card__image').src = cardLinkValue;
  cardElement.querySelector('.card__title').textContent = cardTitleValue;
  cardElement
    .querySelector('.card__delete-button')
    .addEventListener('click', function () {
      deleteCardFunction(cardElement);
    });

  return cardElement;
}

// @todo: Функция удаления карточки
function deleteCard(cardElement) {
  cardElement.remove();
}

// @todo: Вывести карточки на страницу
initialCards.forEach((element) => {
  const card = addCard(element.link, element.name, deleteCard);
  placesList.append(card);
});
