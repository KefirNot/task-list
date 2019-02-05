import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
    AppBar,
    Toolbar,
    Typography,
    Button,
    IconButton,
    withStyles
} from '@material-ui/core';
import { AccountCircle } from '@material-ui/icons';
import { showAuthorization } from '../store/actions';

const styles = theme => ({
    root: {
        flexGrow: 1,
    },
    icon: {
        padding: theme.spacing.unit,
    }
});

class ConfiguredAppBar extends React.Component {
    static propTypes = {
        classes: PropTypes.object.isRequired,
        showAuth: PropTypes.func,
        authorized: PropTypes.bool,
        username: PropTypes.string,
    }

    static defaultProps = {
        classes: {},
    }

    render() {
        const { classes, showAuth, authorized, username } = this.props;

        return (
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" color="inherit" className={classes.root}>
                        TaskList
                    </Typography>
                    {
                        authorized
                            ? (
                                <>
                                    <AccountCircle color="inherit" className={classes.icon} />
                                    <Typography variant="h6" color="inherit">{username}</Typography>
                                </>
                            ) : <Button color="inherit" onClick={showAuth}>Войти</Button>
                    }
                </Toolbar>
            </AppBar>
        );
    }
}

export default connect(
    state => ({ authorized: !!state.auth.username, username: state.auth.username }),
    dispatch => ({ showAuth: () => dispatch(showAuthorization()), }),
)(withStyles(styles)(ConfiguredAppBar));

