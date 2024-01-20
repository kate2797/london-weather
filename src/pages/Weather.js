import { Heading, Text, Tabs, TabList, TabPanels, Tab, TabPanel  } from "@chakra-ui/react";
import { DataTable, Filter } from "../components";

/*
datetime
weather state
temp
surface pressure
relative humidity

for London
  - hourly forecast for the next few days (a week)
  - hourly hist. weather (last week)



the entire display for curr & historical => 1 component, just pass down different data

*/

export const Weather = () => {
  return (
    <div className='content'>
 <Tabs isFitted variant='enclosed'>
    <TabList mb='1em'>
    <Tab>Forecast for next week</Tab>
    <Tab>Forecast for last week</Tab>
  </TabList>
  <TabPanels>
    <TabPanel>
      <Heading as='h3' size='lg'>
        Weather
      </Heading>
      <Text fontSize='md'>
        Aute consequat qui esse exercitation. Consectetur mollit laboris labore
        officia dolore laborum eiusmod sit tempor dolor non.
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
