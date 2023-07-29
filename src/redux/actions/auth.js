import axios from 'axios'
import {
    fetchLogin,
    fetchLoginSuccess,
    fetchLoginFailed,
    resetOtpError,
    fetchRegister,
    fetchRegisterSuccess,
    fetchRegisterFailed,
    sendOtp,
    sendOtpSuccess,
    sendOtpFailed,
} from '../reducer/auth'
import apiClient from '../../services/apiClient'
import { CHANGE_PASSWORD, LOGIN_API, REGISTER_API, SEND_OTP } from '../../constants'

const globalConfig = {
    retry: 3,
    retryDelay: 1000,
}

export const login = (payload) => async dispatch => {
    console.log('Calling action : login()')
    await dispatch(fetchLogin())
    try {
        const response = await apiClient.post(LOGIN_API, payload)
        return dispatch(fetchLoginSuccess(response))
    } catch (err) {
        return dispatch(fetchLoginFailed(err))
    }
}

export const register = (payload) => async dispatch => {
    console.log('Calling action : register()')
    await dispatch(fetchRegister())
    try {
        const response = await apiClient.post(REGISTER_API, payload)
        return dispatch(fetchRegisterSuccess(response))
    } catch (err) {
        return dispatch(fetchRegisterFailed(err))
    }
}

export const passwordReset = (payload) => async dispatch => {
    console.log('Calling action : passwordReset()')
    try {
        const response = await apiClient.put(
            CHANGE_PASSWORD,
            payload,
            globalConfig,
        )
        return dispatch(fetchRegisterSuccess(response))
    } catch (err) {
        return dispatch(fetchRegisterFailed(err))
    }
}


export const sendOtpToPhone = (payload) => async dispatch => {
    console.log('Calling action --------> : sendOtp()', payload)
    await dispatch(sendOtp())
    try {
        const response = await apiClient.post(
            SEND_OTP,
            payload,
        )
        return dispatch(sendOtpSuccess(response))
    } catch (err) {
        return dispatch(sendOtpFailed(err))
    }
}

export const resetOtpErr = () => dispatch => {
    return dispatch(resetOtpError())
}
