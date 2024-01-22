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
import { useData, useHistData } from "../hooks";
import { WEEK_DAYS } from "../helpers";

// filter & pagination
export const Weather = () => {
  const [data] = useData();
  const [histData] = useHistData();

  return (
    <div className="content">
      {data && histData && (
        <>
          <Heading as="h3" size="lg" marginBottom={2}>
            Weather
          </Heading>
          <Text fontSize="md">
            The week's weather, shown hourly in a table, features temperature,
            along with pressure, humidity, and weather status
          </Text>
          <Tabs isFitted variant="enclosed" colorScheme="teal" marginTop="10">
            <TabList mb="1em">
              <Tab>Forecast for next week</Tab>
              <Tab>Forecast for last week</Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <Accordion defaultIndex={[0]} allowMultiple>
                  {WEEK_DAYS.map((day, index) => {
                    return <DayTab title={day} data={data[index]} />;
                  })}
                </Accordion>
              </TabPanel>
              <TabPanel>
                <Accordion defaultIndex={[0]} allowMultiple>
                  {WEEK_DAYS.map((day, index) => {
                    return <DayTab title={day} data={histData[index]} />;
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
