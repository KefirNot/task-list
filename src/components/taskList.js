import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Pagination from './pagination';
import SortBar from './sortBar';
import Task from './task';
import Loading from './loading';
import {
    getTasks,
    showForm,
    editTask
} from '../store/actions';

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
        doneTask: PropTypes.func.isRequired,
    }

    static defaultProps = {
        editTask: () => { },
        doneTask: () => { },
    }

    componentDidMount() {
        const { getTasks } = this.props;

        getTasks();
    }

    get sortBar() {
        const { page, getTasks, sortBy, sortDir } = this.props;

        const barProps = {
            sortBy,
            sortDir,
            onChange: (sortBy, sortDir) => getTasks(sortBy, sortDir, page),
        }
        return <SortBar {...barProps} />;
    }

    get items() {
        const { loading, items, count, isAdmin, getTasks, sortBy, sortDir, page, editTask, doneTask } = this.props;

        if (loading) return <Loading />;

        const taskProps = {
            editable: isAdmin,
            onEditTask: editTask,
            onDoneTask: doneTask,
        };
        const paginationProps = {
            page,
            count,
            onPageChange: page => getTasks(sortBy, sortDir, page),
        };

        return (
            <>
                {items.map(item => <Task key={item.id} {...taskProps} {...item} />)}
                <Pagination {...paginationProps} />
            </>
        );
    }

    render() {
        return (
            <>
                {this.sortBar}
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
        doneTask: (id, text) => dispatch(editTask({ id, text, status: 10 }))
    }),
)(TaskList);