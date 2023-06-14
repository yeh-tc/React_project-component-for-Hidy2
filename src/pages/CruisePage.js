import { useParams } from "react-router-dom";
import Typography from "@mui/material/Typography";
import Body from "../components/Body";
export default function CruisePage() {
  const { crusiename } = useParams();
  return (
    <Body sidebar>
      <Typography variant="h5">{crusiename}</Typography>
    </Body>
  );
}
