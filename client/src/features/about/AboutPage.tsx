import { ButtonGroup, Typography, Button, Alert, AlertTitle, List, ListItem } from "@mui/material";
import { useState } from "react";
import { errorApi } from "./errorApi";
import Container from "@mui/material/Container/Container";

export default function AboutPage() {

  const [validationErrors, setValidationErrors] = useState<string[]>([]);

  const [trigger400Error] = errorApi.useLazyGet400ErrorQuery();
  const [trigger401Error] = errorApi.useLazyGet401ErrorQuery();
  const [trigger404Error] = errorApi.useLazyGet404ErrorQuery();
  const [trigger500Error] = errorApi.useLazyGet500ErrorQuery();
  const [triggerValidationError] = errorApi.useLazyGetValidationErrorQuery();

  const getValidationError = async () => {
    try {
      await triggerValidationError().unwrap();
    } catch (err : unknown) {
      if(err && typeof err === 'object' && 'message' in err && typeof (err as {message : unknown}).message === 'string'){
          const errorArray = (err as {message : string}).message.split(',') || [];
          setValidationErrors(errorArray);
      }
    }
  };


  return (
   <Container maxWidth="lg">
    <Typography variant="h3" gutterBottom>
      Errors for Testing
    </Typography>
    <ButtonGroup fullWidth>
      <Button variant="contained" onClick={() => trigger400Error().catch(err => console.log(err))}>Test 400 Error</Button>
      <Button variant="contained" onClick={() => trigger401Error().catch(err => console.log(err))}>Test 401 Error</Button>
      <Button variant="contained" onClick={() => trigger404Error().catch(err => console.log(err))}>Test 404 Error</Button>
      <Button variant="contained" onClick={() => trigger500Error().catch(err => console.log(err))}>Test 500 Error</Button>  
      <Button variant="contained" onClick={() => getValidationError()}>Test Validation Error</Button>  
    </ButtonGroup>
    {validationErrors.length > 0 && (

    <Alert severity="error">
      <AlertTitle>Validation Errors</AlertTitle>
      <List>
                {validationErrors.map((error, index) => (
                <ListItem key={index}>{error}</ListItem>
              ))}
      </List>
    </Alert>
    )}
   </Container>
  );
}