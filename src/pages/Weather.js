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
import { DayTab, Filter } from "../components";
import { useState, useEffect } from "react";
import { fetchTableData, fetchHistoricalData } from "../services";
import { divideData } from "../helpers";

// filter & pagination

export const Weather = () => {
  const [weatherData, setWeatherData] = useState([]);
  const [combined, setCombined] = useState([]);
  const [historicalData, setHistoricalData] = useState([]);
  const [historicalCombined, setHistoricalCombined] = useState([]);

  const MAX_INDEX = 168;
  const daysInWeek = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  const handleFetch = () => {
    const data = fetchTableData();
    data
      .then((res) => {
        setWeatherData(res.hourly);
        setCombined(divideData(res.hourly, MAX_INDEX)); // Batched
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleFetchHistorical = () => {
    const data = fetchHistoricalData();
    data
      .then((res) => {
        setHistoricalData(res.hourly);
        setHistoricalCombined(divideData(res.hourly, MAX_INDEX)); // Batched
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    handleFetch();
    handleFetchHistorical();
  }, [weatherData]);

  // test --- LATER, API LIMIT
  useEffect(() => {
    let x = setHistoricalCombined();
    console.log(x);
  }, [historicalCombined]);

  // <Filter />

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
