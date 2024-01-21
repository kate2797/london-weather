import { Input, Button, Select, Text, IconButton } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { RepeatIcon } from "@chakra-ui/icons";
import { Result } from "./";
import { computeResult } from "../helpers";
import { useLocalStorage } from "../hooks";

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

  // TODO
  // AK BUDE 5 items in LOCAL, VYMAZ POSLEDNY

  // localStorage
  const [key, setKey] = useState(1);
  //const [value, setValue] = useLocalStorage(toString(key));

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

  const getItem = (key) => {
    return localStorage.getItem(toString(key));
  };

  const store = (key, value) => {
    console.log("saving this value: " + toString(value));
    console.log("with the key: " + toString(key));
    localStorage.setItem(toString(key), toString(value));
  };

  const remove = (key) => {
    localStorage.removeItem(toString(key));
  };

  // ON CLICK --  ULOZILI SME
  const handleResult = () => {
    setKey((prev) => prev + 1);
    console.log(key, index);
    store(key, index);
  };

  useEffect(() => {
    if (temp != null && unit != null && hum != null) {
      let result = computeResult(temp, unit, hum);
      setIndex(result); // MAM INDEX
    }
  }, [temp, unit, hum]);

  // TEST
  useEffect(() => {
    console.log(key);
    console.log("local storage: " + toString(localStorage.length)); // NIC SA NEUKLADA
    if (key > 5) {
      remove(key); // DELETE posledny
      setKey(4);
    }
  }, [key]);

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

      <Button
        colorScheme="teal"
        variant="solid"
        onClick={() => {
          handleCalculation();
          handleResult();
        }}
      >
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

/*

onClick={
  () => {
  handleCalculation()
  handleResult()
  }
}



*/
