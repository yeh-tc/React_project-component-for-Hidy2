import { Box, Drawer, Typography } from "@mui/material";
import useResponsive from "../../hooks/useResponsive";
import Scrollbar from "../scrollbar/Scrollbar";
import Logo from "../logoname/Logo";
import SelectCruise from "../filter/SelectCruise";

const nav_width = 280;

export default function Drawers({ openNav, onCloseNav }) {
  const isDesktop = useResponsive("up", "md");
  
  
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
        sx={{ pl: 2, fontFamily: "Public Sans, sans-serif"}}
      >
        Cruise Filter
      </Typography>
      <SelectCruise />

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
