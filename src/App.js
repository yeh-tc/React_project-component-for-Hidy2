import { ThemeProvider, createTheme, responsiveFontSizes } from '@mui/material/styles';
import Container from "@mui/material/Container";
import Map from "./layout/Map";

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
    fontFamily: [
      "Rubik",
      "sans-serif"
    ].join(",")
  },
});
theme = responsiveFontSizes(theme);
export default function App() {
  

  return (
    <ThemeProvider theme={theme}>
    <Container maxWidth="false" disableGutters={true}>
      <Map />
      {/*<BrowserRouter>
      <Routes>
        <Route path="/" element={<Page />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/cruise/:crusiename" element={<CruisePage />}/>
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
      </BrowserRouter>*/}
    </Container>
    </ThemeProvider>
  );
}
