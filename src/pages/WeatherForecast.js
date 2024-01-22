import { Heading, Text } from "@chakra-ui/react";
import {
  LineChart,
  Line,
  CartesianGrid,
  YAxis,
  XAxis,
  Tooltip,
  Legend,
} from "recharts";
import { useState, useEffect } from "react";
import { fetchChartData } from "../services";

// co je s datum datami?? check!

export const WeatherForecast = () => {
  const [datetime, setDatetime] = useState([]);
  const [temp, setTemp] = useState([]);
  const [startRange, setStartRange] = useState("");
  const [endRange, setEndRange] = useState("");

  useEffect(() => {
    const data = fetchChartData();
    data
      .then((res) => {
        setDatetime(res[0]);
        setTemp(res[1]);
      })
      .catch((err) => {
        console.log(err); // catch errors
      });
  }, []);

  useEffect(() => {
    setStartRange(new Date(datetime[0]).toLocaleDateString());
    setEndRange(new Date(datetime[datetime.length - 1]).toLocaleDateString());
  }, [datetime, temp]);

  const populate = () => {
    const weatherData = [];
    for (let i = 0; i < datetime.length; i++) {
      let entry = {
        name: new Date(datetime[i]).toLocaleDateString(),
        temperature: Math.round(temp[i] * 10) / 10,
        day: new Date(datetime[i]).toLocaleString("en-us", {
          weekday: "short",
        }),
      };
      weatherData.push(entry);
    }
    return weatherData;
  };

  //  <XAxis />

  const renderLineChart = (
    <div className="chart">
      <Text marginBottom={3}>{`${startRange} - ${endRange}`}</Text>
      <LineChart
        width={900}
        height={300}
        data={populate()}
        margin={{
          top: 5,
          right: 30,
          left: 30,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <YAxis />
        <XAxis dataKey="day" allowDuplicatedCategory={false} />
        <Tooltip />
        <Legend height={36} />
        <Line
          type="monotone"
          dataKey="temperature"
          dot={{ stroke: "teal" }}
          stroke="teal"
          activeDot={{ r: 8 }}
        />
      </LineChart>
    </div>
  );

  return (
    <div className="content">
      <Heading as="h3" size="lg" marginBottom={2}>
        Weather Forecast
      </Heading>
      <Text fontSize="md">
        7-day weather forecast, displayed on an hourly graph, illustrates the
        correlation between time and temperature
      </Text>
      {renderLineChart}
    </div>
  );
};
