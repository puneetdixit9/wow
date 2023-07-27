import React, { useState, useEffect } from "react";

import { useNavigate } from "react-router-dom";
import { useAppSelector, useAppDispatch } from '../../../hooks/redux-hooks'
import { register } from "../../../redux/actions/auth";

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


const SignUpForm = () => {

    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const authReducerState = useAppSelector(state => state.authReducer)
    const [duplicateEntry, setDuplicateEntry] = useState([])
    const [showRequiredError, setShowRequiredError] = useState(false)
    const requiredFields = ["firstName", "phone", "email", "password", "confirmPassword"]
    const [missingFields, setMissingFields] = useState([])
    const countryCode = "+91";
    const [passwordMismatchError, setPasswordMismatchError] = useState(false)
    const [passwordLengthError, setPasswordLengthError] = useState(false)
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        phone: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    const handleFormSubmit = () => {
        const missingFieldsInForm = requiredFields.filter((field) => !formData[field]);

        if (missingFieldsInForm.length) {
            setMissingFields(missingFieldsInForm)
            setShowRequiredError(true);
        } else if (formData.password !== formData.confirmPassword) {
            setPasswordMismatchError(true)
        }
        else {
            setShowRequiredError(false);

            const convertedFormData = {
                first_name: formData.firstName,
                last_name: formData.lastName,
                phone: countryCode + formData.phone,
                email: formData.email,
                password: formData.password,
            };
            dispatch(register(convertedFormData));
        }
    };

    useEffect(() => {
        if (!Object.keys(authReducerState.signupError).length && formData.phone.length) {
            navigate(`/wow-pizza/otp/${countryCode + formData.phone}`);
        }
        if (authReducerState.signupError.hasOwnProperty("duplicate_entry")) {
            setDuplicateEntry(authReducerState.signupError.duplicate_entry)
        }
    }, [authReducerState.signupError])

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        if (duplicateEntry.includes(name) || missingFields.includes(name)) {
            setDuplicateEntry(prevDuplicateEntry => prevDuplicateEntry.filter(item => item !== name));
            setMissingFields(prevDuplicateEntry => prevDuplicateEntry.filter(item => item !== name))
        }
        if (name == "confirmPassword") {
            if (formData.password !== value) {
                setPasswordMismatchError(true)
            } else {
                setPasswordMismatchError(false)
            }
        }

        if (name == "password") {
            if (value.length < 8) {
                setPasswordLengthError(true)
            } else {
                setPasswordLengthError(false)
            }

        }

        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

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
                                fontWeight: "500",
                            }}
                        >
                            Sign-Up
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
                        <Box display="flex" mb={2}>
                            <TextField
                                id="default-value"
                                label="First Name"
                                variant="outlined"
                                fullWidth
                                sx={{ mr: 1 }}
                                name="firstName"
                                value={formData.firstName}
                                onChange={handleInputChange}
                                required
                                error={showRequiredError && missingFields.includes("firstName")}
                                helperText={showRequiredError && missingFields.includes("firstName") ? "Required field" : ""}
                            />
                            <TextField
                                id="default-value"
                                label="Last Name"
                                variant="outlined"
                                fullWidth
                                sx={{ ml: 1 }}
                                name="lastName"
                                value={formData.lastName}
                                onChange={handleInputChange}
                            />
                        </Box>
                        <TextField
                            id="phone"
                            label="Phone Number"
                            type="number"
                            variant="outlined"
                            fullWidth
                            sx={{
                                mb: 2,
                            }}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">{countryCode}</InputAdornment>
                                ),
                                inputProps: {
                                    pattern: "\\d*",
                                    inputMode: "numeric",
                                },
                            }}
                            name="phone"
                            value={formData.phone}
                            onChange={handleInputChange}
                            helperText={
                                showRequiredError && missingFields.includes("phone")
                                    ? "Required field"
                                    : duplicateEntry.includes("phone")
                                        ? "Phone Number already exists"
                                        : ""
                            }
                            error={duplicateEntry.includes("phone") || (showRequiredError && missingFields.includes("phone"))}
                            required
                        />
                        <TextField
                            id="email-text"
                            label="Email"
                            type="email"
                            variant="outlined"
                            fullWidth
                            sx={{
                                mb: 2,
                            }}
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            helperText={
                                showRequiredError && missingFields.includes("email")
                                    ? "Required field"
                                    : duplicateEntry.includes("email")
                                        ? "Email already exists"
                                        : ""
                            }
                            error={duplicateEntry.includes("email") || (showRequiredError && missingFields.includes("email"))}
                            required
                        />
                        <Box display="flex" mb={2}>
                            <TextField
                                id="outlined-password-input"
                                label="Password"
                                type="password"
                                autoComplete="current-password"
                                variant="outlined"
                                fullWidth
                                sx={{
                                    mr: 1,
                                }}
                                name="password"
                                value={formData.password}
                                onChange={handleInputChange}
                                error={(showRequiredError && missingFields.includes("password")) || passwordLengthError}
                                helperText={showRequiredError && missingFields.includes("password") ? "Required field" : passwordLengthError ? "Minimum password length is 8" : ""}
                                required
                            />
                            <TextField
                                id="outlined-confirm-password-input"
                                label="Confirm Password"
                                type="password"
                                autoComplete="new-password"
                                variant="outlined"
                                fullWidth
                                sx={{
                                    ml: 1,
                                }}
                                name="confirmPassword"
                                value={formData.confirmPassword}
                                onChange={handleInputChange}
                                error={(showRequiredError && missingFields.includes("confirmPassword")) || passwordMismatchError}
                                helperText={showRequiredError && missingFields.includes("confirmPassword") ? "Required field" : passwordMismatchError ? "Not matching with password" : ""}
                                required
                            />
                        </Box>

                        <Button
                            color="success"
                            variant="contained"
                            sx={{ mb: 1, width: 180 }}
                            onClick={handleFormSubmit}
                            disabled={authReducerState.isLoading}
                        >
                            {authReducerState.isLoading ? (
                                <CircularProgress color="inherit" size={25} />
                            ) : (
                                "Create Account"
                            )}
                        </Button>
                        <Typography component="div" sx={{ display: "block" }}>
                            Already have an Account?
                            <Link to="/wow-pizza/login" style={{ textDecoration: "none" }}>
                                Login
                            </Link>
                        </Typography>

                    </form>
                </CardContent>
            </Card>
        </div>
    );
};

export default SignUpForm;
