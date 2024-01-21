import { Input, Button, Select, Text, IconButton } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { RepeatIcon } from "@chakra-ui/icons";
import { Result } from "./";
import { computeResult } from "../helpers";

/*
    TODO

  // chakra - achieving reponsiveness

  // 5 past results stored in local storage !!!

  // component documentation

  // clear values after unit change
  useEffect(() => {
    if (temp != 0 && hum != 0) {
    }
    setTemp(0);
    setHum(0);
  }, [unit]);

  // communicate why cannot calc if below a treshold

  // edge cases
    hum: min 0, max 100 etc.

  // better styling
*/

export const Calculation = () => {
  const [temp, setTemp] = useState(0);
  const [unit, setUnit] = useState("");
  const [hum, setHum] = useState(0);
  const [index, setIndex] = useState(0);
  const [showIndex, setShowIndex] = useState(false);
  const [clearing, setClearing] = useState(false);

  const handleChangeTemperature = (event) => setTemp(event.target.value);
  const handleChangeUnit = (event) => setUnit(event.target.value);
  const handleChangeHumidity = (event) => setHum(event.target.value);
  const handleCalculation = () => {
    setShowIndex(true);
  };
  const handleClearing = () => {
    setHum(0);
    setTemp(0);
    setUnit("");
    setIndex(0);
    setShowIndex(false);
    setClearing(true);
  };

  useEffect(() => {
    if (temp != null && unit != null && hum != null) {
      let result = computeResult(temp, unit, hum);
      setIndex(result);
    }
  }, [temp, unit, hum]);

  useEffect(() => {}, [clearing]);

  return (
    <>
      <div>
        <Text mb="8px">Temperature</Text>
        <Input
          value={temp}
          onChange={handleChangeTemperature}
          placeholder="Temperature"
          isRequired={true}
        />
      </div>

      <div>
        <Text mb="8px">Unit</Text>
        <Select
          placeholder="Unit"
          isRequired={true}
          value={unit}
          onChange={handleChangeUnit}
        >
          <option value="Celsius">Celsius</option>
          <option value="Farenheit">Farenheit</option>
        </Select>
      </div>

      <div>
        <Text mb="8px">Relative Humidity (%)</Text>
        <Input
          value={hum}
          onChange={handleChangeHumidity}
          placeholder="Relative Humidity"
          isRequired={true}
        />
      </div>

      <Button colorScheme="teal" variant="solid" onClick={handleCalculation}>
        Calculate
      </Button>

      <IconButton
        aria-label="Repeat calculation"
        icon={<RepeatIcon />}
        onClick={handleClearing}
      />

      {showIndex && <Result index={index} />}
    </>
  );
};
