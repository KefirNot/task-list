import * as actions from './actions.js';
import update from 'immutability-helper';

const initialState = {
    auth: {
        show: false,
        username: null,
        isAdmin: false,
        loading: false,
        error: null,
    }
}

export default (state = initialState, action) => {
    const { type, payload } = action;
    switch (type) {
        case actions.SHOW_AUTHORIZATION:
            return update(state, { auth: { show: { $set: true } } });
        case actions.HIDE_AUTHORIZATION:
            return update(state, { auth: { show: { $set: false } } });
        case actions.LOGOUT:
            return update(state, { auth: { user: { $set: null } } });

        case actions.LOGIN_STARTED:
            return update(state, { auth: { loading: { $set: true } } });
        case actions.LOGIN_SUCCESSED:
            return update(state, {
                auth: {
                    $set: {
                        show: false,
                        username: payload.username,
                        isAdmin: payload.isAdmin,
                        loading: false
                    }
                }
            });
        case actions.LOGIN_FAILED:
            return update(state, { auth: { loading: { $set: false }, error: { $set: payload.errorText } } });
        default:
            break;
    }
    return state;
}