import React, { useState } from "react";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, Typography } from "@mui/material";

const SizeSelectionPopup = ({ open, onClose, item }) => {
  const [selectedSize, setSelectedSize] = useState("");

  const handleSizeSelect = (size) => {
    setSelectedSize(size);
  };

  const handleAddToCart = () => {
    // Perform your add to cart logic here, passing the selectedSize
    // and other relevant information
    console.log("Selected Size:", selectedSize);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Choose Size for {item.item_name}</DialogTitle>
      <DialogContent>
        <Grid container spacing={2}>
          {item.available_sizes.map((sizeOption, index) => (
            <Grid item key={index}>
              <Button
                variant={selectedSize === sizeOption.size ? "contained" : "outlined"}
                onClick={() => handleSizeSelect(sizeOption.size)}
              >
                {sizeOption.size}
              </Button>
            </Grid>
          ))}
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleAddToCart} disabled={!selectedSize} color="primary">
          Add to Cart
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default SizeSelectionPopup;
