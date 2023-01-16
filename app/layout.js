"use client";

import { SessionProvider } from "next-auth/react";
import Auth from "./Auth";

export default function RootLayout({ children, ...props }) {
  console.log("layout", { props }); // empty

  return (
    <html>
      <head></head>
      <body>
        <SessionProvider session={props.session}>
          <Auth children={children} />
        </SessionProvider>
      </body>
    </html>
  );
}
