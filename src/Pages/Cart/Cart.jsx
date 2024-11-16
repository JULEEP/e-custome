import React from 'react'
import {
    Typography,
    Container,
    CssBaseline,
    Box,
} from '@mui/material'
import { EmptyCart } from '../../Assets/Images/Image'
import './Cart.css'

const Cart = () => {
    return (
        <>
            <CssBaseline />
            <Container fixed>
                <Typography variant="h3" sx={{ textAlign: 'center', marginTop: 30, color: '#1976d2', fontWeight: 'bold' }}>
                    Cart
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
                            src={EmptyCart}
                            alt="Empty_cart"
                            className="empty-cart-img"
                        />
                        <Typography
                            variant="h6"
                            sx={{ textAlign: 'center', color: '#1976d2', fontWeight: 'bold' }}
                        >
                            Your Cart is Empty
                        </Typography>
                    </div>
                </Box>
            </Container>
        </>
    )
}

export default Cart
