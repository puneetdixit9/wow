import * as React from 'react';

import {
    Box,
    Paper,
    Typography,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableContainer,
    TableRow,
} from "@mui/material";


export default function CartTable({items, gstRate}) {
    const subTotal = items.reduce((acc, item) => acc + item.price * item.count, 0);
    const gstCharge = subTotal * gstRate / 100

    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 700 }} aria-label="spanning table">
                <TableHead>
                    
                    <TableRow>
                        <TableCell>Item</TableCell>
                        <TableCell align="center">Qty.</TableCell>
                        <TableCell align="center">Rate/Qty.</TableCell>
                        <TableCell align="right">Sum</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {items.map((item) => (
                        <TableRow key={item.item_name}>
                            <TableCell>
                                <Box sx={{ display: "flex", alignItems: "center" }}>
                                    <img src={item.img_url} alt="img" width="10%" height="40px" />
                                    <Typography sx={{ ml: 2 }}>{item.item_name}</Typography>
                                </Box>
                            </TableCell>
                            <TableCell align="center">{item.count}</TableCell>
                            <TableCell align="center">{item.price}</TableCell>
                            <TableCell align="right">{item.price * item.count}</TableCell>
                        </TableRow>
                    ))}
                    <TableRow>
                        <TableCell rowSpan={3} />
                        <TableCell colSpan={2}>Subtotal</TableCell>
                        <TableCell align="right">{subTotal}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>GST</TableCell>
                        <TableCell align="right">{`${(gstRate)} %`}</TableCell>
                        <TableCell align="right">{gstCharge}</TableCell>
                    </TableRow>
                    <TableRow>

                        <TableCell colSpan={2}>
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
                                {subTotal + gstCharge}
                            </Typography>

                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </TableContainer>
    );
}
