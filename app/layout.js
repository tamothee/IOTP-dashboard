"use client";

import { SessionProvider } from "next-auth/react";
import SideBar from "../components/sidebar";

import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { createContext, useContext } from "react";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

const userRole = createContext();

export default function RootLayout({ children, ...props }) {

  const role = 'admin';

  return (
    <html>
      <head></head>
      <body>
        <SessionProvider session={props.session}>
          <ThemeProvider theme={darkTheme}>
            <userRole.Provider value={role}> {/*allow children to access user role*/}
              <CssBaseline />
              <main>
                <SideBar>{children}</SideBar>
              </main>
            </userRole.Provider>
          </ThemeProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
