import { call, put, takeLatest } from 'redux-saga/effects';
import * as actions from './actions';
import * as api from '../api';
import qs from 'qs';
import md5 from 'md5';

const OK_STATUS = 'ok';
const TOKEN = 'beejee';

function* login(action) {
    const { payload: { login, pass } } = action;
    yield put(actions.loginStarted());
    const { data, status, statusText } = yield call(api.authorize, login, pass);
    if (status === 200) {
        yield put(actions.loginSuccessed(data));
    } else {
        yield put(actions.loginFailed({ errorText: `${status} ${statusText}` }));
    }
}

function* getTasks(action) {
    const { payload: { sortBy, sortDir, page = 0 } } = action;
    yield put(actions.getTasksStarted({ sortBy, sortDir, page }));
    const { data: { status, message } } = yield call(api.getTasks, sortBy, sortDir, page);
    if (status === OK_STATUS) {
        yield put(actions.getTasksSuccessed(message));
    } else {
        yield put(actions.getTasksFailed({ errorText: message.text }));
    }
}

function* createTask(action) {
    const { payload: { username, email, text } } = action;
    yield put(actions.createTaskStarted());
    const { data: { status, message } } = yield call(api.createTask, username, email, text);
    if (status === OK_STATUS) {
        yield put(actions.createTaskSuccessed(message));
    } else {
        yield put(actions.createTaskFailed({ error: message }));
    }
}


function* editTask(action) {
    const { payload: { id, text, status } } = action;
    yield put(actions.editTaskStarted());

    const obj = { text, status };
    const sortedObj = {};
    Object.keys(obj).sort().forEach(key => sortedObj[key] = obj[key]);
    sortedObj.token = TOKEN;
    const strObj = qs.stringify(sortedObj);
    const signature = md5(strObj);

    const { data } = yield call(api.editTask, id, text, status, TOKEN, signature);
    if (data.status === OK_STATUS) {
        yield put(actions.editTaskSuccessed());
        yield put(actions.getTasks());
    } else {
        debugger;
        yield put(actions.editTaskFailed({ error: data.message }));
    }
}

function* saga() {
    yield takeLatest(actions.LOGIN, login);
    yield takeLatest(actions.GET_TASKS, getTasks);
    yield takeLatest(actions.CREATE_TASK, createTask);
    yield takeLatest(actions.EDIT_TASK, editTask);
}

export default saga;