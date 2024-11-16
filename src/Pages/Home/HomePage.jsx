import React, { useEffect } from 'react'
import axios from 'axios'
import { Container, Typography } from '@mui/material'
import { Box } from '@mui/system'
import { useContext } from 'react'
import { ContextFunction } from '../../Context/Context'
import CategoryCard from '../../Components/Category_Card/CategoryCard'
import BannerData from '../../Helpers/HomePageBanner'
import Carousel from '../../Components/Carousel/Carousel'
import Footer from '../../Components/Footer/Footer'
import BestSellers from '../BestSellerProducts/BestSellerProducts'
import Banner from '../Banner'
import FeaturesPage from '../FeaturesPage/FeaturesPage'
import './HomePage.css' // Import the CSS file for styling
import OurVision from '../OurVision/OurVision'
import { keyframes } from '@emotion/react';

const jumpAnimation = keyframes`
  0% {
    transform: translateY(500px); /* Start from below the container */
    opacity: 0;
  }
  50% {
    transform: translateY(-10px); /* Mid-jump position */
    opacity: 0.7;
  }
  100% {
    transform: translateY(0); /* Final position */
    opacity: 1;
  }
`;

const HomePage = () => {
    const { setCart } = useContext(ContextFunction)
    let authToken = localStorage.getItem('Authorization')
    
    useEffect(() => {
        getCart()
        window.scroll(0, 0)
    }, [])
    
    const getCart = async () => {
        if (authToken !== null) {
            const { data } = await axios.get(`${process.env.REACT_APP_GET_CART}`, {
                headers: {
                    'Authorization': authToken
                }
            })
            setCart(data)
        }
    }

    return (
        <>
            <Container maxWidth='xl' style={{ display: 'flex', justifyContent: "center", padding: 0, flexDirection: "column", marginBottom: 70 }}>
                <Box padding={1}>
                    <Carousel />
                </Box>
                <hr className="section-divider" />

                <Container style={{ marginTop: 0, display: "flex", justifyContent: 'center' }}>
                <Typography
                variant="h3"
                sx={{
                  textAlign: 'center',
                  color: '#1976d2',
                  fontWeight: 'bold',
                  fontSize: '2rem', // Reduced size
                  animation: `${jumpAnimation} 1s ease-out`, // Animation added
                  boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.3)', // Corrected box shadow syntax
                }}
              >
                  Top Categories
                </Typography>
              </Container>
        
              <Container
                maxWidth='xl'
                style={{
                  marginTop: 90,
                  display: "flex",
                  justifyContent: 'center',
                  flexGrow: 1,
                  flexWrap: 'wrap',
                  gap: 20
                }}
              >
                {BannerData.map((data) => (
                  <Box
                    key={data.img}
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      textAlign: 'center',
                      width: '150px',
                      marginBottom: '20px',
                    }}
                  >
                    <Box
                      style={{
                        width: '100px', // Set the width of the container
                        height: '100px', // Set the height of the container
                        borderRadius: '50%', // Make the container circular
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: '#f5f5f5', // Background color for better visibility
                        boxShadow: '0 4px 10px rgba(0, 123, 255, 0.5)', // Add a blue shadow
                        marginBottom: '10px',
                      }}
                    >
                      <img
                        src={data.img}
                        alt={data.name}
                        style={{
                          width: '80px', // Image width
                          height: '80px', // Image height
                          borderRadius: '50%', // Make the image circular
                          objectFit: 'cover', // Ensure the image fits within the circle
                        }}
                      />
                    </Box>
                    <Typography
                      variant='h6'
                      style={{
                        marginTop: '10px',
                        fontWeight: 'normal', // Removed bold font weight
                      }}
                    >
                      {data.name}
                    </Typography>
                  </Box>
                ))}
              </Container>
            </Container>
            <hr className="section-divider" />
            <Container style={{ marginTop: 0, display: "flex", justifyContent: 'center' }}>
            <Typography
            variant="h3"
            sx={{
              textAlign: 'center',
              color: '#1976d2',
              fontWeight: 'bold',
              fontSize: '2rem', // Reduced size
              animation: `${jumpAnimation} 1s ease-out`, // Animation added
              boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.3)', // Corrected box shadow syntax
            }}
          >
          Best Sellers
            </Typography>
          </Container>
            <BestSellers />
            <hr className="section-divider" />

            <Banner />
            <hr className="section-divider" />

            <Container style={{ marginTop: 0, display: "flex", justifyContent: 'center' }}>
            <Typography
            variant="h3"
            sx={{
              textAlign: 'center',
              color: '#1976d2',
              fontWeight: 'bold',
              fontSize: '2rem', // Reduced size
              animation: `${jumpAnimation} 1s ease-out`, // Animation added
              boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.3)', // Corrected box shadow syntax
            }}
          >
          Our Services
            </Typography>
          </Container>
            <FeaturesPage />
            <hr className="section-divider" />

            <OurVision />
            <hr className="section-divider" />

            <Footer />
        </>
    )
}

export default HomePage
