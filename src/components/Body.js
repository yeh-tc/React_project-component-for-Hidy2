import Stack from "@mui/material/Stack";
import Box from '@mui/material/Box';
import Sidebar from "./Sidebar";


export default function Body({sidebar, children}){
    return(
        <Stack direction="row" spacing={2} className="App" >
        {sidebar &&<Sidebar />}
        <Box>
          {children}
        </Box>
      </Stack>
    );

}