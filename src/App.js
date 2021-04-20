import React, { Component } from 'react';
import Routing from './components/main/Routing';
import './App.css';

window.host = '192.168.1.102:3001'; //globalvariable

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
