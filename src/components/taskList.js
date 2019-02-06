import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Pagination from './pagination';
import SortBar from './sortBar';
import Task from './task';
import Loading from './loading';
import { getTasks, showForm } from '../store/actions';

class TaskList extends React.Component {
    static propTypes = {
        loading: PropTypes.bool,
        items: PropTypes.array,
        count: PropTypes.number,
        page: PropTypes.number,
        isAdmin: PropTypes.bool,
        getTasks: PropTypes.func,
        sortBy: PropTypes.string,
        sortDir: PropTypes.string,
        editTask: PropTypes.func.isRequired,
    }

    static defaultProps = {
        editTask: () => { },
    }

    componentDidMount() {
        const { getTasks } = this.props;

        getTasks();
    }

    get items() {
        const { loading, items, count, isAdmin, getTasks, sortBy, sortDir, page, editTask } = this.props;

        if (loading) return <Loading />;
        return (
            <>
                {
                    items.map(item => <Task
                        key={item.id}
                        editable={isAdmin}
                        onEditTask={editTask}
                        {...item}
                    />)}
                <Pagination
                    page={page}
                    count={count}
                    onPageChange={page => getTasks(sortBy, sortDir, page)}
                />
            </>
        );
    }

    render() {
        const { page, getTasks, sortBy, sortDir } = this.props;

        return (
            <>
                <SortBar sortBy={sortBy} sortDir={sortDir} onChange={(sortBy, sortDir) => getTasks(sortBy, sortDir, page)} />
                {this.items}
            </>
        );
    }
}

export default connect(
    state => ({ ...state.tasks, isAdmin: state.auth.isAdmin }),
    dispatch => ({
        getTasks: (sortBy, sortDir, page) => dispatch(getTasks({ sortBy, sortDir, page })),
        editTask: (id, username, email, text, status) => dispatch(showForm(id, username, email, text, status)),
    }),
)(TaskList);