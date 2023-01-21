"use client";

import { SessionProvider } from "next-auth/react";
import SideBar from "../components/sidebar";

import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

export default function RootLayout({ children, ...props }) {
  console.log("layout", { props }); // empty

  return (
    <html>
      <head></head>
      <body>
        <SessionProvider session={props.session}>
          <ThemeProvider theme={darkTheme}>
            <CssBaseline />
            <main>
              <SideBar>{children}</SideBar>
            </main>
          </ThemeProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
