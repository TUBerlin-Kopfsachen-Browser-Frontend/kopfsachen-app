// Sidebar Base by Benjamin Carlson
// https://github.com/bjcarlson42/chakra-left-responsive-navbar
// 12.05.2022

import React from "react";
import {
  Flex,
  Text,
  Icon,
  Menu,
  Link as ChakraLink,
  MenuButton,
  MenuList,
} from "@chakra-ui/react";
import NavHoverBox from "../components/NavHoverBox";
import { Link } from "react-router-dom";

export default function NavItem({
  icon,
  title,
  description,
  active,
  navSize,
  routeto,
  ...props
}) {
  return (
    <Flex
      mt={30}
      flexDir="column"
      w="100%"
      alignItems={navSize === "small" ? "center" : "flex-start"}
      {...props}
    >
      <Menu placement="right">
        <Link to={routeto}>
          <ChakraLink
            backgroundColor={active && "#AEC8CA"}
            p={3}
            borderRadius={8}
            _hover={{ textDecor: "none", backgroundColor: "#AEC8CA" }}
            w={navSize === "large" && "100%"}
          >
            <MenuButton w="100%">
              <Flex>
                <Icon
                  as={icon}
                  fontSize="xl"
                  color={active ? "#82AAAD" : "gray.500"}
                />
                <Text ml={5} display={navSize === "small" ? "none" : "flex"}>
                  {title}
                </Text>
              </Flex>
            </MenuButton>
          </ChakraLink>
        </Link>
        <MenuList py={0} border="none" w={200} h={200} ml={5}>
          <NavHoverBox title={title} icon={icon} description={description} />
        </MenuList>
      </Menu>
    </Flex>
  );
}
