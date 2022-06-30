import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {
  ChakraProvider,
  Text,
  Link,
  theme,
  Flex,
  Heading,
  Input,
  InputGroup,
  InputLeftElement,
  Button,
  Skeleton,
  Stack,
  Box,
  useColorModeValue,
  FormControl,
  FormLabel,
  Checkbox,
  useSafeLayoutEffect,
} from "@chakra-ui/react";

export default function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data: any) => console.log(data);
  console.log(errors);

  return (
    <Flex
      minH={"100vh"}
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("gray.50", "gray.800")}
      flexDirection="column"
    >
      <Text>Register!</Text>
      <button
        onClick={() => {
          fetch(`self-service/registration/browser`, {
            headers: { Accept: "application/json" },
          })
            .then((res) => res.json())
            .then((response) =>
              fetch(`self-service/registration?flow=${response.id}`, {
                method: "POST",
                body: JSON.stringify({
                  method: "password",
                  csrf_token: response.ui.nodes[0].attributes.value,
                }),
                headers: {
                  Accept: "application/json",
                  "Content-Type": "application/json",
                },
              })
            )
            .then((res) => res.json())
            .then((response) => alert(response.identity.traits.accountKey));
        }}
      >
        Register
      </button>
    </Flex>
  );
}
