import React from 'react'
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import RegisterScreen from './Screens/RegisterScreen'
import HomeScreen from './Screens/HomeScreen'
import ChatScreen from './Screens/ChatScreen'
import Notfound from './components/NotFound';
import LandingScreen from './Screens/LandingScreen'

const App = () => {
    return (
        <Router>
            <Switch>
                <Route exact path="/" component={LandingScreen}/>
                <Route exact path="/register" component={RegisterScreen}/>
                <Route exact path="/login" component={HomeScreen}/>
                <Route exact path="/chats" component={ChatScreen}/>
                <Route component={Notfound}/>
            </Switch>
        </Router>
    );
}

export default App;
