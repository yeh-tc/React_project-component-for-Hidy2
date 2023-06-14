import { Button } from "@mui/material";
import { styled } from "@mui/material/styles";
import TuneIcon from "@mui/icons-material/Tune";



const ButtonStyle = styled(Button)({
  boxShadow: "none",
  backgroundColor: "#f2f5f5",
  color: "#000000",
  minWidth: 32,
  width:32,
  height:32,
  borderRadius: "2px",
  "&:hover": {
    backgroundColor: "#DDDBE6",
    borderColor: "transprant",
    boxShadow: "none",
  },
});

export default function DrawerIcon({ onOpenNav }) {
  
    
  return (

    <>
    <ButtonStyle variant="contained" className="filtericon_draweropen" sx={{display: { md: 'none' }, }} onClick={onOpenNav}>
      <TuneIcon sx={{ width: 22 }} />
    </ButtonStyle>
  </>

  );
}
