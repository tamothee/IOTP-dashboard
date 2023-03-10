"use client";

import React, { useContext, useEffect, useState } from "react";
import Typography from "@mui/material/Typography";
import Link from "next/link";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import {
  Chart as ChartJS,
  TimeScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from "chart.js";
import "chartjs-adapter-date-fns";
import { Line } from "react-chartjs-2";


import { mongodbContext } from "../MongoHandler";

ChartJS.register(
  TimeScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  scales: {
    x: {
      type: "time",
      time: {
        unit: "day",
      },
    },
    y: {
      beginAtZero: true,
    },
  },
};

export default function Chart() {
  const [data, setData] = useState();
  const { mongodb, user, permission, app } = useContext(mongodbContext);
  useEffect(() => {
    const query = async () => {
      try {
        //connect to database
        const collection = mongodb.db("data").collection("PeopleCount"); // Everytime a change happens in the stream, add it to the list of events

        const result = await collection.find({}, { $sort: { _id: -1 } });
        console.log(result)

        setData({
          labels: result.map((data) => {
            console.log(data);
            return data.timestamp;
          }),
          datasets: [{
            label: "Number of people",
            data: result.map((data) => data.value),
            backgroundColor: 'white',
            borderColor: "aqua",
          }],
        });
      } catch (err) {
        console.error("Failed to log in", err.message);
      }
    };
    if (mongodb) {
      //dont run watch when mongodb connection is not established
      query();
    }
  }, [mongodb]);
  return (
    <div>
      <Breadcrumbs aria-label="breadcrumb" style={{ marginBottom: "10px" }}>
        <Link
          style={{ color: "inherit" }}
          underline="hover"
          color="inherit"
          href="/"
        >
          Home
        </Link>
        <Link
          style={{ color: "inherit" }}
          underline="hover"
          color="inherit"
          href="/charts"
        >
          Chart
        </Link>
      </Breadcrumbs>
      {data && <Line options={options} data={data} />}
    </div>
  );
}
