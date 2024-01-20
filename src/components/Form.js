import {
  Input,
  Button,
  NumberInput,
  NumberInputField,
  Select,
} from "@chakra-ui/react";

export const Form = () => {
  return (
    <>
      <Input placeholder='Temperature' />
      <Select placeholder='Unit'>
        <option value='option1'>Celsius</option>
        <option value='option2'>Farenheit</option>
      </Select>
      <p>Relative Humidity (%)</p>
      <NumberInput defaultValue={0} min={0} max={100}>
        <NumberInputField placeholder='test' />
      </NumberInput>
      <Button colorScheme='teal' variant='solid'>
        Calculate
      </Button>
    </>
  );
};
