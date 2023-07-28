import React, { useState, useEffect } from "react";
import { Grid, Box, Typography, useMediaQuery } from "@mui/material";
import { SignUpForm, LoginForm, OtpForm } from "./fb-elements/index";
import LogoIcon from "../../layouts/FullLayout/Logo/LogoIcon";

const FormLayouts = ({ form }) => {
  const images = [
    "https://b.zmtcdn.com/data/dish_photos/65d/a819c99767aad4df7325195779aa165d.jpg",
    "https://b.zmtcdn.com/data/dish_photos/703/a674b016a42b22e26118719f45cb4703.jpg",
    "https://b.zmtcdn.com/data/dish_photos/72b/d5bc5b32dd177f5f207cad66556a572b.jpg",
    "https://b.zmtcdn.com/data/dish_photos/e92/538dc8e697f161c9897e52eb675aee92.jpg",
  ];

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const changeImage = () => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    };

    const intervalId = setInterval(changeImage, 7000);

    return () => clearInterval(intervalId);
  }, [images]);

  return (
    <Grid container spacing={0} justifyContent="center" sx={{ minHeight: "100vh" }}>
      <Grid item lg={4} md={6} xs={12} sx={{ textAlign: "center", marginTop: "50px" }}>
        <Box sx={{ display: "flex", alignItems: "center", mb: 3 , mt:-4}}>
          <LogoIcon height={"230px"} width={"700px"}/>
        </Box>
        {form === "signup" && <SignUpForm />}
        {form === "login" && <LoginForm />}
        {form === "otp" && <OtpForm />}
      </Grid>

      <Grid item lg={8} md={6} xs={12}>
        <Box
          sx={{
            backgroundImage: `url(${images[currentImageIndex]})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            height: "calc(100vh - 100px)", // Adjust the height here to leave space for the logo and margin
            borderRadius: "20px",
            transition: "background-image 1s ease-in-out",
          }}
        />
      </Grid>
    </Grid>
  );
};

export default FormLayouts;
