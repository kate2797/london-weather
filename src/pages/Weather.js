import { Heading, Text } from "@chakra-ui/react";
import { DataTable, Filter } from "../components";

// api call

export const Weather = () => {
  return (
    <div className='content'>
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
    </div>
  );
};
