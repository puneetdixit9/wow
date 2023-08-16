import React, { useEffect, useState } from "react";

import {
    Card,
    CardContent,
    Typography,
    Box,
    Grid,
} from "@mui/material";

import DeliveryOrdersTable from "./OutForDeliveryTable";
import { useAppSelector, useAppDispatch } from '../../hooks/redux-hooks'
import { fetchAllOrders, updateOrderStatus } from "../../redux/actions/Items";


const OutForDelivery = () => {
    const dispatch = useAppDispatch()
    const reducerState = useAppSelector(state => state.itemsReducer)
    const [orders, setOrders] = useState([])

    const handleUpdateOrderStatus = (orderId, status) => {
        dispatch(updateOrderStatus(orderId, status))
        setOrders(prevOrders =>
            prevOrders.map(order => {
                if (order.order_id === orderId) {
                    return { ...order, status: status };
                }
                return order;
            }).filter(order => order.status !== "allDone")
        );
    }


    useEffect(() => {
        const fetchOrders = () => {
            const payload = {
                today_records: true,
                order_by: {
                    key: "created_at",
                    sorting: "desc"
                },
                filters: {
                    order_type: "Delivery",
                    status: "inDelivery"
                }
            };
            dispatch(fetchAllOrders(payload));
        };
    
        fetchOrders();
        const interval = setInterval(fetchOrders, 15000);
        return () => {
            clearInterval(interval);
        };
    }, []);

    useEffect(() => {
        setOrders(reducerState.orders)
    }, [reducerState.orders])

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
                                            mb: 3,
                                        }}
                                        gutterBottom
                                    >
                                        Out For Delivery Orders
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
                                </Box>
                            </Box>
                            <Box
                                sx={{
                                    overflow: "auto",
                                    mt: 0,
                                }}
                            >
                                <DeliveryOrdersTable orders={orders} changeOrderStatus={handleUpdateOrderStatus} />
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </Box>
    );
};

export default OutForDelivery;
