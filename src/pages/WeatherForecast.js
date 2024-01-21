import { Heading, Text } from "@chakra-ui/react";
import {
  LineChart,
  Line,
  CartesianGrid,
  YAxis,
  Tooltip,
  Legend,
} from "recharts";
import { RepeatIcon } from "@chakra-ui/icons";
import { useState, useEffect } from "react";
import { fetchChartData } from "../services";

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
      <Heading as="h5" size="sm">
        {`${startRange} - ${endRange}`}
      </Heading>
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
        <Tooltip />
        <Legend />
        <Line
          type="monotone"
          dataKey="temperature"
          stroke="#8884d8"
          activeDot={{ r: 8 }}
        />
      </LineChart>
    </div>
  );

  return (
    <div className="content">
      <Heading as="h3" size="lg">
        Weather Forecast
      </Heading>
      <Text fontSize="md">
        Aute consequat qui esse exercitation. Consectetur mollit laboris labore
        officia dolore laborum eiusmod sit tempor dolor non.
      </Text>
      {renderLineChart}
    </div>
  );
};
