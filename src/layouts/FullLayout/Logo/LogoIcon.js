import React from "react";
import logoicn from "../../../assets/images/wow-pizza-logo.svg";
const LogoIcon = (props) => {
  return <img alt="Logo" src={logoicn} style={{ width: '200px', height: '200px' }} {...props} />;
};
export default LogoIcon;
