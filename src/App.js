import React, { Component } from 'react';
import Routing from './components/main/Routing';
import './App.css';

window.host = 'localhost:3001'; //globalvariable

class App extends Component {
    render() {
        return (
            <div className="App">
                <Routing />
            </div>
        );
    }
}

export default App;
