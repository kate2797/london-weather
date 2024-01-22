import { WMO } from "../services";

export const convertCelsiusToFarenheit = (tempCelsius) => {
  return (9 / 5) * tempCelsius + 32;
};

export const divideData = (weatherData, MAX_LENGTH) => {
  let data = {
    0: [],
    1: [],
    2: [],
    3: [],
    4: [],
    5: [],
    6: [],
  };
  let relativeHumidity2m = weatherData.relativeHumidity2m; // Array
  let surfacePressure = weatherData.surfacePressure;
  let temperature2m = weatherData.temperature2m;
  let time = weatherData.time;
  let weatherCode = weatherData.weatherCode;
  let combined = [];

  for (let i = 0; i < MAX_LENGTH; i++) {
    let entry = {
      hum: relativeHumidity2m[i],
      pressure: surfacePressure[i],
      temp: temperature2m[i],
      time: time[i],
      code: weatherCode[i],
    };
    combined.push(entry);
  }

  data[0] = combined.slice(0, 24);
  data[1] = combined.slice(24, 48);
  data[2] = combined.slice(48, 72);
  data[3] = combined.slice(72, 96);
  data[4] = combined.slice(96, 120);
  data[5] = combined.slice(120, 144);
  data[6] = combined.slice(144, 168);
  return data;
};

export const sanitiseTemperature = (temp, unit) => {
  if (unit === "Celsius" && temp > 26.7) {
    return convertCelsiusToFarenheit(temp);
  } else {
    if (temp > 80) {
      return temp;
    }
  }
};

export const computeResult = (temp, unit, hum) => {
  temp = sanitiseTemperature(temp, unit);
  return calculateHeatIndex(temp, hum);
};

//fix --- AJ KED ZADA V CEL, CONVERT NA FAREN !! robime to?
export const calculateHeatIndex = (tempFarenheit, relHumidity) => {
  let expT = tempFarenheit * tempFarenheit;
  let expH = relHumidity * relHumidity;
  return (
    -42.379 +
    2.04901523 * tempFarenheit +
    10.14333127 * relHumidity +
    -0.22475541 * tempFarenheit * relHumidity +
    -0.00683783 * expT +
    -0.05481717 * expH +
    0.00122874 * expT * relHumidity +
    0.00085282 * tempFarenheit * expH +
    -0.00000199 * expT * expH
  );
};

export const roundFloatValue = (valueArr) => {
  let rounded = [];
  for (let i = 0; i < valueArr.length; i++) {
    let value = Math.round(valueArr[i] * 10) / 10;
    rounded.push(value);
  }
  return rounded;
};

export const convertTimeToString = (timeArr) => {
  let strings = [];
  for (let i = 0; i < timeArr.length; i++) {
    let time = new Date(timeArr[i]).toLocaleDateString();
    strings.push(time);
  }
  return strings;
};

export const convertWeatherCode = (codeArr) => {
  let strings = [];
  for (let i = 0; i < codeArr.length; i++) {
    let code = WMO[codeArr[i]];
    strings.push(code);
  }
  return strings;
};
