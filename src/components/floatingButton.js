import React from 'react';
import PropTypes from 'prop-types';
import { withStyles, Fab } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';

const styles = theme => ({
    root: {
        margin: theme.spacing.unit,
        position: 'fixed',
        right: 20,
        bottom: 20,
    },
});

class FloatingButton extends React.Component {
    static propTypes = {
        classes: PropTypes.object.isRequired,
    }

    render() {
        const { classes, onClick } = this.props;

        const fabProps = {
            color: 'secondary',
            className: classes.root,
            onClick,
        };
        return <Fab {...fabProps}><AddIcon /></Fab>;
    }
}

export default withStyles(styles)(FloatingButton);