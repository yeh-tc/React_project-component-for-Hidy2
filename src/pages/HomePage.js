import Drawers from "../components/drawer/Drawers";
import Map from "../components/map/Map";
import { styled } from "@mui/material/styles";
import { Stack } from "@mui/material";
import { useState } from "react";
//左邊Drawer的style
const Main = styled("div")({
  flexGrow: 1,
  minHeight: "100vh",
});

export default function HomePage() {
  //左邊Drawer是否open
  const [open, setOpen] = useState(false);
  //api搜尋結果 要放在左邊Drawer的航次資料(as ListitenButton)
  //從Map.js 傳到 Drawers.js
  const [cruiseIdinDrawer, setCruiseIdinDrawer] = useState(null);
  //滑鼠hover到物件的航次id(Map.js和Drawers.js都可以setActiveHover)
  const [activeHover, setActiveHover] = useState(null);
  //滑鼠click到物件的航次id(Map.js和Drawers.js都可以setActiveClick)
  const [activeClick, setActiveClick] = useState(null);
  //查詢化學資料的經度1 從Drawers.js 傳到 Map.js
  const [lon1, setLon1]=useState(0);
  //查詢化學資料的經度2 從Drawers.js 傳到 Map.js
  const [lon2, setLon2]=useState(130);
  //查詢化學資料的緯度1 從Drawers.js 傳到 Map.js
  const [lat1, setLat1]=useState(-60);
  //查詢化學資料的緯度2 從Drawers.js 傳到 Map.js
  const [lat2, setLat2]=useState(60);
  //查詢化學資料的日期1 從Drawers.js 傳到 Map.js
  const [time1, setTime1]=useState('19950519');
  //查詢化學資料的日期2 從Drawers.js 傳到 Map.js
  const [time2, setTime2]=useState('20050519');
  //查詢化學資料的船 從Drawers.js 傳到 Map.js
  const [rv, setRv]=useState('*');
  //查詢化學資料的參數 從Drawers.js 傳到 Map.js
  const [parameter, setParameter]=useState('D.O.,NO3,NO2');

 
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
          setRv={setRv}
         
        />
        <Main>
          <Map 
          onOpenNav={() => setOpen(true)} 
          setCruiseIdinDrawer={setCruiseIdinDrawer}
          activeHover={activeHover}
          activeClick={activeClick}
          setActiveClick={setActiveClick}
          setActiveHover={setActiveHover}
          lon1={lon1}
          lon2={lon2}
          lat1={lat1}
          lat2={lat2}
          time1={time1}
          time2={time2}
          rv={rv}
          parameter={parameter}
          />
      
        </Main>
      </Stack>
    </>
  );
}
