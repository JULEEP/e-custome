import React from 'react';
import { useParams } from 'react-router-dom'; // To get the category slug from the URL
import { Container, Typography, Box } from '@mui/material';
import { Link } from 'react-router-dom'; // Import Link for routing
import { Hoarding, Flier, Acrylic, Canvas, Bank, Bill, Cards } from '../Assets/Images/Image'; // Import images

const data = [
  {
    img: Hoarding,
    name: "Hoardings",
    slug: "hoardings",
    subcategories: [
      { name: "Large Hoardings" },
      { name: "Street Hoardings" },
      { name: "LED Hoardings" },
    ]
  },
  {
    img: Flier,
    name: "Fliers",
    slug: "fliers",
    subcategories: [
      { name: "Event Fliers" },
      { name: "Business Fliers" },
      { name: "Promotional Fliers" },
    ]
  },
  {
    img: Canvas,
    name: "Canvas Printing",
    slug: "canvas-printing",
    subcategories: [
      { name: "Photo Canvas" },
      { name: "Artwork Canvas" },
      { name: "Customized Canvas" },
    ]
  },
  {
    img: Acrylic,
    name: "Acrylic Printing",
    slug: "acrylic-printing",
    subcategories: [
      { name: "Acrylic Signs" },
      { name: "Acrylic Panels" },
      { name: "3D Acrylic Prints" },
    ]
  },
  {
    img: Bank,
    name: "Banks",
    slug: "banks",
    subcategories: [
      { name: "Bank Branch Banners" },
      { name: "ATM Stickers" },
      { name: "Promotional Bank Flyers" },
    ]
  },
  {
    img: Bill,
    name: "Bill Books",
    slug: "bill-books",
    subcategories: [
      { name: "Customized Bill Books" },
      { name: "Carbonless Bill Books" },
      { name: "Multi-Page Bill Books" },
    ]
  },
  {
    img: Cards,
    name: "Cards",
    slug: "cards",
    subcategories: [
      { name: "Business Cards" },
      { name: "Greeting Cards" },
      { name: "Loyalty Cards" },
    ]
  },
];

const CategoryDetailsPage = () => {
  const { slug } = useParams(); // Get category slug from URL

  // Find the category that matches the slug
  const category = data.find((item) => item.slug === slug);

  if (!category) {
    return <Typography variant="h6">Category not found.</Typography>;
  }

  return (
    <Container maxWidth="md" style={{ padding: '20px' }}>
      <Typography
        variant="h4"
        sx={{
          textAlign: 'center',
          color: '#1976d2',
          fontWeight: 'bold',
          fontSize: '2rem',
          marginBottom: '20px',
        }}
      >
        {category.name}
      </Typography>

      {/* Displaying Subcategories in a cart-like format */}
      <Box display="flex" flexWrap="wrap" justifyContent="space-evenly" gap={3}>
        {category.subcategories.map((subcategory) => (
          <Box
            key={subcategory.name}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              cursor: 'pointer',
              padding: '10px',
              backgroundColor: '#f5f5f5',
              borderRadius: '8px',
              width: '150px', // Fixed width for consistency
              marginBottom: '20px',
            }}
          >
            <Link
              to={`/subcategory/${subcategory.name}`} // Link to subcategory page (adjust path as needed)
              style={{
                textDecoration: 'none',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                width: '100%',
              }}
            >
              <Typography variant="h6" style={{ fontWeight: 'bold' }}>
                {subcategory.name}
              </Typography>
            </Link>
          </Box>
        ))}
      </Box>
    </Container>
  );
};

export default CategoryDetailsPage;
