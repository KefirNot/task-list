import React from 'react';
import PropTypes from 'prop-types';
import {
    Typography,
    Toolbar
} from '@material-ui/core';
import SortButton from './sortButton';

class SortBar extends React.Component {
    static propTypes = {
        sortBy: PropTypes.string,
        sortDir: PropTypes.string,
        onChange: PropTypes.func.isRequired,
    }

    static defaultProps = {
        onChange: () => { },
    }

    render() {
        const { sortBy, sortDir, onChange } = this.props;

        return (
            <Toolbar>
                <Typography>Sort by:</Typography>
                <SortButton name='user' direction={sortDir} enabled={sortBy === 'user'} onChange={onChange} />
                <SortButton name='email' direction={sortDir} enabled={sortBy === 'email'} onChange={onChange} />
                <SortButton name='status' direction={sortDir} enabled={sortBy === 'status'} onChange={onChange} />
            </Toolbar>
        );
    }
}

export default SortBar;

