import { CHAT_ONETOONE_CREATE_FAIL, CHAT_ONETOONE_CREATE_REQUEST, CHAT_ONETOONE_CREATE_RESET, CHAT_ONETOONE_CREATE_SUCCESS, CHAT_ONETOONE_LIST_FAIL, CHAT_ONETOONE_LIST_REQUEST, CHAT_ONETOONE_LIST_RESET, CHAT_ONETOONE_LIST_SUCCESS } from "../constants/chatConstants";

export const chatOneToOneListReducer = (state = {}, action) => {
    switch(action.type) {
        case CHAT_ONETOONE_LIST_REQUEST:
            return { loading: true } 
        case CHAT_ONETOONE_LIST_SUCCESS:
            return { loading: false, chat: action.payload }
        case CHAT_ONETOONE_LIST_FAIL:
            return { loading: false, error: action.payload }
        case CHAT_ONETOONE_LIST_RESET:
            return {}
        default:
            return state                 
    }
}

export const chatOneToOneCreateReducer = (state = {}, action) => {
    switch(action.type){
        case CHAT_ONETOONE_CREATE_REQUEST:
            return {loading: true}
        case CHAT_ONETOONE_CREATE_SUCCESS:
            return {loading: false, chat: action.payload}
        case CHAT_ONETOONE_CREATE_FAIL:
            return {loading: false, error: action.payload}
        case CHAT_ONETOONE_CREATE_RESET:
            return {}
        default:
            return state        
    }
}