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
  Tooltip,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { RepeatIcon, WarningIcon } from "@chakra-ui/icons";
import { Result } from "./";
import { computeResult } from "../helpers";

export const Calculation = () => {
  const [temp, setTemp] = useState(0);
  const [unit, setUnit] = useState("");
  const [hum, setHum] = useState(0);
  const [index, setIndex] = useState(0);
  const [showIndex, setShowIndex] = useState(false);
  const [clearing, setClearing] = useState(false);
  const [results, setResults] = useState([]); // localStorage
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

  // check, if values are there already
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
    !results.includes(index);

  useEffect(() => {
    //localStorage.clear();
    setResults(loadStorage());
  }, []);

  useEffect(() => {
    if (temp != null && unit != null && hum != null) {
      let result = computeResult(temp, unit, hum);
      setIndex(Math.round(result * 10) / 10); // Compute heat index
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

  let i = 0;

  return (
    <>
      <div className="HeatCalculator-field">
        <div className="HeatCalculator-box">
          <Text mb="8px" marginRight={2}>
            <strong>Temperature</strong>
          </Text>
          <Tooltip label="Must be higher than 26.7°C or 80°F" fontSize="md">
            <WarningIcon color="orange" />
          </Tooltip>
        </div>
        <Input
          value={temp}
          onChange={handleChangeTemperature}
          placeholder="Temperature"
          isRequired={true}
        />
      </div>

      <div className="HeatCalculator-field">
        <Text mb="8px">
          <strong>Unit</strong>
        </Text>
        <Select
          isRequired={true}
          value={unit}
          onChange={handleChangeUnit}
          default="Celsius"
        >
          <option value="Celsius">Celsius</option>
          <option value="Farenheit">Farenheit</option>
        </Select>
      </div>

      <div className="HeatCalculator-field">
        <div className="HeatCalculator-box">
          <Text mb="8px" marginRight={2}>
            <strong>Relative Humidity (%)</strong>
          </Text>
          <Tooltip label="Must be between 0 and 100" fontSize="md">
            <WarningIcon color="orange" />
          </Tooltip>
        </div>
        <Input
          value={hum}
          onChange={handleChangeHumidity}
          placeholder="Relative Humidity"
          isRequired={true}
        />
      </div>

      <div className="HeatCalculator-CTAs">
        <Button
          colorScheme="teal"
          variant="solid"
          onClick={handleCalculation}
          className="HeatCalculator-btn"
        >
          Calculate
        </Button>

        <Popover>
          <PopoverTrigger>
            <Button colorScheme="orange" className="HeatCalculator-btn">
              History
            </Button>
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
          className="HeatCalculator-btn"
          aria-label="Repeat calculation"
          icon={<RepeatIcon />}
          onClick={handleClearing}
        />
        {showIndex && <Result index={index} />}
      </div>
    </>
  );
};
