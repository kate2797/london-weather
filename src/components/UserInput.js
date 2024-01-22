import { Input, Select, Text, Tooltip } from "@chakra-ui/react";
import { WarningIcon } from "@chakra-ui/icons";

export const UserInput = ({
  temp,
  handleChangeTemperature,
  unit,
  handleChangeUnit,
  hum,
  handleChangeHumidity,
}) => {
  return (
    <div>
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
    </div>
  );
};
