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
import AllCarts from '../AllCarts/AllCarts'
import Banner from '../Banner'
import FeaturesPage from '../FeaturesPage/FeaturesPage'
import './HomePage.css' // Import the CSS file for styling
import OurVision from '../OurVision/OurVision'
import { keyframes } from '@emotion/react';
import NewBanner from '../../NewBanner'
import AllProducts from '../AllProdutcs/AllProducts'
import CategoryPage from '../../Helpers/CategoryPage'
import BestCategoriesSlider from '../../Helpers/BestCategoriesSlider'
import CategoryDetailsPages from '../../Helpers/CategoryDetailsPages'
import BestChoices from '../BestChoice/BestChoice'
import SimilarProductsPage from '../SimilarProduct/SimilarProductPage'
import OurMostPopularProduct from '../MostPopularProduct/OurMostPopularProduct'
import TrendingProductsPage from '../TrendingProducts/TrendingProducts'
import BrandedProducts from '../BrandedProduct/BrandedProduct'
import NewArrival from '../NewArrival/NewArrival'
import BandOfTrust from '../BandOfTrust'
import ImageCarousel from '../ImageCoursal'
import CategoriesMenu from '../../Helpers/CategoriesMenu'
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
    <CategoriesMenu/>
      <Container maxWidth='xl' style={{ display: 'flex', justifyContent: "center", padding: 0, flexDirection: "column", marginBottom: 8 }}>
        <Box padding={1}>
          <Carousel />
        </Box>
      </Container>
      <hr className="section-divider" style={{ marginTop: "10px" }} />
      <Container
      style={{
        marginTop: 0,
        display: "flex",
        justifyContent: "center",
      }}
    >
    <Typography
    variant="h5"
    sx={{
      textAlign: "center",
      color: "#1976d2",
      fontWeight: "bold",
      fontSize: "1.5rem", // Reduced size
      animation: `${jumpAnimation} 1s ease-out`, // Animation added
      boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.3)", // Corrected box shadow syntax
      padding: "10px", // Added padding to create space around the text
      borderRadius: "20px", // Optional: if you want the text box to have rounded corners too
      backgroundColor: "#f5f5f5", // Added background color
    }}
  >
          SHOP BY CATEGORIES
        </Typography>
      </Container>
      <BestCategoriesSlider/>
      <hr className="section-divider" style={{ marginBottom: "4px" }} />
      <Banner />
      <hr className="section-divider" style={{ marginTop: "10px" }} />
      <OurMostPopularProduct/>
      <hr className="section-divider" style={{ marginBottom: "20px" }} />
      <ImageCarousel/>
      <hr className="section-divider" style={{ marginTop: "20px" }} />
      <TrendingProductsPage/>
      <hr className="section-divider" />
      <BrandedProducts/>
      <hr className="section-divider" />
      <NewArrival/>
      <hr className="section-divider" />










      <Container
      style={{
        marginTop: 0,
        display: "flex",
        justifyContent: "center",
      }}
    >
    <Typography
    variant="h3"
    sx={{
      textAlign: "center",
      color: "#1976d2",
      fontWeight: "bold",
      fontSize: "2rem", // Reduced size
      animation: `${jumpAnimation} 1s ease-out`, // Animation added
      boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.3)", // Corrected box shadow syntax
      padding: "10px", // Added padding to create space around the text
      borderRadius: "20px", // Optional: if you want the text box to have rounded corners too
      backgroundColor: "#f5f5f5", // Added background color
    }}
  >
          Our Services
        </Typography>
      </Container>
      <FeaturesPage />
      <hr className="section-divider" style={{ marginTop: "0px" }} />
      <CategoryDetailsPages/>
      <hr className="section-divider" />
      <BandOfTrust/>
      <hr className="section-divider" />

      <OurVision  style={{ marginTop: "0px", marginBottom: "90px" }} />
      <hr className="section-divider" style={{ marginTop: "10px", marginBottom: "20px" }} />

      <Footer />
      <hr className="section-divider" style={{ marginTop: "10px", marginBottom: "20px" }} />

    </>
  )
}

export default HomePage
