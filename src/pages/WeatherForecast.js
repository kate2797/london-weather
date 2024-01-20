import { Heading, Input, Text, Button, IconButton } from "@chakra-ui/react";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from "recharts";
import { RepeatIcon } from "@chakra-ui/icons";
import { useState, useEffect } from "react";
import { fetchData } from "../services.js";

/*
params needed –> /forecast:
  start_date
  end_date
  // by default vracia 7 poslednych dni
*/
/*
  user: pick date range
  - hocikolko dni, cize os TIME sa musi zmenit ak dlhsie ako 7 dni atd.
  - dd/mm/yy
  */

export const WeatherForecast = () => {
  const [datetime, setDatetime] = useState([]);
  const [temp, setTemp] = useState([]);
  const [startRange, setStartRange] = useState("");
  const [endRange, setEndRange] = useState("");

  useEffect(() => {
    const data = fetchData();
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

  const populateUI = () => {
    const weatherData = [];
    for (let i = 0; i < datetime.length; i++) {
      let entry = {
        name: new Date(datetime[i]).toLocaleDateString(),
        temperature: Math.round(temp[i] * 10) / 10,
      };
      weatherData.push(entry);
    }
    return weatherData;
  };

  const renderLineChart = (
    <div className="chart">
      <Heading as="h5" size="sm">
        {`${startRange} - ${endRange}`}
      </Heading>
      <LineChart
        width={900}
        height={300}
        data={populateUI()}
        margin={{
          top: 5,
          right: 30,
          left: 30,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          dataKey="name"
          tickCount={7}
          ticks={["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]}
        />
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

      <Heading as="h4" size="md">
        Select time range
      </Heading>

      <div>
        <Text mb="8px">From</Text>
        <Input placeholder="From" isRequired={true} />
      </div>

      <div>
        <Text mb="8px">To</Text>
        <Input placeholder="From" isRequired={true} />
      </div>

      <Button colorScheme="teal" variant="solid">
        Plot data
      </Button>

      <IconButton aria-label="Repeat selection" icon={<RepeatIcon />} />
    </div>
  );
};
