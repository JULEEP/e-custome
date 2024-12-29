import React from 'react';
import { Container, Typography, Box } from '@mui/material';
import Slider from 'react-slick';
import { Link } from 'react-router-dom';
import { FlexPrint } from '../Assets/Images/Image';

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
  "Business Cards Standard": "https://graphicburger.com/wp-content/uploads/2013/04/Realistic-Business-Card-Mock-Up-full.jpg",
  "Greeting Cards": "https://www.dayspring.com/media/catalog/category/J4525_COB.jpg",
  "Loyalty Cards": "https://static.vecteezy.com/system/resources/previews/009/102/463/original/green-loyalty-card-design-gift-card-design-free-vector.jpg",
  "Embossed Foil Business Cards": "https://goodmockups.com/wp-content/uploads/2021/03/Free-Foil-Embossing-Business-Card-Mockup-PSD.jpg",
  "Embossed Spot UV Business Cards": "https://th.bing.com/th/id/OIP.em_sCSbN116hSPHDm4LS_QAAAA?rs=1&pid=ImgDetMain",
  "High Texture Luxury Visiting Cards": "https://th.bing.com/th/id/OIP.2D92PYEukT31EgQ4TkhCOgHaHa?rs=1&pid=ImgDetMain",
  "Sandwich Business Card": "https://files.printo.in/site/20220702_232005611952_3c6785_Sanwich-card.jpg",
  "Ultra Thick Business Cards": "https://printpeppermint.com/cdn/shop/products/ultra-thick-business-cards-444637.jpg?v=1685617470",
  "Flex Banners" : "https://smodprint.com/wp-content/uploads/2018/09/Large-Format-Flex-Banner-Print.jpg",
  "Normal Flex Print": "https://www.soscanhelp.com/hs-fs/hubfs/Flex%20Print%20Logo.png?width=414&name=Flex%20Print%20Logo.png",
  "Star Flex": "https://www.soscanhelp.com/hs-fs/hubfs/Flex%20Print%20Logo.png?width=414&name=Flex%20Print%20Logo.png",
  "StarFlex Retro Reflective Flex": "https://www.soscanhelp.com/hs-fs/hubfs/Flex%20Print%20Logo.png?width=414&name=Flex%20Print%20Logo.png",
  "Vinyl": "https://signatureprint.co.uk/print/wp-content/uploads/2020/05/987-1024x768.jpg",
  "Glow Sing": "https://5.imimg.com/data5/SELLER/Default/2021/4/XM/JM/VK/125641407/customized-glow-sign-board-1000x1000.jpg",
  "One Way Vision Flex": "https://5.imimg.com/data5/SELLER/Default/2021/12/EU/XS/JP/44412549/one-way-vision-flex-printing-500x500.jpg",
  "Rectangle Retro Reflective Flex": "https://th.bing.com/th/id/OIP.pLOFZw2AyEg-GW1yK9xXVgAAAA?rs=1&pid=ImgDetMain",
  "Vinyl Wall & Floor Stickers": "https://www.vanill.co/wp-content/uploads/2018/11/floor-tile-decals-stickers-vinyl-decals-vinyl-floor-self-adhesive-tile-stickers-decorative-tile-flooring-removable-stickers-no-132-5bddd384.jpg",
  "RollUp Standees": "https://printme.online/wp-content/uploads/2020/11/roll-up.png",
  "PP Sheet": "https://th.bing.com/th/id/OIP.2w536vxxSEMEQTSiLXdmmwHaHa?rs=1&pid=ImgDetMain",
  "PVC Board": "https://sandiegobannerstands.com/image/cache/catalog/products/pvc-boards-500x500-700x700.jpg",
  "Certificate": "https://5.imimg.com/data5/SELLER/Default/2022/8/IU/EI/RG/18841811/certificate-offset-printing-1000x1000.jpg",
  "CarbonlessForm": "https://www.kagraphic.com/wp-content/uploads/2020/05/Carbonless-Forms-3-_-KAgraphic_Commercial-printing.jpg",
  "Envelopes": "https://4over.com/media/catalog/product/cache/f1e63963f284824a3d6f554411aea8a2/o/f/offset-print-and-convert-envelopes.jpg",
  "LetterHead": "https://th.bing.com/th/id/OIP.EiYIOO6qSne-8pFWF2WmdgAAAA?rs=1&pid=ImgDetMain",
  "Medical Prescription Pad": "https://sprint24.net/pic/lg/medical-prescription-pad-cust/c/-/2h0jeP.png",
  "Receipt Book": "https://www.printedinvoicebooks.co.uk/wp-content/uploads/2023/07/receipt-book-dl.png",
  "BookLet": "https://cpimg.tistatic.com/08470428/b/4/Booklet-Offset-Printing-Services.jpg",
  "BookMark": "https://staticecp.uprinting.com/270/450x450/Bookmarks_Personal_A.jpg",
  "Brochure": "https://degqkf7c4iqz7.cloudfront.net/fattyprin/images/products_gallery_images/Offset.jpg",
  "Calendar": "https://5.imimg.com/data5/SELLER/Default/2024/2/394292522/AY/PB/IP/26783192/offset-printing-custom-printed-table-calendars-500x500.jpg",
  "Catalog": "https://5.imimg.com/data5/SELLER/Default/2023/8/332836070/ZK/OH/EE/117332875/product-catalog-offset-printing-service-1000x1000.jpg",
  "Gift Brochure": "https://cdn.mycreativeshop.com/images/templates/8635/gift-shop-bi-fold-brochure-template-1.jpg",
  "Magazine": "https://staticecp.48hourprint.com/586/Magazines%20copy.png",
  "Notepad": "https://www.printingthestuff.ca/wp-content/uploads/2013/07/Notepads4.jpg",
  "Pocket Folder": "https://th.bing.com/th/id/OIP.qMVpQQb1Vk3TJR2GiROAdwHaFw?rs=1&pid=ImgDetMain",
  "Door Hanger": "https://th.bing.com/th/id/OIP.n0dZeCp5B_Zb3_wzf45JUAHaHa?rs=1&pid=ImgDetMain",
  "T-shirt Logo": "https://repathlete.com/wp-content/uploads/2022/07/jabgym-jab-muscle-tank-heather-grey-1.jpg",
  "Customized Mug": "https://img1.etsystatic.com/109/0/12887062/il_fullxfull.1005827537_l2sn.jpg",
  "Customized Cap": "https://ipprinters.com.pk/wp-content/uploads/2023/02/cap.png",
  "Ceremony Card": "https://swimmingfreestyle.net/wp-content/uploads/2019/10/baby-naming-ceremony-invitation-beautiful-customize-832-baby-shower-invitation-templates-online-of-baby-naming-ceremony-invitation.jpg",
  "Bhagwat Card": "https://th.bing.com/th?q=Bhagwat+Border+Design&w=120&h=120&c=1&rs=1&qlt=90&cb=1&pid=InlineBlock&mkt=en-IN&cc=IN&setlang=en&adlt=moderate&t=1&mw=247",
  "Bhagwat Poster": "https://th.bing.com/th?q=Bhagwat+Border+Design&w=120&h=120&c=1&rs=1&qlt=90&cb=1&pid=InlineBlock&mkt=en-IN&cc=IN&setlang=en&adlt=moderate&t=1&mw=247",
  "Bhagwat Rasid Book": "https://trbahadurpur.com/wp-content/uploads/2021/01/rashid-book-cdr-file.jpg",
  "Bhagwat Pamphlet": "https://th.bing.com/th?q=Bhagwat+Border+Design&w=120&h=120&c=1&rs=1&qlt=90&cb=1&pid=InlineBlock&mkt=en-IN&cc=IN&setlang=en&adlt=moderate&t=1&mw=247",
  "Wedding Card": "https://th.bing.com/th/id/OIP.7jUlJng9LN7lNHzRPMQdzgHaHa?rs=1&pid=ImgDetMain",
  "Griha Parwesh": "https://public-files.gumroad.com/y5ocggj574o07rjy6515uebcil65",
  "Barsa Card": "https://th.bing.com/th/id/OIP.klBN3PgjNHollNzzsywk-QHaGh?rs=1&pid=ImgDetMain",
  "Jyoti Jawara Sthapna": "https://freehindidesign.com/wp-content/uploads/2021/06/freehindidesign.com_Wedding-invitation-card.jpg",
  "Printed Packaging": "https://th.bing.com/th/id/OIP.K-B-83TKhsXtG5pEP4HTiQHaE8?rs=1&pid=ImgDetMain",
  "Printed Packaging Tap": "https://th.bing.com/th/id/OIP.CNarXHFBW28CgpqfNIqzsQHaHa?w=171&h=180&c=7&r=0&o=5&pid=1.7",
  "Box Packaging": "https://th.bing.com/th/id/OIP.uj7OQwsUmvhwN5YsKET3mwHaEy?w=241&h=180&c=7&r=0&o=5&pid=1.7",
  "Custom Tissue Paper": "https://staticecp.48hourprint.com/1170/700x700/Custom_Tissue_Paper_A.jpg",
  "Corrugated Mailer Box": "https://www.cheapcustomboxesme.com/wp-content/uploads/2020/04/corrugated-mailer-box-510x510.png",
  "Hang Tags": "https://i.pinimg.com/originals/66/57/a3/6657a3a570b126f1e4403ea3d2926372.jpg",
  "Header Cards": "https://th.bing.com/th/id/OIP.TsVLGxfowcwqDIkS75qnQwHaFF?rs=1&pid=ImgDetMain",
  "Printed Butter Paper": "https://aprints.pk/wp-content/uploads/2021/02/butter1-600x600.jpg",
  "Product Lables & Stickers": "https://www.eprinton.in/wp-content/uploads/2022/04/Product-Label-Designing_02.jpg",
  "Thank You Card": "https://static.vecteezy.com/system/resources/previews/011/129/058/original/thank-you-card-design-template-luxury-and-elegant-background-illustration-ready-to-print-free-template-free-vector.jpg",
  "Wrapping Paper": "https://rlv.zcache.com/pink_and_white_huge_stripe_pattern_wrapping_paper-r5affd4690f6d4d7e93fe2c346b49cb55_zkknc_8byvr_510.jpg",
  "Table Tent Card": "https://th.bing.com/th/id/OIP.dNlGDcj4KAjzCmE53vbQ_wAAAA?rs=1&pid=ImgDetMain",












  















};

// Data: Subcategories grouped into categories
const subcategories = {
  hoardings: ["Large Hoardings", "Street Hoardings", "LED Hoardings", "Flex Banners", "Normal Flex Print", "Star Flex", "StarFlex Retro Reflective Flex"],
  fliers: ["Event Fliers", "Business Fliers", "Promotional Fliers"],
  canvasPrinting: ["Photo Canvas", "Artwork Canvas", "Customized Canvas"],
  acrylicPrinting: ["Acrylic Signs", "Acrylic Panels", "3D Acrylic Prints"],
  billBooks: ["Customized Bill Books", "Carbonless Bill Books", "Multi-Page Bill Books"],
  cards: ["Business Cards", "Greeting Cards", "Loyalty Cards", "Embossed Foil Business Card"],
  FlexPrint: ["Flex Banners", "Normal Flex Print", "Star Flex", "StarFlex Retro Reflective Flex", "Vinyl", "Glow Sing", "One Way Vision Flex", "Rectangle Retro Reflective Flex", "Vinyl Wall & Floor Stickers", "RollUp Standees", "PP Sheet", "PVC Board"],
  OffsetPrint: ["Certificate", "CarbonlessForm", "Envelopes" , "LetterHead", "Medical Prescription Pad", "Receipt Book", "BookLet", "BookMark", "Brochure", "Calendar", "Catalog", "Gift Brochure", "Magazine", "Notepad", "Pocket Folder", "Door Hanger"],
  TshirtPrint: ["T-shirt Logo", "Customized Mug", "Customized Cap"],
  PrintableReligiousCards: ["Ceremony Card", "Bhagwat Card", "Bhagwat Poster", "Bhagwat Rasid Book", "Bhagwat Pamphlet"],
  InvitationCard: ["Wedding Card", "Griha Parwesh", "Barsa Card", "Jyoti Jawara Sthapna"],
  PackagingPrinting: ["Printed Packaging", "Printed Packaging Tap", "Box Packaging", "Custom Tissue Paper", "Corrugated Mailer Box", "Hang Tags", "Header Cards", "Printed Butter Paper", "Product Lables & Stickers", "Thank You Card", "Wrapping Paper", "Table Tent Card"]

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
    else if (subcategories.FlexPrint.includes(subcategory)) {
    return "/category/flexPrint";
  }
  else if (subcategories.OffsetPrint.includes(subcategory)) {
    return "/category/OffsetPrint";
  }
  else if (subcategories.TshirtPrint.includes(subcategory)) {
    return "/category/TshirtPrint";
  }
  else if (subcategories.PrintableReligiousCards.includes(subcategory)) {
    return "/category/PrintableReligiousCards";
  }
  else if (subcategories.InvitationCard.includes(subcategory)) {
    return "/category/InvitationCard";
  }
  else if (subcategories.PackagingPrinting.includes(subcategory)) {
    return "/category/PackagingPrinting";
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
                height: '180px', // Ensure all cards are the same height
                display: 'flex',
                justifyContent: 'space-between', // Center content vertically
                margin: '0 auto', // Ensure it is centered in each slide
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
                  marginTop: '20px',
                }}
              ></Box>

              {/* Display subcategory name */}
              <Typography
                variant="h6"
                style={{
                  fontWeight: 'bold',
                  fontSize: '14px',
                  color: 'black',
                  overflow: 'hidden', // Ensure text does not overflow
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                  maxWidth: '100px', // Limit text width to match the image width
                  marginBottom: '20px',
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
