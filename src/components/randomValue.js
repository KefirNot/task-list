import React, { Component } from 'react';
import { connect } from 'react-redux';
import { doSomething } from '../store/actions';

class RandomValue extends Component {
    render() {
        const { value, newValue } = this.props;

        return (
            <div>
                <div>{value}</div>
                <div onClick={newValue}>new</div>
            </div>
        );
    }
}

export default connect(
    state => state,
    dispatch => ({ newValue: () => dispatch(doSomething()) })
)(RandomValue);