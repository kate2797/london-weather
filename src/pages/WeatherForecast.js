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
import { fetchWeatherApi } from "openmeteo";
import { useState, useEffect } from "react";

/*
params needed –> /forecast:
  start_date
  end_date
  // by default vracia 7 poslednych dni
*/

const fetchData = async () => {
  const params = {
    latitude: 51.5072,
    longitude: 0.1276,
    hourly: "temperature_2m",
  };
  const url = "https://api.open-meteo.com/v1/forecast";

  const responses = await fetchWeatherApi(url, params);

  // helper
  const range = (start, stop, step) =>
    Array.from({ length: (stop - start) / step }, (_, i) => start + i * step);

  // Process data
  const response = responses[0];
  const utcOffsetSeconds = response.utcOffsetSeconds();
  const hourly = response.hourly();

  const weatherData = {
    hourly: {
      time: range(
        Number(hourly.time()),
        Number(hourly.timeEnd()),
        hourly.interval()
      ).map((t) => new Date((t + utcOffsetSeconds) * 1000)),
      temperature2m: hourly.variables(0).valuesArray(),
    },
  };
  return [weatherData.hourly.time, weatherData.hourly.temperature2m];
};

export const WeatherForecast = () => {
  const [datetime, setDatetime] = useState([]);
  const [temp, setTemp] = useState([]);
  const [startRange, setStartRange] = useState("");
  const [endRange, setEndRange] = useState("");

  useEffect(() => {
    const data = fetchData();
    // resolve promise
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
        name: new Date(datetime[i]).toLocaleDateString(), // check later diff formats
        temperature: Math.round(temp[i] * 10) / 10,
      };
      weatherData.push(entry);
    }
    return weatherData;
  };

  /*
  user: pick date range
  - hocikolko dni, cize os TIME sa musi zmenit ak dlhsie ako 7 dni atd.
  - dd/mm/yy
  */
  // somehow ukaz len 7 dni -> Mon, Tue..
  // niekde napis range, ze od 1. do 7. a tak

  const renderLineChart = (
    <div className="chart">
      <Heading as="h5" size="sm">
        {`${startRange} - ${endRange}`}
      </Heading>
      <LineChart
        title="Chart of PU x UV"
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
