import { Divider, Box, Heading, AbsoluteCenter } from "@chakra-ui/react";

export const Result = ({ index }) => {
  return (
    <>
      <Box position="relative" padding="10">
        <Divider />
        <AbsoluteCenter bg="white" px="4">
          <Heading as="h4" size="md">
            Results
          </Heading>
        </AbsoluteCenter>
      </Box>
      <p>The heat index is: {index}</p>
    </>
  );
};
