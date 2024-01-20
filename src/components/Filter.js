import { Menu, MenuButton, MenuList, MenuItem, Button } from "@chakra-ui/react";
import { ChevronDownIcon } from '@chakra-ui/icons'

export const Filter = () => {
  return (
    <Menu>
      <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>Filter by</MenuButton>
      <MenuList>
        <MenuItem>Datetime</MenuItem>
        <MenuItem>Temperature</MenuItem>
      </MenuList>
    </Menu>
  );
};
