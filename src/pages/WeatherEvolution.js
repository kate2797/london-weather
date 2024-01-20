import { Heading, Text } from "@chakra-ui/react";
import { LineChart, Line, CartesianGrid, XAxis, YAxis } from 'recharts';

// get the chart working - later?

export const WeatherEvolution = () => {
  const data = [{name: 'Page A', uv: 400, pv: 2400, amt: 2400}];

  const renderLineChart = (
    <LineChart width={600} height={300} data={data} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
      <Line type="monotone" dataKey="uv" stroke="#8884d8" />
      <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
      <XAxis dataKey="name" />
      <YAxis />
    </LineChart>
  );

  return (
    <div className='content'>
      <Heading as='h3' size='lg'>
        Weather Evolution
      </Heading>
      <Text fontSize='md'>
        Aute consequat qui esse exercitation. Consectetur mollit laboris labore
        officia dolore laborum eiusmod sit tempor dolor non.
      </Text>
      {renderLineChart}
    </div>
  );
};
