import { Hoarding, Flier, Acrylic, Canvas, Bank, Bill, Cards } from '../Assets/Images/Image';

const data = [
    {
        img: Hoarding,
        name: "Hoardings",
        subcategories: [
            { name: "Large Hoardings", description: "Big billboard ads on highways" },
            { name: "Street Hoardings", description: "Smaller hoardings placed in cities" },
            { name: "LED Hoardings", description: "Digital hoardings with LED displays" },
        ]
    },
    {
        img: Flier,
        name: "Fliers",
        subcategories: [
            { name: "Event Fliers", description: "Fliers for events and promotions" },
            { name: "Business Fliers", description: "Fliers for business advertisement" },
            { name: "Promotional Fliers", description: "Fliers for special offers and discounts" },
        ]
    },
    {
        img: Canvas,
        name: "Canvas Printing",
        subcategories: [
            { name: "Photo Canvas", description: "Canvas prints of personal photos" },
            { name: "Artwork Canvas", description: "Canvas printing for art reproductions" },
            { name: "Customized Canvas", description: "Personalized canvas for gifts and decoration" },
        ]
    },
    {
        img: Acrylic,
        name: "Acrylic Printing",
        subcategories: [
            { name: "Acrylic Signs", description: "Custom acrylic signage for businesses" },
            { name: "Acrylic Panels", description: "Acrylic panels used for artwork or decoration" },
            { name: "3D Acrylic Prints", description: "Acrylic prints with a 3D effect" },
        ]
    },
    {
        img: Bank,
        name: "Banks",
        subcategories: [
            { name: "Bank Branch Banners", description: "Banners for physical bank branches" },
            { name: "ATM Stickers", description: "Stickers for ATM locations with bank branding" },
            { name: "Promotional Bank Flyers", description: "Flyers used to advertise bank services" },
        ]
    },
    {
        img: Bill,
        name: "Bill Books",
        subcategories: [
            { name: "Customized Bill Books", description: "Customized bill books for businesses" },
            { name: "Carbonless Bill Books", description: "Carbonless bill book printing for easy record-keeping" },
            { name: "Multi-Page Bill Books", description: "Bill books with multiple copies for records" },
        ]
    },
    {
        img: Cards,
        name: "Cards",
        subcategories: [
            { name: "Business Cards", description: "Professional cards for networking and branding" },
            { name: "Greeting Cards", description: "Custom cards for occasions like birthdays, holidays, etc." },
            { name: "Loyalty Cards", description: "Cards for customer loyalty programs" },
        ]
    },
];

export default data;
