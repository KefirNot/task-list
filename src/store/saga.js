import { call, put, takeLatest } from 'redux-saga/effects';
import * as actions from './actions';
import * as api from '../api';

function* login(action) {
    const { payload: { login, pass } } = action;
    yield put(actions.loginStarted());
    const { data, status, statusText } = yield call(api.authorize, login, pass);
    debugger;
    if (status === 200) {
        yield put(actions.loginSuccessed(data));
    } else {
        yield put(actions.loginFailed({ errorText: `${status} ${statusText}` }));
    }
}

function* saga() {
    yield takeLatest(actions.LOGIN, login);
}

export default saga;