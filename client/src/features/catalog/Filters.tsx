
import { Button } from "@mui/material";
import CheckboxButtons from "../../app/shared/components/CheckboxButtons";
import RadioButtonGroup from "../../app/shared/components/RadioButtonGroup";
import { useAppSelector, useAppDispatch } from "../../app/store/store";
import { setBrands, setTypes, setOrderBy, resetParams } from "./catalogSlice";
import Box from "@mui/material/Box/Box";
import Paper from "@mui/material/Paper/Paper";
import Search from "./Search";

const sortOptions = [
    { value: 'priceAsc', label: 'Price: Low to High' },
    { value: 'priceDesc', label: 'Price: High to Low' },
    { value: 'nameAsc', label: 'Name: A to Z' }
];

type FiltersProps = {
    filtersData: {
        brands: string[];
        types: string[];
    }
}

export default function Filters({ filtersData: data }: FiltersProps) {

    const {orderBy, brands, types} = useAppSelector(state => state.catalog);
    const dispatch = useAppDispatch();

  return (
    <Box display="flex" flexDirection="column" gap={3}>
        <Paper>
           <Search />
        </Paper>
        <Paper sx={{p:3}}>
            <RadioButtonGroup sortOptions={sortOptions} 
                onChange={(e) => dispatch(setOrderBy(e.target.value))} 
                selectedValue={orderBy} />
        </Paper>
        <Paper sx={{p:3}}>
            <CheckboxButtons 
                items={data?.brands || []} 
                checked={brands} 
                onChange={(items: string[]) => dispatch(setBrands(items))} 
            />
        </Paper>
        <Paper sx={{p:3}}>
            <CheckboxButtons 
                items={data?.types || []} 
                checked={types} 
                onChange={(items: string[]) => dispatch(setTypes(items))} 
            />
        </Paper>
        <Button
            variant="contained"
            onClick={() => {
                dispatch(resetParams());
            }}
        >
            Reset Filters
        </Button>
    </Box>
  );
}