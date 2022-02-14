import axios from "axios"
import { CHAT_ALL_LIST_FAIL, CHAT_ALL_LIST_REQUEST, CHAT_ALL_LIST_SUCCESS, CHAT_CURRENT_SET,  CHAT_ONETOONE_CREATE_FAIL, CHAT_ONETOONE_CREATE_REQUEST, CHAT_ONETOONE_CREATE_SUCCESS, CHAT_ONETOONE_LIST_FAIL, CHAT_ONETOONE_LIST_REQUEST, CHAT_ONETOONE_LIST_SUCCESS } from "../constants/chatConstants"

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
                'Content-type': 'application/json',
                'Authorization': `Bearer ${userInfo.token}`
            }
        }
        const res = await axios.post('/api/chats/oneToOneChats', {userId}, config)
        dispatch({
            type: CHAT_ONETOONE_CREATE_SUCCESS,
            payload: res.data
        })
        dispatch({
            type: CHAT_CURRENT_SET,
            payload: res.data
        })
    } catch (error) {
        dispatch({
            type: CHAT_ONETOONE_CREATE_FAIL,
            payload: error.message && error.response.data.message ? error.response.data.message : error.message
        })        
    }
}

export const fetchAllChats = () => async (dispatch, getState) => {
    try {
        dispatch({
            type: CHAT_ALL_LIST_REQUEST
        })
        const { userLogin : { userInfo } } = getState()
        const config = {
            headers: {
                'Authorization': `Bearer ${userInfo.token}`
            }
        }
        const res = await axios.get('/api/chats/all', config)
        dispatch({
            type: CHAT_ALL_LIST_SUCCESS,
            payload: res.data
        }) 
    } catch (error) {
        dispatch({
            type: CHAT_ALL_LIST_FAIL,
            payload: error.message && error.response.data.message
        })
    }
} 

// export const searchLocalUser = (query) => (dispatch, getState) => {
//     try {
//         dispatch({
//             type: CHAT_ALL_LIST_REQUEST
//         })
//         const {chatListAll: {chats}} = getState()
//         if(query !== ''){
//             const result = chats.filter(chat => {
//                 if(chat.isGroupChat){
//                     return
//                 }
//             })
//             dispatch({
//                 type: CHAT_ALL_LIST_SUCCESS,
//                 payload: result
//             })
//         } else{
//             dispatch({
//                 type: CHAT_ALL_LIST_SUCCESS,
//                 payload: chats
//             })
//         }
//     } catch (error) {
//         dispatch({
//             type: CHAT_ALL_LIST_FAIL,
//             payload: error.message && error.response.data.message
//         })
//     }
// }