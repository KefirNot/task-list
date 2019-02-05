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
        sortBy: PropTypes.string,
        sortDir: PropTypes.string,
        getTasks: PropTypes.func,
    }

    componentDidMount() {
        const { getTasks } = this.props;

        getTasks();
    }

    render() {
        const { loading, items, count, page, getTasks, sortBy, sortDir } = this.props;

        return (
            <div>
                <SortBar sortBy={sortBy} sortDir={sortDir} onChange={(sortBy, sortDir) => getTasks(sortBy, sortDir, page)} />
                {items.map(item => <Task key={item.id} {...item} />)}
                <Pagination
                    page={page}
                    count={count}
                    onPageChange={page => getTasks(sortBy, sortDir, page)}
                />
            </div>
        );
    }
}

export default connect(
    state => ({ ...state.tasks }),
    dispatch => ({ getTasks: (sortBy, sortDir, page) => dispatch(getTasks({ sortBy, sortDir, page })) }),
)(TaskList);