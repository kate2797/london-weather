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

//  ak > 1 result stored in localStorage, show "result history" btn
// always delete the last one, after new one is pushed

/*
  useEffect(() => {
    setKey((prev) => prev + 1);
  }, [index]);

    useEffect(() => {
    setValue(index);
  }, []);

  useEffect(() => {
    console.log(key);
  }, [key]);
*/

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
      <Popover>
        <PopoverTrigger>
          <Button>Result History</Button>
        </PopoverTrigger>
        <PopoverContent>
          <PopoverArrow />
          <PopoverCloseButton />
          <PopoverBody>1</PopoverBody>
          <PopoverBody>2</PopoverBody>
          <PopoverBody>3</PopoverBody>
          <PopoverBody>4</PopoverBody>
          <PopoverBody>5</PopoverBody>
        </PopoverContent>
      </Popover>
    </>
  );
};
