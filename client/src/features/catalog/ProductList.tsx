import type { Product } from "../../app/models/product";
import Grid2 from "@mui/material/Grid2/Grid2";
import ProductCard from "./ProductCard";

type Props = {
  products: Product[]
}

const ProductList = ({products} : Props) => {
    return (
            <Grid2 container spacing={3}>
                {products.map(product => 
                    (
                        <Grid2 size={3} key={product.id} display="flex" justifyContent="center">
                            <ProductCard  product={product} />
                        </Grid2>
                    )
                )}
            </Grid2>
    );
};

export default ProductList;