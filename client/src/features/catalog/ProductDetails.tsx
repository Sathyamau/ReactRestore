import { useParams } from "react-router-dom";
import Grid2 from "@mui/material/Grid2/Grid2";
import { Button, Divider, Table, TableBody, TableContainer, TextField, Typography, TableRow, TableCell } from "@mui/material";
import { useFetchProductDetailsQuery } from "./CatalogAPI";

export default function ProductDetails() {
  const { id } = useParams();
 
  const { data: product, isLoading, isError } = useFetchProductDetailsQuery(Number(id));

  if(isLoading || !product) return <Typography variant="h5">Loading...</Typography>;
  if(isError) return <Typography variant="h5">Error loading product</Typography>;

const productDetails = [
  { label: 'Name', value: product.name },
  { label: 'Description', value: product.description },
  { label: 'Type', value: product.type },
  { label: 'Brand', value: product.brand },
  { label: 'Quantity in Stock', value: product.quantityInStock }
];


  return (
    <Grid2 container spacing={6} maxWidth="lg" sx={{ mx: 'auto' }}>
      <Grid2 size={6}>
        <img
          src={product?.pictureUrl}
          alt={product?.name}
          style={{ width: '100%'}}
        />
      </Grid2>
      <Grid2 size={6}>
        <Typography variant="h3">
          {product.name}
        </Typography>
        <Divider sx={{ mb: 2 }} />
        <Typography variant="h4" color="secondary">
          ${(product.price / 100).toFixed(2)}
        </Typography>
        <TableContainer>
          <Table sx={{
            '& td' : { fontSize: '1rem' }
          }}>
            <TableBody>
              {productDetails.map((detail, index) => (
                <TableRow key={index}>
                  <TableCell sx={{ fontWeight: 'bold' }}>{detail.label}</TableCell>
                  <TableCell>{detail.value}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Grid2 container spacing={2} marginTop={3}>
            <Grid2 size={6}>
              <TextField
                variant="outlined"
                label="Quantity in basket"
                type="number"
                fullWidth
                defaultValue={1}
              />
            </Grid2>
            <Grid2 size={6}>
              <Button sx={{ height: '55px' }} color="primary" variant="contained" size="large" fullWidth>Add to Basket</Button>
            </Grid2>
        </Grid2>
      </Grid2>
    </Grid2>
  );
}