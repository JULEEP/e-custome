import React from 'react';
import { Container, Box } from '@mui/material';
import { Link } from 'react-router-dom';
import { Hoarding, Flier, Acrylic, Canvas, Bank, Bill, Cards, FlexPrint, OffsetPrint, TshirtPrint, PrintableReligiousCards, InvitationCard, PackagingPrinting, BagPrinting, Election, Advanture } from '../Assets/Images/Image'; // Import images

// Best categories data
const bestCategories = [
  {
    img: Hoarding,
    name: "Hoardings",
    slug: "hoardings", // This will be used in the link to display products
  },
  {
    img: Flier,
    name: "Fliers",
    slug: "fliers",
  },
  {
    img: Canvas,
    name: "Canvas Printing",
    slug: "canvas-printing",
  },
  {
    img: Acrylic,
    name: "Acrylic Printing",
    slug: "acrylic-printing",
  },
  {
    img: Bank,
    name: "Banks",
    slug: "banks",
  },
  {
    img: Bill,
    name: "Bill Books",
    slug: "bill-books",
  },
  {
    img: Cards,
    name: "Cards",
    slug: "cards",
  },
];

const BestCategoriesSlider = () => {
  return (
    <Container maxWidth="xl" style={{ padding: '20px', textAlign: 'center', backgroundColor: '#e0c8a0', marginTop: '12px' }}>
      <Box
        display="grid"
        gridTemplateColumns="repeat(7, 1fr)" // 7 items in a row
        gap="5px" // Reduced gap between grid items
        justifyItems="center"
        sx={{
          '@media (max-width: 1200px)': { gridTemplateColumns: 'repeat(4, 1fr)' },  // 4 items in a row for smaller screens
          '@media (max-width: 900px)': { gridTemplateColumns: 'repeat(3, 1fr)' },   // 3 items for even smaller screens
          '@media (max-width: 600px)': { gridTemplateColumns: 'repeat(2, 1fr)' },   // 2 items for mobile
          width: '100%', // Ensure the grid takes up 100% width
          boxSizing: 'border-box', // Include padding in the element's total width
        }}
      >
        {bestCategories.map((category) => (
          <Box key={category.name} style={{ padding: '5px' }}>
            <Link to={`/category/${category.slug}`} style={{ textDecoration: 'none' }}>
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
                }}
              >
                <img
                  src={category.img}
                  alt={category.name}
                  style={{
                    width: '150px', // Fixed width
                    height: '150px', // Fixed height
                    objectFit: 'cover', // Ensures all images have consistent size and aspect ratio
                    borderRadius: '8px', // Square corners
                    marginBottom: '10px',
                  }}
                />
                <Box
                  style={{
                    backgroundColor: 'white',
                    padding: '10px',
                    borderRadius: '4px',
                    width: '100%',
                    marginTop: '10px',
                  }}
                >
                  <p style={{ fontWeight: 'bold', color: 'black', margin: 0 }}>{category.name}</p>
                </Box>
              </Box>
            </Link>
          </Box>
        ))}
      </Box>
    </Container>
  );
};

export default BestCategoriesSlider;
