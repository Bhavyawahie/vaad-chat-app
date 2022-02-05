import axios from 'axios'
import {
    USER_LOGIN_FAIL,
    USER_LOGIN_REQUEST,
    USER_LOGIN_SUCCESS,
    USER_REGISTER_FAIL,
    USER_REGISTER_REQUEST,
    USER_REGISTER_SUCCESS
} from '../constants/userConstants'

export const login = (input) => async (dispatch) => {
    try {
        dispatch({type: USER_LOGIN_REQUEST})
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        const res = await axios.post('/api/users/login', input, config)
        dispatch({type: USER_LOGIN_SUCCESS, payload: res.data})
        localStorage.setItem('userInfo', JSON.stringify(res.data))
    } catch (error) {
        dispatch({
            type: USER_LOGIN_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.response
        })
    }
}

export const register = (input) => async (dispatch) => {
    try {
        dispatch({type: USER_REGISTER_REQUEST})
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        const res = await axios.post('/api/users', input, config)
        dispatch({type: USER_REGISTER_SUCCESS, payload: res.data})
        dispatch({type: USER_LOGIN_SUCCESS, payload: res.data})
        localStorage.setItem('userInfo', JSON.stringify(res.data))
    } catch (error) {
        dispatch({
            type: USER_REGISTER_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }
}
