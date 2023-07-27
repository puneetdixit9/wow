import React, { useEffect, useState } from "react";


import {
  Card,
  CardContent,
  Typography,
  Box,
  Grid,
  Button,
  TableContainer,
} from "@mui/material";

import EditSharpIcon from '@mui/icons-material/EditSharp';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
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
  const [orderId, setOrderId] = useState('')
  const gstRate = 5;

  useEffect(() => {
    dispatch(getCartData())
    dispatch(resetPreviousPlacedOrder())
  }, [])


  useEffect(() => {
    setCartData(cartState.cartData)
  }, [cartState.cartData])

  useEffect(() => {
    if (cartState.orderId !== '') {
      setOrderPlaced(true)
      setOrderId(cartState.orderId)
    }
  }, [cartState.orderId])

  function handleDiscardCart() {
    dispatch(discardCart())
    setCartData([])
  }

  function handlePlaceOrder() {
    dispatch(proceedToPlaceOrder())
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
              {/* Conditionally render the TableContainer */}
              {orderPlaced ? (
                <Typography variant="h5">Order ID: {orderId}</Typography>
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
                {/* Conditionally render the buttons */}
                {!orderPlaced && (
                  <>
                    {cartData.length > 0 && (
                      <>
                        <Button
                          variant="contained"
                          sx={{
                            width: "200px",
                            height: "60px",
                            fontSize: "1.3rem",
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
                            width: "350px",
                            height: "60px",
                            fontSize: "1.3rem",
                            fontWeight: "bold",
                            marginRight: "8px",
                            mb: "8px",
                          }}
                          color="success"
                          onClick={handlePlaceOrder}
                        >
                          Place Order
                        </Button>
                        <Button
                          variant="contained"
                          sx={{
                            width: "200px",
                            height: "60px",
                            fontSize: "1.3rem",
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
