import { Box, createTheme, ThemeProvider } from "@mui/material"
import { Outlet } from "react-router-dom"
import {Container} from"@mui/material"
import CssBaseline from "@mui/material/CssBaseline"
import Navbar from "./NavBar"

function App() {
  const darkMode = false;
  const palletType = darkMode ? 'dark' : 'light';

  const theme = createTheme({
    palette: {
      mode: palletType,
      background: {
        default: palletType === 'light' ? '#eaeaea' : '#121212'
      }
    }
  })

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
          <Outlet />     
        </Container>
      </Box>
    </ThemeProvider>

  )
}

export default App
