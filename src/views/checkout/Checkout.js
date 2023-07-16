import React from "react";
import { Grid, Box } from "@mui/material";

import CheckoutOverview from "./CheckoutOverview";


const Cart = () => {
  // 2

  return (
    <Box>
      <Grid container spacing={0}>
        {/* ------------------------- row 1 ------------------------- */}
        <Grid item xs={12} lg={12}>
          <CheckoutOverview />
        </Grid>
        {/* ------------------------- row 2 ------------------------- */}
        {/* <Grid item xs={12} lg={6}>
          <PendingOrders />
        </Grid>
        <Grid item xs={12} lg={6}>
          <ProductPerformance />
        </Grid> */}
        {/* ------------------------- row 3 ------------------------- */}
        {/* <FoodItemsCard /> */}
      </Grid>
    </Box>
  );
};

export default Cart;
