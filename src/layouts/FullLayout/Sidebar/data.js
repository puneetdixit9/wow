import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined';
import AddToPhotosOutlinedIcon from '@mui/icons-material/AddToPhotosOutlined';
import AspectRatioOutlinedIcon from '@mui/icons-material/AspectRatioOutlined';
import AssignmentTurnedInOutlinedIcon from '@mui/icons-material/AssignmentTurnedInOutlined';
import AlbumOutlinedIcon from '@mui/icons-material/AlbumOutlined';
import SwitchCameraOutlinedIcon from '@mui/icons-material/SwitchCameraOutlined';
import SwitchLeftOutlinedIcon from '@mui/icons-material/SwitchLeftOutlined';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import AutoAwesomeMosaicOutlinedIcon from '@mui/icons-material/AutoAwesomeMosaicOutlined';
import DeliveryDiningIcon from '@mui/icons-material/DeliveryDining';
import FastfoodIcon from '@mui/icons-material/Fastfood';
import InventoryIcon from '@mui/icons-material/Inventory';
import ShoppingCartSharpIcon from '@mui/icons-material/ShoppingCartSharp';
import UserSession from '../../../services/auth';

const Menuitems = UserSession.isAdmin() ? [
  {
    title: "Dashboard",
    icon: DashboardOutlinedIcon,
    href: "/wow-pizza/dashboard",
  },
  {
    title: "Food Items",
    icon: FastfoodIcon,
    href: "/wow-pizza/food-items",
  },
  {
    title: "Cart",
    icon: ShoppingCartSharpIcon,
    href: "/wow-pizza/cart",
  },
  {
    title: "Orders",
    icon: AspectRatioOutlinedIcon,
    href: "/wow-pizza/orders",
  },
  {
    title: "Ready to Pickup",
    icon: DeliveryDiningIcon,
    href: "/wow-pizza/delivery",
  },
  {
    title: "In Delivery",
    icon: DeliveryDiningIcon,
    href: "/wow-pizza/out-for-delivery",
  },
  {
    title: "Inventory",
    icon: InventoryIcon,
    href: "/wow-pizza/inventory",
  },
  {
    title: "User Profile",
    icon: DeliveryDiningIcon,
    href: "/wow-pizza/profile"
  }
] : UserSession.isDeliveryMan() ? [
  {
    title: "Ready to Pickup",
    icon: DeliveryDiningIcon,
    href: "/wow-pizza/delivery",
  },
  {
    title: "In Delivery",
    icon: DeliveryDiningIcon,
    href: "/wow-pizza/out-for-delivery",
  }
] : [
  {
    title: "Food Items",
    icon: FastfoodIcon,
    href: "/wow-pizza/food-items",
  },
  {
    title: "Cart",
    icon: ShoppingCartSharpIcon,
    href: "/wow-pizza/cart",
  },
  {
    title: "Orders",
    icon: AspectRatioOutlinedIcon,
    href: "/wow-pizza/orders",
  }
]

export default Menuitems;
