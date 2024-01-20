import { Menu, MenuButton, MenuList, MenuItem, Button } from "@chakra-ui/react";

export const Filter = () => {
  return (
    <Menu>
      <MenuButton as={Button}>Filter by</MenuButton>
      <MenuList>
        <MenuItem>Datetime</MenuItem>
        <MenuItem>Temperature</MenuItem>
      </MenuList>
    </Menu>
  );
};
