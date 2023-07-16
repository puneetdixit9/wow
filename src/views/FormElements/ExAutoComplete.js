import React from "react";
import { Grid, Box } from "@mui/material";

import { ComboBoxAutocomplete } from "../../components/Forms/AutoComplete/ComboBoxAutocomplete";

import { MultipleValuesAutocomplete } from "../../components/Forms/AutoComplete/MultipleValuesAutocomplete";
import { CheckboxesAutocomplete } from "../../components/Forms/AutoComplete/CheckboxesAutocomplete";
import { SizesAutocomplete } from "../../components/Forms/AutoComplete/SizesAutocomplete";


import { FoodItemsCard } from "../dashboards/dashboard1-components";

const ExAutoComplete = () => {
  // 2

  return (
    <Box>
      <Grid container spacing={0}>
        <FoodItemsCard />
      </Grid>
    </Box>
  );
};

export default ExAutoComplete;
