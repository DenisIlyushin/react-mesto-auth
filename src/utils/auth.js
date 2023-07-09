class Auth {
  #baseUrl;
  #headers;

  constructor(options) {
    this.#baseUrl = options.baseUrl;
    this.#headers = options.headers;
  }

  #handleResponse(response) {
    if (response.ok) {
      return response.json();
    }
    return Promise.reject(response.status);
  };

  signup(email, password) {
    return fetch(`${this.#baseUrl}/signup`, {
        method: 'POST',
        headers: this.#headers,
        body: JSON.stringify({
          email: email,
          password: password
        }),
      }
    )
      .then(this.#handleResponse);
  }

  signin(email, password) {
    return fetch(`${this.#baseUrl}/signin`, {
        method: 'POST',
        headers: this.#headers,
        body: JSON.stringify({
          email: email,
          password: password
        }),
      }
    )
      .then(this.#handleResponse)
  }

  me(token) {
    return fetch(`${this.#baseUrl}/users/me`, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization' : `Bearer ${token}`}
      }
    )
      .then(this.#handleResponse);
  }

}

const auth = new Auth({
  baseUrl: 'https://auth.nomoreparties.co',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  },
})

export default auth