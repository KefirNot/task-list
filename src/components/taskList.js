import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Task from './task';
import { getTasks } from '../store/actions';

class TaskList extends React.Component {
    static propTypes = {
        loading: PropTypes.bool,
        items: PropTypes.array,
        getTasks: PropTypes.func,
    }

    componentDidMount() {
        const { getTasks } = this.props;

        getTasks();
    }

    render() {
        const { loading, items, getTasks } = this.props;

        return (
            <div>
                {items.map(item => <Task key={item.id} {...item} />)}
            </div>
        );
    }
}

export default connect(
    state => ({ ...state.tasks }),
    dispatch => ({ getTasks: () => dispatch(getTasks()) }),
)(TaskList);