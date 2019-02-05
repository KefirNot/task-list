import React from 'react';
import PropTypes from 'prop-types';
import { CircularProgress, withStyles } from '@material-ui/core';

const styles = {
    root: {
        marginTop: 40,
        marginBottom: 40,
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
    },
    icon: {
        fontSize: 16,
    }
}

class Loading extends React.Component {
    static propTypes = {
        classes: PropTypes.object.isRequired,
    }

    static defaultProps = {
        classes: {},
    }

    render() {
        const { classes } = this.props;
        return (
            <div className={classes.root}>
                <CircularProgress />
            </div>
        );
    }
}

export default withStyles(styles)(Loading);

