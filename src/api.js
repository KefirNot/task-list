import axios from 'axios';

const CATCH = error => error.response;
const ADMIN_LOGIN = 'admin';
const ADMIN_PASS = '123';
const ADMIN_USERNAME = 'ADMIN';
const FAKE_RESPONSE_DELAY = 300;

const instance = axios.create({
    baseURL: process.env.REACT_APP_BACKEND_BASE_URL,
    params: { developer: process.env.REACT_APP_BACKEND_BASE_URL },
});

// фейковый запрос, в любой момент можно подменить на реальный
export const authorize = (login, pass) => new Promise((resolve, reject) => {
    if (login === ADMIN_LOGIN && pass === ADMIN_PASS) {
        setTimeout(() => resolve({ data: { userName: ADMIN_USERNAME, isAdmin: true }, status: 200, statusText: 'ok' }), FAKE_RESPONSE_DELAY);
    } else {
        setTimeout(() => reject({ response: { status: 401, statusText: 'Неверный логин или пароль' } }), FAKE_RESPONSE_DELAY);
    }
}).catch(CATCH);
export const getTasks = (sortBy, sortDir, page) => instance.get('/', { params: { sort_field: sortBy, sort_direction: sortDir, page } }).catch(CATCH);