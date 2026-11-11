
import { AppBar, Box, LinearProgress, List, ListItem, Toolbar, Typography } from "@mui/material";
import { NavLink } from "react-router-dom";
import { useAppSelector } from "../store/store";
import { useFetchBasketQuery } from "../../features/basket/BasketApi";


const midLinks = [
  { title: 'Catalog', path: '/catalog' },
  { title: 'About', path: '/about' },
  { title: 'Contact', path: '/contact' }
];

const rightLinks = [
  { title: 'Login', path: '/login' },
  { title: 'Register', path: '/register' }
];

const navStyles = {
  color: 'inherit', 
  typography: 'h6', 
  textDecoration: 'none', 
  '&:hover': { color: 'grey.500' }, 
  '&.active': { color: '#baecf9' }
}; 

export default function Navbar() {

  const {isLoading} = useAppSelector(state => state.ui);
  const {data: basket } = useFetchBasketQuery();

  const itemCount = basket?.items.reduce((sum, item) => sum + item.quantity, 0) || 0;

  return (
    <AppBar position="fixed">
      <Toolbar sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Box display="flex" alignItems="center">
          <Typography component={NavLink} sx={navStyles} to="/"  variant="h6">RE-STORE</Typography>
        </Box>        
        <List sx={{ display: 'flex' }}>
          {midLinks.map(({ title, path }) => (
            <ListItem
              component={NavLink}
              to={path}
              key={path}
              sx={navStyles}
            >
              {title.toUpperCase()}
            </ListItem>
          ))}
        </List>
        <Box  display="flex" justifyContent="flex-end" alignItems="center">
          <Typography component={NavLink} sx={navStyles} to="/basket"  variant="h6">BASKET ({itemCount})</Typography>
        </Box>
        <Box  display="flex" alignItems="center">
          <List sx={{ display: 'flex' }}>
            {rightLinks.map(({ title, path }) => (
              <ListItem
                component={NavLink}
                to={path}
                key={path}
                sx={navStyles}
              >
                {title.toUpperCase()}
              </ListItem>
            ))}
          </List>
        </Box>      
      </Toolbar>
      {isLoading && 
        <Box sx={{ width: '100%' }}>
          <LinearProgress color="secondary" />
        </Box>}
    </AppBar>
  );
}