"use client";
import { useSession } from "next-auth/react";
import { createContext, useEffect, useState } from "react";
import * as Realm from "realm-web";

const app = new Realm.App({ id: process.env.NEXT_PUBLIC_APP_ID });

export const mongodbContext = createContext();

export default function MongoHandler({ children }) {
  const permission = "admin";
  const [mongodb, setMongodb] = useState();
  const [user, setUser] = useState();
  const { data: session, status } = useSession()

  // This useEffect hook will run only once when the page
  // is loaded and when status changes
  useEffect(() => {
    const login = async () => {
      //authenticate with jwt
      try {
        const jwt = session.accessToken;
        const credentials = Realm.Credentials.jwt(jwt);
        const user = await app.logIn(credentials);

        console.log("Successfully logged in!", user.id);

        setUser(user);

        //connect to mongodb
        setMongodb(app.currentUser.mongoClient("IOTP-shared"));
      } catch (err) {
        console.error("Failed to log in", err.message);
      }
    };

    if (status === "authenticated") {
      login();
    }
  }, [status]);

  return (
    <div>
      <mongodbContext.Provider value={{mongodb, user, permission, app}}>
        {children}
      </mongodbContext.Provider>
    </div>
  );
}
