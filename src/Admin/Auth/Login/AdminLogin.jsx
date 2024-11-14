import './login.css'
import { Avatar, Button, CssBaseline, TextField, Typography, Grid, InputAdornment } from '@mui/material'
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
      navigate("/admin/home");
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
      <Box sx={{
        marginTop: 8,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: '#f4f6f9',
        borderRadius: '8px',
        padding: '30px 25px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
      }}>
        <Avatar sx={{
          m: 1,
          bgcolor: '#1976d2',
          width: 60,
          height: 60,
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        }}>
          <MdLockOutline style={{ fontSize: '2.5rem', color: 'white' }} />
        </Avatar>
        <Typography component="h1" variant="h5" sx={{ fontWeight: 'bold', color: '#1976d2' }}>
          Admin Sign In
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 2 }}>
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
            sx={{ backgroundColor: 'white', borderRadius: '5px' }}
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
            sx={{ backgroundColor: 'white', borderRadius: '5px' }}
          />
          <Button type="submit" fullWidth variant="contained" sx={{
            mt: 3, mb: 2, backgroundColor: 'black', padding: '2px',
            borderRadius: '8px', fontSize: '16px', fontWeight: 'bold'
          }}>
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link to="/forgotpassword" style={{ color: '#1976d2', fontSize: '14px' }}>
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link to="/admin/register" variant="body2" style={{ fontSize: '14px' }}>
                Don't have an account? <span style={{ color: '#1976d2', fontWeight: 'bold' }}>Sign Up</span>
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};

export default AdminLogin;
