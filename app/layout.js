"use client";

import { SessionProvider } from "next-auth/react";
import NavBar from "../components/navbar";
import SideBar from "../components/sidebar";

export default function RootLayout({ children, ...props }) {
  console.log("layout", { props }); // empty

  return (
    <html>
      <head></head>
      <body>
        <SessionProvider session={props.session}>
          <NavBar />
          <SideBar/>
          {children}
        </SessionProvider>
      </body>
    </html>
  );
}
