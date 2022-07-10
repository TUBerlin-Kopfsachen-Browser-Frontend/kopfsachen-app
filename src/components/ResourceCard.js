import {
  Box,
  Center,
  useColorModeValue,
  Heading,
  Text,
  Stack,
  Image,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { useMobile } from "../components/utils"

export default function ResourceCard({ title, emoji, emojiaria, link, image }) {
  const mobile = useMobile();
  return (
    <Link to={link}>
      <Center py={3}>
        <Box
          role={"group"}
          p={6}
          width={mobile ? '140px' :'200px'}
          bg={useColorModeValue("white", "gray.800")}
          boxShadow={"2xl"}
          rounded={"lg"}
          pos={"relative"}
          zIndex={1}
          _hover={{ backgroundColor:useColorModeValue("neutral.100", "neutral.800") }}
        >
          {/* <Box
          rounded={"lg"}
          mt={-12}
          pos={"relative"}
          height={"230px"}
          _after={{
            transition: "all .3s ease",
            content: '""',
            w: "full",
            h: "full",
            pos: "absolute",
            top: 5,
            left: 0,
            // backgroundImage: `url(${image})`,
            filter: "blur(15px)",
            zIndex: -1,
          }}
          _groupHover={{
            _after: {
              filter: "blur(20px)",
            },
          }}
        >
          <Image
            rounded={"lg"}
            height={230}
            width={282}
            objectFit={"cover"}
            src={image}
          />
        </Box> */}
          <Box
            rounded={"lg"}
            mt={-12}
            pos={"relative"}
            height={"130px"}
            _groupHover={{
              _after: {
                filter: "blur(20px)",
              },
            }}
          >
            <Center>
            <Text pt={5} role="img" aria-label={emojiaria} fontSize={mobile ? "7xl" : "8xl"} textAlign='center'>
              {emoji}
            </Text>
            </Center>
          </Box>
          <Stack pt={10} align={"center"}>
            <Text
              color={"gray.500"}
              fontSize={"sm"}
              textTransform={"uppercase"}
              fontStyle='italic'
            >
              Exercise
            </Text>
            <Heading fontSize={mobile ? "lg" : "xl"} fontFamily={"body"} fontWeight={500}>
              {title}
            </Heading>
          </Stack>
        </Box>
      </Center>
    </Link>
  );
}
