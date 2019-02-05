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
        margin: theme.spacing.unit * 2,
    },
});

class Task extends React.Component {
    static propTypes = {
        classes: PropTypes.object.isRequired,
        text: PropTypes.string,
        username: PropTypes.string,
        email: PropTypes.string,
    }

    render() {
        const { classes, username, email, text } = this.props;

        return (
            <Paper className={classes.root} elevation={1}>
                <Typography variant='body1' gutterBottom>User: {username}</Typography>
                <Typography variant='caption' gutterBottom>E-mail: {email}</Typography>
                <Typography variant='body2'>{text}</Typography>
            </Paper>
        );
    }
}

export default withStyles(styles)(Task);