import './login.css'
import { Avatar, Button, Checkbox, CssBaseline, FormControlLabel, Grid, InputAdornment, TextField, Typography } from '@mui/material'
import { Box, Container } from '@mui/system'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { MdLockOutline } from 'react-icons/md'
import { RiEyeFill, RiEyeOffFill } from 'react-icons/ri';

const AdminLogin = () => {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword(!showPassword);

  const navigate = useNavigate();

  const handleOnChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    const auth = localStorage.getItem('Authorization');
    if (auth) {
      navigate("/");
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    try {
      if (!credentials.email || !credentials.password) {
        toast.error("All fields are required", { autoClose: 500, theme: 'colored' });
      } else if (!emailRegex.test(credentials.email)) {
        toast.error("Please enter a valid email", { autoClose: 500, theme: 'colored' });
      } else if (credentials.password.length < 5) {
        toast.error("Password must be at least 5 characters", { autoClose: 500, theme: 'colored' });
      } else {
        const response = await axios.post(`https://custom-shop-1.onrender.com/admin/admin-login`, {
          email: credentials.email,
          password: credentials.password,
        });
        const data = response.data;
        if (data.success) {
          toast.success("Login Successfully", { autoClose: 500, theme: 'colored' });
          localStorage.setItem('Authorization', data.authToken);
          navigate('/admin/home');
        } else {
          toast.error("Invalid Credentials", { autoClose: 500, theme: 'colored' });
        }
      }
    } catch (error) {
      toast.error("Invalid Credentials", { autoClose: 500, theme: 'colored' });
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box sx={{ marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Avatar sx={{ m: 1, bgcolor: '#1976d2' }}>
          <MdLockOutline />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            value={credentials.email}
            onChange={handleOnChange}
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type={showPassword ? "text" : "password"}
            id="password"
            value={credentials.password}
            onChange={handleOnChange}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end" onClick={handleClickShowPassword} sx={{ cursor: 'pointer' }}>
                  {showPassword ? <RiEyeFill /> : <RiEyeOffFill />}
                </InputAdornment>
              ),
            }}
          />
          <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link to="/forgotpassword" style={{ color: '#1976d2' }}>
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link to="/admin/register" variant="body2">
                Don't have an account?<span style={{ color: '#1976d2' }}> Sign Up</span>
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};

export default AdminLogin;
