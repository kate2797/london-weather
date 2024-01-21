import { WMO } from "../services";

export const convertCelsiusToFarenheit = (tempCelsius) => {
  return (9 / 5) * tempCelsius + 32;
};

// >>> TODO: communicate this in the UI
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

export const calculateHeatIndex = (tempFarenheit, relHumidity) => {
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
