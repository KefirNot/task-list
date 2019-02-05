import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Pagination from './pagination';
import Task from './task';
import { getTasks } from '../store/actions';


class TaskList extends React.Component {
    static propTypes = {
        loading: PropTypes.bool,
        items: PropTypes.array,
        count: PropTypes.number,
        getTasks: PropTypes.func,
    }

    componentDidMount() {
        const { getTasks } = this.props;

        getTasks();
    }

    render() {
        const { loading, items, count, getTasks } = this.props;

        return (
            <div>
                {items.map(item => <Task key={item.id} {...item} />)}
                <Pagination
                    component="div"
                    count={count}
                    rowsPerPage={3}
                    page={0}
                    onChangePage={() => {}}
                />
            </div>
        );
    }
}

export default connect(
    state => ({ ...state.tasks }),
    dispatch => ({ getTasks: () => dispatch(getTasks()) }),
)(TaskList);