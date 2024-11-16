import React from 'react'
import {
    Typography,
    Container,
    CssBaseline,
    Box,
} from '@mui/material'
import { EmptyWishlist } from '../../Assets/Images/Image'
import './wishlist.css'
const WishList = () => {
  return (
        <>
            <CssBaseline />
            <Container fixed>
                <Typography variant="h4" sx={{ textAlign: 'center', marginTop: 30, color: '#1976d2', fontWeight: 'bold' }}>
                    Your Wishlist
                </Typography>
                <Box sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexDirection: 'column',
                    width: '100%',
                }}>
                    <div className="main-card">
                        <img
                            src={EmptyWishlist}
                            alt="Empty_cart"
                            className="empty-cart-img"
                        />
                        <Typography
                            variant="h6"
                            sx={{ textAlign: 'center', color: '#1976d2', fontWeight: 'bold' }}
                        >
                            Please add some Products in your WishList!
                        </Typography>
                    </div>
                </Box>
            </Container>
        </>
  )
}

export default WishList
