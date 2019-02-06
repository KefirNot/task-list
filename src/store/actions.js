import asyncMaker from './asyncMaker';

export const SHOW_AUTHORIZATION = 'SHOW_AUTHORIZATION';
export const HIDE_AUTHORIZATION = 'HIDE_AUTHORIZATION';
export const showAuthorization = () => ({ type: SHOW_AUTHORIZATION, payload: {} });
export const hideAuthorization = () => ({ type: HIDE_AUTHORIZATION, payload: {} });

export const SHOW_FORM = 'SHOW_FORM';
export const EDIT_FORM = 'EDIT_FORM';
export const HIDE_FORM = 'HIDE_FORM';
export const showForm = (id, username, email, text, status) => ({ type: SHOW_FORM, payload: { id, username, email, text, status } });
export const editForm = (property, newValue) => ({ type: EDIT_FORM, payload: { property, newValue } });
export const hideForm = () => ({ type: HIDE_FORM, payload: {} });


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

export const {
    CREATE_TASK,
    CREATE_TASK_STARTED,
    CREATE_TASK_SUCCESSED,
    CREATE_TASK_FAILED,
    createTask,
    createTaskStarted,
    createTaskSuccessed,
    createTaskFailed,
} = asyncMaker('CREATE_TASK', 'createTask');