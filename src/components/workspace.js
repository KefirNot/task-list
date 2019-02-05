import React, { Component } from 'react';
import AppBar from './appBar';
import FloatingButton from './floatingButton';
import ResponsiveDialog from './responsiveDialog';

class Workspace extends Component {
    static propTypes = {
    }

    render() {
        return (
            <>
                <AppBar />
                <FloatingButton />
                <ResponsiveDialog />
            </>
        );
    }
}

export default Workspace;