"use client"; //do not remove pls

import { useSession } from "next-auth/react";
import { useState, useEffect, useContext } from "react";
import * as Realm from "realm-web";
import { userRoleContext } from "./checkrole";
const {
  BSON: { ObjectId },
} = Realm;
const app = new Realm.App({ id: process.env.NEXT_PUBLIC_APP_ID });

// Create the Application

// Define the App component

const HomePage = () => {
  // Set state variables
  const [user, setUser] = useState();
  const [events, setEvents] = useState([]);
  const { data: session, status } = useSession();
  const role = useContext(userRoleContext);
  console.log(role)
  console.log("session", session);
  console.log("status", status);

  // This useEffect hook will run only once when the page is loaded
  useEffect(() => {
    const login = async () => {

      //authenticate with jwt
      try {
        const jwt = session.accessToken;
        const credentials = Realm.Credentials.jwt(jwt);
        const user = await app.logIn(credentials)
        // .then((user)=>{
        //   user.applyRole(role)
        // });
        console.log("Successfully logged in!", user.email);

        setUser(user);

        //connect to database
        const mongodb = app.currentUser.mongoClient("mongodb-atlas");
        const collection = mongodb.db("data").collection("PeopleCount"); // Everytime a change happens in the stream, add it to the list of events

        for await (const change of collection.watch()) {
          setEvents((events) => [...events, change]);
        }
      } catch (err) {
        console.error("Failed to log in", err.message);
      }
    };
    if (status === "authenticated") {
      login();
    }
  }, [status]);

  function write() {
    const mongodb = app.currentUser.mongoClient("mongodb-atlas");
    const collection = mongodb.db("data").collection("PeopleCount"); // Everytime a change happens in the stream, add it to the list of events
    collection.insertOne({
      timestamp: new Date(),
      value: 10000,
    });
  }

  // Return the JSX that will generate HTML for the page
  return (
    <div className="App">
      {!!user && (
        <div className="App-header">
          <h1>Connected as user ${user.id}</h1>
          <div>
            <p>Latest events:</p>
            <table>
              <thead>
                <tr>
                  <td>Operation</td>
                  <td>Document Key</td>
                  <td>Full Document</td>
                </tr>
              </thead>
              <tbody>
                {events.map((e, i) => (
                  <tr key={i}>
                    <td>{e.operationType}</td>
                    <td>{e.documentKey._id.toString()}</td>
                    <td>{JSON.stringify(e.fullDocument)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
      <button onClick={write}>write</button>
    </div>
  );
};

export default HomePage;
