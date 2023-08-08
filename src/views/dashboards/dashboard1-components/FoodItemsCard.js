import React, { useState, useEffect, useRef } from "react";
import { Card, CardContent, Typography, Button, Grid, Rating, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import { useNavigate } from "react-router-dom";
import { useAppSelector, useAppDispatch } from '../../../hooks/redux-hooks'
import { ADD_TO_CART } from '../../../constants'


import { getItems, getCartData } from "../../../redux/actions/Items";

const FoodItemsCard = () => {
  const dispatch = useAppDispatch()
  const itemsState = useAppSelector(state => state.itemsReducer)
  const [items, setItems] = useState([])
  const [cartData, setCartData] = useState([])
  const [quantities, setQuantities] = useState()
  const currentIndex = useRef(-1);

  const [showSizePopup, setShowSizePopup] = useState(false);
  const [selectedItemIndex, setSelectedItemIndex] = useState(-1);



  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getItems())
    dispatch(getCartData())
  }, [])


  useEffect(() => {
    setItems(itemsState.items)
    setCartData(itemsState.cartData)
  }, [itemsState.items, itemsState.cartData])


  useEffect(() => {
    const cartItemMap = cartData.reduce((map, item) => {
      map[item._id] = item.count;
      return map;
    }, {});

    setQuantities(
      items.map((item) => cartItemMap[item._id] || 0)
    );
  }, [items, cartData]);


  useEffect(() => {
    if (currentIndex.current !== -1) {
      fetch(
        `${process.env.REACT_APP_API_URL}${ADD_TO_CART}/` +
        items[currentIndex.current]._id +
        "/" +
        quantities[currentIndex.current],
        {
          method: "POST",
        }
      )
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((data) => {
          console.log("Response Data:", data);
        })
        .catch((error) => {
          console.error("Fetch Error:", error);
        });

    }
  }, [currentIndex, items, quantities]);


  const handleAddToCart = (index) => {
    if (items[index].available_sizes.length > 0) {
      setSelectedItemIndex(index);
      setShowSizePopup(true);
    } else {
      setQuantities((prevQuantities) => ({
        ...prevQuantities,
        [index]: prevQuantities[index] + 1,
      }));
      currentIndex.current = index;
    }
  };

  const handleRemoveFromCart = (index) => {
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [index]: prevQuantities[index] - 1,
    }));
    currentIndex.current = index
  };

  const handleSizeSelect = (size) => {
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [selectedItemIndex]: prevQuantities[selectedItemIndex] + 1,
    }));
    currentIndex.current = selectedItemIndex;
    setSelectedItemIndex(-1);
    setShowSizePopup(false);
  };

  const handlePopupClose = () => {
    setSelectedItemIndex(-1);
    setShowSizePopup(false);
  };

  return (
    <Grid container >
      {items.map((item, index) => (
        <Grid
          key={index}
          item
          xs={12}
          sm={6}
          md={4}
          lg={3}
          sx={{
            display: "flex",
            alignItems: "stretch",
          }}
        >
          <Card variant="outlined" sx={{ p: 0, width: "100%" }}>
            <img src={item.img_url} alt="img" width="100%" height="250px" />
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
                  {item.item_name}
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
      <Dialog open={showSizePopup} onClose={handlePopupClose}>
        <DialogTitle>Choose Size</DialogTitle>
        <DialogContent>
          <Grid container spacing={2}>
            <Grid item>
              <div>
                <img src={items[selectedItemIndex]?.img_url} alt="img" width="100%" height="370px" />
              </div>
            </Grid>
            {items[selectedItemIndex]?.available_sizes?.map((sizeOption, index) => (
              <Grid item key={index}>
                <Button
                  variant="outlined"
                  onClick={() => handleSizeSelect(sizeOption.size)}
                >
                  {sizeOption.size}
                </Button>
                <div>
                  Prize: <CurrencyRupeeIcon sx={{ fontSize: 'inherit', fontWeight: 'inherit', mr: '-2px' }} /> {sizeOption.price}
                </div>
              </Grid>
            ))}
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handlePopupClose}>Cancel</Button>
        </DialogActions>
      </Dialog>


      <Grid container justifyContent="center">
        <Grid item
          xs={12}
          lg={12}
        >
          <Button
            variant="contained"
            sx={{ mt: "25px", width: "100%", height: "60px", fontSize: "1.3rem", fontWeight: "bold" }}
            color="success"
            onClick={() => navigate("/wow-pizza/cart")}
          >
            Go to Cart
          </Button>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default FoodItemsCard;