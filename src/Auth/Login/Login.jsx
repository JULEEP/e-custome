import './login.css';
import { Avatar, Button, CssBaseline, Grid, InputAdornment, TextField, Typography } from '@mui/material';  // Import InputAdornment here
import { Box, Container } from '@mui/system';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { MdLockOutline } from 'react-icons/md';
import { RiEyeFill, RiEyeOffFill } from 'react-icons/ri';

const Login = () => {
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleOnChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    const auth = localStorage.getItem('Authorization');
    if (auth) {
      navigate('/');
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { email, password } = credentials;
      const response = await axios.post('https://custom-shop-1.onrender.com//api/users/login', { email, password });
      const { token, refreshToken } = response.data;

      if (token) {
        toast.success('Login Successfully', { autoClose: 500, theme: 'colored' });
        localStorage.setItem('Authorization', token); // Store the access token
        navigate('/');
      } else {
        toast.error('Something went wrong, Please try again', { autoClose: 500, theme: 'colored' });
      }
    } catch (error) {
      if (error.response && error.response.data) {
        const errorMessage = error.response.data.error || 'Something went wrong';
        toast.error(errorMessage, { autoClose: 500, theme: 'colored' });
      } else {
        toast.error('Network Error', { autoClose: 500, theme: 'colored' });
      }
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
            value={credentials.email}
            name="email"
            onChange={handleOnChange}
            autoComplete="email"
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            value={credentials.password}
            name="password"
            onChange={handleOnChange}
            label="Password"
            type={showPassword ? 'text' : 'password'}
            id="password"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end" onClick={handleClickShowPassword} sx={{ cursor: 'pointer' }}>
                  {showPassword ? <RiEyeFill /> : <RiEyeOffFill />}
                </InputAdornment>
              ),
            }}
            autoComplete="current-password"
          />
          <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link to="/forgotpassword" variant="body2" style={{ color: '#1976d2' }}>
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link to="/register" variant="body2">
                Don't have an account? <span style={{ color: '#1976d2' }}>Sign Up</span>
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};

export default Login;
