import {
  Box,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
} from "@chakra-ui/react";
import { DataTable } from "./DataTable";

// has 24 entries for a given day

// pass the data down, display via map() in a table

export const DayTab = ({ title, data }) => {
  return (
    <>
      <AccordionItem>
        <h2>
          <AccordionButton>
            <Box as="span" flex="1" textAlign="left">
              {title}
            </Box>
            <AccordionIcon />
          </AccordionButton>
        </h2>
        <AccordionPanel pb={4}>
          <DataTable data={data} />
          {data && console.log(data.length)}
        </AccordionPanel>
      </AccordionItem>
    </>
  );
};
