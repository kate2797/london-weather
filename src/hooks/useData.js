import { useEffect, useState } from "react";
import { fetchTableData, fetchHistoricalData } from "../services";
import { divideData, MAX_INDEX } from "../helpers";

export const useData = () => {
  const [weather, setWeather] = useState();

  useEffect(() => {
    const data = fetchTableData();
    data
      .then((res) => {
        setWeather(divideData(res.hourly, MAX_INDEX)); // Batched
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return [weather];
};

export const useHistData = () => {
  const [weather, setWeather] = useState();

  useEffect(() => {
    const data = fetchHistoricalData();
    data
      .then((res) => {
        setWeather(divideData(res.hourly, MAX_INDEX)); // Batched
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return [weather];
};
