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
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
} from "@chakra-ui/react";
import LogoutButton from "../components/Logout";
import { useStore } from "../store/isLoggedIn";

const md5 = require("md5");

export default function Login() {
  const [submittedData, setSubmittedData] = useState<FormData>();
  const [wrongKey, setwrongKey] = useState<Boolean>(false);
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
          <Heading fontSize={"4xl"}>Log in to your account</Heading>
          <Text fontSize={"lg"} color={"gray.600"}>
            Please enter your account key 🔑
          </Text>
        </Stack>
        <Box
          rounded={"lg"}
          bg={useColorModeValue("white", "gray.700")}
          boxShadow={"lg"}
          p={8}
        >
          <Stack spacing={4}>
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
                  .then((res) => {
                    if (res.status == 200) {
                      login();
                      window.location.replace("/");
                    } else {
                      setwrongKey(true);
                    }
                  });
              }}
            >
              <Stack spacing={4}>
                <Input name="account-key" placeholder="Account key" focusBorderColor={useColorModeValue("neutral.400", "neutral.100")}/>
              </Stack>

              <Stack spacing={10}>
                <Button
                  type="submit"
                  colorScheme='success'
                  mt={3}
                >
                  Login
                </Button>
              </Stack>
            </form>
          </Stack>
        </Box>
        <Alert status="error" display={wrongKey ? "" : "none"}>
          <AlertIcon />
          <AlertTitle>Wrong account key!</AlertTitle>
          <AlertDescription>The account key does not exist.</AlertDescription>
        </Alert>
      </Stack>
    </Flex>
  );
}
