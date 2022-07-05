import React from "react";
import {
  Box,
  Flex,
  AspectRatio,
  Image,
  Text,
  Link,
  Button,
  Stack,
  useColorModeValue
} from "@chakra-ui/react";
import { useStore } from "../store/isLoggedIn";
import { FiLogOut, FiChevronRight } from "react-icons/fi";

export default function LogoutButton(props) {
  const logout = useStore((s) => s.logout);
  return (
    <Button
      colorScheme='warning'
      leftIcon={<FiLogOut/>}
      rightIcon={<FiChevronRight />}
      onClick={() => {
        fetch(`self-service/logout/browser`, {
          headers: { Accept: "application/json" },
        })
          .then((res) => res.json())
          .then((response) =>
            fetch(`self-service/logout?token=${response.logout_token}`, {
              headers: {
                Accept: "application/json",
              },
            })
          )
          .then((res) => {
            if (res.status === 204 || res.status === 401) {
              logout();
              window.location.replace("/");
            }
          });
      }}
    >
      Logout
    </Button>
  );
}

export function LogoutButtonSidebar(props) {
  const logout = useStore((s) => s.logout);
  return (
    <Button
      fontSize={14}
      rightIcon={<FiLogOut/>}
      variant='ghost'
      _hover={{ textDecor: "none", backgroundColor:useColorModeValue("neutral.100", "neutral.800") }}
      onClick={() => {
        fetch(`self-service/logout/browser`, {
          headers: { Accept: "application/json" },
        })
          .then((res) => res.json())
          .then((response) =>
            fetch(`self-service/logout?token=${response.logout_token}`, {
              headers: {
                Accept: "application/json",
              },
            })
          )
          .then((res) => {
            if (res.status === 204 || res.status === 401) {
              logout();
              window.location.replace("/");
            }
          });
      }}
    >
      Logout
    </Button>
  );
}