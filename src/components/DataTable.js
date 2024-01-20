import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
} from "@chakra-ui/react";

export const DataTable = () => {
  return (
    <>
      <TableContainer>
        <Table variant="striped" colorScheme="teal">
          <Thead>
            <Tr>
              <Th>Datetime</Th>
              <Th>Weather State</Th>
              <Th isNumeric>Temperature (°C)</Th>
              <Th isNumeric>Surface Pressure (hPa)</Th>
              <Th isNumeric>Relative Humidity (%)</Th>
            </Tr>
          </Thead>

          <Tbody>
            <Tr>
              <Td>June</Td>
              <Td>Rainy</Td>
              <Td isNumeric>25.4</Td>
              <Td isNumeric>20</Td>
              <Td isNumeric>67</Td>
            </Tr>

            <Tr>
              <Td>July</Td>
              <Td>Sunny</Td>
              <Td isNumeric>28.4</Td>
              <Td isNumeric>24</Td>
              <Td isNumeric>52</Td>
            </Tr>
          </Tbody>
        </Table>
      </TableContainer>
    </>
  );
};
