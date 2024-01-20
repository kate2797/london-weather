import { Heading, Text } from "@chakra-ui/react";
import { Form } from "../components";

export const HeatCalculator = () => {
  return (
    <div className="content">
      <div>
        <Heading as="h3" size="lg">
          Heat Index Calculator
        </Heading>
        <Text fontSize="md">
          Aute consequat qui esse exercitation. Consectetur mollit laboris
          labore officia dolore laborum eiusmod sit tempor dolor non.
        </Text>
      </div>

      <Form />
    </div>
  );
};
