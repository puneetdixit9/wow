import React, { useEffect, useState } from 'react'
import { useAppSelector, useAppDispatch } from '../../hooks/redux-hooks'
import {
    Typography,
    Container,
    TextField,
    Grid,
    Autocomplete,
    CircularProgress,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
} from '@mui/material';

import { getUsersData, fetchAllOrders, resetPreviousPlacedOrder } from '../../redux/actions/Items';

const DeliveryMan = () => {
    const dispatch = useAppDispatch()
    const reducerState = useAppSelector(state => state.itemsReducer)

    const [deliveryMans, setDeliveryMans] = useState([])
    const [deliveryManOrders, setDeliverManOrders] = useState([])



    useEffect(() => {
        dispatch(getUsersData({role: "deliveryMan"}))

        return () => {
            dispatch(resetPreviousPlacedOrder())
        }
    }, [])

    useEffect(() => {
        setDeliverManOrders(reducerState.orders)
    }, [reducerState.orders])

    useEffect(() => {
        setDeliveryMans(reducerState.users)
    }, [reducerState.users])


    const total = deliveryManOrders.reduce((accumulator, order) => accumulator + order.total, 0);

    const handleDeliveryManChange = (deliveryMan) => {
        if (deliveryMan !== null) {
            const payload = {
                today_records: true,
                order_by:
                {
                    key: "created_at",
                    sorting: "desc"
                },
                filters:
                {
                    status: "allDone",
                    delivery_man_id: deliveryMan._id
                }
            }
            dispatch(fetchAllOrders(payload))
        } else {
            setDeliverManOrders([])
        }
    }

    const generateOrderSummaryText = (items) => {
        return (
            <Typography>
                {items.map((item, index) => (
                    <React.Fragment key={index}>
                        {`${item.count}x ${item.size} ${item.item_name}`}
                        <br />
                    </React.Fragment>
                ))}
            </Typography>
        );
    };


    return (
        <Container sx={{ marginTop: 2 }}>
            <Grid container justifyContent="center" alignItems="center" sx={{ mt: "10px", mb: "10px", position: "sticky" }}>
                <Grid item xs={12} sx={{ display: "flex", justifyContent: "center", marginBottom: { xs: "10px", lg: 0 } }}>
                    <Autocomplete
                        id="deliveryMan"
                        options={deliveryMans}
                        getOptionLabel={(option) => (option.first_name + " " + option.last_name)}
                        onChange={(event, newValue) => handleDeliveryManChange(newValue)}
                        sx={{ mb: 2, width: '100%', maxWidth: 400 }}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                fullWidth
                                name="deliveryMan"
                                label="Select Delivery Man"
                            />
                        )}
                    />
                </Grid>
            </Grid>

            <Table aria-label="spanning table">
                <TableHead>

                    <TableRow>
                        <TableCell>Order No.</TableCell>
                        <TableCell align="center">Items</TableCell>
                        <TableCell align="center">Address</TableCell>
                        <TableCell align="center">Customer Mobile</TableCell>
                        <TableCell align="right">Total</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {deliveryManOrders.map((item) => (
                        <TableRow key={item.item_name}>
                            <TableCell>{item.order_no}</TableCell>
                            <TableCell align="center">{generateOrderSummaryText(item.items)}</TableCell>
                            <TableCell align="center">{item.delivery_address}</TableCell>
                            <TableCell align="center">{item.mobile_number}</TableCell>
                            <TableCell align="right">{item.total}</TableCell>
                        </TableRow>
                    ))}
                    <TableRow>

                        <TableCell colSpan={4}>
                            <Typography color="textSecondary" variant="h6" sx={{
                                fontSize: "large",
                                fontWeight: "bold",
                            }}>
                                Total
                            </Typography>
                        </TableCell>
                        <TableCell align="right">
                            <Typography color="textSecondary" variant="h6" sx={{
                                fontSize: "large",
                                fontWeight: "bold",
                            }}>
                                {total}
                            </Typography>

                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
            {reducerState.isFetchOrdersLoading && (
                <Grid
                    container
                    justifyContent="center"
                    alignItems="center"
                    sx={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        backgroundColor: 'rgba(255, 255, 255, 0.8)',
                    }}
                >
                    <CircularProgress />
                </Grid>
            )}


        </Container>
    );
}

export default DeliveryMan;
