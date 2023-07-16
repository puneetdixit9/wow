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

const TAX_RATE = 7;
const TAXES = 220;
const TOTAL = 500;
const Items = [
    {
        id: "1",
        name: "Veg-Loaded Pizza",
        quantity: 2,
        prize: 290,
        extra: "",
        img: "https://b.zmtcdn.com/data/dish_photos/6e9/4fa6a45c982b6fcb2e1ad060e61026e9.jpg"
    },
    {
        id: "2",
        name: "Farm-House Pizza",
        quantity: 2,
        rating: 3,
        prize: 290,
        extra: "Cheese",
        img: "https://b.zmtcdn.com/data/dish_photos/7df/4938ed937ee5d59241ad94d772c7d7df.png"
    },
    {
        id: "3",
        name: "Burger",
        quantity: 3,
        prize: 290,
        img: "https://b.zmtcdn.com/data/dish_photos/7bd/38f3a8f6ef59e195c0482962f43057bd.jpg",
    },
    {
        id: "4",
        name: "French Fries",
        quantity: 2,
        prize: 290,
        extra: "Double Topping",
        img: "https://b.zmtcdn.com/data/dish_photos/7df/4938ed937ee5d59241ad94d772c7d7df.png"
    },
    {
        id: "5",
        name: "Pasta",
        quantity: 2,
        prize: 290,
        extra: "Double Cheese",
        img: "https://b.zmtcdn.com/data/dish_photos/7bd/38f3a8f6ef59e195c0482962f43057bd.jpg",
    }
];


export default function CartTable() {
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
                    {Items.map((item) => (
                        <TableRow key={item.name}>
                            <TableCell>
                                <Box sx={{ display: "flex", alignItems: "center" }}>
                                    <img src={item.img} alt="img" width="10%" height="40px" />
                                    <Typography sx={{ ml: 2 }}>{item.name}</Typography>
                                </Box>
                            </TableCell>
                            <TableCell align="center">{item.quantity}</TableCell>
                            <TableCell align="center">{item.prize}</TableCell>
                            <TableCell align="right">{item.prize * item.quantity}</TableCell>
                        </TableRow>
                    ))}
                    <TableRow>
                        <TableCell rowSpan={3} />
                        <TableCell colSpan={2}>Subtotal</TableCell>
                        <TableCell align="right">{TOTAL}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>Tax</TableCell>
                        <TableCell align="right">{`${(TAX_RATE)} %`}</TableCell>
                        <TableCell align="right">{TAXES}</TableCell>
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
                                {TOTAL}
                            </Typography>

                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </TableContainer>
    );
}
