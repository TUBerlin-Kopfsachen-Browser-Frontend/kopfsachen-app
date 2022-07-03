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
} from "@chakra-ui/react";
import { useStore } from "../store/isLoggedIn";

export default function LogoutButton(props) {
  const logout = useStore((s) => s.logout);
  return (
    <Button
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
            if (res.status == 204 || res.status == 401) {
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
