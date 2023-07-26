import React from "react";
import {
    Card,
    CardContent,
    Typography,
    Box,
    Grid,
    Button,
    Fab,
} from "@mui/material";

import EditSharpIcon from '@mui/icons-material/EditSharp';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import { useNavigate } from "react-router-dom";

import CartTable from "./CartTable";

const navigate = useNavigate();

const CheckoutOverview = () => {

    return (
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
                            Item(s) in Cart
                        </Typography>
                    </Box>
                </Box>
                <Box
                    sx={{
                        overflow: "auto",
                        mt: 0,
                    }}
                >
                    <CartTable />
                </Box>
                <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
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
                </Box>
            </CardContent>
        </Card>
    );
};

export default CheckoutOverview;
