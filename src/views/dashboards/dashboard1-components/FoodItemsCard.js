import React, { useState, useEffect, useRef } from "react";
import { Card, CardContent, Typography, Button, Grid, Rating, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import { useNavigate } from "react-router-dom";
import { useAppSelector, useAppDispatch } from '../../../hooks/redux-hooks'
import { ADD_TO_CART } from '../../../constants'
import TextField from "@mui/material/TextField"


import { getItems, getCartData } from "../../../redux/actions/Items";

const FoodItemsCard = () => {
  const dispatch = useAppDispatch()
  const itemsState = useAppSelector(state => state.itemsReducer)
  const [items, setItems] = useState([])
  const [cartData, setCartData] = useState([])
  const [quantities, setQuantities] = useState()
  const currentItemId = useRef(-1);

  const [showSizePopup, setShowSizePopup] = useState(false);
  const [selectedItemIndex, setSelectedItemIndex] = useState(-1);
  const [searchQuery, setSearchQuery] = useState("");
  var selectedItemSize = "regular"
  const sizee = useRef(-1);



  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getItems())
    dispatch(getCartData())
  }, [])


  useEffect(() => {
    setItems(itemsState.items)
    setCartData(itemsState.cartData)
    sizee.current = "regular"
  }, [itemsState.items, itemsState.cartData])


  useEffect(() => {
    const cartItemMap = cartData.reduce((map, item) => {
      map[item._id] = item.count;
      return map;
    }, {});

    setQuantities(cartItemMap);
  }, [items, cartData]);


  useEffect(() => {
    if (currentItemId.current !== -1) {
      console.log("-------> size2", selectedItemSize, sizee.current)
      fetch(
        `${process.env.REACT_APP_API_URL}${ADD_TO_CART}/` +
        currentItemId.current +
        "/" +
        quantities[currentItemId.current] + "/" + sizee.current,
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
    sizee.current = "regular"
  }, [currentItemId, items, quantities]);


  const handleAddToCart = (itemId) => {
    const itemIndex = items.findIndex(item => item._id === itemId)
    if ((!quantities.hasOwnProperty(itemId) || quantities[itemId] === 0) && items[itemIndex]?.available_sizes?.length > 0) {
      setSelectedItemIndex(itemIndex);
      setShowSizePopup(true);
    } else {
      setShowSizePopup(false);
      setQuantities((prevQuantities) => ({
        ...prevQuantities,
        [itemId]: (prevQuantities[itemId] || 0) + 1,
      }));
      currentItemId.current = itemId;
    }
  };
  

  const handleRemoveFromCart = (itemId) => {
    const itemIndex = items.findIndex(item => item._id === itemId)
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [itemId]: (prevQuantities[itemId] || 0) - 1,
    }));
    currentItemId.current = itemId;
  };

  const handleSizeSelect = (size) => {
    selectedItemSize = size
    sizee.current = size
    console.log("-------> size", selectedItemSize, size)
    const itemId = items[selectedItemIndex]._id
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [itemId]: (prevQuantities[itemId] || 0) + 1,
    }));
    currentItemId.current = itemId;


    setSelectedItemIndex(-1);
    setShowSizePopup(false);
  };

  const handlePopupClose = () => {
    setSelectedItemIndex(-1);
    setShowSizePopup(false);
  };

  return (
    <Grid container >
       <Grid container justifyContent="center" sx={{ mt: "10px", mb: "10px", position: "sticky"}}>
        <Grid item xs={12} lg={8}>
          <TextField
            label="Search Items"
            variant="outlined"
            fullWidth
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </Grid>
      </Grid>
      {items.filter((item) =>
          item.item_name.toLowerCase().includes(searchQuery.toLowerCase())
        ).map((item, index) => (
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
              {quantities[item._id] ? (
                <Grid container alignItems="center" justifyContent="space-between" sx={{ mt: "15px" }}>
                  <Grid>
                    <Button variant="outlined" onClick={() => handleRemoveFromCart(item._id)}>
                      -1
                    </Button>
                  </Grid>
                  <Grid>
                    <Typography sx={{ fontWeight: 'bold' }} variant="body1">Qty: {quantities[item._id]}</Typography>
                  </Grid>

                  <Grid>
                    <Button variant="outlined" onClick={() => handleAddToCart(item._id)}>
                      +1
                    </Button>
                  </Grid>

                </Grid>
              ) : (
                <Button
                  variant="contained"
                  sx={{ mt: "15px" }}
                  color={item.btncolor}
                  onClick={() => handleAddToCart(item._id)}
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