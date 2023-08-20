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
    title: "Delivery Orders",
    icon: DeliveryDiningIcon,
    href: "/wow-pizza/delivery",
  },
  {
    title: "Out For Delivery",
    icon: DeliveryDiningIcon,
    href: "/wow-pizza/out-for-delivery",
  },
  {
    title: "Inventory",
    icon: InventoryIcon,
    href: "/wow-pizza/inventory",
  },
  // {
  //   title: "Checkbox",
  //   icon: AssignmentTurnedInOutlinedIcon,
  //   href: "/form-elements/checkbox",
  // },
  // {
  //   title: "Radio",
  //   icon: AlbumOutlinedIcon,
  //   href: "/form-elements/radio",
  // },
  // {
  //   title: "Slider",
  //   icon: SwitchCameraOutlinedIcon,
  //   href: "/form-elements/slider",
  // },
  // {
  //   title: "Switch",
  //   icon: SwitchLeftOutlinedIcon,
  //   href: "/form-elements/switch",
  // },
  // {
  //   title: "Form",
  //   icon: DescriptionOutlinedIcon,
  //   href: "/form-layouts/form-layouts",
  // },
  // {
  //   title: "Table",
  //   icon: AutoAwesomeMosaicOutlinedIcon,
  //   href: "/tables/basic-table",
  // },
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
