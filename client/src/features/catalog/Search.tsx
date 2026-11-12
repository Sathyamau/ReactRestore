import TextField from "@mui/material/TextField";
import { useAppDispatch, useAppSelector } from "../../app/store/store";
import { useState, useEffect } from "react";
import { setSearchTerm } from "./catalogSlice";
import debounce from "@mui/material/utils/debounce";

const Search = () => {

    const {searchTerm} = useAppSelector(state => state.catalog);
    const dispatch = useAppDispatch();
    const [term, setTerm] = useState(searchTerm);

useEffect(() => {
    setTerm(searchTerm);
}, [searchTerm]);

const debouncedSearch = debounce(event => {
    dispatch(setSearchTerm(event.target.value));
}, 500);


  return (
     <TextField label="Search Products" variant="outlined" fullWidth value={term} 
     onChange={(e) => {
         setTerm(e.target.value);
         debouncedSearch(e);
     }} />   
  );
};

export default Search;