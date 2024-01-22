import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
} from "@chakra-ui/react";
import { WMO, getDayHours } from "../helpers";

export const DataTable = ({ data }) => {
  const hours = getDayHours();

  return (
    data && (
      <>
        <TableContainer>
          <Table variant="striped" colorScheme="teal">
            <Thead>
              <Tr>
                <Th>hour</Th>
                <Th>Date</Th>
                <Th>State</Th>
                <Th isNumeric>Temperature (°C)</Th>
                <Th isNumeric>Pressure</Th>
                <Th isNumeric>Humidity</Th>
              </Tr>
            </Thead>
            <Tbody>
              {data.map((entry, index) => {
                return (
                  <Tr>
                    <Td>{hours[index]}</Td>
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
