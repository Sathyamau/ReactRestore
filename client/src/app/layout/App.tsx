import { useEffect, useState } from "react"
import { Box, createTheme, ThemeProvider } from "@mui/material"
import type { Product } from "../models/product"
import Catalog from "../../features/catalog/Catalog"
import {Container} from"@mui/material"
import CssBaseline from "@mui/material/CssBaseline"
import Navbar from "./NavBar"

function App() {

  const[products, setProducts] = useState<Product[]>([])

  const darkMode = true;
  const palletType = darkMode ? 'dark' : 'light';

  const theme = createTheme({
    palette: {
      mode: palletType,
      background: {
        default: palletType === 'light' ? '#eaeaea' : '#121212'
      }
    }
  })


  useEffect(() => {
    fetch('https://localhost:5001/api/products')
      .then(response => response.json())
      .then(data => setProducts(data))      
  }, [])


  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Navbar />
      <Box 
          sx={{ 
            minHeight: '100vh', 
            background: darkMode
             ? 'radial-gradient(circle, #1e3aBa, #111B27)'
             : 'radial-gradient(circle, #baecf9, #f0f9ff)',
             py: 6
            }}
        >
          <Container maxWidth='xl' sx={{ mt: 4 }}>
          <Catalog products={products} />      
        </Container>
      </Box>
    </ThemeProvider>

  )
}

export default App
