import React, { Component } from 'react';
import Routing from './components/main/Routing';
import { GetCookiesInfo } from './components/global/GlobalFunction';
import './App.css';

window.host = 'localhost:3001'; //globalvariable

class App extends Component {
    state = {
        isAuth: false,
        isLoading: true,
        currentUser: '',
    };
    async componentDidMount() {
        const data = await GetCookiesInfo().then((response) => {
            console.log(response);
            if (response) {
                return response.data;
            }
        });
        if (data != null) {
            const { uid, loggedIn } = data;
            this.setState({ isAuth: loggedIn, currentUser: uid });
        }
        this.setState({ isLoading: false });
    }
    render() {
        const { isLoading } = this.state;
        return (
            <div className="App">
                {isLoading ? (
                    <div></div>
                ) : (
                    <Routing
                        isAuth={this.state.isAuth}
                        currentUser={this.state.currentUser}
                    />
                )}
            </div>
        );
    }
}

export default App;
