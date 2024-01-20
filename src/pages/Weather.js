import {
  Heading,
  Text,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
} from "@chakra-ui/react";
import { DataTable, Filter } from "../components";
import { useState, useEffect } from "react";
import { fetchTableData } from "../services";
import {
  roundFloatValue,
  convertTimeToString,
  convertWeatherCode,
} from "../helpers";

/*
for London
  - hourly forecast for the next few days (a week)
  - hourly hist. weather (last week)
the entire display for curr & historical => 1 component, just pass down different data
*/
// hourly for next few days, as we're getting before

// next: filtering

// then: get the historical data

export const Weather = () => {
  const [hum, setHum] = useState([]);
  const [pressure, setPressure] = useState([]);
  const [temp, setTemp] = useState([]);
  const [time, setTime] = useState([]);
  const [code, setCode] = useState([]);

  useEffect(() => {
    const data = fetchTableData();
    data
      .then((res) => {
        setHum(res.hourly.relativeHumidity2m);
        setPressure(roundFloatValue(res.hourly.surfacePressure));
        setTemp(roundFloatValue(res.hourly.temperature2m));
        setTime(convertTimeToString(res.hourly.time));
        setCode(convertWeatherCode(res.hourly.weatherCode)); // ARRAY
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    // vsetky data v ok formate, potom mozem display...
  }, [hum, pressure, temp, time, code]);

  return (
    <div className="content">
      <Tabs isFitted variant="enclosed">
        <TabList mb="1em">
          <Tab>Forecast for next week</Tab>
          <Tab>Forecast for last week</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <Heading as="h3" size="lg">
              Weather
            </Heading>
            <Text fontSize="md">
              Aute consequat qui esse exercitation. Consectetur mollit laboris
              labore officia dolore laborum eiusmod sit tempor dolor non.
            </Text>
            <Filter />
            <DataTable />
            <p>TODO: pagination</p>
          </TabPanel>
          <TabPanel>
            <p>TODO</p>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </div>
  );
};
