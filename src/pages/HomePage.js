import Drawers from "../components/drawer/Drawers";
import Map from "../components/map/Map";
import { styled } from "@mui/material/styles";
import { Stack } from "@mui/material";
import { useState } from "react";

const Main = styled("div")({
  flexGrow: 1,
  minHeight: "100vh",
});

export default function HomePage() {
  const [open, setOpen] = useState(false);
  const [cruiseIdinDrawer, setCruiseIdinDrawer] = useState(null);
  const [activeHover, setActiveHover] = useState(null);
  const [activeClick, setActiveClick] = useState(null);
 
  return (
    <>
      <Stack direction="row">
        <Drawers
          openNav={open}
          onCloseNav={() => {
            setOpen(false);
          }}
          cruiseIdinDrawer={cruiseIdinDrawer}
          activeHover={activeHover}
          activeClick={activeClick}
          setActiveClick={setActiveClick}
          setActiveHover={setActiveHover}
         
        />
        <Main>
          <Map 
          onOpenNav={() => setOpen(true)} 
          setCruiseIdinDrawer={setCruiseIdinDrawer}
          activeHover={activeHover}
          activeClick={activeClick}
          setActiveClick={setActiveClick}
          setActiveHover={setActiveHover}
          />
      
        </Main>
      </Stack>
    </>
  );
}
