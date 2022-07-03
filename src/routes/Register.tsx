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
import LogoutButton from "../components/Logout";
import React from "react";
import { useStore } from "../store/isLoggedIn";

export default function Register() {
  const [submittedData, setSubmittedData] = useState<FormData>();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data: any) => console.log(data);
  console.log(errors);
  const login = useStore((s) => s.login);

  return (
    <Flex
      minH={"100vh"}
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("gray.50", "gray.800")}
    >
      <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
        <Stack align={"center"}>
          <Heading fontSize={"4xl"}>Register a new account</Heading>
          <Text fontSize={"lg"} color={"gray.600"}>
            to use the Kopfsachen app!
          </Text>
        </Stack>
        <Box
          rounded={"lg"}
          bg={useColorModeValue("white", "gray.700")}
          boxShadow={"lg"}
          p={8}
        >
          <Stack spacing={4}>
            <Button
              bg={"green.400"}
              color={"white"}
              _hover={{
                bg: "green.400",
              }}
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
                  .then((response) => {
                    alert(response.identity.traits.accountKey);
                    login();
                    window.location.replace("/");
                  });
              }}
            >
              Register
            </Button>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}
