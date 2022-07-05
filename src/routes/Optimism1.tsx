import * as React from "react"
import {
    ChakraProvider,
    Box,
    Text,
    Link,
    VStack,
    Stack,
    Tabs,
    TabList,
    TabPanels,
    Tab,
    TabPanel,
    List,
    ListItem,
    ListIcon,
    OrderedList,
    Code,
    Grid,
    Image,
    theme,
    Flex,
    Center,
    Heading,
    Button,
} from "@chakra-ui/react"
import Sidebar from "../components/Sidebar"
import thumbnail from "../thumbnail.png"
import sun from "../sun.png"


import { MdCheckCircle } from "react-icons/md";
import { ChatIcon, EmailIcon, PhoneIcon } from "@chakra-ui/icons"
import { useNavigate } from "react-router-dom";
import { ContentWrapper, useMobile } from "../components/utils"


export default function Wiki() {
    const navigate = useNavigate();
    const mobile = useMobile();
    return (
        <ContentWrapper headerProps={{ text: 'Resources' }}>
            <Flex flexDir='column' alignItems='center'>
            <Flex alignItems='center' justifyContent='space-evenly' bg='yellow.100' width='300px'>
                <Text color='black' mr={3} fontSize='2xl'fontWeight='bold' fontStyle='oblique'> Optimism </Text>
                <Image mt={3} mb={3} src={sun}alt='sun'/>
            </Flex>
                <Text fontSize={20} mt={10} mb={5}>
                    Find out what's behind it!
                </Text>
                <Image src={thumbnail} alt="thumbnail" width='300px' />
                <Flex flexDirection="row" justifyContent='space-evenly'>
                    <Button colorScheme="warning" mr={3} mt={10} whiteSpace={mobile ? 'initial' : 'unset'}>
                        Choose another strategy
                    </Button>
                    <Button
                        colorScheme="success"
                        onClick={() => navigate("/resources/optimism2")}
                        whiteSpace={mobile ? 'initial' : 'unset'}
                        mt={10}
                    >
                        I want to practice that
                    </Button>
                </Flex>
            </Flex>
        </ContentWrapper>
    );
}