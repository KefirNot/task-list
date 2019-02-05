import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { AppBar, Toolbar, Typography, Button, withStyles } from '@material-ui/core';

const styles = {
    root: {
        flexGrow: 1,
    },
};

class ConfiguredAppBar extends Component {
    static propTypes = {
        classes: PropTypes.object.isRequired,
    }

    render() {
        const { classes } = this.props;

        return (
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" color="inherit" className={classes.root}>
                        TaskList
                    </Typography>
                    <Button color="inherit">Войти</Button>
                </Toolbar>
            </AppBar>
        );
    }
}

export default withStyles(styles)(ConfiguredAppBar);

