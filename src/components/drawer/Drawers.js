import { Box, Drawer, Divider, List, Typography } from "@mui/material";
import React from "react";
import useResponsive from "../../hooks/useResponsive";
import Scrollbar from "../scrollbar/Scrollbar";
import Logo from "../logoname/Logo";
import SelectCruise from "../filter/SelectCruise";

import { useState, useEffect } from "react";
import CruiseInfo from "./CruiseInfo";
const nav_width = 280;

export default function Drawers({
  openNav,
  onCloseNav,
  cruiseIdinDrawer,
  activeHover,
  activeClick,
  setActiveClick,
  setActiveHover,
  setRv,
}) {
  const isDesktop = useResponsive("up", "md");
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

  //做一個id list
  useEffect(() => {
    if (cruiseIdinDrawer != null) {
      const newIdList = cruiseIdinDrawer.map((data) => data.id);
      setIdList(newIdList);
    }
  }, [cruiseIdinDrawer]);
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

  const renderContent = (
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
      <Box sx={{ px: 2.5, py: 3, display: "inline-flex" }}>
        <Logo />
      </Box>
      <Typography
        variant="body2"
        sx={{ pl: 2, fontFamily: "Public Sans, sans-serif" }}
      >
        Cruise Filter
      </Typography>
      <SelectCruise setRv={setRv}/>
      <Divider />
      <List
        sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
        component="nav"
      >
        {cruiseIdinDrawer !== null &&
          cruiseIdinDrawer.map((text, index) => (
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
          ))}
      </List>
    </Scrollbar>
  );

  return (
    <Box
      component="nav"
      sx={{
        flexshrink: { md: 0 },
        width: { md: nav_width },
      }}
    >
      {isDesktop ? (
        <Drawer
          open
          variant="permanent"
          PaperProps={{
            sx: {
              width: nav_width,
              bgcolor: "#f2f5f5",
              borderRightStyle: "dashed",
            },
          }}
        >
          {renderContent}
        </Drawer>
      ) : (
        <Drawer
          open={openNav}
          onClose={onCloseNav}
          PaperProps={{
            sx: { width: nav_width },
          }}
        >
          {renderContent}
        </Drawer>
      )}
    </Box>
  );
}
