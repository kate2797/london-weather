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
import { useState, useEffect, useMemo } from "react";
import { RepeatIcon, WarningIcon } from "@chakra-ui/icons";
import { Result, UserInput } from "./";
import { computeResult } from "../helpers";

export const Calculation = () => {
  const [temp, setTemp] = useState(0);
  const [unit, setUnit] = useState("");
  const [hum, setHum] = useState(0);

  const [index, setIndex] = useState(0); // Heat index
  const [showIndex, setShowIndex] = useState(false);
  const [clearing, setClearing] = useState(false); // Computation clearance
  const [indices, setIndices] = useState([]); // Latest 5 results

  //const [results, setResults] = useState([]); // localStorage

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

  //????
  const loadStorage = () => {
    let temp = [];
    for (let i = 0; i < localStorage.length; i++) {
      let res = localStorage.getItem(i);
      temp.push(res);
    }
    return temp;
  };

  useEffect(() => {
    // localStorage.clear();
    setIndices(loadStorage());
  }, []);

  const isStored = (result) => {
    for (let i = 0; i <= localStorage.length; i++) {
      let index = localStorage.getItem(i);
      if (result === index) {
        return true;
      }
      return false;
    }
  };

  const updateStorage = (arr) => {
    localStorage.clear();
    for (let i = 0; i < arr.length; i++) {
      localStorage.setItem("index", arr[i]);
    }
  };

  const handleClick = () => {
    let result = Math.round(computeResult(temp, unit, hum) * 10) / 10;
    setIndex(result);

    if (!isStored(result)) {
      // Rewrite previous entries
      if (indices.length === 5) {
        let copy = [...indices];
        copy.pop(); // Removing the last computation
        setIndices(copy);
        updateStorage(copy); // Sync local & dynamic state
      }

      localStorage.setItem("index", result); // Store if not there already
      setShowIndex(true);
      setIndices((prev) => {
        return [result, ...prev];
      });
    }
  };

  useEffect(() => {}, [clearing]);

  return (
    <>
      <UserInput
        temp={temp}
        handleChangeTemperature={handleChangeTemperature}
        unit={unit}
        handleChangeUnit={handleChangeUnit}
        hum={hum}
        handleChangeHumidity={handleChangeHumidity}
      />

      <div className="HeatCalculator-CTAs">
        <Button
          colorScheme="teal"
          variant="solid"
          onClick={handleClick}
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
            {indices.map((res, i) => {
              return <PopoverBody key={i}>{res}</PopoverBody>;
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
