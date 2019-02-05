import React, { Component } from 'react';
import ReduxConfig from './reduxConfig';
import WorkSpace from './components/workspace';
import 'typeface-roboto';

class App extends Component {
    render() {
        return (
            <ReduxConfig>
                <WorkSpace />
            </ReduxConfig>
        );
    }
}

export default App;
