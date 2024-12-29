import React, { useState } from 'react';
import { Container, Box, IconButton, Drawer, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';

// Best categories data
const bestCategories = [
  { name: "Cards", slug: "cards" },
  { name: "Flex Print", slug: "flexPrint" },
  { name: "Offset Print", slug: "OffsetPrint" },
  { name: "Tshirt Print", slug: "TshirtPrint" },
  { name: "Religious Card", slug: "PrintableReligiousCards" },
  { name: "Invitation Card", slug: "InvitationCard" },
  { name: "Election Printing", slug: "Election" },
  { name: "Advanture Printing", slug: "Advanture" },
  { name: "Packaging Printing", slug: "PackagingPrinting" },
];

const CategoriesMenu = () => {
  const [openDrawer, setOpenDrawer] = useState(false);

  // Function to toggle the drawer (open/close)
  const toggleDrawer = () => {
    setOpenDrawer(!openDrawer);
  };

  return (
    <Container maxWidth="xl" style={{ padding: '10px' }}>
      <Box
        display="flex"
        overflow="auto"
        whiteSpace="nowrap"
        gap="15px"
        style={{
          alignItems: 'center',
        }}
      >
        {/* Hamburger Menu Icon for small screens */}
        <IconButton
          onClick={toggleDrawer}
          sx={{
            display: { xs: 'block', md: 'none' }, // Only show on small screens
            position: 'fixed', // Make it fixed
            zIndex: 1200, // Ensure it's above other content
            color: '#0000FF', // Change icon color to blue
            right: '310px', // Adjust the distance from the right side
          }}
        >
          <MenuIcon />
          <Typography
            variant="body2"
            sx={{
              marginLeft: '8px', // Space between icon and text
              display: 'inline-block',
            }}
          >
          </Typography>
        </IconButton>

        {/* Horizontal Menu for large screens */}
        <Box
          display={{ xs: 'none', md: 'flex' }} // Hide on small screens
          overflow="auto"
          whiteSpace="nowrap"
          gap="15px"
        >
          {bestCategories.map((category) => (
            <Link
              key={category.slug}
              to={`/category/${category.slug}`}
              style={{
                textDecoration: 'none',
                fontSize: '14px',
                color: '#000',
                fontWeight: '500',
                display: 'inline-block',
                marginLeft: '40px',
              }}
            >
              {category.name}
            </Link>
          ))}
        </Box>
      </Box>

      {/* Drawer (Sidebar) for small screens */}
      <Drawer
        anchor="left"
        open={openDrawer}
        onClose={toggleDrawer}
        sx={{
          display: { xs: 'block', md: 'none' }, // Show only on small screens
        }}
      >
        <Box
          sx={{
            width: 200,
            padding: '20px',
            height: 90,
            marginTop: '40px'
          }}
        >
          {bestCategories.map((category) => (
            <Link
              key={category.slug}
              to={`/category/${category.slug}`}
              style={{
                textDecoration: 'none',
                fontSize: '16px',
                color: '#000',
                fontWeight: '500',
                display: 'block',
                marginBottom: '15px',
              }}
            >
              {category.name}
            </Link>
          ))}
        </Box>
      </Drawer>
    </Container>
  );
};

export default CategoriesMenu;
