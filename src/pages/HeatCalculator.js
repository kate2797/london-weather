import { Heading, Text } from "@chakra-ui/react";
import { Calculation } from "../components";

export const HeatCalculator = () => {
  return (
    <div className="content">
      <div className="header">
        <Heading as="h3" size="lg" marginBottom={2}>
          Heat Index Calculator
        </Heading>
        <Text fontSize="md">
          The heat index, factoring in both relative humidity and air
          temperature, is calculated to provide a more accurate representation
          of the perceived temperature.
        </Text>
      </div>
      <Calculation />
    </div>
  );
};
