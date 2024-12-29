import React, { useState } from "react";
import { Container, Box, Link, Typography, Drawer, IconButton } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

// Categories data with subcategories
const bestCategories = [
  {
    name: "Hoardings",
    slug: "hoardings",
    subcategories: [
      { name: "Large Hoardings", slug: "large-hoardings" },
      { name: "Street Hoardings", slug: "street-hoardings" },
      { name: "LED Hoardings", slug: "led-hoardings" },
      { name: "Flex Banners", slug: "flex-banners" },
      { name: "Normal Flex Print", slug: "normal-flex-print" },
      { name: "Star Flex", slug: "star-flex" },
      { name: "StarFlex Retro Reflective Flex", slug: "retro-reflective-flex" },
    ],
  },
  {
    name: "Fliers",
    slug: "fliers",
    subcategories: [
      { name: "Event Fliers", slug: "event-fliers" },
      { name: "Business Fliers", slug: "business-fliers" },
      { name: "Promotional Fliers", slug: "promotional-fliers" },
    ],
  },
  {
    name: "Canvas Printing",
    slug: "canvas-printing",
    subcategories: [
      { name: "Photo Canvas", slug: "photo-canvas" },
      { name: "Artwork Canvas", slug: "artwork-canvas" },
      { name: "Customized Canvas", slug: "customized-canvas" },
    ],
  },
  {
    name: "Acrylic Printing",
    slug: "acrylic-printing",
    subcategories: [
      { name: "Acrylic Signs", slug: "acrylic-signs" },
      { name: "Acrylic Panels", slug: "acrylic-panels" },
      { name: "3D Acrylic Prints", slug: "3d-acrylic-prints" },
    ],
  },
  {
    name: "Bill Books",
    slug: "bill-books",
    subcategories: [
      { name: "Customized Bill Books", slug: "customized-bill-books" },
      { name: "Carbonless Bill Books", slug: "carbonless-bill-books" },
      { name: "Multi-Page Bill Books", slug: "multi-page-bill-books" },
    ],
  },
  {
    name: "Cards",
    slug: "cards",
    subcategories: [
      { name: "Business Cards", slug: "business-cards" },
      { name: "Greeting Cards", slug: "greeting-cards" },
      { name: "Loyalty Cards", slug: "loyalty-cards" },
      { name: "Embossed Foil Business Card", slug: "embossed-foil-business-card" },
    ],
  },
  {
    name: "Flex Print",
    slug: "flex-print",
    subcategories: [
      { name: "Flex Banners", slug: "flex-banners" },
      { name: "Normal Flex Print", slug: "normal-flex-print" },
      { name: "Star Flex", slug: "star-flex" },
      { name: "StarFlex Retro Reflective Flex", slug: "retro-reflective-flex" },
      { name: "Vinyl", slug: "vinyl" },
      { name: "Glow Sign", slug: "glow-sign" },
      { name: "One Way Vision Flex", slug: "one-way-vision-flex" },
      { name: "Rectangle Retro Reflective Flex", slug: "rectangle-retro-reflective-flex" },
      { name: "Vinyl Wall & Floor Stickers", slug: "vinyl-wall-floor-stickers" },
      { name: "RollUp Standees", slug: "rollup-standees" },
      { name: "PP Sheet", slug: "pp-sheet" },
      { name: "PVC Board", slug: "pvc-board" },
    ],
  },
  {
    name: "Offset Print",
    slug: "offset-print",
    subcategories: [
      { name: "Certificate", slug: "certificate" },
      { name: "Carbonless Form", slug: "carbonless-form" },
      { name: "Envelopes", slug: "envelopes" },
      { name: "LetterHead", slug: "letterhead" },
      { name: "Medical Prescription Pad", slug: "medical-prescription-pad" },
      { name: "Receipt Book", slug: "receipt-book" },
      { name: "BookLet", slug: "booklet" },
      { name: "BookMark", slug: "bookmark" },
      { name: "Brochure", slug: "brochure" },
      { name: "Calendar", slug: "calendar" },
      { name: "Catalog", slug: "catalog" },
      { name: "Gift Brochure", slug: "gift-brochure" },
      { name: "Magazine", slug: "magazine" },
      { name: "Notepad", slug: "notepad" },
      { name: "Pocket Folder", slug: "pocket-folder" },
      { name: "Door Hanger", slug: "door-hanger" },
    ],
  },
  {
    name: "Tshirt Print",
    slug: "tshirt-print",
    subcategories: [
      { name: "T-shirt Logo", slug: "tshirt-logo" },
      { name: "Customized Mug", slug: "customized-mug" },
      { name: "Customized Cap", slug: "customized-cap" },
    ],
  },
  {
    name: "Printable Religious Cards",
    slug: "religious-cards",
    subcategories: [
      { name: "Ceremony Card", slug: "ceremony-card" },
      { name: "Bhagwat Card", slug: "bhagwat-card" },
      { name: "Bhagwat Poster", slug: "bhagwat-poster" },
      { name: "Bhagwat Rasid Book", slug: "bhagwat-rasid-book" },
      { name: "Bhagwat Pamphlet", slug: "bhagwat-pamphlet" },
    ],
  },
  {
    name: "Invitation Cards",
    slug: "invitation-cards",
    subcategories: [
      { name: "Wedding Card", slug: "wedding-card" },
      { name: "Griha Parwesh", slug: "griha-parwesh" },
      { name: "Barsa Card", slug: "barsa-card" },
      { name: "Jyoti Jawara Sthapna", slug: "jyoti-jawara-sthapna" },
    ],
  },
  {
    name: "Packaging Printing",
    slug: "packaging-printing",
    subcategories: [
      { name: "Printed Packaging", slug: "printed-packaging" },
      { name: "Printed Packaging Tape", slug: "printed-packaging-tape" },
      { name: "Box Packaging", slug: "box-packaging" },
      { name: "Custom Tissue Paper", slug: "custom-tissue-paper" },
      { name: "Corrugated Mailer Box", slug: "corrugated-mailer-box" },
      { name: "Hang Tags", slug: "hang-tags" },
      { name: "Header Cards", slug: "header-cards" },
      { name: "Printed Butter Paper", slug: "printed-butter-paper" },
      { name: "Product Labels & Stickers", slug: "product-labels-stickers" },
      { name: "Thank You Card", slug: "thank-you-card" },
      { name: "Wrapping Paper", slug: "wrapping-paper" },
      { name: "Table Tent Card", slug: "table-tent-card" },
    ],
  },
];

const CategoriesMenu = () => {
  const [clickedCategory, setClickedCategory] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false); // Drawer state
  const [hoveredCategory, setHoveredCategory] = useState(null); // Hovered category state for large screens

  // Toggle drawer visibility for mobile view
  const toggleDrawer = (open) => {
    setDrawerOpen(open);
  };

  // Handle category click to toggle subcategories visibility on small screens
  const handleCategoryClick = (categorySlug) => {
    if (clickedCategory === categorySlug) {
      setClickedCategory(null); // Close dropdown if the same category is clicked
    } else {
      setClickedCategory(categorySlug); // Open dropdown for the clicked category
    }
  };

  return (
    <Container maxWidth="xl" style={{ padding: "10px" }}>
      {/* Button to open drawer on small screens */}
      <Box sx={{ display: { xs: "flex", sm: "none" }, alignItems: "center" }}>
      <Typography
        variant="h6"
        sx={{ fontWeight: "bold", cursor: "pointer" }} // Added cursor: pointer to indicate it's clickable
        onClick={() => toggleDrawer(true)} // Open the drawer when clicking on "Menu"
      >
        Menu
      </Typography>
    </Box>    

      {/* Drawer component for mobile */}
      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={() => toggleDrawer(false)}
        sx={{
          display: { xs: "block", sm: "none" }, // Only visible on small screens
          "& .MuiDrawer-paper": {
            width: "250px", // Set drawer width
            padding: "20px",
          },
        }}
      >
        {/* Categories list in the Drawer */}
        <Box>
          {bestCategories.map((category) => (
            <Box
              key={category.slug}
              sx={{
                position: "relative",
                marginBottom: "20px",
              }}
            >
              <Box
                display="flex"
                alignItems="center"
                onClick={() => handleCategoryClick(category.slug)}
                sx={{
                  cursor: "pointer",
                  fontWeight: "bold",
                  fontSize: "16px",
                }}
              >
                <Typography component="span">{category.name}</Typography>
                <ArrowDropDownIcon
                  sx={{
                    marginLeft: "5px",
                    transition: "transform 0.3s ease",
                    transform: clickedCategory === category.slug ? "rotate(180deg)" : "rotate(0deg)",
                  }}
                />
              </Box>

              {/* Dropdown showing subcategories when clicked */}
              {clickedCategory === category.slug && (
                <Box
                  sx={{
                    position: "absolute",
                    top: "100%",
                    left: 0,
                    backgroundColor: "#fff",
                    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
                    padding: "10px",
                    borderRadius: "8px",
                    zIndex: 1000,
                    minWidth: "200px",
                  }}
                >
                  {category.subcategories.map((subcategory) => (
                    <Link
                      key={subcategory.slug}
                      href={`/category/${category.slug}`}
                      style={{
                        display: "block",
                        marginBottom: "8px",
                        textDecoration: "none",
                        fontSize: "14px",
                        color: "#333",
                      }}
                    >
                      {subcategory.name}
                    </Link>
                  ))}
                </Box>
              )}
            </Box>
          ))}
        </Box>
      </Drawer>

      {/* Grid layout for larger screens */}
      <Box
        display="flex"
        gap="30px"
        alignItems="center"
        flexWrap="wrap"
        sx={{ display: { xs: "none", sm: "flex" } }}
      >
        {bestCategories.map((category) => (
          <Box
            key={category.slug}
            sx={{
              position: "relative",
              marginBottom: "20px",
            }}
            onMouseEnter={() => setHoveredCategory(category.slug)}
            onMouseLeave={() => setHoveredCategory(null)}
          >
            <Typography
              component="span"
              sx={{
                fontSize: "13px",
                fontWeight: "bold",
                cursor: "pointer",
                marginLeft: "16px",
              }}
            >
              {category.name}
            </Typography>

            {/* Dropdown showing subcategories on hover for large screens */}
            {hoveredCategory === category.slug && (
              <Box
                sx={{
                  position: "absolute",
                  top: "100%",
                  backgroundColor: "#fff",
                  boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
                  padding: "10px",
                  borderRadius: "8px",
                  zIndex: 1000,
                  minWidth: "200px",
                }}
              >
                {category.subcategories.map((subcategory) => (
                  <Link
                    key={subcategory.slug}
                    href={`/category/${category.slug}`}
                    style={{
                      display: "block",
                      marginBottom: "8px",
                      textDecoration: "none",
                      fontSize: "14px",
                      color: "#333",
                    }}
                  >
                    {subcategory.name}
                  </Link>
                ))}
              </Box>
            )}
          </Box>
        ))}
      </Box>
    </Container>
  );
};

export default CategoriesMenu;
