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
import { fetchTableData, WMO } from "../services/services";

/*
for London
  - hourly forecast for the next few days (a week)
  - hourly hist. weather (last week)
the entire display for curr & historical => 1 component, just pass down different data
*/
// hourly for next few days, as we're getting before

// daj niekde do helpers
const roundFloatValue = (valueArr) => {
  let rounded = [];
  for (let i = 0; i < valueArr.length; i++) {
    let value = Math.round(valueArr[i] * 10) / 10;
    rounded.push(value);
  }
  return rounded;
};

const convertTimeToString = (timeArr) => {
  let strings = [];
  for (let i = 0; i < timeArr.length; i++) {
    let time = Date(timeArr[i]).toLocaleDateString();
    strings.push(time);
  }
  return strings;
};

const convertWeatherCode = (codeArr) => {
  let strings = [];
  for (let i = 0; i < codeArr.length; i++) {
    let code = WMO[codeArr[i]];
    strings.push(code);
    return strings;
  }
};

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
        setHum(res.hourly.relativeHumidity2m); // roundFloatValue
        setPressure(res.hourly.surfacePressure); // roundFloatValue
        setTemp(res.hourly.temperature2m); // roundFloatValue
        setTime(res.hourly.time); //convertTimeToString
        setCode(res.hourly.weatherCode); //convertWeatherCode
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    console.log(hum, pressure, temp, time, code);
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
