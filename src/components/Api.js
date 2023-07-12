export default class Api {
    constructor({baseUrl, headers}) {
        this._baseUrl = baseUrl;
        this._headers = headers;
    }
  
    _checkResponse(res) {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(`Ошибка ${res.status}`);
    }

    getInitialCards() {
        return fetch(`${this._baseUrl}/cards`, {headers: this._headers})
        .then(this._checkResponse)
        .then((result) => {
            return result;
        })
        .catch((err) => {
            console.error(err);
        })
    }

    postCard({name, link}) {
        return fetch(`${this._baseUrl}/cards`, {
            method: 'POST',
            headers: {
                authorization: this._headers.authorization,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: name,
                link: link
            })
        })
        .then(this._checkResponse)
        .then((result) => {
            return result;
        })
        .catch((err) => {
            console.error(err);
        })
    }

    patchAvatar(link) {
        return fetch(`${this._baseUrl}/users/me/avatar`, {
            method: 'PATCH',
            headers: {
                authorization: this._headers.authorization,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                avatar: link
            })
        })
        .then(this._checkResponse)
        .then((result) => {
            return result;
        })
        .catch((err) => {
            console.error(err);
        })
    }


    putLike(id) {
        return fetch(`${this._baseUrl}/cards/${id}/likes`, {
            method: 'PUT',
            headers: {
                authorization: this._headers.authorization,
                'Content-Type': 'application/json'
            }
        })
        .then(this._checkResponse)
        .then((result) => {
            return result;
        })
        .catch((err) => {
            console.error(err);
        })
    }

    deleteLike(id) {
        return fetch(`${this._baseUrl}/cards/${id}/likes`, {
            method: 'DELETE',
            headers: {
                authorization: this._headers.authorization,
                'Content-Type': 'application/json'
            }
        })
        .then(this._checkResponse)
        .then((result) => {
            return result;
        })
        .catch((err) => {
            console.error(err);
        })
    }

    deleteCard(id) {
        return fetch(`${this._baseUrl}/cards/${id}`, {
            method: 'DELETE',
            headers: {
                authorization: this._headers.authorization,
                'Content-Type': 'application/json'
            }
        })
        .then(this._checkResponse)
        .then((result) => {
            return result;
        })
        .catch((err) => {
            console.error(err);
        })
    }

    getUserInfo() {
        return fetch(`${this._baseUrl}/users/me`, {headers: this._headers})
        .then(this._checkResponse)
        .then((result) => {
            return result;
        })
        .catch((err) => {
            console.error(err);
        })
    }

    patchUserInfo({name, info}) {
        return fetch(`${this._baseUrl}/users/me`, {
            method: 'PATCH',
            headers: {
                authorization: this._headers.authorization,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: name,
                about: info
            })
        })
        .then(this._checkResponse)
        .then((result) => {
            return result;
        })
        .catch((err) => {
            console.error(err);
        })
    }
}