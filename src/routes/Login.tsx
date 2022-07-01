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

const md5 = require("md5");

export default function Login() {
  const [submittedData, setSubmittedData] = useState<FormData>();
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
      <Text>Login!</Text>
      <form
        onSubmit={(e) => {
          const formData = new FormData(e.currentTarget);
          e.preventDefault();
          fetch(`self-service/login/browser`, {
            headers: { Accept: "application/json" },
          })
            .then((res) => res.json())
            .then((response) =>
              fetch(`self-service/login?flow=${response.id}`, {
                method: "POST",
                body: JSON.stringify({
                  method: "password",
                  csrf_token: response.ui.nodes[0].attributes.value,
                  identifier: formData.get("account-key"),
                  password: md5(formData.get("account-key")),
                }),
                headers: {
                  Accept: "application/json",
                  "Content-Type": "application/json",
                },
              })
            )
            .then((res) => res.json())
            .then((response) => alert("success"));
        }}
      >
        <Input name="account-key" placeholder="Account-Key" />
        <Button
          type="submit"
          bg={"green.400"}
          color={"white"}
          _hover={{
            bg: "green.400",
          }}
        >
          Login
        </Button>
      </form>
      <LogoutButton />
    </Flex>
  );
}
