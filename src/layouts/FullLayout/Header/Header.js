import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import AddToPhotosOutlinedIcon from '@mui/icons-material/AddToPhotosOutlined';
import PersonAddOutlinedIcon from '@mui/icons-material/PersonAddOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';


import { useAppSelector, useAppDispatch } from '../../../hooks/redux-hooks'
import { fetchUserInformation } from "../../../redux/actions/auth";
import { getDatabase, ref, onValue, orderByChild, orderByValue, limitToLast, query } from 'firebase/database';
import { getFirestore, doc, onSnapshot, collection } from 'firebase/firestore';
import sound from './sound.wav'

import { useFirebase } from "../../../FirebaseService";


import {
  AppBar,
  Box,
  IconButton,
  Toolbar,
  Menu,
  MenuItem,
  Button,
  Avatar,
  Divider,
  ListItemIcon,
} from "@mui/material";


const Header = (props) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch()
  const audioElement = new Audio(sound);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const authReducerState = useAppSelector(state => state.authReducer)
  const [userInfo, setUserInfo] = useState({})
  const [newDocData, setNewDocData] = useState({})
  const [lastOrderReceived, setLastOrderReceived] = useState(false)


  const firebaseApp = useFirebase();
  const firestore = getFirestore(firebaseApp);
  const database = getDatabase(firebaseApp);
  const collectionRef = collection(firestore, 'Orders');
  const recentPostsRef = query(ref(database, 'Orders'), limitToLast(1));

  useEffect(() => {
    dispatch(fetchUserInformation())
    if (!isMobileDevice()) {
      requestPushNotificationPermission()
    }
  }, [])

  function requestPushNotificationPermission() {
    Notification.requestPermission().then((permission) => {
      if (permission === 'granted') {
        console.log('Push notification permission granted');
      } else {
        console.warn('Push notification permission denied');
      }
    });
  }

  function isMobileDevice() {
    const mobileKeywords = ["Android", "iPhone", "iPad", "Windows Phone", "webOS", "iPod", "BlackBerry"];
    return mobileKeywords.some(keyword => navigator.userAgent.includes(keyword));
  }


  useEffect(() => {
    console.log("=====>> ", isMobileDevice())
    let isFirstOrder = true;

    const unsubscribe = onValue(recentPostsRef, (snapshot) => {
      const data = snapshot.val();
      if (isFirstOrder) {
        isFirstOrder = false;
      } else {
        console.log('New Order Placed:', data[Object.keys(data)[0]]);
        setNewDocData(data[Object.keys(data)[0]]);
        if (!lastOrderReceived) {
          setLastOrderReceived(true);
        }
      }
    });

    return () => {
      unsubscribe();
    }
  }, []);

  useEffect(() => {
    if (lastOrderReceived && (!isMobileDevice())) {
      if ('Notification' in window) {
        Notification.requestPermission().then((permission) => {
          if (permission === 'granted') {
            const notification = new Notification('New Order Received', {
              body: newDocData.msg,
            });

            notification.onclick = () => {
              navigate("/wow-pizza/orders")
            };
          } else {
            console.warn('Push notification permission denied');
          }
        });
      }
    }

  }, [newDocData]);





  useEffect(() => {
    setUserInfo(authReducerState.userInfo)
  }, [authReducerState.userInfo])

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  // 4
  const [anchorEl4, setAnchorEl4] = React.useState(null);

  const handleClick4 = (event) => {
    setAnchorEl4(event.currentTarget);
  };

  const handleClose4 = () => {
    setAnchorEl4(null);
  };

  // 5
  const [anchorEl5, setAnchorEl5] = React.useState(null);

  const handleClick5 = (event) => {
    setAnchorEl5(event.currentTarget);
  };

  const handleClose5 = () => {
    setAnchorEl5(null);
  };



  const handleLogout = () => {
    localStorage.removeItem("user")
    navigate("/wow-pizza/login")
  }

  return (
    <AppBar sx={props.sx} elevation={0} className={props.customClass}>
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="menu"
          onClick={props.toggleMobileSidebar}
          sx={{
            display: {
              lg: "none",
              xs: "inline",
            },
          }}
        >
          <MenuOutlinedIcon width="20" height="20" />
        </IconButton>
        Last Login:  {userInfo.last_login_time}
        <Box flexGrow={1} />
        <IconButton
          aria-label="menu"
          color="inherit"
          aria-controls="notification-menu"
          aria-haspopup="true"
          onClick={handleClick}
        >
          <NotificationsNoneOutlinedIcon width="20" height="20" />
        </IconButton>
        <Menu
          id="notification-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
          anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
          transformOrigin={{ horizontal: "right", vertical: "top" }}
          sx={{
            "& .MuiMenu-paper": {
              width: "200px",
              right: 0,
              top: "70px !important",
            },
          }}
        >
          {/* <MenuItem onClick={handleClose}>Action</MenuItem>
          <MenuItem onClick={handleClose}>Action Else</MenuItem>
          <MenuItem onClick={handleClose}>Another Action</MenuItem> */}
        </Menu>
        Hi, {userInfo.first_name}
        <Box
          sx={{
            width: "1px",
            backgroundColor: "rgba(0,0,0,0.1)",
            height: "25px",
            ml: 1,
          }}
        ></Box>
        <Button
          aria-label="menu"
          color="inherit"
          aria-controls="profile-menu"
          aria-haspopup="true"
          onClick={handleClick4}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <Avatar
              // src={userimg}
              // alt={userimg}
              sx={{
                width: "30px",
                height: "30px",
              }}
            />
          </Box>
        </Button>
        <Menu
          id="profile-menu"
          anchorEl={anchorEl4}
          keepMounted
          open={Boolean(anchorEl4)}
          onClose={handleClose4}
          anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
          transformOrigin={{ horizontal: "right", vertical: "top" }}
          sx={{
            "& .MuiMenu-paper": {
              width: "250px",
              right: 0,
              top: "70px !important",
            },
          }}
        >
          {/* <MenuItem onClick={handleClose4}>
            <Avatar
              sx={{
                width: "35px",
                height: "35px",
              }}
            />
            <Box
              sx={{
                ml: 2,
              }}
            >
              My account
            </Box>
          </MenuItem> */}
          {/* <Divider /> */}
          {/* <MenuItem onClick={handleClose4}>
            <ListItemIcon>
              <PersonAddOutlinedIcon fontSize="small" />
            </ListItemIcon>
            Add another account
          </MenuItem> */}
          {/* <MenuItem onClick={handleClose4}>
            <ListItemIcon>
              <SettingsOutlinedIcon fontSize="small" />
            </ListItemIcon>
            Settings
          </MenuItem> */}
          <MenuItem onClick={handleLogout}>
            <ListItemIcon>
              <LogoutOutlinedIcon fontSize="small" />
            </ListItemIcon>
            Logout
          </MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
