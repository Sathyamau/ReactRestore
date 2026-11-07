import Typography from "@mui/material/Typography/Typography";
import Paper from "@mui/material/Paper/Paper";
import { Link } from "react-router-dom";
import {Button } from "@mui/material";


export default function NotFound() {
  return (
    <Paper>
      <Typography variant="h3" gutterBottom sx={{px:4, pt:2}} color="secondary">
        Page Not Found
      </Typography>
    
    <Typography variant="body1" sx={{px:4}}>
        The page you are looking for does not exist.
      </Typography>

      <Button fullWidth component={Link} to='/catalog'>
        Go to Catalog
      </Button>
    </Paper>
  );
}