import { useState, useEffect } from "react";
import { Box, Divider } from "@mui/material";
import { GeoJSON } from "react-leaflet";
import { api } from "./api";
import L from "leaflet";
import Scrollbar from "./scrollbar/Scrollbar";
import SelectCruise from "./SelectCruise";
import SelectDate from "./SelectDate";
import Selectbar from "./Selectbar";
import SelectParameter from "./SelectParameter";
import FailApiWarning from "./FailApiWarning";
import NoDataWarning from "./NoDataWarning";
import Waiting from "./Waiting";


export default function ChemistryData({mapRef}) {
  const [Rv, setRv] = useState("*");
  const [lon, setLon] = useState([106, 128]);
  const [lat, setLat] = useState([3, 33]);
  const [date, setDate] = useState(["1995-05-20", "2012-10-29"]);
  const [parameters, setParameters] = useState(["none"]);
  const [data, setData] = useState();
  const [activeHover, setActiveHover] = useState(null);
  const [activeClick, setActiveClick] = useState(null);

  //query 改變時啟動
  useEffect(() => {
    (async () => {
      const url = `${api}/bottlediver?lat_from=${lat[0]}&lat_to=${lat[1]}&lon_from=${lon[0]}&lon_to=${lon[1]}&date_from=${date[0]}&date_to=${date[1]}&RV=${Rv}&var=${parameters.join(",")}`;
      setData();
      setActiveHover(null);
      setActiveClick(null);
      try {
        const response = await fetch(url);
        const data = await response.json();
        setData(data);
      } catch (error) {
        setData("connection error");
      }
    })();
  }, [Rv, lon, lat, date, parameters]);

  //讓Data的結果置中於地圖
  useEffect(()=>{
    if (data && data.status !== "No result" && data !== undefined && data !== "connection error"){
      let bounds = new L.LatLngBounds();
      data.status.forEach((feature) => {
        let featureBounds = L.geoJSON(feature).getBounds();
        bounds.extend(featureBounds);
      });
      if (mapRef.current) {
      mapRef.current.fitBounds(bounds);
      }
    }
  },[data]);

  const onEachFeature = (feature,layer) =>{
    layer.on({
      mouseover: () => {
        setActiveHover(feature.properties.id);
      },
      mouseout: () => {
        setActiveHover(null);
      },
      click: () => {
        setActiveClick(feature.properties.id);
        //單個GeoJson物件置中於地圖
        mapRef.current.fitBounds(layer._bounds);
      },
    });
  }

  const styleFunc = (feature) =>{
    const isHovered = activeHover === feature.properties.id;
    const isClicked = activeClick === feature.properties.id;
    return {
    color: isClicked ? "#F2F5F5" : isHovered ? "#EB862F" : "#6FBCD8",
    weight: 2,
    };
  }

  return (
    <div>
      <Box
        position="absolute"
        top="10%"
        sx={{
          zIndex: 1000,
          height: "100%",
          width: "360px",
          backgroundColor: "background.paper",
        }}
      >
        <Scrollbar
          sx={{
            height: 1,
            "& .simplebar-content": {
              height: 1,
              display: "flex",
              flexDirection: "column",
            },
          }}
        >
          <SelectCruise setRv={setRv} />
          <SelectDate setFunction={setDate} />
          <Selectbar
            value={lat}
            setFunction={setLat}
            minvalue={3}
            maxvalue={33}
            text={"Latitude Range 3 - 33°N"}
          />
          <Selectbar
            value={lon}
            setFunction={setLon}
            minvalue={106}
            maxvalue={128}
            text={"Longitude Range 106 - 128°E"}
          />
          <SelectParameter value={parameters} setFunction={setParameters} />
          <Divider />
        </Scrollbar>
      </Box>
      {data === "connection error" ? (
        <FailApiWarning />
      ) : data === undefined ? (
        <Waiting />
      ) : data.status === "No result" ? (
        <NoDataWarning />
      ) : (
        <>
       <GeoJSON data={data.status} style={styleFunc} onEachFeature={onEachFeature}/>
          
        </>
      )}
    </div>
  );
}
