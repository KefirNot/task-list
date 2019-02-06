import React from 'react';
import PropTypes from 'prop-types';
import {
    IconButton,
    Typography,
    withStyles
} from '@material-ui/core';
import {
    KeyboardArrowLeft,
    KeyboardArrowRight
} from '@material-ui/icons';

const styles = theme => ({
    root: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginLeft: theme.spacing.unit * 2,
        marginRight: theme.spacing.unit * 2,
    }
})

class Pagination extends React.Component {
    static propTypes = {
        classes: PropTypes.object.isRequired,
        page: PropTypes.number.isRequired,
        itemsPerPage: PropTypes.number.isRequired,
        count: PropTypes.number.isRequired,
        onPageChange: PropTypes.func.isRequired,
    }

    static defaultProps = {
        classes: {},
        page: 0,
        itemsPerPage: 3,
        count: 0,
        onPageChange: () => { },
    }

    get leftArrow() {
        const { page, onPageChange } = this.props;

        const buttonProps = {
            disabled: page === 0,
            onClick: () => onPageChange(page - 1),
        };

        return (
            <IconButton {...buttonProps}>
                <KeyboardArrowLeft />
            </IconButton>
        );
    }

    get pageNumber() {
        const { page } = this.props;

        return (
            <Typography variant='h6'>
                {page + 1}
            </Typography>
        );
    }

    get rightArrow() {
        const { page, itemsPerPage, count, onPageChange } = this.props;

        const pageCount = Math.ceil(count / itemsPerPage);
        const buttonProps = {
            disabled: page + 1 === pageCount,
            onClick: () => onPageChange(page + 1),
        };

        return (
            <IconButton {...buttonProps}>
                <KeyboardArrowRight />
            </IconButton>
        );
    }

    render() {
        const { classes } = this.props;

        return (
            <div className={classes.root}>
                {this.leftArrow}
                {this.pageNumber}
                {this.rightArrow}
            </div>
        );
    }
}

export default withStyles(styles)(Pagination);

