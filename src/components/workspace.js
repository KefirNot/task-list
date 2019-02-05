import React from 'react';
import AppBar from './appBar';
import FloatingButton from './floatingButton';
import AuthDialog from './authDialog';

class Workspace extends React.Component {
    static propTypes = {
    }

    render() {
        return (
            <>
                <AppBar />
                <FloatingButton />
                <AuthDialog />
            </>
        );
    }
}

export default Workspace;