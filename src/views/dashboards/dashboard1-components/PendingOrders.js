import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Box,
  Menu,
  MenuItem,
  IconButton,
} from "@mui/material";

import MoreVertOutlinedIcon from '@mui/icons-material/MoreVertOutlined';


import DeliveryDiningIcon from '@mui/icons-material/DeliveryDining';
import LocalFireDepartmentRoundedIcon from '@mui/icons-material/LocalFireDepartmentRounded';
import DoneIcon from '@mui/icons-material/Done';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import CancelIcon from '@mui/icons-material/Cancel';
import TaskIcon from '@mui/icons-material/Task';


import Timeline from "@mui/lab/Timeline";
import TimelineItem from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineDot from "@mui/lab/TimelineDot";
import TimelineOppositeContent from "@mui/lab/TimelineOppositeContent";

const options = ["Action", "Another Action", "Something else here"];

const iconMap = {
  placed: <TaskIcon />,
  cancelByCustomer: <CancelIcon />,
  inKitchen: <LocalFireDepartmentRoundedIcon />,
  prepared: <DoneIcon />,
  inDelivery: <DeliveryDiningIcon />,
  allDone: <DoneAllIcon />,
  cancelByStore: <CancelOutlinedIcon />
};


const PendingOrders = ({ orders, maxMinHeight }) => {


  const timeFormatter = (dateTimeString) => {
    const dateParts = dateTimeString.split(' ');
    const timeParts = dateParts[4].split(':');
    const hours = parseInt(timeParts[0], 10);
    const minutes = parseInt(timeParts[1], 10);
    const amOrPm = hours >= 12 ? 'PM' : 'AM';
    const formattedHours = (hours % 12) || 12;
  
    return `${formattedHours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')} ${amOrPm}`;
  };

  const generateOrderSummaryText = (items) => {
    return items.map((item) => `${item.count}x ${item.size} ${item.item_name}`).join(', ');
  };


  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <Card
      variant="outlined"
      sx={{
        pb: 0,
      }}
    >
      <CardContent
        sx={{
          pb: "0 !important",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "flex-start",
            mb: 5,
          }}
        >
          <Box>
            <Typography
              sx={{
                fontWeight: "500",
                fontSize: "h3.fontSize",
                marginBottom: "0",
              }}
              gutterBottom
            >
              Pending Orders
            </Typography>
            {/* <Typography
              color="textSecondary"
              variant="body1"
              sx={{
                fontWeight: "400",
                fontSize: "13px",
              }}
            >
              Overview of Years
            </Typography> */}
          </Box>
          {/* <Box
            sx={{
              marginLeft: "auto",
            }}
          >
            <IconButton
              aria-expanded={open ? "true" : undefined}
              aria-haspopup="true"
              onClick={handleClick}
            >
              <MoreVertOutlinedIcon />
            </IconButton>
            <Menu
              id="long-menu"
              MenuListProps={{
                "aria-labelledby": "long-button",
              }}
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "right",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
            >
              {options.map((option) => (
                <MenuItem
                  key={option}
                  selected={option === "Pyxis"}
                  onClick={handleClose}
                >
                  {option}
                </MenuItem>
              ))}
            </Menu>
          </Box> */}
        </Box>
        <Timeline
          sx={{
            p: 0,
            minHeight: maxMinHeight ? maxMinHeight[0] : 580,
            maxHeight: maxMinHeight ? maxMinHeight[1] : 580,
            overflowY: "auto",
          }}
        >
          {orders.map((order) => (
            <TimelineItem key={order.placed_at}>
              <TimelineOppositeContent
                sx={{
                  fontSize: "12px",
                  fontWeight: "700",
                  flex: "0",
                }}
              >
                {timeFormatter(order.placed_at)}
              </TimelineOppositeContent>
              <TimelineSeparator>
                {/* <TimelineDot
                  variant="outlined"
                  sx={{
                    borderColor: order.status,
                  }}
                /> */}
                {iconMap[order.status]}
                <TimelineConnector />
              </TimelineSeparator>
              <TimelineContent
                color="text.secondary"
                sx={{
                  fontSize: "14px",
                }}
              >
                <Typography variant="body2" component="div">
                  {generateOrderSummaryText(order.items)}
                </Typography>
                <Typography variant="body2" component="div">
                  <Typography variant="body2" sx={{ fontWeight: "bold", display: "inline" }}>
                    Type:
                  </Typography>{" "}
                  {order.order_type}
                </Typography>
                <Typography variant="body2" component="div">
                  <Typography variant="body2" sx={{ fontWeight: "bold", display: "inline" }}>
                    Note:
                  </Typography>{" "}
                  {order.order_note}
                </Typography>
              </TimelineContent>
            </TimelineItem>
          ))}
        </Timeline>
      </CardContent>
    </Card>
  );
};

export default PendingOrders;
