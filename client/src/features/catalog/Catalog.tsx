import AppPagination from "../../app/shared/components/AppPagination";
import Grid2 from "@mui/material/Grid2/Grid2";
import { useFetchFiltersQuery, useFetchProductsQuery } from "./catalogApi";
import ProductList from "./ProductList"
import Filters from "./Filters";
import { useAppDispatch, useAppSelector } from "../../app/store/store";
import { setPageNumber } from "./catalogSlice";
import Typography from "@mui/material/Typography/Typography";



export default function Catalog() {
  const productParams = useAppSelector(state => state.catalog);
  const { data, isLoading, isError } =  useFetchProductsQuery(productParams);
  const { data:filtersData, isLoading: filtersLoading, isError: filtersError } = useFetchFiltersQuery();
  const dispatch = useAppDispatch();

  if (isError) return <p>Error loading products</p>;
  if (isLoading || !data) return <p>Loading...</p>;
  if (filtersError) return <p>Error loading filters</p>;
  if (filtersLoading || !filtersData) return <p>Loading filters...</p>;

  return (
    <Grid2 container spacing={4}>
      <Grid2 size={3}>
        <Filters filtersData={filtersData}/>
      </Grid2>
      <Grid2 size={9}>
        {data.items && data.items.length > 0 ? (
        <>
          <ProductList products={data.items} />
          <AppPagination metadata={data.pagination} onPageChange={(page) => {
            
            dispatch(setPageNumber(page))
            window.scrollTo({
              top: 0,
              behavior: 'smooth'
            });
            
            }} /> 
        </>
        ) : (
          <Typography variant="h6">There are no products available</Typography>
        )}
      </Grid2>
    </Grid2>
  )
}
