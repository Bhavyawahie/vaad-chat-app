import {createStore, combineReducers, applyMiddleware} from 'redux'
import {composeWithDevTools} from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import { chatOneToOneCreateReducer, chatOneToOneListReducer } from './reducers/chatReducers'
import { userLoginReducer, userRegisterReducer, userSearchReducer } from './reducers/userReducer'

const reducers = combineReducers({
    userRegister: userRegisterReducer,
    userLogin: userLoginReducer,
    userSearch: userSearchReducer,
    chatOneToOneCreate: chatOneToOneCreateReducer,
    chatOneToOneList: chatOneToOneListReducer
})

const userInfoFromStorage = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null

const initialState = {
    userLogin: {
        userInfo : userInfoFromStorage
    }
}

const middleware = [thunk]

const store = createStore(reducers, initialState, composeWithDevTools(applyMiddleware(...middleware)))

export default store