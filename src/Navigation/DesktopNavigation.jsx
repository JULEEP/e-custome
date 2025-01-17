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
import axios from 'axios';
import { getCart, getWishList, handleLogOut, Transition } from '../Constants/Constant';

const DesktopNavigation = () => {
  const { cart, setCart, wishlistData, setWishlistData } = useContext(ContextFunction);
  const [openAlert, setOpenAlert] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const navigate = useNavigate();

  const authToken = localStorage.getItem('Authorization');
  const setProceed = authToken !== null;
  const userId = localStorage.getItem('userId');

  useEffect(() => {
    getCart(setProceed, setCart, authToken);
    getWishList(setProceed, setWishlistData, authToken);
  }, [setProceed, setCart, setWishlistData, authToken]);

  const handleSearchChange = async (e) => {
    setSearchQuery(e.target.value);

    if (e.target.value.trim()) {
      try {
        const response = await axios.get('https://admin-backend-rl94.onrender.com/api/products/getall-search', {
          params: { category: e.target.value },
        });
        setSearchResults(response.data);
        setIsDropdownVisible(true);
      } catch (error) {
        console.error('Error fetching products:', error);
        toast.error('Something went wrong while searching.');
      }
    } else {
      setSearchResults([]);
      setIsDropdownVisible(false);
    }
  };

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

  const handleClickOutside = (e) => {
    if (!e.target.closest('.search-dropdown') && !e.target.closest('.search-input')) {
      setIsDropdownVisible(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <>
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

          <div style={{ position: 'relative', width: '300px' }}>
            <input
              type="text"
              className="search-input"
              placeholder="Search..."
              value={searchQuery}
              onChange={handleSearchChange}
              style={{
                width: '100%',
                padding: '10px 15px',
                border: '1px solid #ccc',
                borderRadius: '5px',
                fontSize: '16px',
                boxSizing: 'border-box',
              }}
            />

            {isDropdownVisible && searchResults.length > 0 && (
              <div
                className="search-dropdown"
                style={{
                  position: 'absolute',
                  top: '100%',
                  left: '0',
                  right: '0',
                  width: '200%',
                  maxHeight: '300px',
                  backgroundColor: '#fff',
                  border: '1px solid #ccc',
                  borderRadius: '5px',
                  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                  marginTop: '5px',
                  overflowY: 'auto',
                  zIndex: 1000,
                }}
              >
                {searchResults.map((product) => (
                  <MenuItem
                    key={product._id}
                    onClick={() => handleSelectProduct(product)}
                    style={{
                      padding: '10px 15px',
                      fontSize: '16px',
                      cursor: 'pointer',
                      borderBottom: '1px solid #f0f0f0',
                      transition: 'background-color 0.3s',
                    }}
                    onMouseEnter={(e) => (e.target.style.backgroundColor = '#f0f0f0')}
                    onMouseLeave={(e) =>
                      (e.target.style.backgroundColor = 'transparent')
                    }
                  >
                    <Typography variant="body1">
                      {product.name} {product.category ? `(${product.category})` : ''}
                    </Typography>
                  </MenuItem>
                ))}
              </div>
            )}
          </div>
        </div>

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

            {setProceed ? (
              <>
                <li className="nav-links">
                  <NavLink to="/dashboard">
                    <span className="nav-icon-span">
                      <CgProfile style={{ fontSize: 29, marginTop: 7 }} />
                    </span>
                  </NavLink>
                </li>
                <li onClick={() => setOpenAlert(true)}>
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

      <Dialog
        open={openAlert}
        TransitionComponent={Transition}
        keepMounted
        onClose={() => setOpenAlert(false)}
      >
        <DialogContent>
          <Typography variant="h6">Do You Want To Logout?</Typography>
        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            color="primary"
            onClick={() => handleLogOut(setProceed, toast, navigate, setOpenAlert)}
          >
            Logout
          </Button>
          <Button variant="contained" color="error" onClick={() => setOpenAlert(false)}>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default DesktopNavigation;
