"use client";

import { SessionProvider } from "next-auth/react";
import SideBar from "../components/sidebar";

import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import CheckRole from "./MongoHandler";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});


export default function RootLayout({ children, ...props }) {

  return (
    <html>
      <head></head>
      <body>
        <SessionProvider session={props.session}>
          <ThemeProvider theme={darkTheme}>
            <CheckRole>
              <CssBaseline />
              <main>
                <SideBar>{children}</SideBar>
              </main>
            </CheckRole>
          </ThemeProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
