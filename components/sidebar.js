import * as React from "react";

import { Grid } from "@mui/material";
import MiniDrawer from "./MiniDrawer";
import PermDrawer from "./PermDrawer";

export default function SideBar({ children }) {
  const [width, setWindowWidth] = React.useState(0);

  const updateDimensions = () => {
    const width = window.innerWidth;
    setWindowWidth(width);
  };

  React.useEffect(() => {
    updateDimensions();
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  return (
    <Grid>
      {width > 1023 ? (
        <PermDrawer>{children}</PermDrawer>
      ) : (
        <MiniDrawer>{children}</MiniDrawer>
      )}
    </Grid>
  );
}
