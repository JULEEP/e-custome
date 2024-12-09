import './Desktop.css'
import React, { useContext, useEffect, useState } from 'react'
import { AiOutlineHeart, AiOutlineShoppingCart, AiFillCloseCircle, AiFillHome } from 'react-icons/ai'
import { CgProfile } from 'react-icons/cg'
import { FiLogOut } from 'react-icons/fi'
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { Badge, Button, Dialog, DialogActions, DialogContent, Tooltip, Typography } from '@mui/material';
import { ContextFunction } from '../Context/Context';
import { toast } from 'react-toastify';
import { getCart, getWishList, handleLogOut, handleClickOpen, handleClose, Transition } from '../Constants/Constant'

const DesktopNavigation = () => {
  const { cart, setCart, wishlistData, setWishlistData } = useContext(ContextFunction)
  const [openAlert, setOpenAlert] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate()
  let authToken = localStorage.getItem('Authorization');
  let setProceed = authToken !== null ? true : false

  // Get userId from localStorage for wishlist URL
  const userId = localStorage.getItem('userId');

  useEffect(() => {
    getCart(setProceed, setCart, authToken)
    getWishList(setProceed, setWishlistData, authToken)
  }, [])

  // Handle the search button click
  const handleSearch = () => {
    if (searchQuery.trim()) {
      // Redirect to a search results page or perform a search
      console.log("Searching for:", searchQuery);
      // For now, just navigate to a search page with the query as a parameter
      navigate(`/search?query=${searchQuery}`);
    }
  };

  return (
    <>
      <nav className='nav'>
        <div className="logo-search-container">
          <div className="logo">
            <Link to='/'>
              <h4><span className="jaiswal">Jaiswal</span><span className="offset">Offset</span></h4>
            </Link>
          </div>
          <input
            type="text"
            className="search-input"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Button
            variant="contained"
            color="primary"
            sx={{
              height: '40px',
              width: '40px',  // Set a specific width
              marginLeft: '10px'
            }}
            onClick={handleSearch}
          >
            Go
          </Button>
        </div>

        <div className="nav-items">
          <ul className="nav-items">
            <li className="nav-links">
              <NavLink to='/'>
                <span className='nav-icon-span'>
                  <AiFillHome className='nav-icon' />
                </span>
              </NavLink>
            </li>
            <li className="nav-links">
              <Tooltip title='Cart'>
              <NavLink to={`/cart/${userId}`}> {/* Updated wishlist link */}
              <span className='nav-icon-span'>
                    <Badge badgeContent={setProceed ? cart.length : 0}>
                      <AiOutlineShoppingCart className='nav-icon' />
                    </Badge>
                  </span>
                </NavLink>
              </Tooltip>
            </li>
            <li className="nav-links">
              <Tooltip title='Wishlist'>
                <NavLink to={`/wishlist/${userId}`}> {/* Updated wishlist link */}
                  <span className='nav-icon-span'>
                    <Badge badgeContent={setProceed ? wishlistData.length : 0}>
                      <AiOutlineHeart className='nav-icon' />
                    </Badge>
                  </span>
                </NavLink>
              </Tooltip>
            </li>

            {setProceed ? (
              <>
                <li className="nav-links">
                  <Tooltip title='dashboard'>
                    <NavLink to='/dashboard'>
                      <span className='nav-icon-span'>
                        <CgProfile style={{ fontSize: 29, marginTop: 7, marginRight: 10 }} />
                      </span>
                    </NavLink>
                  </Tooltip>
                </li>
                <li
                  style={{ display: 'flex', alignItems: 'center', justifyItems: 'center' }}
                  onClick={() => handleClickOpen(setOpenAlert)}
                >
                  <Button variant='contained' className='nav-icon-span' sx={{ marginBottom: 1 }} endIcon={<FiLogOut />}>
                    <Typography variant='button'> Logout</Typography>
                  </Button>
                </li>
              </>
            ) : (
              <li className="nav-links">
                <Tooltip title='Login'>
                  <NavLink to='/login'>
                    <span className='nav-icon-span'>
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
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogContent sx={{ width: { xs: 280, md: 350, xl: 400 }, display: 'flex', justifyContent: 'center' }}>
          <Typography variant='h6'>  Do You Want To Logout?</Typography>
        </DialogContent>
        <DialogActions sx={{ display: 'flex', justifyContent: 'space-evenly' }}>
          <Link to="/">
            <Button variant='contained' endIcon={<FiLogOut />} color='primary' onClick={() => handleLogOut(setProceed, toast, navigate, setOpenAlert)}>Logout</Button>
          </Link>
          <Button variant='contained' color='error' endIcon={<AiFillCloseCircle />} onClick={() => handleClose(setOpenAlert)}>Close</Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default DesktopNavigation;
