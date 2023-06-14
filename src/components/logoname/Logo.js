import odb from "./odb.png";
import { NavLink } from "react-router-dom";
import { Box, Link, Typography, Stack } from "@mui/material";
export default function Logo() {
  return (
    <>
      <Stack spacing={2} alignItems="center" direction="row">
        <Link to="/" component={NavLink} sx={{ display: "contents" }}>
          <Box
            component="div"
            sx={{
              width: 40,
              height: 40,
              display: "inline-flex",
            }}
          >
            <img src={odb} alt="logo"></img>
          </Box>
        </Link>
        <Box sx={{ ml: 2 }}>
          <Typography
            sx={{
              fontWeight: 600,
              fontSize: 18,
              color: "#565360",
            }}
          >
            Chemistry Diver
          </Typography>
          <Typography variant="body2" sx={{ color: "text.secondary" }}>
            Dive into Marine Chemistry
          </Typography>
        </Box>
      </Stack>
    </>
  );
}
