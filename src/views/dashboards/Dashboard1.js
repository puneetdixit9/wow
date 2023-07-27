import React, { useEffect, useState } from "react";
import { Grid, Box } from "@mui/material";

import { useNavigate } from "react-router-dom";
import { useAppSelector, useAppDispatch } from '../../hooks/redux-hooks'

import { fetchAllOrders } from "../../redux/actions/Items";

import {
  SalesOverview,
  ProductPerformance,
  PendingOrders,
} from "./dashboard1-components";

const Dashboard1 = () => {
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
          <SalesOverview />
        </Grid>
        <Grid item xs={12} lg={6}>
          <PendingOrders orders={orders}/>
        </Grid>
        <Grid item xs={12} lg={6}>
          <ProductPerformance />
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard1;
