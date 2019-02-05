import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
    withStyles,
} from '@material-ui/core';
import { getTasks } from '../store/actions';

const Task = props => <div>{props.text}</div>

const styles = {
    root: {},
};

class TaskList extends React.Component {
    static propTypes = {
        classes: PropTypes.object.isRequired,
        loading: PropTypes.bool,
        items: PropTypes.array,
        getTasks: PropTypes.func,
    }

    componentDidMount() {
        const { getTasks } = this.props;

        getTasks();
    }

    render() {
        const { classes, loading, items, getTasks } = this.props;

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
)(withStyles(styles)(TaskList));