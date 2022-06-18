import React from "react";
import {
  Box,
  Flex,
  AspectRatio,
  Image,
  Text,
  Link,
  Button,
  Stack
} from "@chakra-ui/react";

function Card(props) {
  const { title, text } = props;

  return (
    <Box
      p={4}
      display={{ md: "flex" }}
      maxWidth="30rem"
      borderWidth={2}
      margin={2}
    >
      
      <Stack
        align={{ base: "center", md: "stretch" }}
        textAlign={{ base: "center", md: "left" }}
        mt={{ base: 4, md: 0 }}
        ml={{ md: 6 }}
      >
        <Text
          fontWeight="bold"
          textTransform="uppercase"
          fontSize="lg"
          letterSpacing="wide"
          color="teal.400"
        >
          {title}
        </Text>
        
        <Text my={2} color="gray.1000">
          {text}
        </Text>
        
      </Stack>
    </Box>
  );
}

export default Card;