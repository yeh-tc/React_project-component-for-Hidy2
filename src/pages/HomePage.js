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
  const [selectCruiseId, setSelectCruiseId] = useState(null);
  const [activeCruise, setActiveCruise] = useState(null);
 
  return (
    <>
      <Stack direction="row">
        <Drawers
          openNav={open}
          onCloseNav={() => {
            setOpen(false);
          }}
          selectCruiseId={selectCruiseId}
          setActiveCruise={setActiveCruise}
          activeCruise={activeCruise}
         
        />
        <Main>
          <Map 
          onOpenNav={() => setOpen(true)} 
          setSelectCruiseId={setSelectCruiseId}
          activeCruise={activeCruise}
          setActiveCruise={setActiveCruise}
          />
      
        </Main>
      </Stack>
    </>
  );
}
