import { createSlice } from '@reduxjs/toolkit'
import UserSession from '../../services/auth'

const initialState = {
    access_token: null,
    user: null,
    isLoading: false,
    signupError: {},
    loginSuccess: false,
    loginError: {},
    sendOtpError: {},
    sendingOtp: true,
    otpVerifyError: true,
    userInfo: {},
}
export const authReducer = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        fetchLogin(state, action) {
            return {
                ...state,
                isLoading: true,
                loginError: {},
                loginSuccess: false,
            }
        },
        fetchLoginSuccess(state, action) {
            UserSession.setUser(action.payload.data)
            return {
                ...state,
                message: 'Login Successfull',
                isLoading: false,
                otpVerifyError: false,
                loginSuccess: true,
            }
        },
        fetchLoginFailed(state, action) {
            return {
                ...state,
                isLoading: false,
                loginSuccess: false,
                loginError: action?.payload?.response?.data
            }
        },
        resetOtpError(state, action) {
            return {
                ...state,
                otpVerifyError: true,
                sendingOtp: true,
                loginSuccess: false,
                loginError: {},
            }
        },
        fetchRegister(state, action) {
            return {
                ...state,
                isLoading: true,
                signupError: {}
            }
        },
        fetchRegisterSuccess(state, action) {
            return {
                ...state,
                isLoading: false,
            }
        },
        fetchRegisterFailed(state, action) {
            return {
                ...state,
                isLoading: false,
                signupError: action?.payload?.response?.data,
            }
        },
        sendOtp(state, action) {
            return {
                ...state,
                isLoading: true,
                sendOtpError: {},
                sendingOtp: true,
            }
        },
        sendOtpSuccess(state, action) {
            return {
                ...state,
                isLoading: false,
                sendOtpError: {},
                sendingOtp: false
            }
        },
        sendOtpFailed(state, action) {
            return {
                ...state,
                isLoading: false,
                sendingOtp: true,
                sendOtpError: action?.payload?.response?.data,
            }
        },
        fetchUserInfo(state, action) {
            return {
                ...state,
                isLoading: true,
            }
        },
        fetchUserInfoSuccess(state, action) {
            return {
                ...state,
                isLoading: false,
                userInfo: action.payload.data,
            }
        },
        fetchUserInfoFailed(state, action) {
            return {
                ...state,
                isLoading: false,
            }
        },
    },
})

export const {
    fetchLogin,
    fetchLoginSuccess,
    fetchLoginFailed,
    fetchRegister,
    fetchRegisterSuccess,
    fetchRegisterFailed,
    sendOtp,
    sendOtpSuccess,
    sendOtpFailed,
    resetOtpError,
    fetchUserInfo,
    fetchUserInfoSuccess,
    fetchUserInfoFailed,
} = authReducer.actions

export default authReducer.reducer
