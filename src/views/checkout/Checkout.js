import React from "react";
import { Grid, Box } from "@mui/material";

import CheckoutOverview from "./CheckoutOverview";


const Cart = () => {
  // 2

  return (
    <Box>
      <Grid container spacing={0}>
        <Grid item xs={12} lg={12}>
          <CheckoutOverview />
        </Grid>
      </Grid>
    </Box>
  );
};

export default Cart;
