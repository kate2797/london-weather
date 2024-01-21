import {
  Heading,
  Text,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Accordion,
} from "@chakra-ui/react";
import { DayTab } from "../components";
import { useState, useEffect } from "react";
import { fetchTableData, fetchHistoricalData } from "../services";
import {
  roundFloatValue,
  convertTimeToString,
  convertWeatherCode,
} from "../helpers";

// fetchHistoricalData(); -> show in the other tab
// filter & pagination
/*
    <Filter />
*/

export const Weather = () => {
  const [weatherData, setWeatherData] = useState([]);
  const [combined, setCombined] = useState([]);
  const MAX_LENGTH = 168;
  const daysInWeek = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  useEffect(() => {
    alert("hello data"); // ???? why not after 1st fetch????

    const data = fetchTableData();
    data
      .then((res) => {
        setWeatherData(res.hourly); // As received --> asi nepotrebujem, check later
        setCombined(divideData(res.hourly)); // Batched
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const divideData = () => {
    let data = {
      0: [],
      1: [],
      2: [],
      3: [],
      4: [],
      5: [],
      6: [],
    };
    let relativeHumidity2m = weatherData.relativeHumidity2m; // Array
    let surfacePressure = weatherData.surfacePressure;
    let temperature2m = weatherData.temperature2m;
    let time = weatherData.time;
    let weatherCode = weatherData.weatherCode;
    let combined = [];

    for (let i = 0; i < MAX_LENGTH; i++) {
      let entry = {
        hum: relativeHumidity2m[i],
        pressure: surfacePressure[i],
        temp: temperature2m[i],
        time: time[i],
        code: weatherCode[i],
      };
      combined.push(entry);
    }

    data[0] = combined.slice(0, 24);
    data[1] = combined.slice(24, 48);
    data[2] = combined.slice(48, 72);
    data[3] = combined.slice(72, 96);
    data[4] = combined.slice(96, 120);
    data[5] = combined.slice(120, 144);
    data[6] = combined.slice(144, 168);

    return data;
  };

  return (
    <div className="content">
      {combined && (
        <>
          <Heading as="h3" size="lg">
            Weather
          </Heading>
          <Text fontSize="md">
            Aute consequat qui esse exercitation. Consectetur mollit laboris
            labore officia dolore laborum eiusmod sit tempor dolor non.
          </Text>
          <Tabs isFitted variant="enclosed">
            <TabList mb="1em">
              <Tab>Forecast for next week</Tab>
              <Tab>Forecast for last week</Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <Accordion defaultIndex={[0]} allowMultiple>
                  {daysInWeek.map((day, index) => {
                    return <DayTab title={day} data={combined[index]} />;
                  })}
                </Accordion>
              </TabPanel>
              <TabPanel>
                <Accordion defaultIndex={[0]} allowMultiple>
                  {daysInWeek.map((day) => {
                    return <DayTab title={day} />;
                  })}
                </Accordion>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </>
      )}
    </div>
  );
};
