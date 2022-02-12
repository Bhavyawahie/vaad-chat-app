import axios from "axios"
import { CHAT_ONETOONE_CREATE_FAIL, CHAT_ONETOONE_CREATE_REQUEST, CHAT_ONETOONE_CREATE_SUCCESS, CHAT_ONETOONE_LIST_FAIL, CHAT_ONETOONE_LIST_REQUEST, CHAT_ONETOONE_LIST_SUCCESS } from "../constants/chatConstants"

export const listOneToOneChat = (userId) => async (dispatch, getState) => {
    try {   
        dispatch({
            type: CHAT_ONETOONE_LIST_REQUEST
        })
        const {userLogin: {userInfo}} = getState()
        const config = {
            headers: {
                'Authorization': `Bearer ${userInfo.token}`
            }
        }
        const res = await axios.get('/api/chats/oneToOneChats', userId, config)
        dispatch({
            type: CHAT_ONETOONE_LIST_SUCCESS,
            payload: res.data
        })
    }
    catch(error) {
        dispatch({
            type: CHAT_ONETOONE_LIST_FAIL,
            payload: error.message && error.response.data.message ? error.response.data.message : error.message 
        })
    }
}

export const createOneToOneChat = (userId) => async (dispatch, getState) => {
    try {
        dispatch({
            type: CHAT_ONETOONE_CREATE_REQUEST
        })
        const {userLogin: {userInfo}} = getState()
        const config = {
            headers: {
                'Authorization': `Bearer ${userInfo.token}`,
            }
        }
        const res = await axios.post('/api/chats/oneToOneChats', userId, config)
        dispatch({
            type: CHAT_ONETOONE_CREATE_SUCCESS,
            payload: res.data
        })
    } catch (error) {
        dispatch({
            type: CHAT_ONETOONE_CREATE_FAIL,
            payload: error.message && error.response.data.message ? error.response.data.message : error.message
        })        
    }
}