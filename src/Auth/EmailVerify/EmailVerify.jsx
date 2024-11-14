import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  Avatar,
  Button,
  CssBaseline,
  Typography,
  Box,
  Container,
  Grid,
} from "@mui/material";
import { MdLockOutline } from "react-icons/md";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import './emailVerify.css';

const VerifyEmail = () => {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const navigate = useNavigate(); // Initialize navigate hook

  const handleChange = (e, index) => {
    let newOtp = [...otp];
    newOtp[index] = e.target.value.slice(0, 1);
    setOtp(newOtp);

    if (e.target.value && index < otp.length - 1) {
      document.getElementById(`otp-input-${index + 1}`).focus();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (otp.join("") === "") {
      toast.error("Please enter the OTP.");
      return;
    }

    try {
      const response = await fetch(
        "https://custom-shop-1.onrender.com/api/users/verify-otp",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ otp: otp.join("") }),
        }
      );
      const data = await response.json();

      if (response.ok) {
        toast.success("User verification successful.");
        navigate("/"); // Redirect to home page after successful verification
      } else {
        toast.error(data.error || "Invalid OTP. Please try again.");
      }
    } catch (error) {
      console.error("Error during verification:", error);
      toast.error("An error occurred. Please try again.");
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <ToastContainer />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "#1976d2" }}>
          <MdLockOutline />
        </Avatar>
        <Typography component="h1" variant="h5">
          Verify Email
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 5 }}>
          <Grid container spacing={1} justifyContent="center" className="otp-container">
            {otp.map((digit, index) => (
              <input
                key={index}
                type="text"
                maxLength="1"
                value={digit}
                onChange={(e) => handleChange(e, index)}
                id={`otp-input-${index}`}
                className="w-14 h-14 text-center text-xl font-semibold border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            ))}
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Verify
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default VerifyEmail;
