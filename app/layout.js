"use client";

import { SessionProvider } from "next-auth/react";
import SideBar from "../components/sidebar";

import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import MongoHandler from "./MongoHandler";

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
            <MongoHandler>
              <CssBaseline />
              <main>
                <SideBar>{children}</SideBar>
              </main>
            </MongoHandler>
          </ThemeProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
