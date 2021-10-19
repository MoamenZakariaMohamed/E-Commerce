import React from 'react';
import { Typography, Button, Card, CardActions, CardContent, CardMedia } from '@material-ui/core';

import useStyles from './style';

export const CartItem = ({item,onUpdateCart,onRemoveCart}) => {
    const classes=useStyles();
    
    return (
        <Card className="cart-item">
        <CardMedia image={item.image.url} alt={item.name} className={classes.media} />
        <CardContent className={classes.cardContent}>
          <Typography variant="h4">{item.name}</Typography>
          <Typography variant="h5">{item.line_total.formatted_with_symbol}</Typography>
        </CardContent>
        <CardActions className={classes.cardActions}>
          <div className={classes.buttons}>
            <Button type="button" size="small" onClick={()=>onUpdateCart(item.id,item.quantity-1)}>-</Button>
            <Typography>&nbsp;{item.quantity}&nbsp;</Typography>
            <Button type="button" size="small" onClick={()=>onUpdateCart(item.id,item.quantity+1)}>+</Button>
          </div>
          <Button variant="contained" type="button" color="secondary" onClick={()=>onRemoveCart(item.id)}>Remove</Button>
        </CardActions>
      </Card>
    )
}
