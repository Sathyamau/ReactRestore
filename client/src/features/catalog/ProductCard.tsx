import { Link } from "react-router-dom";
import type { Product } from "../../app/models/product";
import { Button, Card, CardActions, CardContent, CardMedia, Typography } from "@mui/material";
import { useAddItemToBasketMutation } from "../basket/BasketApi";
import { currencyFormat } from "../../lib/util";

type Props = {
  product: Product
}

export default function ProductCard({product} : Props) {

    const [addBasketItem, {isLoading}] = useAddItemToBasketMutation();

  return (
    <Card elevation={3} sx={{ width: 280, borderRadius: 2, display: 'flex', flexDirection: 'column' }}>
        <CardMedia sx={{ height: 240, backgroundSize: 'cover' }}
        image={product.pictureUrl} title={product.name}/>
        <CardContent>
            <Typography gutterBottom sx={{textTransform:'uppercase'}} variant="subtitle2">
                {product.name}
            </Typography>
            <Typography gutterBottom sx={{color:'secondary.main'}} variant="h6">
                {currencyFormat(product.price)}
            </Typography>
        </CardContent>
        <CardActions sx={{ justifyContent: 'space-between' }}>
            <Button disabled={isLoading} onClick={() => addBasketItem({ product: product, quantity: 1 })}>
                Add to Cart
            </Button>
             <Button component={Link} to={`/catalog/${product.id}`}> 
                View Details
            </Button>
        </CardActions>
    </Card>
  )
}
