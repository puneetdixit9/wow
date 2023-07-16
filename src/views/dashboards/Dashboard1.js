import React from "react";
import { Grid, Box } from "@mui/material";

import {
  SalesOverview,
  ProductPerformance,
  PendingOrders,
} from "./dashboard1-components";

const Dashboard1 = () => {
  // 2

  return (
    <Box>
      <Grid container spacing={0}>
        <Grid item xs={12} lg={12}>
          <SalesOverview />
        </Grid>
        <Grid item xs={12} lg={6}>
          <PendingOrders />
        </Grid>
        <Grid item xs={12} lg={6}>
          <ProductPerformance />
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard1;
