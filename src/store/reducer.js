import * as actions from './actions.js';
import update from 'immutability-helper';

const initialState = {
    auth: {
        show: false,
        username: null,
        isAdmin: false,
        loading: false,
        error: null,
    },
    tasks: {
        items: [],
        count: null,
        loading: false,
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
                        username: payload.userName,
                        isAdmin: payload.isAdmin,
                        loading: false
                    }
                }
            });
        case actions.LOGIN_FAILED:
            return update(state, { tasks: { loading: { $set: false }, error: { $set: payload.errorText } } });
        case actions.GET_TASKS_STARTED:
            return update(state, { tasks: { loading: { $set: true } } });
        case actions.GET_TASKS_SUCCESSED:
            return update(state, {
                tasks: {
                    $set: {
                        items: payload.tasks,
                        count: payload.total_task_count,
                        loading: false
                    }
                }
            });
        case actions.GET_TASKS_FAILED:
            return update(state, { auth: { loading: { $set: false }, error: { $set: payload.errorText } } });
        default:
            break;
    }
    return state;
}