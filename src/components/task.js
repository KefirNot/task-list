import React from 'react';
import PropTypes from 'prop-types';
import {
    Typography,
    Paper,
    Button,
    withStyles,
} from '@material-ui/core';

const styles = theme => ({
    root: {
        padding: theme.spacing.unit * 2,
        marginRight: theme.spacing.unit * 2,
        marginBottom: theme.spacing.unit * 2,
        marginLeft: theme.spacing.unit * 2,
    },
    done: {
        textDecoration: 'line-through',
    },
    buttonsRow: {
        display: 'flex',
        justifyContent: 'flex-end',
    },
    button: {
        marginLeft: theme.spacing.unit,
    },
});

class Task extends React.Component {
    static propTypes = {
        classes: PropTypes.object.isRequired,
        id: PropTypes.number,
        text: PropTypes.string,
        username: PropTypes.string,
        email: PropTypes.string,
        status: PropTypes.number,
        editable: PropTypes.bool,
        onEditTask: PropTypes.func,
        onDoneTask: PropTypes.func,
    }

    static defaultProps = {
        classes: {},
    }

    handleEdit = () => {
        const { id, text, username, email, status, onEditTask } = this.props;

        onEditTask(id, username, email, text, status);
    }

    handleDone = () => {
        const { id, text, onDoneTask } = this.props;

        onDoneTask(id, text, 10);
    }

    get buttons() {
        const { classes, status, editable } = this.props;

        if (!editable || status) return null;
        return (
            <div className={classes.buttonsRow}>
                <Button
                    className={classes.button}
                    onClick={this.handleEdit}
                    color='primary'
                >
                    Edit
                </Button>
                <Button
                    className={classes.button}
                    onClick={this.handleDone}
                    color='secondary'
                >
                    Done
                </Button>
            </div>
        );
    }

    render() {
        const { classes, text, username, email, status } = this.props;

        return (
            <Paper className={classes.root} elevation={status ? 0 : 2}>
                <Typography variant='body1' gutterBottom>User: {username}</Typography>
                <Typography variant='caption' gutterBottom>E-mail: {email}</Typography>
                <Typography variant='body2' gutterBottom className={status ? classes.done : null}>{text}</Typography>
                {this.buttons}
            </Paper>
        );
    }
}

export default withStyles(styles)(Task);