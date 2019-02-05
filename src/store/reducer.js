import * as actions from './actions.js';
import update from 'immutability-helper';

const initialState = {
    value: 777,
}

export default (state = initialState, action) => {
    const { type, payload } = action;
    switch (type) {
        case actions.DO_SOMETHING:
            return update(state, { value: { $set: Math.random() } });
        default:
            break;
    }
    return state;
}