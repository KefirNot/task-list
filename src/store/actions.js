import asyncMaker from './asyncMaker';

export const SHOW_AUTHORIZATION = 'SHOW_AUTHORIZATION';
export const HIDE_AUTHORIZATION = 'HIDE_AUTHORIZATION';
export const LOGOUT = 'LOGOUT';

export const showAuthorization = () => ({ type: SHOW_AUTHORIZATION, payload: {} });
export const hideAuthorization = () => ({ type: HIDE_AUTHORIZATION, payload: {} });
export const logout = () => ({ type: LOGOUT, payload: {} });

export const {
    LOGIN,
    LOGIN_STARTED,
    LOGIN_SUCCESSED,
    LOGIN_FAILED,
    login,
    loginStarted,
    loginSuccessed,
    loginFailed,
} = asyncMaker('LOGIN', 'login');

export const {
    GET_TASKS,
    GET_TASKS_STARTED,
    GET_TASKS_SUCCESSED,
    GET_TASKS_FAILED,
    getTasks,
    getTasksStarted,
    getTasksSuccessed,
    getTasksFailed,
} = asyncMaker('GET_TASKS', 'getTasks');