import React from "react";
import {
  Typography,
  Box,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableContainer ,
  TableRow,
  Chip,
  Rating
} from "@mui/material";

const products = [
  {
    id: "1",
    name: "Veg-Loaded Pizza",
    post: "Web Designer",
    pname: "Elite Admin",
    priority: "Low",
    pbg: "primary.main",
    budget: "3.9",
    rating: 4,
  },
  {
    id: "2",
    name: "Farm-House Pizza",
    post: "Project Manager",
    pname: "Real Homes WP Theme",
    priority: "Medium",
    pbg: "secondary.main",
    budget: "24.5",
    rating: 3,
  },
  {
    id: "3",
    name: "Burger",
    post: "Project Manager",
    pname: "MedicalPro WP Theme",
    priority: "High",
    pbg: "error.main",
    budget: "12.8",
    rating: 4.2,
  },
  {
    id: "4",
    name: "French Fries",
    post: "Frontend Engineer",
    pname: "Hosting Press HTML",
    priority: "Critical",
    pbg: "success.main",
    budget: "2.4",
    rating: 2.1,
  },
  {
    id: "5",
    name: "Pasta",
    post: "Frontend Engineer",
    pname: "Hosting Press HTML",
    priority: "Critical",
    pbg: "success.main",
    budget: "2.4",
    rating: 3,
  }
];

const ExTable = () => {
  return (
    <TableContainer
    sx={{
      maxHeight: 360
    }}
    >
      <Table
      aria-label="simple table"
      sx={{
        mt: 3,
        whiteSpace: "nowrap",
      }}
    >
      <TableHead>
        <TableRow>
          <TableCell>
            <Typography color="textSecondary" variant="h6">
              Id
            </Typography>
          </TableCell>
          <TableCell>
            <Typography color="textSecondary" variant="h6">
              Item
            </Typography>
          </TableCell>
          {/* <TableCell>
            <Typography color="textSecondary" variant="h6">
              Name
            </Typography>
          </TableCell> */}
          {/* <TableCell>
            <Typography color="textSecondary" variant="h6">
              Priority
            </Typography>
          </TableCell> */}
          <TableCell align="right">
            <Typography color="textSecondary" variant="h6">
              Rating
            </Typography>
          </TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {products.map((product) => (
          <TableRow key={product.name}>
            <TableCell>
              <Typography
                sx={{
                  fontSize: "15px",
                  fontWeight: "500",
                }}
              >
                {product.id}
              </Typography>
            </TableCell>
            <TableCell>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <Box>
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: "600",
                    }}
                  >
                    {product.name}
                  </Typography>
                  {/* <Typography
                    color="textSecondary"
                    sx={{
                      fontSize: "13px",
                    }}
                  >
                    {product.post}
                  </Typography> */}
                </Box>
              </Box>
            </TableCell>
            {/* <TableCell>
              <Typography color="textSecondary" variant="h6">
                {product.pname}
              </Typography>
            </TableCell> */}
            {/* <TableCell>
              <Chip
                sx={{
                  pl: "4px",
                  pr: "4px",
                  backgroundColor: product.pbg,
                  color: "#fff",
                }}
                size="small"
                label={product.priority}
              ></Chip>
            </TableCell> */}
            <TableCell align="right">
              <Rating name="read-only" value={product.rating} readOnly />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
    </TableContainer>
    
  );
};

export default ExTable;
