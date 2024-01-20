import { Input, Button, Select, Text, IconButton } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { RepeatIcon } from "@chakra-ui/icons";

/*
    TODO


  // chakra - achieving reponsiveness

  // 5 past results stored in local storage !!!

  // component documentation

  // split UI into several components

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

export const Form = () => {
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

  const convertCelsiusToFarenheit = (tempCelsius) => {
    return (9 / 5) * tempCelsius + 32;
  };

  const calculateHeatIndex = (tempFarenheit, relHumidity) => {
    let expT = tempFarenheit ** tempFarenheit;
    let expH = relHumidity ** relHumidity;
    return (
      42.379 +
      2.04901523 * tempFarenheit +
      10.14333127 * relHumidity -
      0.22475541 * tempFarenheit * relHumidity -
      6.83783 * 10 ** -3 * expT -
      5.481717 * 10 ** -2 * expH +
      1.22874 * 10 ** -3 * expT * relHumidity +
      8.5282 * 10 ** -4 * tempFarenheit * expH -
      1.99 * 10 ** -6 * expT * expH
    );
  };

  const sanitiseTemperature = (temp, unit) => {
    // >>> TODO: communicate this in the UI
    if (unit === "Celsius" && temp > 26.7) {
      return convertCelsiusToFarenheit(temp);
    } else {
      if (temp > 80) {
        return temp;
      }
    }
  };

  const computeResult = (temp, unit, hum) => {
    temp = sanitiseTemperature(temp, unit);
    return calculateHeatIndex(temp, hum);
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

      {showIndex && <p>The heat index is: {index}</p>}
    </>
  );
};
