import React, { useEffect, useState, useRef } from "react";

import {
    Card,
    CardContent,
    Typography,
    Box,
    Grid,
} from "@mui/material";

import OrdersTable from "./OrdersTable";
import { useAppSelector, useAppDispatch } from '../../hooks/redux-hooks'
import { fetchAllOrders, updateOrderStatus } from "../../redux/actions/Items";
import Stomp from 'stompjs';
import sound from './sound.wav'
import UserSession from "../../services/auth";
import { useFirebase } from "../../FirebaseService";
import { getFirestore, doc, onSnapshot, collection } from 'firebase/firestore';
import { getDatabase, ref, onValue, orderByChild, orderByValue, limitToLast, query } from 'firebase/database';




const Orders = () => {
    const dispatch = useAppDispatch()
    const reducerState = useAppSelector(state => state.itemsReducer)
    const [orders, setOrders] = useState([])
    const audioElement = new Audio(sound);


    // ============== RABBIT MQ WEB SOCKET ==================
    // useEffect(() => {
    //     const client = Stomp.client('ws://54.80.184.171:15674/ws');

    //     const onConnect = () => {
    //         console.log('Connected to RabbitMQ via WebSocket');

    //         client.subscribe('/exchange/orders', (message) => {
    //             const payload = { today_records: true, order_by: { key: "created_at", sorting: "desc" }, or_filters: { status: ["placed", "inKitchen"] } }
    //             audioElement.play()
    //             dispatch(fetchAllOrders(payload))
    //         });
    //     };

    //     const onDisconnect = () => {
    //         console.log('Disconnected from RabbitMQ via WebSocket');
    //         // client.connect('admin', '1m2p3k4n', onConnect, onDisconnect);
    //     };

    //     client.connect('admin', '1m2p3k4n', onConnect, onDisconnect);
    //     return () => {
    //         if (client && client.connected) { // Check if the client is connected before disconnecting
    //             client.disconnect();
    //         }
    //     };
    // }, []);



    const handleUpdateOrderStatus = (orderId, status) => {
        dispatch(updateOrderStatus(orderId, status))
        setOrders(prevOrders =>
            prevOrders.map(order => {
                if (order.order_id === orderId) {
                    return { ...order, status: status };
                }
                return order;
            }).filter(order => order.status !== "prepared")
        );
    }


    useEffect(() => {
        const payload = { today_records: !UserSession.isCustomer(), order_by: { key: "created_at", sorting: "desc" }, or_filters: { status: !UserSession.isCustomer() ? ["placed", "inKitchen"] : [] } }
        dispatch(fetchAllOrders(payload))
    }, [])

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
                                        Orders
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
                                <OrdersTable orders={orders} changeOrderStatus={handleUpdateOrderStatus} />
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </Box>

    );
};

export default Orders;
