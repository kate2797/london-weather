import { Divider, Box, AbsoluteCenter } from "@chakra-ui/react";

export const Result = ({ index }) => {
  return (
    <>
      <Box position="relative" padding="10">
        <Divider />
        <AbsoluteCenter bg="white" px="4">
          See results (5 latest-localStorage..todo)
        </AbsoluteCenter>
      </Box>
      <p>The heat index is: {index}</p>
    </>
  );
};
