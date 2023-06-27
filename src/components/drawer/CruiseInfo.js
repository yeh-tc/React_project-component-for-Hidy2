import {
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  Collapse,
} from "@mui/material";
import AnchorIcon from "@mui/icons-material/Anchor";

export default function CruiseInfo({
  index,
  text,
  open,
  handleClick,
  activeHover,
  setActiveHover
}) {
    let validJsonString = text[0].para.replace(/'/g, '"');
    let paraArray = JSON.parse(validJsonString);
    const isHovered = activeHover === text[0].id
    
    
  return (
    <>
      <ListItemButton
        onClick={() => handleClick(index)}
        onMouseEnter={() => setActiveHover(text[0].id)}
        onMouseLeave={() => setActiveHover(null)}
        sx={{ color: isHovered? '#EB862F':"#1976d2"}}
      >
        <ListItemIcon  sx={{ color: "#1976d2"}}>
          <AnchorIcon />
        </ListItemIcon>
        <ListItemText >
          <Typography >
            <b>{text[0].id}</b>
          </Typography>
        </ListItemText>
      </ListItemButton>
      <Collapse in={open[index]} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItemText sx={{ pl: 9 }}>
            <Typography>
              <b>Deaparture Date:</b>
              <br /> {text[0].departure}
            </Typography>
          </ListItemText>
          <ListItemText sx={{ pl: 9 }}>
            <b>Return Date:</b>
            <br /> {text[0].return}
          </ListItemText>
          <ListItemText sx={{ pl: 9 }}>
            <b>Max Depth:</b>
            <br /> {text[0].max_depth} m
          </ListItemText>
          <ListItemText sx={{ pl: 9, pr: 1 }}>
            <b>Parameter:</b>
            <br /> {paraArray.map((data) => {
                if (data === 'NO3'){
                    return <Typography key={data}>Nitrate<br/></Typography>;
                }else if(data === 'NO2'){
                    return <Typography key={data}>Nitrite<br/></Typography>;
                }else if(data === 'PO4'){
                    return <Typography key={data}>Phosphate<br/></Typography>;
                }else if(data === 'NH4'){
                    return <Typography key={data}>Ammonium<br/></Typography>;
                }
                return <Typography key={data}>{data}<br/></Typography>;
            })}
          </ListItemText>
        </List>
      </Collapse>
    </>
  );
}
