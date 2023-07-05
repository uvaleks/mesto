export default class Api {
    constructor({baseUrl, headers}) {
        this._baseUrl = baseUrl;
        this._headers = headers;
    }
  
    getInitialCards() {
        return fetch(`${this._baseUrl}/cards`, {headers: this._headers})
            .then(res => {
                if (res.ok) {
                    return res.json();
                }
                return Promise.reject(`Ошибка: ${res.status}`);
            })
            .then((result) => {
                return result;
            }); 
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
            .then(res => {
                if (res.ok) {
                    return res.json();
                }
                return Promise.reject(`Ошибка: ${res.status}`);
            })
            .then((result) => {
                return result;
            }); 
    }

    // getLikes(id) {
    //     return fetch(`${this._baseUrl}/cards/${id}`, {
    //         method: 'GET',
    //         headers: {
    //             authorization: this._headers.authorization,
    //             'Content-Type': 'application/json'
    //         }
    //     })
    //         .then(res => {
    //             if (res.ok) {
    //                 return res.json();
    //             }
    //             return Promise.reject(`Ошибка: ${res.status}`);
    //         })
    //         .then((result) => {
    //             return result;
    //         }); 
    // }

    putLike(id) {
        return fetch(`${this._baseUrl}/cards/${id}/likes`, {
            method: 'PUT',
            headers: {
                authorization: this._headers.authorization,
                'Content-Type': 'application/json'
            }
        })
            .then(res => {
                if (res.ok) {
                    console.log('LIKE on card with ID' + id + ' PUTED')
                    return res.json();
                }
                return Promise.reject(`Ошибка: ${res.status}`);
            })
            .then((result) => {
                return result;
            }); 
    }

    deleteLike(id) {
        return fetch(`${this._baseUrl}/cards/${id}/likes`, {
            method: 'DELETE',
            headers: {
                authorization: this._headers.authorization,
                'Content-Type': 'application/json'
            }
        })
            .then(res => {
                if (res.ok) {
                    console.log('LIKE on card with ID' + id + ' DELETED')
                    return res.json();
                }
                return Promise.reject(`Ошибка: ${res.status}`);
            })
            .then((result) => {
                return result;
            }); 
    }

    deleteCard(id) {
        console.log('Trying to delete card with ID:' + id)
        return fetch(`${this._baseUrl}/cards/${id}`, {
            method: 'DELETE',
            headers: {
                authorization: this._headers.authorization,
                'Content-Type': 'application/json'
            }
        })
            .then(res => {
                if (res.ok) {
                    console.log('DELETED')
                    return res.json();
                }
                return Promise.reject(`Ошибка: ${res.status}`);
            })
            .then((result) => {
                return result;
            }); 
    }

    getUserInfo() {
        return fetch(`${this._baseUrl}/users/me`, {headers: this._headers})
            .then(res => {
                if (res.ok) {
                    return res.json();
                }
                return Promise.reject(`Ошибка: ${res.status}`);
            })
            .then((result) => {
                return result;
            }); 
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
            .then(res => {
                if (res.ok) {
                    return res.json();
                }
                return Promise.reject(`Ошибка: ${res.status}`);
            })
            .then((result) => {
                return result;
            }); 
    }

//     fetch('https://mesto.nomoreparties.co/v1/cohortId/users/me', {
//   method: 'PATCH',
//   headers: {
//     authorization: 'c56e30dc-2883-4270-a59e-b2f7bae969c6',
//     'Content-Type': 'application/json'
//   },
//   body: JSON.stringify({
//     name: 'Marie Skłodowska Curie',
//     about: 'Physicist and Chemist'
//   })
// });
}