
import { useFetchProductsQuery } from "./CatalogAPI";
import ProductList from "./ProductList"

export default function Catalog() {

  const { data, isLoading, isError } = useFetchProductsQuery();

  return (
    <>
      {(isLoading) && <p>Loading...</p>}
      {isError && <p>Error loading products</p>}
      {!isLoading && !isError && data && <ProductList products={data} />}
    </>
  )
}
