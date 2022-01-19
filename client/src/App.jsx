import React from 'react'
import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import registerScreen from './Screens/registerScreen'
import loginScreen from './Screens/loginScreen'
import chatScreen from './Screens/chatScreen'

const App = () => {
    return (
        <Router>
            <Route exact path="/register" component={registerScreen}/>
            <Route exact path="/login" component={loginScreen}/>
            <Route exact path="/chats" component={chatScreen}/>
        </Router>
    );
}

export default App;
