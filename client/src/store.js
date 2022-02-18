import {createStore, combineReducers, applyMiddleware} from 'redux'
import {composeWithDevTools} from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import { chatAllListReducer, chatCurrentSetReducer, chatOneToOneCreateReducer, chatOneToOneListReducer } from './reducers/chatReducers'
import { messageListAllReducer, messageSendReducer } from './reducers/messageReducers'
import { userLoginReducer, userRegisterReducer, userSearchReducer } from './reducers/userReducer'

const reducers = combineReducers({
    userRegister: userRegisterReducer,
    userLogin: userLoginReducer,
    userSearch: userSearchReducer,
    chatCurrentSet: chatCurrentSetReducer,
    chatAllList: chatAllListReducer,
    chatOneToOneCreate: chatOneToOneCreateReducer,
    chatOneToOneList: chatOneToOneListReducer,
    messageListAll: messageListAllReducer,
    messageSend: messageSendReducer
})

const userInfoFromStorage = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null

const initialState = {
    userLogin: {
        userInfo : userInfoFromStorage
    },
}

const middleware = [thunk]

const store = createStore(reducers, initialState, composeWithDevTools(applyMiddleware(...middleware)))

export default store