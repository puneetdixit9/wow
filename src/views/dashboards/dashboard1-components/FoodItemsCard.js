import React, { useState } from "react";
import { Card, CardContent, Typography, Button, Grid, Rating } from "@mui/material";
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';

const items = [
  {
    img: "https://b.zmtcdn.com/data/dish_photos/ab9/f9973592397676dacb936bf65356aab9.jpg",
    title: "Pizza",
    price: "140",
    btncolor: "primary",
    rating: 3,
  }, {
    img: "https://b.zmtcdn.com/data/dish_photos/6e9/4fa6a45c982b6fcb2e1ad060e61026e9.jpg",
    title: "Burger",
    price: "180",
    btncolor: "primary",
    rating: 4,
  },
  {
    img: "https://b.zmtcdn.com/data/dish_photos/7df/4938ed937ee5d59241ad94d772c7d7df.png",
    title: "Pizza",
    price: "250",
    btncolor: "primary",
    rating: 1,
  },
  {
    img: "https://b.zmtcdn.com/data/dish_photos/7bd/38f3a8f6ef59e195c0482962f43057bd.jpg",
    title: "Burger",
    price: "200",
    btncolor: "primary",
    rating: 3,
  },
  {
    img: "https://b.zmtcdn.com/data/dish_photos/4c4/61c3337a2054649a6b4e8704670784c4.jpg",
    title: "Burger",
    price: "210",
    btncolor: "primary",
    rating: 5,
  },
  {
    img: "https://b.zmtcdn.com/data/dish_photos/72b/d5bc5b32dd177f5f207cad66556a572b.jpg",
    title: "Veg Loaged Pizza",
    price: "150",
    btncolor: "primary",
    rating: 3,
  },
  {
    img: "https://b.zmtcdn.com/data/dish_photos/ab9/f9973592397676dacb936bf65356aab9.jpg",
    title: "Veg Loaged Pizza",
    price: "140",
    btncolor: "primary",
    rating: 2,
  }, {
    img: "https://b.zmtcdn.com/data/dish_photos/6e9/4fa6a45c982b6fcb2e1ad060e61026e9.jpg",
    title: "Veg Loaged Pizza",
    price: "180",
    btncolor: "error",
    rating: 3,
  },
  {
    img: "https://b.zmtcdn.com/data/dish_photos/7df/4938ed937ee5d59241ad94d772c7d7df.png",
    title: "Veg Loaged Pizza",
    price: "250",
    btncolor: "warning",
    rating: 1,
  }
];

const FoodItemsCard = () => {
  const [quantities, setQuantities] = useState(() =>
    items.reduce((acc, _, index) => {
      acc[index] = 0;
      return acc;
    }, {})
  );

  const handleAddToCart = (index) => {
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [index]: prevQuantities[index] + 1,
    }));
  };

  const handleRemoveFromCart = (index) => {
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [index]: prevQuantities[index] - 1,
    }));
  };

  return (
    <Grid container >
      {items.map((item, index) => (
        <Grid
          key={index}
          item
          xs={12}
          lg={3}
          sx={{
            display: "flex",
            alignItems: "stretch",
          }}
        >
          <Card variant="outlined" sx={{ p: 0, width: "100%" }}>
            <img src={item.img} alt="img" width="100%" height="250px" />
            <CardContent
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                padding: "5px",
              }}
            >
              <div>
                <Typography variant="h4" sx={{ fontWeight: "500" }}>
                  {item.title}
                </Typography>
                <Grid container alignItems="center" justifyContent="space-between">
                  <Grid item>
                    <Typography color="textSecondary" sx={{ fontSize: "18px", fontWeight: "400", mt: 1 }}>
                      <CurrencyRupeeIcon sx={{ fontSize: 'inherit', fontWeight: 'inherit', mr: '-2px' }} /> {item.price}
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Rating name="read-only" value={item.rating} readOnly />
                  </Grid>
                </Grid>
              </div>
              {quantities[index] ? (
                <Grid container alignItems="center" justifyContent="space-between" sx={{ mt: "15px" }}>
                  <Grid>
                    <Button variant="outlined" onClick={() => handleRemoveFromCart(index)}>
                      -1
                    </Button>
                  </Grid>
                  <Grid>
                    <Typography sx={{ fontWeight: 'bold' }} variant="body1">Qty: {quantities[index]}</Typography>
                  </Grid>

                  <Grid>
                    <Button variant="outlined" onClick={() => handleAddToCart(index)}>
                      +1
                    </Button>
                  </Grid>

                </Grid>
              ) : (
                <Button
                  variant="contained"
                  sx={{ mt: "15px" }}
                  color={item.btncolor}
                  onClick={() => handleAddToCart(index)}
                >
                  Add to Cart
                </Button>
              )}
            </CardContent>
          </Card>
        </Grid>
      ))}
      <Grid container justifyContent="center">
        <Grid item 
        xs={12}
        lg={12}
        >
          <Button
            variant="contained"
            sx={{ mt: "25px", width:"100%", height: "60px", fontSize: "1.3rem", fontWeight: "bold" }}
            color="success"
          >
            Go to Cart
          </Button>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default FoodItemsCard;