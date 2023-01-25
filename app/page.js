"use client"; //do not remove pls

import { useSession } from "next-auth/react";
import { useState, useEffect, useContext } from "react";
import * as Realm from "realm-web";
import { mongodbContext } from "./MongoHandler";

import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Link from '@mui/material/Link';
import Breadcrumbs from '@mui/material/Breadcrumbs';


// Create the Application

// Define the App component

const HomePage = () => {
  // Set state variables
  const [events, setEvents] = useState();
  const { data: session, status } = useSession();
  const { mongodb, user, permission, app } = useContext(mongodbContext);

  // This useEffect hook will run only once when the page is loaded and when
  // mongodb connection is established
  useEffect(() => {
    const login = async () => {
      try {
        //connect to database
        const collection = mongodb.db("data").collection("PeopleCount"); // Everytime a change happens in the stream, add it to the list of events

        for await (const change of collection.watch()) {
          //this code is for saving and logging all changes made when page is loaded
          // setEvents((events) => [...events, change]);
          setEvents(change);
        }
      } catch (err) {
        console.error("Failed to log in", err.message);
      }
    };
    if (mongodb) {
      //dont run watch when mongodb connection is not established
      login();
    }
  }, [mongodb]);

  function write() {
    if (mongodb) {
      //dont run watch when mongodb connection is not established
      const collection = mongodb.db("data").collection("PeopleCount"); //insert into collection
      collection.insertOne({
        timestamp: new Date(),
        value: 10000,
      });
    } else {
      alert("Mongodb connection not established. Please try again");
    }
  }

  // Return the JSX that will generate HTML for the page
  return (
    <div className="App">
      <Breadcrumbs aria-label="breadcrumb" style={{marginBottom: "10px"}}>
        <Link underline="hover" color="inherit" href="/">
          Home
        </Link>
      </Breadcrumbs>
      {!!user && ( //check if user is loaded
        <Card sx={{ minWidth: 275 }}>
          <CardContent>
            <Typography variant="h5" gutterBottom>
              Number Of People
            </Typography>
            <Typography variant="body2">
              {!!events ? (
                <div>
                  {events.fullDocument.value}
                  <Typography color={"text.secondary"}>
                    {Date(JSON.stringify(events.fullDocument.timestamp))}
                  </Typography>
                </div>
              ) : (
                "Waiting for update"
              )}
              {console.log(events)}
            </Typography>
          </CardContent>
        </Card>
      )}
      <button onClick={write}>write</button>
    </div>
  );
};

export default HomePage;
