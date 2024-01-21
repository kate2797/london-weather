import {
  Divider,
  Box,
  AbsoluteCenter,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverBody,
  Button,
  PopoverArrow,
  PopoverCloseButton,
} from "@chakra-ui/react";

export const Result = ({ index }) => {
  return (
    <>
      <Box position="relative" padding="10">
        <Divider />
        <AbsoluteCenter bg="white" px="4">
          Result history
        </AbsoluteCenter>
      </Box>
      <p>The heat index is: {index}</p>
      <Popover>
        <PopoverTrigger>
          <Button>History</Button>
        </PopoverTrigger>
        <PopoverContent>
          <PopoverArrow />
          <PopoverCloseButton />
          <PopoverBody>1. -4.678566</PopoverBody>
          <PopoverBody>2</PopoverBody>
          <PopoverBody>3</PopoverBody>
          <PopoverBody>4</PopoverBody>
          <PopoverBody>5</PopoverBody>
        </PopoverContent>
      </Popover>
    </>
  );
};
