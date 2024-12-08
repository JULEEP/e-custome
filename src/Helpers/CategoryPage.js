import React from 'react';
import { Container, Typography, Box } from '@mui/material';
import { Link } from 'react-router-dom'; // Import Link for routing
import { Hoarding, Flier, Acrylic, Canvas, Bank, Bill, Cards } from '../Assets/Images/Image'; // Import images

const data = [
  {
    img: Hoarding,
    name: "Hoardings",
    slug: "hoardings",
    subcategories: [
      { name: "Large Hoardings", description: "Big billboard ads on highways" },
      { name: "Street Hoardings", description: "Smaller hoardings placed in cities" },
      { name: "LED Hoardings", description: "Digital hoardings with LED displays" },
    ]
  },
  {
    img: Flier,
    name: "Fliers",
    slug: "fliers",
    subcategories: [
      { name: "Event Fliers", description: "Fliers for events and promotions" },
      { name: "Business Fliers", description: "Fliers for business advertisement" },
      { name: "Promotional Fliers", description: "Fliers for special offers and discounts" },
    ]
  },
  {
    img: Canvas,
    name: "Canvas Printing",
    slug: "canvas-printing",
    subcategories: [
      { name: "Photo Canvas", description: "Canvas prints of personal photos" },
      { name: "Artwork Canvas", description: "Canvas printing for art reproductions" },
      { name: "Customized Canvas", description: "Personalized canvas for gifts and decoration" },
    ]
  },
  {
    img: Acrylic,
    name: "Acrylic Printing",
    slug: "acrylic-printing",
    subcategories: [
      { name: "Acrylic Signs", description: "Custom acrylic signage for businesses" },
      { name: "Acrylic Panels", description: "Acrylic panels used for artwork or decoration" },
      { name: "3D Acrylic Prints", description: "Acrylic prints with a 3D effect" },
    ]
  },
  {
    img: Bank,
    name: "Banks",
    slug: "banks",
    subcategories: [
      { name: "Bank Branch Banners", description: "Banners for physical bank branches" },
      { name: "ATM Stickers", description: "Stickers for ATM locations with bank branding" },
      { name: "Promotional Bank Flyers", description: "Flyers used to advertise bank services" },
    ]
  },
  {
    img: Bill,
    name: "Bill Books",
    slug: "bill-books",
    subcategories: [
      { name: "Customized Bill Books", description: "Customized bill books for businesses" },
      { name: "Carbonless Bill Books", description: "Carbonless bill book printing for easy record-keeping" },
      { name: "Multi-Page Bill Books", description: "Bill books with multiple copies for records" },
    ]
  },
  {
    img: Cards,
    name: "Cards",
    slug: "cards",
    subcategories: [
      { name: "Business Cards", description: "Professional cards for networking and branding" },
      { name: "Greeting Cards", description: "Custom cards for occasions like birthdays, holidays, etc." },
      { name: "Loyalty Cards", description: "Cards for customer loyalty programs" },
    ]
  },
];

const CategoryPage = () => {
  return (
    <Container maxWidth="lg" style={{ padding: '20px' }}>

      {/* Flexbox container for all categories */}
      <Box
        display="flex"
        flexWrap="wrap"
        justifyContent="space-evenly"
        gap={2}  // Add gap between the categories
        style={{ marginTop: '20px' }}
      >
        {data.map((category) => (
          <Box
            key={category.name}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',  // Center the content horizontally
              cursor: 'pointer',
              padding: '10px',
              backgroundColor: '#f5f5f5',
              borderRadius: '8px',
              width: '150px', // Fixed width for consistency
              marginBottom: '20px',
            }}
          >
            <Link
              to={`/category/${category.slug}`}
              style={{
                textDecoration: 'none',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                width: '100%',  // Ensure the link spans the full box width
              }}
            >
              <img
                src={category.img}
                alt={category.name}
                style={{
                  width: '70px',
                  height: '70px',
                  objectFit: 'cover',
                  borderRadius: '50%',
                  marginBottom: '10px',  // Space between image and name
                }}
              />
              <Typography variant="h6" style={{ fontWeight: 'bold' }}>
                {category.name}
              </Typography>
            </Link>
          </Box>
        ))}
      </Box>
    </Container>
  );
};

export default CategoryPage;
