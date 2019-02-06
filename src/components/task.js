import React from 'react';
import PropTypes from 'prop-types';
import {
    Typography,
    Paper,
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
    }
});

class Task extends React.Component {
    static propTypes = {
        classes: PropTypes.object.isRequired,
        text: PropTypes.string,
        username: PropTypes.string,
        email: PropTypes.string,
        status: PropTypes.number,
    }

    static defaultProps = {
        classes: {},
    }

    render() {
        const { classes, text, username, email, status } = this.props;

        return (
            <Paper className={classes.root} elevation={status ? 0 : 2}>
                <Typography variant='body1' gutterBottom>User: {username}</Typography>
                <Typography variant='caption' gutterBottom>E-mail: {email}</Typography>
                <Typography variant='body2' gutterBottom className={status ? classes.done : null}>{text}</Typography>
            </Paper>
        );
    }
}

export default withStyles(styles)(Task);