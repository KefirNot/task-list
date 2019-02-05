import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Pagination from './pagination';
import SortBar from './sortBar';
import Task from './task';
import { getTasks } from '../store/actions';

class TaskList extends React.Component {
    static propTypes = {
        loading: PropTypes.bool,
        items: PropTypes.array,
        count: PropTypes.number,
        page: PropTypes.number,
        getTasks: PropTypes.func,
    }

    componentDidMount() {
        const { getTasks } = this.props;

        getTasks();
    }

    render() {
        const { loading, items, count, page, getTasks } = this.props;

        return (
            <div>
                <SortBar />
                {items.map(item => <Task key={item.id} {...item} />)}
                <Pagination
                    page={page}
                    count={count}
                    onPageChange={page => getTasks(null, null, page)}
                />
            </div>
        );
    }
}

export default connect(
    state => ({ ...state.tasks }),
    dispatch => ({ getTasks: (sortBy, SortDir, page) => dispatch(getTasks({ sortBy, SortDir, page })) }),
)(TaskList);