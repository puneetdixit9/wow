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
    fetchUserInfo,
    fetchUserInfoSuccess,
    fetchUserInfoFailed,
} from '../reducer/auth'
import apiClient from '../../services/apiClient'
import { CHANGE_PASSWORD, LOGIN_API, REGISTER_API, SEND_OTP, USER_INFO } from '../../constants'

const globalConfig = {
    retry: 3,
    retryDelay: 1000,
}

export const login = (payload) => async dispatch => {
    await dispatch(fetchLogin())
    try {
        const response = await apiClient.post(LOGIN_API, payload)
        return dispatch(fetchLoginSuccess(response))
    } catch (err) {
        return dispatch(fetchLoginFailed(err))
    }
}

export const register = (payload) => async dispatch => {
    await dispatch(fetchRegister())
    try {
        const response = await apiClient.post(REGISTER_API, payload)
        return dispatch(fetchRegisterSuccess(response))
    } catch (err) {
        return dispatch(fetchRegisterFailed(err))
    }
}

export const passwordReset = (payload) => async dispatch => {
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

export const fetchUserInformation = () => async dispatch => {
    await dispatch(fetchUserInfo())
    try {
        const response = await apiClient.get(USER_INFO)
        return dispatch(fetchUserInfoSuccess(response))
    } catch (err) {
        return dispatch(fetchUserInfoFailed(err))
    }
}
