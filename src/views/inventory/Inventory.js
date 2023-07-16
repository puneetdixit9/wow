import React from "react";

import InventoryTable from "./InventoryTable";
import {
  Card,
  CardContent,
  Typography,
  Box,
  Grid,
  FormControl,
  MenuItem,
  Select,
  Button,
} from "@mui/material";

import EditSharpIcon from '@mui/icons-material/EditSharp';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';

const Inventory = () => {
  // 2
  const [location, setLocation] = React.useState("Hassanpur");

  const handleLocationChange = (event) => {
    setLocation(event.target.value);
  };

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
                    Inventory
                  </Typography>
                </Box>
                <Box
            sx={{
              marginLeft: "auto",
              mt: {
                lg: 0,
                xs: 2,
              },
            }}
          >
            <FormControl variant="standard" sx={{ minWidth: 120 }}>
              <Select
                labelId="demo-simple-select-standard-label"
                id="demo-simple-select-standard"
                value={location}
                onChange={handleLocationChange}
                label="Age"
              >
                <MenuItem value="Hassanpur">Hassanpur</MenuItem>
                <MenuItem value="Palwal">Palwal</MenuItem>
              </Select>
            </FormControl>
          </Box>
              </Box>
              <Box
                sx={{
                  overflow: "auto",
                  mt: 0,
                }}
              >
                <InventoryTable />
              </Box>
              {/* <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
                <Button
                  variant="contained"
                  sx={{
                    width: "200px",
                    height: "60px",
                    fontSize: "1.3rem",
                    fontWeight: "bold",
                    marginRight: "8px",
                  }}
                  color="primary"
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
                  }}
                  color="success"
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
                  }}
                  color="warning"
                >
                  <ShoppingCartOutlinedIcon sx={{ mr: 1 }} />
                  Discard Cart
                </Button>
              </Box> */}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Inventory;
