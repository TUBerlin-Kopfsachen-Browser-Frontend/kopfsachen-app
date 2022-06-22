import { useEffect, useState } from "react";
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
  Center,
  Stack,
  useColorModeValue,
  Box,
  FormControl,
  FormLabel,
} from "@chakra-ui/react";

// api response format as interface
interface LoginBody {
  id: string;
  type: string;
  expires_at: string;
  issued_at: string;
  request_url: string;
  ui: {
    action: string;
    method: string;
    nodes: {
      type: string;
      group: string;
      attributes: {
        name: string;
        type: string;
        value: string;
        required: boolean;
        disabled: boolean;
        node_type: string;
      };
      messages: {}[];
      meta: {}[];
    }[];
  };
  contents: {
    content: string;
    type: string;
  }[];
}

function LoginPage() {
  const [LoginBody, setLoginBody] = useState<LoginBody>();
  // to fetch data everytime the front page is loaded
  useEffect(() => {
    const baseUrl = "http://localhost:4433"; // localhost + port as base url
    const fetchRegistrastionFlowWrapper = async () => {
      const loginFlow = await fetch(`${baseUrl}/self-service/login/browser`, {
        headers: { Accept: "application/json" },
      });
      if (loginFlow.ok) {
        const loginFlowData = await loginFlow.json();
        setLoginBody(loginFlowData);
      } else {
        console.log("Failed to fetch login Flow.");
      }
    };
    fetchRegistrastionFlowWrapper();
  }, []);
  if (LoginBody) {
    return <p>{LoginBody.id}</p>;
  }
  return <p></p>;
}

export default function Login() {
  return (
    <Flex
      minH={"100vh"}
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("gray.50", "gray.800")}
      direction="column"
    >
      <Text>
        Login! fetching flow id ...
        <LoginPage />
      </Text>
      <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
        <Stack align={"center"}>
          <Heading fontSize={"4xl"}>Login</Heading>
        </Stack>
        <Box
          rounded={"lg"}
          bg={useColorModeValue("white", "gray.700")}
          boxShadow={"lg"}
          p={8}
        >
          <Stack spacing={4}>
            <FormControl id="login_id">
              <FormLabel>Login ID</FormLabel>
              <Input type="login_id" />
            </FormControl>
            {/* <FormControl id="password">
                        <FormLabel>Password</FormLabel>
                        <Input type="password" />
                        </FormControl> */}
            <Stack spacing={0}>
              <Stack
                direction={{ base: "column", sm: "row" }}
                align={"start"}
                justify={"space-between"}
              >
                {/* <Checkbox>Remember me</Checkbox> */}
                {/* <Link color={'blue.400'}>Forgot identifier?</Link> */}
              </Stack>
              <Button
                bg={"green.400"}
                color={"white"}
                _hover={{
                  bg: "green.400",
                }}
              >
                Login Now!
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}
