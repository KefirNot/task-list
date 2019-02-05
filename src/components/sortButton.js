import React from 'react';
import PropTypes from 'prop-types';
import { Button, withStyles } from '@material-ui/core';
import { ArrowDownward, ArrowUpward } from '@material-ui/icons';

const styles = {
    icon: {
        fontSize: 16,
    }
}

class SortButton extends React.Component {
    static propTypes = {
        classes: PropTypes.object.isRequired,
        label: PropTypes.string,
        enabled: PropTypes.bool,
        direction: PropTypes.string,
    }

    static defaultProps = {
        classes: {},
    }

    render() {
        const { classes, label, enabled, direction } = this.props;
        return (
            <Button>
                {label}
                {enabled && (
                    direction === 'desc'
                        ? <ArrowDownward className={classes.icon} />
                        : <ArrowUpward className={classes.icon} />
                )}
            </Button>
        );
    }
}

export default withStyles(styles)(SortButton);

