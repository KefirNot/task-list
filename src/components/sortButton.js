import React from 'react';
import PropTypes from 'prop-types';
import { Button, withStyles } from '@material-ui/core';
import { ArrowDownward, ArrowUpward } from '@material-ui/icons';

const ASC_DIRECTION = 'asc';
const DESC_DIRECTION = 'desc';
const NON_DIRECTION = null;

const styles = {
    icon: {
        fontSize: 16,
    }
}

class SortButton extends React.Component {
    static propTypes = {
        classes: PropTypes.object.isRequired,
        name: PropTypes.string,
        enabled: PropTypes.bool,
        direction: PropTypes.string,
        onChange: PropTypes.func.isRequired,
    }

    static defaultProps = {
        classes: {},
        onChange: () => { },
    }

    get nextDirection() {
        const { enabled, direction } = this.props;

        if (!enabled) return ASC_DIRECTION;

        switch (direction) {
            case ASC_DIRECTION: return DESC_DIRECTION;
            case DESC_DIRECTION: return NON_DIRECTION;
            default: break;
        }
        return ASC_DIRECTION;
    }

    render() {
        const { classes, name, enabled, direction, onChange } = this.props;
        return (
            <Button onClick={() => onChange(name, this.nextDirection)}>
                {name}
                {enabled && direction === ASC_DIRECTION && <ArrowDownward className={classes.icon} />}
                {enabled && direction === DESC_DIRECTION && <ArrowUpward className={classes.icon} />}
            </Button>
        );
    }
}

export default withStyles(styles)(SortButton);

