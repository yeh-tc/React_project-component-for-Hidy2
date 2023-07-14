import { useState } from "react";
import { Marker, Tooltip } from "react-leaflet";
import { Modal, Typography, Box, Stack, IconButton } from "@mui/material";
import L from "leaflet";
import stationsvg from "./SVG/blue_small_1.svg";
import orangesvg from "./SVG/orange_small_1.svg";
import greysvg from "./SVG/grey_small.svg";
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
export default function MapMarker({
  object,
  isClicked,
  isHovered,
  id,
  setActiveHover,
}) {
  const [open, setOpen] = useState(false);
  const handleClose = () => {
    console.log(object);
    setOpen(false);
  };

  return (
    <>
      <Marker
        position={[
          object.geometry.coordinates[0],
          object.geometry.coordinates[1],
        ]}
        icon={L.icon({
          iconUrl: isClicked ? greysvg : isHovered ? orangesvg : stationsvg,
          iconSize: [12, 12],
          iconAnchor: [5.6, 7],
        })}
        eventHandlers={{
          mouseover: () => setActiveHover(id),
          mouseout: () => setActiveHover(null),
          click: () => setOpen(true),
        }}
        zIndexOffset={isClicked ? 9999 : isHovered ? 9999 : 500}
      >
        <Tooltip direction="top" offset={[0, 0]}>
          {object.properties.date} &nbsp; Sta:{object.properties.station}<br/>
          Click for data display.
        </Tooltip>
      </Marker>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
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
              <IconButton sx={{ color: "#1976d2" }}>
                <ArrowCircleLeftIcon />
              </IconButton>
              <Typography variant="h6" sx={{ color: "#1976d2" }}>
                {object.properties.station}
              </Typography>
              <IconButton sx={{ color: "#1976d2" }}>
                <ArrowCircleRightIcon />
              </IconButton>
            </Stack>
          </Stack>
          <Stack>
            <Typography sx={{ mt: 1,color:'#565360' }}>
              Date&nbsp;(GMT+8):&nbsp;{object.properties.date}&nbsp;{object.properties.time}
            </Typography>
            <Typography sx={{ mt: 1 ,color:'#565360'}}>
              Location:&nbsp;{object.geometry.coordinates[1]},{object.geometry.coordinates[0]}
            </Typography>
            <Typography  sx={{ mt: 1 ,color:'#565360'}}>
              Maximum Depth:&nbsp;{object.properties.depth}&nbsp;m
            </Typography>
          </Stack>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Data
          </Typography>
        </Box>
      </Modal>
    </>
  );
}
