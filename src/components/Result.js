import { Stat, StatLabel, StatNumber } from "@chakra-ui/react";

export const Result = ({ index }) => {
  return (
    <>
      <Stat marginLeft="63%">
        <StatLabel>Heat Index</StatLabel>
        <StatNumber>{index}</StatNumber>
      </Stat>
    </>
  );
};
