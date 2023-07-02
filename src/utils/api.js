class Api {
  #baseUrl;
  #headers;

  constructor(options) {
    this.#baseUrl = options.baseUrl;
    this.#headers = options.headers;
  };

  #handleResponse(response) {
    if (response.ok) {
      return response.json();
    }
    return Promise.reject(`Ошибка: ${response.status}`);
  };

  getCards() {
    return fetch(`${this.#baseUrl}/cards`, {
        headers: this.#headers
      }
    )
      .then(this.#handleResponse);
  };

  getUserInfo() {
    return fetch(`${this.#baseUrl}/users/me`, {
        headers: this.#headers
      }
    )
      .then(this.#handleResponse)
  };

  setUserInfo({name, about}) {
    return fetch(`${this.#baseUrl}/users/me`, {
      method: 'PATCH',
      headers: this.#headers,
      body: JSON.stringify({
        name: name,
        about: about
      }),
    }).then(this.#handleResponse)
  };

  setUserAvatar({avatar}) {
    return fetch(`${this.#baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: this.#headers,
      body: JSON.stringify({
        avatar: avatar
      }),
    }).then(this.#handleResponse)
  };

  createMesto({name, link}) {
    return fetch(`${this.#baseUrl}/cards`, {
      method: 'POST',
      headers: this.#headers,
      body: JSON.stringify({
        name: name,
        link: link
      }),
    }).then(this.#handleResponse)
  };

  deleteCard(id) {
    return fetch(`${this.#baseUrl}/cards/${id}`, {
      method: 'DELETE',
      headers: this.#headers,
    }).then(this.#handleResponse)
  };

  likeCard(id) {
    return fetch(`${this.#baseUrl}/cards/${id}/likes`, {
      method: 'PUT',
      headers: this.#headers,
    }).then(this.#handleResponse)
  };

  dislikeCard(id) {
    return fetch(`${this.#baseUrl}/cards/${id}/likes`, {
      method: 'DELETE',
      headers: this.#headers,
    }).then(this.#handleResponse)
  };
}

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-66',
  headers: {
    authorization: 'dc6a4a93-0c58-4e81-85df-4663aee25693',
    'Content-Type': 'application/json',
  },
})

export default api