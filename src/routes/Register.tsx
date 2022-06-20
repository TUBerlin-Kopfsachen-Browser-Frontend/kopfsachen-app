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
  Stack,
  Box,
  useColorModeValue,
  FormControl,
  FormLabel,
  Checkbox,
} from "@chakra-ui/react";

// api response format as interface
interface RegisterBody {
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

function RegisterPage() {
  const [registerBody, setRegisterBody] = useState<RegisterBody>();
  // to fetch data everytime the front page is loaded
  useEffect(() => {
    const baseUrl = "http://localhost:4433"; // localhost + port as base url
    const fetchRegistrastionFlowWrapper = async () => {
      const registrationFlow = await fetch(
        `${baseUrl}/self-service/registration/browser`,
        {
          headers: { Accept: "application/json" },
        }
      );
      if (registrationFlow.ok) {
        const registrationFlowData = await registrationFlow.json();
        setRegisterBody(registrationFlowData);
      } else {
        console.log("Failed to fetch Registration Flow.");
      }
    };
    fetchRegistrastionFlowWrapper();
  }, []);
  if (registerBody) {
    return <p>{registerBody.id}</p>;
  }
  return <p></p>;
}

export default function Register() {
  return (
    <Flex
      minH={"100vh"}
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("gray.50", "gray.800")}
      flexDirection="column"
    >
      <Text>
        Register! fetching flow id ...
        <RegisterPage />
      </Text>
      <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
        <Stack align={"center"}>
          <Heading fontSize={"4xl"}>Register</Heading>
        </Stack>
        <Box
          rounded={"lg"}
          bg={useColorModeValue("white", "gray.700")}
          boxShadow={"lg"}
          p={8}
        >
          <Stack spacing={4}>
            {/* <FormControl id="email">
                        <FormLabel>Email address</FormLabel>
                        <Input type="email" />
                        </FormControl>
                        <FormControl id="password">
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
                Register Now!
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}
