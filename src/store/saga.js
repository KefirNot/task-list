import { call, put, takeLatest } from 'redux-saga/effects';
import * as actions from './actions';
import * as api from '../api';

const OK_STATUS = 'ok';

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
    const { payload: { } } = action;
    yield put(actions.getTasksStarted());
    const { data: { status, message } } = yield call(api.getTasks);
    if (status === OK_STATUS) {
        yield put(actions.getTasksSuccessed(message));
    } else {
        yield put(actions.getTasksFailed({ errorText: message.text }));
    }
}

function* saga() {
    yield takeLatest(actions.LOGIN, login);
    yield takeLatest(actions.GET_TASKS, getTasks);
}

export default saga;