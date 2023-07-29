import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppSelector, useAppDispatch } from '../../../hooks/redux-hooks'
import { sendOtpToPhone, resetOtpErr, login } from "../../../redux/actions/auth";

import {
    Card,
    CardContent,
    Divider,
    Box,
    Typography,
    TextField,
    Button,
    InputAdornment,
    CircularProgress,
} from "@mui/material";
import { Link } from "react-router-dom";

const LoginForm = () => {
    const countryCode = "+91";
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const authReducerState = useAppSelector(state => state.authReducer)
    const [phoneNumber, setPhoneNUmber] = useState("");
    const [sendOtpError, setSendOtpError] = useState("");
    const [clickedButton, setClickedButton] = useState("");
    const [emailLoginData, setEmailLoginData] = useState({
        email: "",
        password: ""
    })
    const [emailError, setEmailError] = useState("")
    const [passwordError, setPasswordError] = useState("")
    const [loginError, setloginError] = useState("")

    const handleLoginDataValue = (event) => {
        const { name, value } = event.target;
        if (name === "email") {
            setEmailError("")
        } else {
            setPasswordError("")
        }
        setEmailLoginData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    }

    const handleLoginWithPhone = () => {
        setClickedButton("phone")
        const payload = {
            phone: countryCode + phoneNumber
        }
        dispatch(sendOtpToPhone(payload))
    }

    const handleLoginWithEmail = () => {
        setClickedButton("email")
        if (!emailLoginData.email.length) {
            setEmailError("Email required for this login")
        }
        if (!emailLoginData.password.length) {
            setPasswordError("Password required for this login")
        }
        dispatch(login(emailLoginData));
    }

    useEffect(() => {
        setloginError(authReducerState.loginError?.error || "")
        if (emailLoginData.email.length && authReducerState.loginSuccess) {
            dispatch(resetOtpErr())
            navigate("/wow-pizza/dashboard")
        }
    }, [authReducerState.loginError, authReducerState.loginSuccess])

    const handlePhoneNumberChange = (event) => {
        setSendOtpError("")
        setPhoneNUmber(event.target.value)
    }

    useEffect(() => {
        setSendOtpError(authReducerState.sendOtpError?.error)
        if (!Object.keys(authReducerState.sendOtpError).length && !authReducerState.sendingOtp) {
            dispatch(resetOtpErr())
            navigate("/wow-pizza/otp/" + countryCode + phoneNumber)
        }
    }, [authReducerState.sendOtpError])

    return (
        <div>
            <style>
                {`
          /* Chrome, Safari, Edge, Opera */
          input::-webkit-outer-spin-button,
          input::-webkit-inner-spin-button {
            -webkit-appearance: none;
            margin: 0;
          }
          
          /* Firefox */
          input[type=number] {
            -moz-appearance: textfield;
          }
        `}
            </style>
            <Card
                variant="outlined"
                sx={{
                    p: 0,
                }}
            >
                <Box
                    sx={{
                        padding: "15px 30px",
                    }}
                    display="flex"
                    alignItems="center"
                >
                    <Box flexGrow={1}>
                        <Typography
                            sx={{
                                fontSize: "18px",
                                fontWeight: "800",
                            }}
                        >
                            Login
                        </Typography>
                    </Box>
                </Box>
                <Divider />
                <CardContent
                    sx={{
                        padding: "30px",
                    }}
                >
                    <form>
                        <TextField
                            id="phone"
                            label="Phone Number"
                            type="number"
                            variant="outlined"
                            fullWidth
                            sx={{
                                mb: 2,
                            }}
                            value={phoneNumber}
                            InputProps={{
                                startAdornment: <InputAdornment position="start">{countryCode}</InputAdornment>,
                                inputProps: {
                                    pattern: "\\d*",
                                    inputMode: "numeric",
                                },
                            }}
                            onChange={handlePhoneNumberChange}
                            error={sendOtpError?.length}
                            helperText={sendOtpError}
                        />
                        <Box sx={{ mb: 2 }}>
                            <Button
                                color="secondary"
                                variant="contained"
                                sx={{ width: 180 }}
                                onClick={handleLoginWithPhone}
                            >
                                {authReducerState.isLoading && clickedButton === "phone" ? (
                                    <CircularProgress color="inherit" size={25} />
                                ) : (
                                    "Login with Phone"
                                )}
                            </Button>
                        </Box>
                        OR
                        <TextField
                            id="email-text"
                            label="Email"
                            type="email"
                            variant="outlined"
                            fullWidth
                            onChange={handleLoginDataValue}
                            name="email"
                            error={emailError?.length}
                            helperText={emailError}
                            sx={{
                                mt: 2,
                                mb: 2,
                            }}
                        />

                        <TextField
                            id="outlined-password-input"
                            label="Password"
                            type="password"
                            autoComplete="current-password"
                            variant="outlined"
                            fullWidth
                            name="password"
                            error={passwordError?.length}
                            helperText={passwordError}
                            onChange={handleLoginDataValue}
                            sx={{
                                mb: 2,
                            }}
                        />
                        <Typography
                            component="div"
                            sx={{
                                display: "block",
                                mb: loginError.length ? 1 : 0,
                                color: "red"
                            }}
                        >
                            {loginError}
                        </Typography>
                        <Button
                            color="success"
                            variant="contained"
                            sx={{ mb: 1, width: 180 }}
                            onClick={handleLoginWithEmail}
                        >
                            {authReducerState.isLoading && clickedButton === "email" ? (
                                <CircularProgress color="inherit" size={25} />
                            ) : (
                                "Login with Email"
                            )}
                        </Button>
                        <Typography component="div" sx={{ display: "block" }}>
                            Don't have an Account?
                            <Link to="/wow-pizza/signup" style={{ textDecoration: "none" }}>
                                Register
                            </Link>
                        </Typography>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
};

export default LoginForm;
