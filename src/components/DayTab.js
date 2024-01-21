import {
  Box,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
} from "@chakra-ui/react";
import { DataTable } from "./DataTable";

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
          {data && <DataTable data={data} />}
        </AccordionPanel>
      </AccordionItem>
    </>
  );
};
