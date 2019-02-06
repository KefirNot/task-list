import React from 'react';
import PropTypes from 'prop-types';
import { IconButton, Typography, withStyles } from '@material-ui/core';
import { KeyboardArrowLeft, KeyboardArrowRight } from '@material-ui/icons';

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
        onPageChange: () => {},
    }

    render() {
        const { classes, page, itemsPerPage, count, onPageChange } = this.props;
        const pageCount = Math.ceil(count / itemsPerPage);

        return (
            <div className={classes.root}>
                <IconButton disabled={page === 0} onClick={() => onPageChange(page - 1)}>
                    <KeyboardArrowLeft />
                </IconButton>
                <Typography variant='h6'>
                    {page + 1}
                </Typography>
                <IconButton disabled={page + 1 === pageCount} onClick={() => onPageChange(page + 1)}>
                    <KeyboardArrowRight />
                </IconButton>
            </div>
        );
    }
}

export default withStyles(styles)(Pagination);

