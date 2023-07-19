
import {forwardRef} from "react";
import { Modal, Typography, Box, Stack, IconButton } from "@mui/material";
import ArrowCircleLeftIcon from "@mui/icons-material/ArrowCircleLeft";
import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";

const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "60%",
    height: "60%",
    bgcolor: "background.paper",
    border: "2px solid #000",
  
    boxShadow: 24,
    p: 4,
  };
const ModalContent =  forwardRef(({ object, handlePrevious, handleNext }, ref) => (
  <Box ref={ref} sx={style}>
    <Stack
      direction="row"
      justifyContent="flex-start"
      alignItems="center"
      spacing={3}
    >
      <Typography
        id="modal-modal-title"
        variant="h6"
        component="h2"
        sx={{ color: "#1976d2", fontWeight: 600 }}
      >
        {object.properties.odb_cruise_id}
      </Typography>
      <Stack
        direction="row"
        justifyContent="flex-start"
        alignItems="center"
      >
        <IconButton  sx={{ color: "#1976d2" }}>
          <ArrowCircleLeftIcon />
        </IconButton>
        <Typography variant="h6" sx={{ color: "#1976d2" }}>
          {object.properties.station}
        </Typography>
        <IconButton  sx={{ color: "#1976d2" }}>
          <ArrowCircleRightIcon />
        </IconButton>
      </Stack>
    </Stack>
    <Stack>
      <Typography sx={{ mt: 1,color:'#565360' }}>
        Date&nbsp;(GMT+8):&nbsp;{object.properties.date}&nbsp;{object.properties.time}
      </Typography>
      <Typography sx={{ mt: 1 ,color:'#565360'}}>
        Location:&nbsp;{object.geometry.coordinates[1]},&nbsp;{object.geometry.coordinates[0]}
      </Typography>
      <Typography  sx={{ mt: 1 ,color:'#565360'}}>
        Maximum Depth:&nbsp;{object.properties.depth}&nbsp;m
      </Typography>
    </Stack>
    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
      Data
    </Typography>
  </Box>
));


export default function StationModal ({index, object, open, setOpen}){
    
    const handleClose = () => {
          setOpen(false);
    };
    //const handleNext = () => setIndex(index + 1);
    //const handlePrevious = () => setIndex(index - 1);
    
    return(
        <Modal
        open={open}
        onClose={handleClose}
        >
        <div tabIndex={-1}>
        <ModalContent
          object={object}
        />
        </div>
      </Modal>
    );
}