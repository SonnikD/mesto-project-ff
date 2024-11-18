import { deleteCardServer, deleteLikeServer, setLikeServer } from './api';
const cardTemplate = document.querySelector('#card-template').content;

// Функция создания карточки
function addCard(
  cardLinkValue,
  cardTitleValue,
  cardLikeCount,
  cardId,
  cardOwnerId,
  userId,
  deletedFunction,
  likeFunction,
  clickImageFunction
) {
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  const cardImage = cardElement.querySelector('.card__image');
  const likeButton = cardElement.querySelector('.card__like-button');
  const likeCount = cardElement.querySelector('.card__like-count');
  const deleteButton = cardElement.querySelector('.card__delete-button');

  cardImage.src = cardLinkValue;
  cardImage.alt = cardTitleValue;
  cardElement.querySelector('.card__title').textContent = cardTitleValue;
  likeCount.textContent = cardLikeCount.length;

  if (userId !== cardOwnerId) {
    deleteButton.style.display = 'none';
  }

  if (cardLikeCount.some((like) => like._id === userId)) {
    setLike(likeButton);
  }

  deleteButton.addEventListener('click', function () {
    deleteCardServer(cardId)
      .then(() => deletedFunction(cardElement))
      .catch((err) => console.log(`Ошибка удаления: ${err}`));
  });

  likeButton.addEventListener('click', function () {
    const isLiked = likeButton.classList.contains(
      'card__like-button_is-active'
    );
    const toggleLike = isLiked ? deleteLikeServer : setLikeServer;

    toggleLike(cardId)
      .then((updatedCard) => {
        likeFunction(likeButton);
        likeCount.textContent = updatedCard.likes.length;
      })
      .catch((err) => console.log(`Ошибка: ${err}`));
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
