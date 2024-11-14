import '../Login/login.css'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import { Avatar, Button, CssBaseline, Grid, TextField, Typography } from '@mui/material'
import { MdLockOutline } from 'react-icons/md'
import { Box, Container } from '@mui/system'
import { toast } from 'react-toastify'

const AdminRegister = () => {
  const [credentials, setCredentials] = useState({ firstName: "", lastName: "", email: "", phoneNumber: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const navigate = useNavigate();

  const handleOnChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    const auth = localStorage.getItem('Authorization');
    if (auth) {
      navigate("/admin/home");  // Adjust as needed
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const sendAuth = await axios.post(`https://custom-shop-1.onrender.com//api/admin/admin-register`, {
        firstName: credentials.firstName,
        lastName: credentials.lastName,
        email: credentials.email,
        phoneNumber: credentials.phoneNumber,
        password: credentials.password,
      });
      const receive = sendAuth.data;
      if (receive.status === "success") {
        toast.success("Registered Successfully", { autoClose: 500, theme: 'colored' });
        localStorage.setItem('Authorization', receive.authToken);
        navigate('/admin/home');
      } else {
        toast.error(receive.message || "Invalid Credentials", { autoClose: 500, theme: 'colored' });
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Registration failed", { autoClose: 500, theme: 'colored' });
    }
  };
  
  return (
    <Container component="main" maxWidth="xs" sx={{ marginBottom: 10 }}>
      <CssBaseline />
      <Box sx={{ marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Avatar sx={{ m: 1, bgcolor: '#1976d2' }}>
          <MdLockOutline />
        </Avatar>
        <Typography component="h1" variant="h5" sx={{ fontWeight: 'bold', color: '#1976d2' }}>
          Admin Sign up
        </Typography>
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                name="firstName"
                value={credentials.firstName}
                onChange={handleOnChange}
                required
                fullWidth
                id="firstName"
                label="First Name"
                autoFocus
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                value={credentials.lastName}
                onChange={handleOnChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                value={credentials.email}
                onChange={handleOnChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="phoneNumber"
                label="Contact Number"
                name="phoneNumber"
                value={credentials.phoneNumber}
                onChange={handleOnChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="password"
                label="Password"
                value={credentials.password}
                onChange={handleOnChange}
                type={showPassword ? "text" : "password"}
              />
            </Grid>
          </Grid>
          <Button type="submit" fullWidth variant="contained" sx={{
            mt: 3, mb: 2, backgroundColor: 'black', padding: '2px',
            borderRadius: '8px', fontSize: '16px', fontWeight: 'bold'
          }}>
            Sign Up
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              Already have an account?
              <Link to='/admin/login' style={{ color: '#1976d2', marginLeft: 3 }}>
                Sign in
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}

export default AdminRegister;
