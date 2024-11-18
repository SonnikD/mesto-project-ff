const config = {
  baseUrl: 'https://nomoreparties.co/v1/cohort-mag-4',
  headers: {
    authorization: '2bb72171-26f3-46b1-9f33-4a0720a5cdb4',
    'Content-Type': 'application/json',
  },
};

//запрос на сервер для получечения данных пользователя
const getInitialProfile = () => {
  return fetch(`${config.baseUrl}/users/me `, {
    headers: config.headers,
  }).then((res) => {
    if (res.ok) {
      return res.json();
    }

    return Promise.reject(`Ошибка: ${res.status}`);
  });
};

//запрос на сервер для получения информации о карточках
const getInitialCards = () => {
  return fetch(`${config.baseUrl}/cards`, {
    headers: config.headers,
  }).then((res) => {
    if (res.ok) {
      return res.json();
    }

    return Promise.reject(`Ошибка: ${res.status}`);
  });
};

//запрос на сервер для обновления данных пользователя
const patchProfile = (profileTitle, profileDescription) => {
  return fetch(`${config.baseUrl}/users/me`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      name: profileTitle,
      about: profileDescription,
    }),
  }).then((res) => {
    if (!res.ok) {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
    return res.json();
  });
};

//запрос на сервер для создания новой карточки
const postCards = (cardName, cardLink) => {
  return fetch(`${config.baseUrl}/cards  `, {
    method: 'POST',
    headers: config.headers,
    body: JSON.stringify({
      name: cardName,
      link: cardLink,
    }),
  }).then((res) => {
    if (!res.ok) {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
    return res.json();
  });
};

//запрос на сервер для удаления карточки
const deleteCardServer = (cardId) => {
  return fetch(`${config.baseUrl}/cards/${cardId}`, {
    method: 'DELETE',
    headers: config.headers,
  });
};

//запрос на сервер для установки лайка
const setLikeServer = (cardId) => {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: 'PUT',
    headers: config.headers,
  }).then((res) => {
    if (!res.ok) {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
    return res.json();
  });
};

//запрос на сервер для удаления лайка
const deleteLikeServer = (cardId) => {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: 'DELETE',
    headers: config.headers,
  }).then((res) => {
    if (!res.ok) {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
    return res.json();
  });
};

//запрос на сервер, чтобы сменить аватарку
const patchImageProfile = (profileLink) => {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      avatar: profileLink,
    }),
  }).then((res) => {
    if (!res.ok) {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
    return res.json();
  });
};

export {
  getInitialProfile,
  getInitialCards,
  patchProfile,
  postCards,
  deleteCardServer,
  setLikeServer,
  deleteLikeServer,
  patchImageProfile,
};
