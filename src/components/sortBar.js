import React from 'react';
import PropTypes from 'prop-types';
import { Typography, Toolbar } from '@material-ui/core';
import SortButton from './sortButton';

class SortBar extends React.Component {
    static propTypes = {
        classes: PropTypes.object.isRequired,
        sortBy: PropTypes.string,
        sortDir: PropTypes.string,
    }

    render() {
        const { sortBy, sortDir } = this.props;

        return (
            <Toolbar>
                <Typography>Sort by:</Typography>
                <SortButton label='user' dir={sortDir} enabled={sortBy === 'user'} />
                <SortButton label='email' dir={sortDir} enabled={sortBy === 'email'} />
                <SortButton label='status' dir={sortDir} enabled={sortBy === 'status'} />
            </Toolbar>
        );
    }
}

export default SortBar;

