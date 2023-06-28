import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom';
import { ThemeProvider, createTheme, responsiveFontSizes } from '@mui/material/styles';
import FeedPage from "./pages/FeedPage";
import HomePage from "./pages/HomePage";
import Container from "@mui/material/Container";

let theme = createTheme({
  palette: {
    
    text: {
      primary:'#565360',
      secondary:'#908E9B',
      disabled:'E1DFE9'

    },
    background:{
      paper:'#F2F5F5',
      default:'#F2F5F5'
    }
  
  },
  typography: {
    fontFamily:
      '"Public Sans"'
  },
});
theme = responsiveFontSizes(theme);
export default function App() {
  

  return (
    <ThemeProvider theme={theme}>
    <Container maxWidth="false" disableGutters={true}>
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<FeedPage />} />
        <Route path="/home" element={<HomePage />} />
        {/*<Route path="/cruise/:crusiename" element={<CruisePage />}/>*/}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
      
        
      </BrowserRouter>
    </Container>
    </ThemeProvider>
  );
}
