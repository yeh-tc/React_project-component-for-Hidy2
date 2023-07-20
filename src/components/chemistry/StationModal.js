import { forwardRef, useState,useEffect } from "react";
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
const ModalContent = forwardRef(
  ({ object, handlePrevious, handleNext, isLast, isFirst }, ref) => (
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
        <Stack direction="row" justifyContent="flex-start" alignItems="center">
          <IconButton
            onClick={handlePrevious}
            sx={{ color: "#1976d2" }}
            disabled={isFirst}
          >
            <ArrowCircleLeftIcon />
          </IconButton>
          <Typography variant="h6" sx={{ color: "#1976d2" }}>
            St: {object.properties.station}
          </Typography>
          <IconButton
            onClick={handleNext}
            sx={{ color: "#1976d2" }}
            disabled={isLast}
          >
            <ArrowCircleRightIcon />
          </IconButton>
        </Stack>
      </Stack>
      <Stack>
        <Typography sx={{ mt: 1, color: "#565360" }}>
          Date&nbsp;(GMT+8):&nbsp;{object.properties.date}&nbsp;
          {object.properties.time}
        </Typography>
        <Typography sx={{ mt: 1, color: "#565360" }}>
          Location:&nbsp;{object.geometry.coordinates[1]},&nbsp;
          {object.geometry.coordinates[0]}
        </Typography>
        <Typography sx={{ mt: 1, color: "#565360" }}>
          Maximum Depth:&nbsp;{object.properties.depth}&nbsp;m
        </Typography>
      </Stack>
      <Typography id="modal-modal-description" sx={{ mt: 2 }}>
        Data
      </Typography>
    </Box>
  )
);

export default function StationModal({ object, objects, open, setOpen }) {
  const handleClose = () => {
    setOpen(false);
  };
  const [index, setIndex] = useState(objects.findIndex((o) => o === object));
  const handleNext = () => {
    if (index < objects.length - 1) {
      setIndex(index + 1);
    }else{
      setIsLast(true);
    }
  };

  const handlePrevious = () => {
    if (index > 0) {
      setIndex(index - 1);
    }
  };
  
  const [isLast, setIsLast] = useState(index === 0);
  const [isFirst, setIsFirst] = useState(index === objects.length - 1);

  useEffect(() => {
    setIsFirst(index === 0);
    setIsLast(index === objects.length - 1);
  }, [index, objects.length]);

  const currentObject = objects[index];
  return (
    <Modal open={open} onClose={handleClose}>
      <div tabIndex={-1}>
        <ModalContent
          object={currentObject}
          handlePrevious={handlePrevious}
          handleNext={handleNext}
          isLast={isLast}
          isFirst={isFirst}
        />
      </div>
    </Modal>
  );
}
