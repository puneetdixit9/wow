import React, { useEffect, useState } from "react";
import { Grid, Box } from "@mui/material";

import { useNavigate } from "react-router-dom";
import { useAppSelector, useAppDispatch } from '../../hooks/redux-hooks'

import { fetchAllOrders } from "../../redux/actions/Items";

import {
  SalesOverview,
  ProductPerformance,
  PendingOrders,
} from "../dashboards/dashboard1-components";


const Orders = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const reducerState = useAppSelector(state => state.itemsReducer)
  const [orders, setOrders] = useState([])


  useEffect(() => {
    dispatch(fetchAllOrders())
  }, [])

  useEffect(() => {
    setOrders(reducerState.orders)
  }, [reducerState.orders])

  return (
    <Box>
      <Grid container spacing={0}>
        <Grid item xs={12} lg={12}>
          <PendingOrders orders={orders}/>
          <PendingOrders orders={orders}/>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Orders;
