import { fetchWeatherApi } from "openmeteo";

export const fetchTableData = async () => {
  const params = {
    latitude: 52.52,
    longitude: 13.41,
    hourly: [
      "temperature_2m",
      "relative_humidity_2m",
      "weather_code",
      "surface_pressure",
    ],
  };

  const url = "https://api.open-meteo.com/v1/forecast";
  const responses = await fetchWeatherApi(url, params);

  // Helper function to form time ranges
  const range = (start, stop, step) =>
    Array.from({ length: (stop - start) / step }, (_, i) => start + i * step);

  // Process first location
  const response = responses[0];
  const hourly = response.hourly();
  const utcOffsetSeconds = response.utcOffsetSeconds();

  const weatherData = {
    hourly: {
      time: range(
        Number(hourly.time()),
        Number(hourly.timeEnd()),
        hourly.interval()
      ).map((t) => new Date((t + utcOffsetSeconds) * 1000)),
      temperature2m: hourly.variables(0).valuesArray(),
      relativeHumidity2m: hourly.variables(1).valuesArray(),
      weatherCode: hourly.variables(2).valuesArray(),
      surfacePressure: hourly.variables(3).valuesArray(),
    },
  };
  return weatherData;
};

export const fetchChartData = async () => {
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

export const fetchHistoricalData = async () => {
  const params = {
    latitude: 51.5072,
    longitude: 0.1276,
    hourly: [
      "temperature_2m",
      "relative_humidity_2m",
      "weather_code",
      "surface_pressure",
    ],
    past_days: 7,
  };
  const url = "https://api.open-meteo.com/v1/forecast";
  const responses = await fetchWeatherApi(url, params);

  // Helper function to form time ranges
  const range = (start, stop, step) =>
    Array.from({ length: (stop - start) / step }, (_, i) => start + i * step);

  const response = responses[0];
  const hourly = response.hourly();
  const utcOffsetSeconds = response.utcOffsetSeconds();

  const weatherData = {
    hourly: {
      time: range(
        Number(hourly.time()),
        Number(hourly.timeEnd()),
        hourly.interval()
      ).map((t) => new Date((t + utcOffsetSeconds) * 1000)),
      temperature2m: hourly.variables(0).valuesArray(),
      relativeHumidity2m: hourly.variables(1).valuesArray(),
      weatherCode: hourly.variables(2).valuesArray(),
      surfacePressure: hourly.variables(3).valuesArray(),
    },
  };

  for (let i = 0; i < weatherData.hourly.time.length; i++) {
    console.log(
      weatherData.hourly.time[i].toISOString(),
      weatherData.hourly.temperature2m[i],
      weatherData.hourly.relativeHumidity2m[i],
      weatherData.hourly.weatherCode[i],
      weatherData.hourly.surfacePressure[i]
    );
  }
  return weatherData;
};
