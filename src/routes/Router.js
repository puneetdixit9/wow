import { Navigate } from "react-router-dom";
import FullLayout from "../layouts/FullLayout/FullLayout.js";
import Dashboard1 from "../views/dashboards/Dashboard1.js";
import BasicTable from "../views/tables/BasicTable.js";
import Checkout from "../views/checkout/Checkout.js";
import ExAutoComplete from "../views/FormElements/ExAutoComplete.js";
import ExButton from "../views/FormElements/ExButton.js";
import ExCheckbox from "../views/FormElements/ExCheckbox.js";
import ExRadio from "../views/FormElements/ExRadio.js";
import ExSlider from "../views/FormElements/ExSlider.js";
import ExSwitch from "../views/FormElements/ExSwitch.js";
import FormLayouts from "../views/FormLayouts/FormLayouts.js";
import Inventory from "../views/inventory/Inventory.js";
import Orders from "../views/orders/Orders.js";
import Delivery from "../views/delivery/Delivery.js";
import OutForDelivery from "../views/outForDelivery.js/OutForDelivery.js";

const ThemeRoutes = [
  {
    path: "/",
    element: <FullLayout />,
    children: [
      { path: "/", element: <Navigate to="/wow-pizza/dashboard" /> },
      { path: "/wow-pizza/dashboard", exact: true, element: <Dashboard1 /> },
      { path: "/wow-pizza/food-items", element: <ExAutoComplete /> },
      { path: "/wow-pizza/cart", element: <Checkout /> },
      { path: "/wow-pizza/inventory", element: <Inventory /> },
      { path: "/wow-pizza/orders", element: <Orders /> },
      { path: "/wow-pizza/delivery", element: <Delivery /> },
      { path: "/wow-pizza/out-for-delivery", element: <OutForDelivery /> },
      { path: "tables/basic-table", element: <BasicTable /> },
      { path: "/form-layouts/form-layouts", element: <FormLayouts /> },
      { path: "/form-elements/checkbox", element: <ExCheckbox /> },
      { path: "/form-elements/radio", element: <ExRadio /> },
      { path: "/form-elements/slider", element: <ExSlider /> },
      { path: "/form-elements/switch", element: <ExSwitch /> },
    ],
  },
];

export default ThemeRoutes;
