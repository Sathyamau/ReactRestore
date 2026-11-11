import { Box, Button, Grid2, Paper, Typography } from "@mui/material";
import { currencyFormat } from "../../lib/util";
import type { Item } from "../../app/models/basket";
import { useRemoveItemFromBasketMutation, useAddItemToBasketMutation } from "./BasketApi";




interface BasketItemProps {
  item: Item
}

function BasketItem({ item }: BasketItemProps) {

  const[removeItemFromBasket] = useRemoveItemFromBasketMutation();
  const[addItemToBasket] = useAddItemToBasketMutation();

  return (
    <Paper sx={{ height:140, borderRadius: 3, display: 'flex', justifyContent: 'space-between', 
      alignItems: 'center', mb: 2,}} 
      >
      <Box display='flex' alignItems="center">
        <Box component="img" 
          src={item.pictureUrl} 
          alt={item.name}
          sx={{ height: 100, width: 100, borderRadius: '4px', objectFit: 'cover', mr:8, ml:4 }} />
        
        <Box display='flex' flexDirection='column'gap={1}>
            <Typography variant="h6">{item.name}</Typography>
            <Box display='flex' alignItems='center' gap={3}>
              <Typography sx={{ fontSize : '1.1rem'}}>
                {currencyFormat(item.price)} x {item.quantity}
              </Typography>
              <Typography sx={{ fontSize : '1.1rem'}} color="primary">
               { currencyFormat(item.price * item.quantity)}
              </Typography>
            </Box>
            <Grid2 container spacing={1} alignItems="center">
                <Button sx={{borderWidth: 1, borderColor: 'grey.400', borderStyle: 'solid'}}
                  onClick={() => addItemToBasket({ product: item, quantity: 1 })}
                >
                    +
                </Button>
                <Typography variant="h6">
                    {item.quantity}
                </Typography>
                <Button sx={{borderWidth: 1, borderColor: 'grey.400', borderStyle: 'solid'}}
                  onClick={() => removeItemFromBasket({ productId: item.productId, quantity: 1 })}
                >
                    -
                </Button>
            </Grid2>
        </Box>        
      </Box>
      <Button sx={{alignSelf: 'start', borderWidth: 1, borderColor: 'grey.400', borderStyle: 'solid', mr:1, mt:1}} 
            onClick={() => removeItemFromBasket({ productId: item.productId, quantity: item.quantity })}>
          X
      </Button>
    </Paper>
  );
}

export default BasketItem;