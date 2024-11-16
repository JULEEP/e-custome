import React from 'react';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import { Link } from 'react-router-dom';

// Image URLs as objects in an array
const bannerData = [
    {
        img: 'https://www.flycart.org/wp-content/uploads/2023/05/How_to_Display_WooCommerce_Discount_Percentage_on_the_Sale_Badge.png',
        alt: 'WooCommerce Discount Percentage'
    },
    {
        img: 'https://ik.imagekit.io/launchnotes/production/4vrlyksvgni6x6dbaiuoufolsomx#t=0.1',
        alt: 'Ecommerce'
    },
    {
        img: 'https://www.flycart.org/wp-content/uploads/2023/05/How_to_Display_WooCommerce_Discount_Percentage_on_the_Sale_Badge.png',
        alt: 'WooCommerce Discount Percentage'
    }

];

const Carousel = () => {
    const responsive = {
        0: { items: 1 },
        568: { items: 2 },
        1024: { items: 3, itemsFit: 'contain' },
    };

    // Dynamically create carousel items by mapping over the bannerData array
    const items = bannerData.map((item, index) => (
        <Link key={index}>
            <div className="item" style={{ marginTop: 10 }}>
                <img 
                    src={item.img} 
                    loading='lazy' 
                    alt={item.alt} 
                    style={{ height: '100%', width: '100%', objectFit: 'contain' }} 
                />
            </div>
        </Link>
    ));

    return (
        <AliceCarousel
            animationType="fadeout"
            animationDuration={800}
            disableButtonsControls
            infinite
            items={items}
            touchTracking
            mouseTracking
            disableDotsControls
            autoPlay
            autoPlayInterval={2500}
            responsive={responsive}
        />
    );
};

export default Carousel;
