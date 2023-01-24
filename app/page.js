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

//for card component
const bull = (
  <Box
    component="span"
    sx={{ display: "inline-block", mx: "2px", transform: "scale(0.8)" }}
  >
    •
  </Box>
);

// Create the Application

// Define the App component

const HomePage = () => {
  // Set state variables
  const [events, setEvents] = useState([]);
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
          setEvents((events) => [...events, change]);
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
                    {console.log(e)}
                    <td>{e.operationType}</td>
                    <td>{e.documentKey._id.toString()}</td>
                    <td>{JSON.stringify(e.fullDocument)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <Card sx={{ minWidth: 275 }}>
            <CardContent>
              <Typography
                sx={{ fontSize: 14 }}
                color="text.secondary"
                gutterBottom
              >
                Word of the Day
              </Typography>
              <Typography variant="h5" component="div">
                be{bull}nev{bull}o{bull}lent
              </Typography>
              <Typography sx={{ mb: 1.5 }} color="text.secondary">
                adjective
              </Typography>
              <Typography variant="body2">
                well meaning and kindly.
                <br />
                {'"a benevolent smile"'}
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small">Learn More</Button>
            </CardActions>
          </Card>
        </div>
      )}
      <button onClick={write}>write</button>
    </div>
  );
};

export default HomePage;
