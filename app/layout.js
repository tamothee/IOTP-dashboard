"use client";

import { SessionProvider } from "next-auth/react";
import SideBar from "../components/sidebar";

export default function RootLayout({ children, ...props }) {
  console.log("layout", { props }); // empty

  return (
    <html>
      <head></head>
      <body style={{maxWidth: '100vw', maxHeight:'100vh'}}>
        <SessionProvider session={props.session}>
          <SideBar>{children}</SideBar>
        </SessionProvider>
      </body>
    </html>
  );
}
