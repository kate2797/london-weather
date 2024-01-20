import { fetchWeatherApi } from "openmeteo";

export const fetchData = async () => {
  const params = {
    latitude: 51.5072,
    longitude: 0.1276,
    hourly: "temperature_2m",
  };
  const url = "https://api.open-meteo.com/v1/forecast";
  const responses = await fetchWeatherApi(url, params);

  const range = (start, stop, step) =>
    Array.from({ length: (stop - start) / step }, (_, i) => start + i * step);

  // Processing data
  const response = responses[0];
  const utcOffsetSeconds = response.utcOffsetSeconds();
  const hourly = response.hourly();

  const weatherData = {
    hourly: {
      time: range(
        Number(hourly.time()),
        Number(hourly.timeEnd()),
        hourly.interval()
      ).map((t) => new Date((t + utcOffsetSeconds) * 1000)),
      temperature2m: hourly.variables(0).valuesArray(),
    },
  };
  return [weatherData.hourly.time, weatherData.hourly.temperature2m];
};
