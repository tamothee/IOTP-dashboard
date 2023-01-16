"use client";

import { SessionProvider } from "next-auth/react";

export default function RootLayout({ children, ...props }) {
  console.log("layout", { props }); // empty

  return (
    <html>
      <head></head>
      <body>
        <SessionProvider session={props.session}>
          {children}
        </SessionProvider>
      </body>
    </html>
  );
}
