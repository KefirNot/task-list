import axios from 'axios';

const CATCH = error => error.response;
const ADMIN_LOGIN = 'admin';
const ADMIN_PASS = '123';
const ADMIN_USERNAME = 'ADMIN';
const FAKE_RESPONSE_DELAY = 300;

const instance = axios.create({
    baseURL: process.env.REACT_APP_BACKEND_BASE_URL,
    params: { developer: process.env.REACT_APP_DEVELOPER },
});

// фейковый запрос, в любой момент можно подменить на реальный
export const authorize = (login, pass) => new Promise((resolve, reject) => {
    if (login === ADMIN_LOGIN && pass === ADMIN_PASS) {
        setTimeout(() => resolve({ data: { userName: ADMIN_USERNAME, isAdmin: true }, status: 200, statusText: 'ok' }), FAKE_RESPONSE_DELAY);
    } else {
        setTimeout(() => reject({ response: { status: 401, statusText: 'Wrong username or password' } }), FAKE_RESPONSE_DELAY);
    }
}).catch(CATCH);
// page + 1, т.к. на сервере страницы считаются с 1, а не с 0
export const getTasks = (sortBy, sortDir, page) => instance.get('/', { params: { sort_field: sortBy, sort_direction: sortDir, page: page + 1 } }).catch(CATCH);
export const createTask = (username, email, text) => {
    var form = new FormData();
    form.append('username', username);
    form.append('email', email);
    form.append('text', text);

    return instance.post('/create', form).catch(CATCH);
}