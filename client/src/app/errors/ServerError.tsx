import Divider from "@mui/material/Divider/Divider";
import Paper from "@mui/material/Paper/Paper";
import Typography from "@mui/material/Typography/Typography";
import { useLocation } from "react-router-dom";

export default function ServerError() {

const { state } = useLocation();

  return (
   <Paper>
    {state.error ? (
      <>
        <Typography variant="h3" gutterBottom sx={{px:4, pt:2}} color="secondary">
          {state.error.title}
        </Typography>
        <Divider/>
        <Typography variant="body1" sx={{px:4}}>
          {JSON.stringify(state.error)}
        </Typography>
      </>
    ) : (
      <Typography variant="h5" gutterBottom sx={{px:4, pt:2}} color="secondary">
        Server Error - No error information available.
      </Typography>
    )}
   </Paper>
  );
}