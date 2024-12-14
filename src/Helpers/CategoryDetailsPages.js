import React from 'react';
import { Container, Typography, Box } from '@mui/material';
import Slider from 'react-slick';
import { Link } from 'react-router-dom';

// Image URLs for subcategories
const images = {
  "Large Hoardings": "https://static.vecteezy.com/system/resources/previews/000/126/063/original/hoarding-illustration-vector.jpg",
  "Street Hoardings": "https://th.bing.com/th/id/OIP.YuO16BVpR-MubSCSJVkdqAHaHa?rs=1&pid=ImgDetMain",
  "LED Hoardings": "https://img3.exportersindia.com/product_images/bc-full/dir_98/2924378/led-display-hoarding-1685672.jpg",
  "Event Fliers": "https://www.creativefabrica.com/wp-content/uploads/2023/07/20/Summer-Festival-Flyer-Template-Graphics-74990706-1.jpg",
  "Business Fliers": "https://cdn.dribbble.com/users/2712190/screenshots/17569335/tawkahluxuriesflier1.jpeg",
  "Promotional Fliers": "https://mir-s3-cdn-cf.behance.net/project_modules/fs/7e55a922199233.5630e4f0633b4.jpg",
  "Photo Canvas": "https://static.vecteezy.com/system/resources/previews/025/901/436/original/blank-wooden-brown-canvas-painting-cartoon-flat-style-free-vector.jpg",
  "Artwork Canvas": "https://static.vecteezy.com/system/resources/previews/025/901/436/original/blank-wooden-brown-canvas-painting-cartoon-flat-style-free-vector.jpg",
  "Customized Canvas": "https://static.vecteezy.com/system/resources/previews/025/901/436/original/blank-wooden-brown-canvas-painting-cartoon-flat-style-free-vector.jpg",
  "Acrylic Signs": "https://i.etsystatic.com/34919911/r/il/11185c/4511024978/il_1080xN.4511024978_sjes.jpg",
  "Acrylic Panels": "https://4.imimg.com/data4/BU/NQ/MY-15443455/acrylic-panel-1000x1000.jpg",
  "3D Acrylic Prints": "https://i.pinimg.com/originals/4b/d8/9f/4bd89fccd64e21511a880f7aacfd17d5.jpg",
  "Customized Bill Books": "https://www.printingthestuff.ca/wp-content/uploads/2013/07/51.png",
  "Carbonless Bill Books": "https://th.bing.com/th/id/OIP.wgpWoSFRN7Rt3oDgeDxrkAHaHa?rs=1&pid=ImgDetMain",
  "Multi-Page Bill Books": "https://1.bp.blogspot.com/-x_7enmwMxE8/YKlAYVq9SxI/AAAAAAAAAuw/T0nLZjkBgUUL1m3378cn_uqPDbW9eNapQCLcBGAsYHQ/s2048/Bill-book-triplicate2.jpg",
  "Business Cards": "https://graphicburger.com/wp-content/uploads/2013/04/Realistic-Business-Card-Mock-Up-full.jpg",
  "Greeting Cards": "https://www.dayspring.com/media/catalog/category/J4525_COB.jpg",
  "Loyalty Cards": "https://static.vecteezy.com/system/resources/previews/009/102/463/original/green-loyalty-card-design-gift-card-design-free-vector.jpg"
};

// Data: Subcategories grouped into categories
const subcategories = {
  hoardings: ["Large Hoardings", "Street Hoardings", "LED Hoardings"],
  fliers: ["Event Fliers", "Business Fliers", "Promotional Fliers"],
  canvasPrinting: ["Photo Canvas", "Artwork Canvas", "Customized Canvas"],
  acrylicPrinting: ["Acrylic Signs", "Acrylic Panels", "3D Acrylic Prints"],
  billBooks: ["Customized Bill Books", "Carbonless Bill Books", "Multi-Page Bill Books"],
  cards: ["Business Cards", "Greeting Cards", "Loyalty Cards"]
};

const CategoryDetailsPages = () => {
  // Carousel settings
  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false,
    responsive: [
      { breakpoint: 1200, settings: { slidesToShow: 4 } },
      { breakpoint: 900, settings: { slidesToShow: 3 } },
      { breakpoint: 600, settings: { slidesToShow: 3 } },
      { breakpoint: 480, settings: { slidesToShow: 3 } },
    ],
  };

  // Function to map subcategory to its appropriate URL path
  const getCategoryPath = (subcategory) => {
    if (subcategories.hoardings.includes(subcategory)) {
      return "/category/hoardings";
    } else if (subcategories.fliers.includes(subcategory)) {
      return "/category/fliers";
    } else if (subcategories.canvasPrinting.includes(subcategory)) {
      return "/category/canvas-printing";
    } else if (subcategories.acrylicPrinting.includes(subcategory)) {
      return "/category/acrylic-printing";
    } else if (subcategories.billBooks.includes(subcategory)) {
      return "/category/bill-books";
    } else if (subcategories.cards.includes(subcategory)) {
      return "/category/cards";
    }
    return "/";
  };

  return (
    <Container maxWidth="xl" style={{ padding: '20px', backgroundColor: '#d6c2a1' }}>
      {/* Centered heading */}
      <Typography
        variant="h5"
        style={{
          textAlign: 'center',
          fontWeight: 'bold',
          marginBottom: '20px',
          marginLeft: "60px",
          color: '#333',
        }}
      >
      SUBCATEGORIES
      </Typography>

      {/* Slider to loop through subcategories */}
      <Slider {...settings}>
        {Object.values(subcategories).flat().map((subcategory) => (
          <Link
            key={subcategory}
            to={getCategoryPath(subcategory)}
            style={{ textDecoration: 'none' }}
          >
            <Box
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                padding: '10px',
                backgroundColor: '#f5f5f5',
                borderRadius: '8px',
                boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
                textAlign: 'center',
                width: '100%',
                maxWidth: '150px',
              }}
            >
              {/* Display the image */}
              <Box
                style={{
                  width: '100px',
                  height: '100px',
                  backgroundImage: `url(${images[subcategory]})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  borderRadius: '8px',
                  marginBottom: '10px',
                }}
              ></Box>

              {/* Display subcategory name */}
              <Typography
                variant="h6"
                style={{
                  fontWeight: 'bold',
                  fontSize: '14px',
                  color: 'black',
                }}
              >
                {subcategory}
              </Typography>
            </Box>
          </Link>
        ))}
      </Slider>
    </Container>
  );
};

export default CategoryDetailsPages;
