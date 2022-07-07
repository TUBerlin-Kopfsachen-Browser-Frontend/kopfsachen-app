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
  useColorModeValue
} from "@chakra-ui/react";

function Card(props) {
  const { title, text, width } = props;

  return (
    <Box
      p={4}
      display={{ md: "flex" }}
      maxWidth="30rem"
      // borderWidth={2}
      borderColor={useColorModeValue("primary.400", "primary.100")}
      mb={5} mr={5} ml={5}
      width={width}
      bg={useColorModeValue("blue.100", "blue.900")}
      borderRadius='lg'
      boxShadow={"xl"}
    >
      <Stack
        align={{ base: "center", md: "stretch" }}
        textAlign={{ base: "center", md: "left" }}
        mt={{ base: 4, md: 0 }}
        ml={{ md: 2 }}
      >
        <Text
          fontWeight="bold"
          // textTransform="uppercase"
          fontSize='md'
          letterSpacing="wide"
          color={useColorModeValue("primary.400", "primary.100")}
        >
          {title}
        </Text>

        <Text my={2} whiteSpace='break-spaces'>
          {text}
        </Text>
      </Stack>
    </Box>
  );
}

export default Card;
