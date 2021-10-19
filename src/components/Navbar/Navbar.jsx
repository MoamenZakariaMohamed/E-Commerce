import React from 'react'
import { AppBar, Toolbar, IconButton, Badge, MenuItem, Menu, Typography } from '@material-ui/core';
import { ShoppingCart } from '@material-ui/icons';
import logo from '../../assets/commerce.jpg';
import useStyle from './style'
import { Link,useLocation } from 'react-router-dom';

const Navbar = ({totalItems}) => {

    const classes=useStyle()
    const location =useLocation();
    return (
        <div>
            <AppBar  className={classes.appBar} position='fixed' color='inherit' >
                <Toolbar>
                    <Typography component={Link} to='/'  variant='h5' color='inherit' className={classes.title}>
                        <img src={logo} height='25px' className={classes.image} alt='commerce' />
                        Shopy
                    </Typography>
                    <div className={classes.grow} />
                    {location.pathname==='/'&&
                    <div className={classes.button}>
                        <IconButton component={Link} to='/cart' aria-label='Show Card Item' color='inherit'>
                            <Badge badgeContent={totalItems} color='secondary'>
                                <ShoppingCart/>
                            </Badge>
                        </IconButton>

                    </div>}
                </Toolbar>
            </AppBar>
        </div>
    )
}

export default Navbar
