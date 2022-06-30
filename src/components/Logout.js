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

export default function LogoutButton(props) {
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
          .then((res) => res.json())
          .then((response) => alert(response.identity.traits.accountKey));
      }}
    >
      Logout
    </Button>
  );
}
