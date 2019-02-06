import React from 'react';
import AppBar from './appBar';
import FloatingButton from './floatingButton';
import AuthDialog from './authDialog';
import TaskDialog from './taskDialog';
import TaskList from './taskList';

class Workspace extends React.Component {
    static propTypes = {
    }

    render() {
        return (
            <>
                <AppBar />
                <FloatingButton />
                <AuthDialog />
                <TaskDialog />
                <TaskList />
            </>
        );
    }
}

export default Workspace;