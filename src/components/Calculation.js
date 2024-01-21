import {
  Input,
  Button,
  Select,
  Text,
  IconButton,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverBody,
  PopoverArrow,
  PopoverCloseButton,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { RepeatIcon } from "@chakra-ui/icons";
import { Result } from "./";
import { computeResult } from "../helpers";

/*
  // chakra - achieving reponsiveness
  // component documentation
  // communicate why cannot calc if below a treshold –> min temp 80F etc.
  // edge cases -> hum: min 0, max 100 etc.

  HEAT INDEX, formula fix
*/

export const Calculation = () => {
  const [temp, setTemp] = useState(0);
  const [unit, setUnit] = useState("");
  const [hum, setHum] = useState(0);
  const [index, setIndex] = useState(0);
  const [showIndex, setShowIndex] = useState(false);
  const [clearing, setClearing] = useState(false);
  const [results, setResults] = useState([]); // localStorage // RETHINK, maybe not needed!!
  const [key, setKey] = useState(0); // localStorage

  const handleChangeTemperature = (event) => setTemp(event.target.value);
  const handleChangeUnit = (event) => setUnit(event.target.value);
  const handleChangeHumidity = (event) => setHum(event.target.value);
  const handleCalculation = () => {
    setShowIndex(true);
  };
  const handleClearing = () => {
    setShowIndex(false); // Clearing before recomputing
    setHum(0);
    setTemp(0);
    setUnit("");
    setIndex(0);
    setClearing(true);
  };

  // ked uz nieco stored, nie od 0, issues ----
  const loadStorage = () => {
    let temp = [];
    for (let i = 0; i < localStorage.length; i++) {
      let res = localStorage.getItem(i);
      temp.push(res);
    }
    return temp;
  };

  const store = () => {
    localStorage.setItem(key, index);
    setKey((prev) => prev + 1);
  };

  let isValid =
    showIndex &&
    index !== undefined &&
    key !== undefined &&
    !results.includes(index); // ? check again, do we update this, no.. so ?????

  useEffect(() => {
    //localStorage.clear();
    setResults(loadStorage());
  }, []);

  useEffect(() => {
    if (temp != null && unit != null && hum != null) {
      let result = computeResult(temp, unit, hum);
      setIndex(result); // Compute heat index
    }
  }, [temp, hum]);

  useEffect(() => {
    if (localStorage.length === 6) {
      setKey(0); // Reset our keys
    }
    if (isValid) {
      store();
      //console.log("storage: " + localStorage.length);
      //console.log("local state: " + results.length);
    }
  }, [showIndex]);

  useEffect(() => {}, [clearing]);

  const getResults = () => {
    let temp = [];
    for (let i = 0; i <= 5; i++) {
      let res = localStorage.getItem(i);
      temp.push(res);
    }
    return temp;
  };

  let i = 0; // da sa toto cez useState ?????

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

      <Popover>
        <PopoverTrigger>
          <Button colorScheme="yellow">History</Button>
        </PopoverTrigger>
        <PopoverContent>
          <PopoverArrow />
          <PopoverCloseButton />
          {getResults().map((res) => {
            return <PopoverBody key={i++}>{res}</PopoverBody>;
          })}
        </PopoverContent>
      </Popover>

      <IconButton
        aria-label="Repeat calculation"
        icon={<RepeatIcon />}
        onClick={handleClearing}
      />

      {showIndex && <Result index={index} />}
    </>
  );
};
