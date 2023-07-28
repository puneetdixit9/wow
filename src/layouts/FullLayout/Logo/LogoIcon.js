import React from "react";
import logoicn from "../../../assets/images/wow-pizza-logo.svg";
const LogoIcon = ({height, width}) => {
  return <img alt="Logo" src={logoicn} style={{ width: width, height: height}} />;
};
export default LogoIcon;
