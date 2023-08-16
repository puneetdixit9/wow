import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Card, CardContent, Typography, Button, Grid, Rating } from "@mui/material";
import PropTypes from 'prop-types';

export default function OutForDeliveryOrdersTable(props) {
    const { orders, changeOrderStatus } = props;

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

    const timeFormatter = (dateTimeString) => {
        const dateParts = dateTimeString.split(' ');
        const timeParts = dateParts[4].split(':');
        const hours = parseInt(timeParts[0], 10);
        const minutes = parseInt(timeParts[1], 10);
        const amOrPm = hours >= 12 ? 'PM' : 'AM';
        const formattedHours = (hours % 12) || 12;

        return `${formattedHours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')} ${amOrPm}`;
    };

    return (
        <TableContainer component={Paper} sx={{ maxHeight: 550 }}>
            <Table aria-label="simple table">
                <TableHead>
                    <TableRow style={{ position: 'sticky', top: 0, zIndex: 1, backgroundColor: '#fff', fontWeight: "bold" }}>
                        <TableCell>Order No.</TableCell>
                        <TableCell align="left">Items</TableCell>
                        <TableCell align="center">Delivery Address</TableCell>
                        <TableCell align="center">Mobile Number</TableCell>
                        <TableCell align="center">Order Time</TableCell>
                        <TableCell align="center">Change Status</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {orders.map((row) => (
                        <TableRow
                            key={row.order_id}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell component="th" scope="row">
                                {row.order_no}
                            </TableCell>
                            <TableCell align="left">{generateOrderSummaryText(row.items)}</TableCell>
                            <TableCell align="center">{row.delivery_address}</TableCell>
                            <TableCell align="center">{row.mobile_number}</TableCell>
                            <TableCell align="center">{timeFormatter(row.placed_at)}</TableCell>
                            <TableCell align="center">
                                <Button
                                    variant="contained"
                                    color={row.status === "prepared" ? "secondary" : "success"}
                                    sx={{ width: "180px", fontSize: "1" }}
                                    onClick={() => changeOrderStatus(row.order_id, row.status === "prepared" ? "inDelivery" : "allDone")}
                                >
                                    {row.status === "prepared" ? "Out For Delivery" : "Delivered"}
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

OutForDeliveryOrdersTable.propTypes = {
    orders: PropTypes.array,
    changeOrderStatus: PropTypes.func
};
