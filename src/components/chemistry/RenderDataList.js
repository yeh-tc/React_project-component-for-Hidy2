import React, { useState, useEffect} from "react";
import { List } from "@mui/material";
import CruiseInfo from "./CruiseInfo";

export default function RenderDataList({
  data,
  setActiveClick,
  activeClick,
  activeHover,
  setActiveHover,
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
    } else if (wasopen === true) {
      setActiveClick(null);
    }
  };

  
  useEffect(() => {
    if (data !== undefined && data.status !== "No result") {
      const list = data.status.map((feature) => ({
        id: feature.properties.id,
        departure: feature.properties.depart,
        return: feature.properties.return,
        max_depth: feature.properties.max_dep,
        para: feature.properties.para,
        pi: feature.properties.pi,
      }));
      setRenderlist(list);
    }
  }, [data]);

  //做一個id list
  useEffect(() => {
    if (data !== undefined && data.status !== "No result") {
      const newIdList = data.status.map((data) => data.properties.id);
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
                />
              </React.Fragment>
            );
          })}
      </List>
    </>
  );
}
