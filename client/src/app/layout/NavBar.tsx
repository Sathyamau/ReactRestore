
import { AppBar, Box, List, ListItem, Toolbar, Typography } from "@mui/material";
import { NavLink } from "react-router-dom";

const midLinks = [
  { title: 'Catalog', path: '/catalog' },
  { title: 'About', path: '/about' },
  { title: 'Contact', path: '/contact' }
];

const rightLinks = [
  { title: 'login', path: '/login' },
  { title: 'register', path: '/register' }
];

const navStyles = {
  color: 'inherit', 
  typography: 'h6', 
  textDecoration: 'none', 
  '&:hover': { color: 'grey.500' }, 
  '&.active': { color: '#baecf9' }
}; 

export default function Navbar() {
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
    </AppBar>
  );
}