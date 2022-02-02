import React from 'react'
import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import registerScreen from './Screens/registerScreen'
import homeScreen from './Screens/homeScreen'
import chatScreen from './Screens/chatScreen'

const App = () => {
    return (
        <Router>
            <Route exact path="/register" component={registerScreen}/>
            <Route exact path="/" component={homeScreen}/>
            <Route exact path="/chats" component={chatScreen}/>
        </Router>
    );
}

export default App;
