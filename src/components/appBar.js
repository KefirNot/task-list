import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
    AppBar,
    Toolbar,
    Typography,
    Button,
    withStyles
} from '@material-ui/core';
import { showAuthorization } from '../store/actions';

const styles = {
    root: {
        flexGrow: 1,
    },
};

class ConfiguredAppBar extends React.Component {
    static propTypes = {
        classes: PropTypes.object.isRequired,
        showAuth: PropTypes.func,
    }

    static defaultProps = {
        classes: {},
    }

    render() {
        const { classes, showAuth } = this.props;

        return (
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" color="inherit" className={classes.root}>
                        TaskList
                    </Typography>
                    <Button color="inherit" onClick={showAuth}>Войти</Button>
                </Toolbar>
            </AppBar>
        );
    }
}

export default connect(
    state => ({ authorized: !!state.userName }),
    dispatch => ({ showAuth: () => dispatch(showAuthorization()), }),
)(withStyles(styles)(ConfiguredAppBar));

