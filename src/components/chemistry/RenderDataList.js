import React, { useState, useEffect} from "react";
import { List } from "@mui/material";
import CruiseInfo from "./CruiseInfo";


export default function RenderDataList({
  data,
  mapRef,
  loading,
  layersRef,
  activeHover,
  activeClick,
  setActiveHover,
  setActiveClick
}) {
  const [renderlist, setRenderlist] = useState(null);
  const [opentext, setOpentext] = useState(false);
  const [idList, setIdList] = useState([]);
  const handleClick = (index, id, wasopen) => {
    setOpentext((prevOpentext) => ({
      ...prevOpentext,
      [index]: !prevOpentext[index],
    }));
    if (wasopen !== true) {
      setActiveClick(id);
      if (layersRef.current[id]) {
        mapRef.current.fitBounds(layersRef.current[id]._bounds);
      }
    } else if (wasopen === true) {
      setActiveClick(null);
    }
  };

  console.log(data)
  useEffect(() => {
    if (loading){
      setRenderlist(null);
    }else if (data !== undefined && data !== "No result" && data !== "connection error") {
      const list = data.map((feature) => ({
        id: feature.id,
        departure: feature.depart.toString().split('T')[0],
        return: feature.return.toString().split('T')[0],
        max_depth: feature.max_dep,
        para: feature.para,
        pi: feature.pi,
      }));
      setRenderlist(list);
    }
  }, [data,loading]);

  //做一個id list
  useEffect(() => {
    if (data !== undefined && data !== "No result" && data !== "connection error") {
      const newIdList = data.map((data) => data.id);
      setIdList(newIdList);
    }
  }, [data]);

  //看active的航次是在drawer的第幾個index 要把collapse打開
  useEffect(() => {
    if (activeClick === null) {
      setOpentext(false);
    } else if (activeClick !== null) {
      const index = idList.indexOf(activeClick);
      if (index !== -1) {
        //因為只想允許同時間一個打開
        let newOpenText = {};
        idList.forEach((id, i) => {
          newOpenText[i] = i === index;
        });
        setOpentext(newOpenText);
      }
    }
  }, [activeClick, idList]);
 

  return (
    <>
      <List sx={{ width: "100%", bgcolor: "background.paper" }} component="nav">
        {renderlist !== null &&
          renderlist.map((text, index) => {
            return (
              <React.Fragment key={index}>
                <CruiseInfo
                  index={index}
                  text={text}
                  open={opentext}
                  handleClick={() =>
                    handleClick(index, text.id, opentext[index])
                  }
                  activeHover={activeHover}
                  activeClick={activeClick}
                  setActiveHover={setActiveHover}
                  layersRef={layersRef}
                />
              </React.Fragment>
            );
          })}
      </List>
    </>
  );
}
