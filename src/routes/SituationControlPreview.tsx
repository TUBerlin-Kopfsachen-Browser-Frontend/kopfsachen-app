import * as React from "react";
import {
    Icon,
    ChakraProvider,
    Box,
    Text,
    theme,
    Flex,
    Center,
    Heading,
    Stack,
    RadioGroup,
    HStack,
    Radio,
    Button,
    ButtonGroup,
    Image,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { AspectRatio } from "@chakra-ui/react";
import { ContentWrapper, useMobile } from "../components/utils";

export default function SituationControlPreview() {
    const navigate = useNavigate();
    const mobile = useMobile();
    return (
        <ContentWrapper headerProps={{ text: "Resources" }}>
            <Flex flexDirection="column" alignItems="center">
                <Flex
                    alignItems="center"
                    justifyContent="space-evenly"
                    bg="purple.200"
                    width="300px"
                    borderRadius="lg"
                    boxShadow='md'
                >
                    <Text
                        color="black"
                        ml={3}
                        fontSize="2xl"
                        fontWeight="bold"
                        fontStyle="oblique"
                    >
                        {" "}
                        Situation Control{" "}
                    </Text>
                    <Text role="img" aria-label='controller' fontSize="8xl" textAlign='center'>
                        🎮
                    </Text>
                    {/* <Image
            mt={3}
            mb={3}
            src={"/reframing.png"}
            alt="mood barometer"
            width="120px"
          /> */}
                </Flex>
                <Text fontSize={20} mt={10} mb={5}>
                    Find out what's behind it!
                </Text>
                <Image src={"/thumbnail.png"} alt="thumbnail" width="300px" />
                {/* <Stack>
        <AspectRatio
          ratio={16/9}
        >
          <iframe
            title="reframe"
            src="https://www.youtube-nocookie.com/embed/sOwtIkAO3ZI"
            allowFullScreen
          />
        </AspectRatio>
      </Stack> */}
                <Flex flexDirection="row" justifyContent="space-evenly">
                    <Button
                        colorScheme="warning"
                        pb={mobile ? 1 : "unset"}
                        mr={3}
                        mt={10}
                        whiteSpace={mobile ? "initial" : "unset"}
                        onClick={() => navigate("/resources")}
                    >
                        Choose another strategy
                    </Button>
                    <Button
                        colorScheme="success"
                        whiteSpace={mobile ? "initial" : "unset"}
                        pb={mobile ? 1 : "unset"}
                        mt={10}
                    >
                        I want to practice that
                    </Button>
                </Flex>
            </Flex>
        </ContentWrapper>
    );
}
