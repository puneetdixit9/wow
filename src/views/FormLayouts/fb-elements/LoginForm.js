import React from "react";

import {
    Card,
    CardContent,
    Divider,
    Box,
    Typography,
    TextField,
    Button,
    InputAdornment,
} from "@mui/material";
import { Link } from "react-router-dom";

const LoginForm = () => {
    const countryCode = "+91";

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
                            InputProps={{
                                startAdornment: <InputAdornment position="start">{countryCode}</InputAdornment>,
                                inputProps: {
                                    pattern: "\\d*",
                                    inputMode: "numeric",
                                },
                            }}
                        />
                        <Box sx={{ mb: 2 }}>
                            <Button color="secondary" variant="contained" sx={{width: 180}}>
                                Login with OTP
                            </Button>
                        </Box>
                        OR
                        <TextField
                            id="email-text"
                            label="Email"
                            type="email"
                            variant="outlined"
                            fullWidth
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
                            sx={{
                                mb: 2,
                            }}
                        />

                        <Button color="success" variant="contained" sx={{ mb: 1, width: 180 }}>
                            Login to your account
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
