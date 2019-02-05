import React, { Component } from 'react';
import AppBar from './appBar';
import FloatingButton from './floatingButton';

class Workspace extends Component {
    static propTypes = {
    }

    render() {
        return (
            <>
                <AppBar />
                <FloatingButton />
            </>
        );
    }
}

export default Workspace;