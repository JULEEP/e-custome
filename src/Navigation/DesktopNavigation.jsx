import './Desktop.css';
import React, { useContext, useEffect, useState } from 'react';
import {
  AiOutlineHeart,
  AiOutlineShoppingCart,
  AiFillCloseCircle,
  AiFillHome,
} from 'react-icons/ai';
import { CgProfile } from 'react-icons/cg';
import { FiLogOut } from 'react-icons/fi';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import {
  Badge,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  Tooltip,
  Typography,
  MenuItem,
} from '@mui/material';
import { ContextFunction } from '../Context/Context';
import { toast } from 'react-toastify';
import axios from 'axios'; // To make API requests
import {
  getCart,
  getWishList,
  handleLogOut,
  handleClickOpen,
  handleClose,
  Transition,
} from '../Constants/Constant';

const DesktopNavigation = () => {
  const { cart, setCart, wishlistData, setWishlistData } = useContext(ContextFunction);
  const [openAlert, setOpenAlert] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]); // State for search results
  const [isDropdownVisible, setIsDropdownVisible] = useState(false); // Dropdown visibility
  const navigate = useNavigate();

  const authToken = localStorage.getItem('Authorization');
  const setProceed = authToken !== null; // Check if user is authenticated
  const userId = localStorage.getItem('userId'); // Get user ID for navigation

  // Fetch cart and wishlist data on component mount
  useEffect(() => {
    getCart(setProceed, setCart, authToken);
    getWishList(setProceed, setWishlistData, authToken);
  }, [setProceed, setCart, setWishlistData, authToken]);

  // Handle search input and fetch matching products
  const handleSearchChange = async (e) => {
    setSearchQuery(e.target.value);

    if (e.target.value.trim()) {
      try {
        const response = await axios.get('http://localhost:4000/api/products/getall-search', {
          params: { category: e.target.value },
        });
        setSearchResults(response.data); // Populate search results
        setIsDropdownVisible(true); // Show dropdown
      } catch (error) {
        console.error('Error fetching products:', error);
        toast.error('Something went wrong while searching.');
      }
    } else {
      setSearchResults([]);
      setIsDropdownVisible(false);
    }
  };

  // Handle selecting a search result and navigating
  const handleSelectProduct = (product) => {
    setSearchQuery(product.name);
    setSearchResults([]);
    setIsDropdownVisible(false);

    if (product.category) {
      navigate(`/category/${product.category.toLowerCase()}`);
    } else {
      navigate(`/product/${product._id}`);
    }
  };

  return (
    <>
      {/* Navigation bar */}
      <nav className="nav">
        <div className="logo-search-container">
          <div className="logo">
            <Link to="/">
              <h4>
                <span className="jaiswal">Jaiswal</span>
                <span className="offset">Offset</span>
              </h4>
            </Link>
          </div>

          {/* Search bar */}
          <div style={{ position: 'relative' }}>
            <input
              type="text"
              className="search-input"
              placeholder="Search..."
              value={searchQuery}
              onChange={handleSearchChange}
            />

            {/* Search dropdown */}
            {isDropdownVisible && searchResults.length > 0 && (
              <div className="search-dropdown">
                {searchResults.map((product) => (
                  <MenuItem key={product._id} onClick={() => handleSelectProduct(product)}>
                    <Typography variant="body1">
                      {product.name} {product.category ? `(${product.category})` : ''}
                    </Typography>
                  </MenuItem>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Navigation items */}
        <div className="nav-items">
          <ul className="nav-items">
            <li className="nav-links">
              <NavLink to="/">
                <span className="nav-icon-span">
                  <AiFillHome className="nav-icon" />
                </span>
              </NavLink>
            </li>

            <li className="nav-links">
              <Tooltip title="Cart">
                <NavLink to={`/cart/${userId}`}>
                  <span className="nav-icon-span">
                    <Badge badgeContent={setProceed ? cart.length : 0} color="error">
                      <AiOutlineShoppingCart className="nav-icon" />
                    </Badge>
                  </span>
                </NavLink>
              </Tooltip>
            </li>

            <li className="nav-links">
              <Tooltip title="Wishlist">
                <NavLink to={`/wishlist/${userId}`}>
                  <span className="nav-icon-span">
                    <Badge badgeContent={setProceed ? wishlistData.length : 0} color="error">
                      <AiOutlineHeart className="nav-icon" />
                    </Badge>
                  </span>
                </NavLink>
              </Tooltip>
            </li>

            {/* Conditional rendering for authenticated users */}
            {setProceed ? (
              <>
                <li className="nav-links">
                  <NavLink to="/dashboard">
                    <span className="nav-icon-span">
                      <CgProfile style={{ fontSize: 29, marginTop: 7 }} />
                    </span>
                  </NavLink>
                </li>
                <li onClick={() => handleClickOpen(setOpenAlert)}>
                  <Button
                    variant="contained"
                    className="nav-icon-span"
                    sx={{ marginBottom: 1 }}
                    endIcon={<FiLogOut />}
                  >
                    <Typography variant="button">Logout</Typography>
                  </Button>
                </li>
              </>
            ) : (
              <li className="nav-links">
                <Tooltip title="Login">
                  <NavLink to="/login">
                    <span className="nav-icon-span">
                      <CgProfile style={{ fontSize: 29, marginTop: 7 }} />
                    </span>
                  </NavLink>
                </Tooltip>
              </li>
            )}
          </ul>
        </div>
      </nav>

      {/* Logout confirmation dialog */}
      <Dialog
        open={openAlert}
        TransitionComponent={Transition}
        keepMounted
        onClose={() => handleClose(setOpenAlert)}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogContent sx={{ width: { xs: 280, md: 350 }, display: 'flex', justifyContent: 'center' }}>
          <Typography variant="h6">Do You Want To Logout?</Typography>
        </DialogContent>
        <DialogActions sx={{ display: 'flex', justifyContent: 'space-evenly' }}>
          <Link to="/">
            <Button
              variant="contained"
              endIcon={<FiLogOut />}
              color="primary"
              onClick={() => handleLogOut(setProceed, toast, navigate, setOpenAlert)}
            >
              Logout
            </Button>
          </Link>
          <Button
            variant="contained"
            color="error"
            endIcon={<AiFillCloseCircle />}
            onClick={() => handleClose(setOpenAlert)}
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default DesktopNavigation;
