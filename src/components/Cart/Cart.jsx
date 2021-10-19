import React, { Fragment } from 'react'
import { Container, Typography, Button, Grid } from '@material-ui/core';
import { CartItem } from './CartItem/CartItem';
import useStyles from'./style';
import { Link } from 'react-router-dom';

 export const Cart = ({cart,handelUpdateCartQ,handelRemoveCart,handelEmptyCart}) => {
    const classes = useStyles();

    const EmptyCart=()=>(
        <Typography variant='subtitle1'>You haven't items in your shopping cart , 
        <Link to='/' className={classes.link}>Addind some</Link>
        </Typography>
    );
    const FilleCart=()=>(
        <Fragment>
            <Grid container spacing={3}>
                {cart.line_items.map((item)=>(
                    <Grid item xs={12} sm={4} key={item.id}>
                       <CartItem item={item} onUpdateCart={handelUpdateCartQ} onRemoveCart={handelRemoveCart}/>
                        </Grid>
                ))}
            </Grid>
            <div className={classes.cardDetails}>
        <Typography variant="h4">Subtotal: {cart.subtotal.formatted_with_symbol}</Typography>
        <div>
          <Button className={classes.emptyButton} size="large" type="button" variant="contained" color="secondary" onClick={handelEmptyCart}>Empty cart</Button>
          <Button className={classes.checkoutButton} component={Link} to='/cheackout' size="large" type="button" variant="contained" color="primary">Checkout</Button>
        </div>
      </div>
        </Fragment>
    );
    if(!cart.line_items)return 'looodig......'

    return (
        <Container>
            <div className={classes.toolbar} />
            <Typography className={classes.title} variant='h3' gutterBottom>Your Shopping Cart</Typography>
            {!cart.line_items.length? <EmptyCart />:<FilleCart />}
        </Container>
    )
}
