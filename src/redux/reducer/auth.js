import { createSlice } from '@reduxjs/toolkit'
import UserSession from '../../services/auth'

const initialState = {
    access_token: null,
    user: null,
    isLoading: false,
    signupError: {},
    loginError: {},
    otpError: true,
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
            }
        },
        fetchLoginSuccess(state, action) {
            UserSession.setUser(action.payload.data)
            return {
                ...state,
                message: 'Login Successfull',
                isLoading: false,
                otpError: false,
            }
        },
        fetchLoginFailed(state, action) {
            return {
                ...state,
                isLoading: false,
                loginError: action.payload.response.data
            }
        },
        resetOtpError(state, action) {
            return {
                ...state,
                otpError: true,
                
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
        submitOtp(state, action) {
            return {
                ...state,
                isLoading: true,
                signupError: {}
            }
        },
        submitOtpSuccess(state, action) {
            return {
                ...state,
                isLoading: false,
            }
        },
        submitOtpFailed(state, action) {
            return {
                ...state,
                isLoading: false,
                loginError: action?.payload?.response?.data,
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
    submitOtp,
    submitOtpSuccess,
    submitOtpFailed,
    resetOtpError,
} = authReducer.actions

export default authReducer.reducer
