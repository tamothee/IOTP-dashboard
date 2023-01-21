"use client"

import { useSession } from "next-auth/react";
import React, { useState, useEffect } from "react";
import * as Realm from "realm-web";
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
  console.log("status",status)
  console.log("session",session)

  // This useEffect hook will run only once when the page is loaded
  useEffect(() => {
    const login = async () => {
      // Authenticate anonymously
      const user = await app.logIn(Realm.Credentials.anonymous());

      //authenticate with jwt
      // const jwt = await useSession;
      // const user = Realm.Credentials.jwt(session.user.email);

      setUser(user); // Connect to the database

      const mongodb = app.currentUser.mongoClient("mongodb-atlas");
      const collection = mongodb.db("data").collection("PeopleCount"); // Everytime a change happens in the stream, add it to the list of events

      for await (const change of collection.watch()) {
        setEvents((events) => [...events, change]);
      }
    };
    login();
  }, []);

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
