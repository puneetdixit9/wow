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
import Unauthorized from "../views/Unauthorized/Unauthorized.js";
import UserSession from "../services/auth.js";
import UserProfile from "../views/users/Profile.js";
import DeliveryMan from "../views/users/DeliveryMan.js";

const ThemeRoutes = [
  {
    path: "/",
    element: <FullLayout />,
    children: [
      { path: "/", element: <Navigate to="/wow-pizza/dashboard" /> },
      { path: "/wow-pizza/dashboard", element: (UserSession.isAdmin()) ? <Dashboard1 /> : <Unauthorized /> },
      { path: "/wow-pizza/food-items",element: (UserSession.isAdmin() || UserSession.isCustomer()) ? <ExAutoComplete /> : <Unauthorized /> },
      { path: "/wow-pizza/cart", element: (UserSession.isAdmin() || UserSession.isCustomer()) ? <Checkout /> : <Unauthorized /> },
      { path: "/wow-pizza/inventory", element: (UserSession.isAdmin()) ? <Inventory /> : <Unauthorized /> },
      { path: "/wow-pizza/orders", element: (!UserSession.isDeliveryMan()) ? <Orders /> : <Unauthorized /> },
      { path: "/wow-pizza/delivery", element: (UserSession.isAdmin() || UserSession.isDeliveryMan()) ? <Delivery /> : <Unauthorized /> },
      { path: "/wow-pizza/out-for-delivery",element: (UserSession.isAdmin() || UserSession.isDeliveryMan()) ? <OutForDelivery /> : <Unauthorized /> },
      { path: "/wow-pizza/profile", element: (UserSession.isAdmin()) ? <UserProfile /> : <Unauthorized /> },
      { path: "/wow-pizza/delivery-man", element: (UserSession.isAdmin()) ? <DeliveryMan /> : <Unauthorized /> },
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
