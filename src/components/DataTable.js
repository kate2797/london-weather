import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
} from "@chakra-ui/react";

import { WMO } from "../helpers";

// Displays hourly data per day
export const DataTable = ({ data }) => {
  return (
    data && (
      <>
        <TableContainer>
          <Table variant="striped" colorScheme="teal">
            <Thead>
              <Tr>
                <Th>Date</Th>
                <Th>Status</Th>
                <Th isNumeric>Temperature (°C)</Th>
                <Th isNumeric>Pressure (hPa)</Th>
                <Th isNumeric>Humidity (%)</Th>
              </Tr>
            </Thead>
            <Tbody>
              {data.map((entry) => {
                return (
                  <Tr>
                    <Td>{new Date(entry.time).toLocaleDateString()}</Td>
                    <Td>{WMO[entry.code]}</Td>
                    <Td isNumeric>{Math.round(entry.temp * 10) / 10}</Td>
                    <Td isNumeric>{Math.round(entry.pressure * 10) / 10}</Td>
                    <Td isNumeric>{entry.hum}</Td>
                  </Tr>
                );
              })}
            </Tbody>
          </Table>
        </TableContainer>
      </>
    )
  );
};
