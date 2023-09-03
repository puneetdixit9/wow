import React, { useRef, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Card, CardContent, Divider, Box, Typography, Button, Grid, CircularProgress } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useAppSelector, useAppDispatch } from '../../../hooks/redux-hooks'
import { login, resetOtpErr, sendOtpToPhone } from "../../../redux/actions/auth";
import UserSession from "../../../services/auth";

const OtpForm = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const authReducerState = useAppSelector(state => state.authReducer)
  const { phoneNumber } = useParams();
  const inputs = useRef([]);
  const otpLength = 6;
  const [otpValue, setOtpValue] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const buttonRef = useRef(null);

  useEffect(() => {
    dispatch(resetOtpErr())
  }, [])

  const handleInput = (index, e) => {
    if (e.target.value.length > 1) {
      e.target.value = e.target.value.slice(0, 1);
    }

    if (e.target.value && inputs.current[index + 1]) {
      inputs.current[index + 1].focus();
    }

    let otpString = "";
    inputs.current.forEach((input) => {
      otpString += input.value;
    });
    setOtpValue(otpString);
    setErrorMsg("")
  };

  const handleSubmitOtp = () => {
    const payload = {
      phone: phoneNumber,
      otp: otpValue
    }
    dispatch(login(payload));
  }

  const handleResendOtp = () => {
    const payload = {
      phone: phoneNumber
    }
    dispatch(sendOtpToPhone(payload));
  }

  useEffect(() => {
    if (otpValue.length === 6 && buttonRef.current) {
      buttonRef.current.click();
    }
  }, [otpValue]);

  useEffect(() => {
    setErrorMsg(authReducerState.loginError?.error)
    if (otpValue.length && !authReducerState.otpVerifyError) {
      if (UserSession.isCustomer()) {
        navigate("/wow-pizza/food-items")
      } else if (UserSession.isDeliveryMan()) {
        navigate("/wow-pizza/delivery")
      } else {
        navigate("/wow-pizza/dashboard")
      }

    }
  }, [authReducerState.loginError, authReducerState.otpVerifyError])

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
      <Card variant="outlined" sx={{ p: 0 }}>
        <Box sx={{ padding: "15px 30px" }} display="flex" alignItems="center">
          <Box flexGrow={1}>
            <Typography sx={{ fontSize: "18px", fontWeight: "800" }}>
              One time password (OTP)
            </Typography>
          </Box>
        </Box>
        <Divider />
        <CardContent sx={{ padding: "100px", paddingTop: "20px" }}>
          <form>
            <Box flexGrow={1} >
              <Typography sx={{ fontSize: "18px", fontWeight: "500", mb: 2, color: "skyblue" }} align="center">
                A 6 digits OTP has been sent to:  {phoneNumber}
              </Typography>
            </Box>

            <Box display="flex" justifyContent="space-between">
              {[...Array(otpLength)].map((_, index) => (
                <input
                  key={index}
                  type="number"
                  maxLength="1"
                  ref={(el) => (inputs.current[index] = el)}
                  onChange={(e) => handleInput(index, e)}
                  onKeyDown={(e) => {
                    if (e.key === "Backspace" && e.target.value === "") {
                      if (inputs.current[index - 1]) {
                        inputs.current[index - 1].focus();
                      }
                    }
                  }}
                  style={{
                    width: "40px",
                    height: "40px",
                    textAlign: "center",
                    fontSize: "20px",
                    border: "1px solid #ccc",
                    borderRadius: "5px",
                    outline: "none",
                    marginLeft: index === 0 ? "5px" : "0",
                    marginRight: index === otpLength - 1 ? "5px" : "0",
                  }}
                />
              ))}
            </Box>
            <Typography sx={{ fontSize: "18px", fontWeight: "700", color: "red", mt: 2 }}>
              {errorMsg}
            </Typography>

            <Box sx={{ textAlign: "center", mt: 2 }}>
              <Grid container spacing={1} justifyContent="center">
                <Grid item>
                  <Button
                    color="primary"
                    variant="contained"
                    sx={{ width: 140 }}
                    onClick={handleResendOtp}
                  >
                    {authReducerState.isLoading ? (
                      <CircularProgress color="inherit" size={25} />
                    ) : (
                      "Resend OTP"
                    )}
                  </Button>
                </Grid>
                <Grid item>
                  <Button
                    color="success"
                    variant="contained"
                    sx={{ width: 140 }}
                    ref={buttonRef}
                    onClick={handleSubmitOtp}
                    disabled={!otpValue.length}
                  >
                    {authReducerState.isLoading ? (
                      <CircularProgress color="inherit" size={25} />
                    ) : (
                      "Verify OTP"
                    )}
                  </Button>
                </Grid>
              </Grid>
            </Box>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default OtpForm;
