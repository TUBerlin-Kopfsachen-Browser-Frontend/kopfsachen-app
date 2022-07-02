import * as React from "react";
import {
  ChakraProvider,
  Box,
  Text,
  Link,
  VStack,
  Code,
  Grid,
  theme,
  Flex,
  Center,
  Heading,
  Image,
} from "@chakra-ui/react";
// import { Logo } from "./Logo"
import Sidebar from "./components/Sidebar";
import { useEffect, useState } from "react";

// functions and custom hook to toggle normal and mobile view
// https://github.com/Nik-Sch/Rezeptbuch/blob/server/ui/client/src/components/helpers/CustomHooks.tsx#L27
function getWindowDimensions() {
  const { innerWidth: width, innerHeight: height } = window;
  return {
    width,
    height
  };
}

export function useWindowDimensions() {
  const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());

  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowDimensions;
}

export function useMobile() {
  const { width, height } = useWindowDimensions();
  return width <= 815 || height <= 815;
}

export default function App() {
  const mobile = useMobile();
  return (
    <Flex direction='column'>
      <Sidebar />
      <Box w="100%" h="120px" bgGradient='linear(to-r, neutral.500, green.600)'>
        <Text fontSize="40px" align="center" pt="50px" color="white">
          Home{" "}
        </Text>
      </Box>
      <Flex
        fontSize="large"
        position="absolute"
        top={mobile ? "unset" : "20vh"}
        left={mobile ? "unset" : "50vw"}
        transform={mobile ? "unset" : "translate(-50%, -0%)"}
        margin={mobile ? "40px" : "unset"}
        maxWidth="800px"
      >
        <Center pt={200} gap="16px" flexDirection="column">
          <Image src="/header.png" width={["200px", "400px"]} />
          <Text fontSize={["16", "24"]}>Welcome to the Kopsachen Web App!</Text>
        </Center>
      </Flex>
    </Flex>
  );
}
