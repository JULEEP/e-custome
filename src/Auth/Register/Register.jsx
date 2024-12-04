import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { Avatar, Button, InputAdornment, Grid, TextField, Typography, CssBaseline, Box, Container } from '@mui/material';
import { MdLockOutline } from 'react-icons/md';
import { RiEyeFill, RiEyeOffFill } from 'react-icons/ri';
import { toast } from 'react-toastify';
import '../Login/login.css'; // Import your CSS

const Register = () => {
  const [credentials, setCredentials] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  // Toggle password visibility
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  // Handle input changes
  const handleOnChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  // Form submission handler
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Regex validation for email and phone
    const phoneRegex = /^(?:(?:\+|0{0,2})91(\s*[\-]\s*)?|[0]?)?[789]\d{9}$/gm;
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    try {
      // Validation checks
      if (!credentials.email || !credentials.firstName || !credentials.password || !credentials.phoneNumber || !credentials.lastName) {
        toast.error('All fields are required', { autoClose: 500, theme: 'colored' });
      } else if (credentials.firstName.length < 1 || credentials.lastName.length < 1) {
        toast.error('Please enter valid name', { autoClose: 500, theme: 'colored' });
      } else if (!emailRegex.test(credentials.email)) {
        toast.error('Please enter a valid email', { autoClose: 500, theme: 'colored' });
      } else if (!phoneRegex.test(credentials.phoneNumber)) {
        toast.error('Please enter a valid phone number', { autoClose: 500, theme: 'colored' });
      } else if (credentials.password.length < 5) {
        toast.error('Please enter a password with more than 5 characters', { autoClose: 500, theme: 'colored' });
      } else {
        // Send the registration request to the backend
        const sendAuth = await axios.post('https://custom-shop-1.onrender.com/api/users/register', {
          firstName: credentials.firstName,
          lastName: credentials.lastName,
          email: credentials.email,
          phoneNumber: credentials.phoneNumber,
          password: credentials.password,
        });

        const { data } = sendAuth;
        if (data.success === true) {
          toast.success('Registered Successfully', { autoClose: 500, theme: 'colored' });
          localStorage.setItem('Authorization', data.token); // Store the auth token in local storage
          navigate('/dashboard'); // Redirect to dashboard after successful registration
        } else {
          toast.error('Something went wrong, Please try again', { autoClose: 500, theme: 'colored' });
          navigate('/'); // If there's an error, redirect to the homepage
        }
      }
    } catch (error) {
      toast.error(error.response?.data?.error || 'An error occurred', { autoClose: 500, theme: 'colored' });
    }
  };

  return (
    <Container component="main" maxWidth="lg" sx={{ marginTop: 8 }}>
      <CssBaseline />
      <Grid container spacing={4} justifyContent="center" alignItems="center">
        {/* Left side: Form */}
        <Grid item xs={12} md={6}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              border: '1px solid #ddd',
              borderRadius: '8px',
              padding: '20px',
              backgroundColor: 'white', // White background for the form
              boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.1)', // Subtle shadow for depth
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: '#1976d2' }}>
              <MdLockOutline />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign up
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    autoComplete="given-name"
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
                    autoComplete="family-name"
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
                    autoComplete="email"
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
                    inputMode="numeric"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="password"
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
                    value={credentials.password}
                    onChange={handleOnChange}
                    autoComplete="new-password"
                  />
                </Grid>
              </Grid>
              <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                Sign Up
              </Button>
              <Grid container justifyContent="flex-end">
                <Grid item>
                  Already have an account?{' '}
                  <Link to="/login" style={{ color: '#1976d2', marginLeft: 3 }}>
                    Sign in
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Grid>

        {/* Right side: Image */}
        <Grid item xs={12} md={6} sx={{ display: { xs: 'none', md: 'block' } }}>
          <img
            src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp"
            alt="Signup Illustration"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              borderRadius: '8px', // Rounded corners for the image
            }}
          />
        </Grid>
      </Grid>
    </Container>
  );
};

export default Register;
