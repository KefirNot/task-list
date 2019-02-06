import * as actions from './actions.js';
import update from 'immutability-helper';

const initialState = {
    auth: {
        open: false,
        username: null,
        isAdmin: false,
        loading: false,
        error: null,
    },
    tasks: {
        items: [],
        count: -1,
        loading: false,
        page: 0,
        sortBy: null,
        sortDir: null,
    },
    form: {
        open: false,
        id: null,
        username: null,
        email: null,
        text: null,
        status: null,
        loading: false,
        error: {},
    }
}

export default (state = initialState, action) => {
    const { type, payload } = action;
    switch (type) {
        case actions.SHOW_AUTHORIZATION:
            return update(state, { auth: { open: { $set: true } } });
        case actions.HIDE_AUTHORIZATION:
            return update(state, { auth: { open: { $set: false } } });

        case actions.SHOW_FORM:
            return update(state, { form: { $set: { ...payload, open: true, } } });
        case actions.EDIT_FORM:
            return update(state, { form: { $merge: { [payload.property]: payload.newValue } } });
        case actions.HIDE_FORM:
            return update(state, { form: { $set: { open: false, } } });

        case actions.LOGIN_STARTED:
            return update(state, { auth: { loading: { $set: true } } });
        case actions.LOGIN_SUCCESSED:
            return update(state, {
                auth: {
                    $set: {
                        open: false,
                        username: payload.userName,
                        isAdmin: payload.isAdmin,
                        loading: false
                    }
                }
            });
        case actions.LOGIN_FAILED:
            return update(state, { auth: { loading: { $set: false }, error: { $set: payload.errorText } } });

        case actions.GET_TASKS_STARTED:
            return update(state, {
                tasks: {
                    $set: {
                        items: [],
                        count: -1,
                        loading: true,
                        page: payload.page,
                        sortBy: payload.sortBy,
                        sortDir: payload.sortDir,
                    },
                }
            });
        case actions.GET_TASKS_SUCCESSED:
            return update(state, {
                tasks: {
                    $merge: {
                        items: payload.tasks,
                        count: Number(payload.total_task_count),
                        loading: false,
                    }
                }
            });
        case actions.GET_TASKS_FAILED:
            return update(state, { auth: { loading: { $set: false }, error: { $set: payload.errorText } } });

        case actions.CREATE_TASK_STARTED:
            return update(state, { form: { loading: { $set: true }, error: { $set: {} } } });
        case actions.CREATE_TASK_SUCCESSED:
            return update(state, { form: { open: { $set: false } } });
        case actions.CREATE_TASK_FAILED:
            return update(state, { form: { loading: { $set: false }, error: { $set: payload.error } } });

        case actions.EDIT_TASK_STARTED:
            return update(state, { form: { loading: { $set: true }, error: { $set: {} } } });
        case actions.EDIT_TASK_SUCCESSED:
            return update(state, { form: { open: { $set: false } } });
        case actions.EDIT_TASK_FAILED:
            return update(state, { form: { loading: { $set: false }, error: { $set: payload.error } } });

        default:
            break;
    }
    return state;
}