import React, { useEffect, useState } from "react";


import {
  Card,
  CardContent,
  Typography,
  Box,
  Grid,
  Button,
  TableContainer,
  TextField,
} from "@mui/material";

import EditSharpIcon from '@mui/icons-material/EditSharp';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import DeliveryDiningIcon from '@mui/icons-material/DeliveryDining';
import { useNavigate } from "react-router-dom";
import { useAppSelector, useAppDispatch } from '../../hooks/redux-hooks'


import { getCartData, discardCart, proceedToPlaceOrder, resetPreviousPlacedOrder } from "../../redux/actions/Items";

import CartTable from "./CartTable";


const Cart = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const cartState = useAppSelector(state => state.itemsReducer)
  const [cartData, setCartData] = useState([])
  const [orderPlaced, setOrderPlaced] = useState(false)
  const [orderNo, setOrderNo] = useState('')
  const gstRate = 5;
  const [orderNote, setOrderNote] = useState('')
  const [deliveryAddress, setDeliveryAddress] = useState('')
  const [mobileNumber, setMobileNumber] = useState('')
  const [deliveryAddressRequired, setDeliveryAddressRequired] = useState(false)
  const [mobileNumberRequired, setMobileNumberRequired] = useState(false)

  useEffect(() => {
    dispatch(resetPreviousPlacedOrder())
    dispatch(getCartData())
  }, [])

  const handleOrderNoteChange = (event) => {
    setOrderNote(event.target.value);
  };

  const handleAddressChange = (event) => {
    setDeliveryAddress(event.target.value);
  };

  const handleMobileNumberChange = (event) => {
    setMobileNumber(event.target.value);
  };

  useEffect(() => {
    setCartData(cartState.cartData)
  }, [cartState.cartData])

  useEffect(() => {
    if (cartState.orderNo) {
      setOrderPlaced(true)
      setOrderNo(cartState.orderNo)
    }
  }, [cartState.orderNo])

  function handleDiscardCart() {
    dispatch(discardCart())
    setCartData([])
  }

  const handlePlaceDienInOrder = () => {
    if (mobileNumber !== "") {
      const payload = {
        order_note: orderNote,
        order_type: "Dine-in",
        mobile_number: mobileNumber,
      }
      dispatch(proceedToPlaceOrder(payload))
    } else {
      setMobileNumberRequired(true)
    }
  }

  const handlePlaceDeliveryOrder = () => {
    if (deliveryAddress !== "" && mobileNumber !== "") {
      const payload = {
        order_note: orderNote,
        order_type: "Delivery",
        delivery_address: deliveryAddress,
        mobile_number: mobileNumber,
      }
      dispatch(proceedToPlaceOrder(payload))
    }
    if (deliveryAddress === "") {
      setDeliveryAddressRequired(true)
    }
    if (mobileNumber === "") {
      setMobileNumberRequired(true)
    }
  }

  return (
    <Box>
      <Grid container spacing={0}>
        <Grid item xs={12} lg={12}>
          <Card variant="outlined">
            <CardContent>
              <Box
                sx={{
                  display: {
                    sm: "flex",
                    xs: "block",
                  },
                  alignItems: "flex-start",
                }}
              >
                <Box>
                  <Typography
                    variant="h3"
                    sx={{
                      marginBottom: "0",
                    }}
                    gutterBottom
                  >
                    {orderPlaced ? "Order has been placed successfully!" : cartData.length ? "Item(s) in Cart" : "Your cart is empty!"}
                  </Typography>
                </Box>
              </Box>
              {orderPlaced ? (
                <Typography variant="h5">Order No: {orderNo}</Typography>
              ) : cartData.length ? (
                <TableContainer sx={{ overflowX: 'auto' }}>
                  <CartTable items={cartData} gstRate={gstRate} />
                </TableContainer>
              ) : null
              }
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  mt: 3,
                  flexWrap: "wrap",
                }}
              >
                {!orderPlaced && (
                  <>
                    {cartData.length > 0 && (
                      <>
                        <TextField
                          id="Mobile Number"
                          label="Mobile Number"
                          variant="outlined"
                          fullWidth
                          sx={{ mb: 2 }}
                          value={mobileNumber}
                          onChange={handleMobileNumberChange}
                          required
                          helperText={
                            mobileNumberRequired ? "Mobile Number Required" : ""
                          }
                          error={mobileNumberRequired}
                        />
                        <TextField
                          id="default-value"
                          label="Order Note"
                          variant="outlined"
                          fullWidth
                          sx={{ mb: 2 }}
                          value={orderNote}
                          onChange={handleOrderNoteChange}
                        />

                        <TextField
                          id="Address"
                          label="Delivery Address - Optional (If placing delivery order)"
                          variant="outlined"
                          fullWidth
                          sx={{ mb: 2 }}
                          value={deliveryAddress}
                          onChange={handleAddressChange}
                          helperText={
                            deliveryAddressRequired ? "Delivery Address Required for Delivery Address" : ""
                          }
                          error={deliveryAddressRequired}
                        />
                        <Button
                          variant="contained"
                          sx={{
                            width: "210px",
                            height: "50px",
                            fontSize: "1",
                            fontWeight: "bold",
                            marginRight: "8px",
                            mb: "8px",
                          }}
                          color="primary"
                          onClick={() => navigate("/wow-pizza/food-items")}
                        >
                          <EditSharpIcon sx={{ mr: 1 }} />
                          Edit Order
                        </Button>
                        <Button
                          variant="contained"
                          sx={{
                            width: "210px",
                            height: "50px",
                            fontSize: "1",
                            fontWeight: "bold",
                            marginRight: "8px",
                            mb: "8px",
                          }}
                          color="success"
                          onClick={handlePlaceDienInOrder}
                        >

                          Place Dine-In Order
                        </Button>

                        <Button
                          variant="contained"
                          sx={{
                            width: "210px",
                            height: "50px",
                            fontSize: "1",
                            fontWeight: "bold",
                            marginRight: "8px",
                            mb: "8px",
                          }}
                          color="success"
                          onClick={handlePlaceDeliveryOrder}
                        >
                          <DeliveryDiningIcon sx={{ mr: 1 }} />
                          Place Delivery Order
                        </Button>

                        <Button
                          variant="contained"
                          sx={{
                            width: "210px",
                            height: "50px",
                            fontSize: "1",
                            fontWeight: "bold",
                            mb: "8px",
                          }}
                          color="warning"
                          onClick={handleDiscardCart}
                        >
                          <ShoppingCartOutlinedIcon sx={{ mr: 1 }} />
                          Discard Cart
                        </Button>
                      </>
                    )}
                    {cartData.length === 0 && (
                      <Button
                        variant="contained"
                        sx={{
                          width: "350px",
                          height: "60px",
                          fontSize: "1.3rem",
                          fontWeight: "bold",
                          marginRight: "8px",
                          mb: "8px",
                        }}
                        color="success"
                        onClick={() => navigate("/wow-pizza/food-items")}
                      >
                        Check Food Items
                      </Button>
                    )}
                  </>
                )}
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Cart;
