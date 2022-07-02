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
import { ContentWrapper, useMobile } from "./components/utils";


export default function App() {
  const mobile = useMobile();
  return <ContentWrapper headerProps={{ text: 'Home' }}>
    <Flex flexDirection='column' alignItems='center' mt='150px'>
      <Image src="/header.png" width={["200px", "400px"]} />
      <Text fontSize={["16", "24"]}>Welcome to the Kopsachen Web App!</Text>
    </Flex>
  </ContentWrapper>
  // return (
  //   <Flex direction='column'>
  //     <Sidebar />
  //     <Box w="100%" h="120px" bgGradient='linear(to-r, neutral.500, green.600)'>
  //       <Text fontSize="40px" align="center" pt="50px" color="white">
  //         Home{" "}
  //       </Text>
  //     </Box>
  //     <Flex
  //       fontSize="large"
  //       position="absolute"
  //       top={mobile ? "unset" : "20vh"}
  //       left={mobile ? "unset" : "50vw"}
  //       transform={mobile ? "unset" : "translate(-50%, -0%)"}
  //       margin={mobile ? "40px" : "unset"}
  //       maxWidth="800px"
  //     >
  //       <Center pt={200} gap="16px" flexDirection="column">
  //         <Image src="/header.png" width={["200px", "400px"]} />
  //         <Text fontSize={["16", "24"]}>Welcome to the Kopsachen Web App!</Text>
  //       </Center>
  //     </Flex>
  //   </Flex>
  // );
}
