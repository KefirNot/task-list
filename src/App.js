import React, { Component } from 'react';
import ReduxConfig from './reduxConfig';
import RandomValue from './components/randomValue';
import './App.css';

class App extends Component {
    render() {
        return (
            <ReduxConfig>
                <RandomValue />
            </ReduxConfig>
        );
    }
}

export default App;
