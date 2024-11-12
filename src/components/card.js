const cardTemplate = document.querySelector('#card-template').content;

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
  const likeButton = cardElement.querySelector('.card__like-button');

  cardImage.src = cardLinkValue;
  cardImage.alt = cardTitleValue;
  cardElement.querySelector('.card__title').textContent = cardTitleValue;

  cardElement
    .querySelector('.card__delete-button')
    .addEventListener('click', function () {
      deletedFunction(cardElement);
    });
  likeButton.addEventListener('click', function () {
    likeFunction(likeButton);
  });
  cardImage.addEventListener('click', function () {
    clickImageFunction(cardLinkValue, cardTitleValue);
  });
  return cardElement;
}

// Функция удаления карточки
function deleteCard(cardElement) {
  cardElement.remove();
}

// Функция для лайка карточки
function setLike(likeButton) {
  likeButton.classList.toggle('card__like-button_is-active');
}

export { addCard, deleteCard, setLike };
