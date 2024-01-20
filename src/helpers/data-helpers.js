import { WMO } from "../services";

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
