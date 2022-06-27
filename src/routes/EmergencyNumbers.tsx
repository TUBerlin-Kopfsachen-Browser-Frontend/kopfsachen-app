import * as React from "react";
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
} from "@chakra-ui/react";
import Sidebar from "../components/Sidebar";
import externhelp from "../externhelp.png";
import jugendemail from "../jugendemail.png";
import krisenchat from "../krisenchat.png";
import nummergegenkummer from "../nummergegenkummer.png";

import { MdCheckCircle } from "react-icons/md";
import { ChatIcon, EmailIcon, PhoneIcon } from "@chakra-ui/icons";
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

export default function EmergencyNumbers() {
  const mobile = useMobile();
  return (
    <Flex direction="column">
      <Box>
        <Sidebar />
      </Box>

      {/* <Box w="100%" h="600px"> */}
        <Box w="100%" h={mobile ? '180px' : '200px'} bg="red.400">
          <Text fontSize="40px" align="center" pl={mobile ? "80px" : "unset"} pt={mobile ? "18px" : "30px"} color="white">
            External Help{" "}
          </Text>
          <Center>
            <Image src={externhelp} alt="externhelp" />
          </Center>
        </Box>
        <Flex
            direction="column"
            position={mobile ? "unset" : 'absolute'}
            top={mobile ? "unset" : "25vh"}
            left={mobile ? "unset" : "50vw"}
            transform={mobile ? "unset" : "translate(-50%, -0%)"}
            maxWidth={mobile ? 'calc(100vw - 40px)' : "800px"}
            margin={mobile ? "20px" : "unset"}
          >
          <Text fontSize={mobile ? 16 : 20} align="center" color={"gray.600"}>
            If you just don't know what to do anymore, there are many external
            help offers that will support you in every situation.
          </Text>

          <List>
            <Center>
              <ListItem fontSize={mobile ? 20 : 30} color="black" fontWeight="bold" pt="20px">
                <ListIcon as={MdCheckCircle} color="red.400" />
                Online Consultation
              </ListItem>
            </Center>
          </List>

          <Tabs isFitted variant="enclosed" pt={mobile ? "20px" : "50px"}>
            <TabList mb="1em">
              <Tab>Jugend Notmail</Tab>
              <Tab>Krisenchat </Tab>
              <Tab>Nummer gegen Kummer</Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <Center>
                  <Stack direction="row" wrap='wrap'>
                    <Link href="https://jugendnotmail.de/">
                      <Image src={jugendemail} alt="jugendnotmail" width={200}/>
                    </Link>

                    <Stack pt="20px" spacing="15px">
                      <Button height="60px" width="300px">
                        <Stack>
                          <Text fontWeight="bold">
                            Individual Consultation{" "}
                          </Text>
                          <Text> Tuesdays to Fridays from 18 to 21 Uhr </Text>
                        </Stack>
                      </Button>

                      <Link href="https://junoma-beratung.de/users/login">
                        <Button
                          leftIcon={<EmailIcon />}
                          colorScheme="red"
                          variant="solid"
                          size="md"
                          height="48px"
                          width="300px"
                          border="2px"
                        >
                          Email
                        </Button>
                      </Link>

                      <Link href="https://chat.jugendnotmail.de/frontend/counselor_profiles?embed%5Banonymous_chat_token%5D=WQGcGzJhZ0DEwXPRpuWsnxVC8mElTtH2dCZiB4bAom3EVPzpNRBjDrL59LltSam2&embed%5Bdesign%5D=Mobile_Cleaner_834x696&embed%5Bembedding_site%5D=https%3A%2F%2Fjugendnotmail.de&embed%5Binstance_key%5D=4&embed%5Bpartner_key%5D=9b4aa0">
                        <Button
                          leftIcon={<ChatIcon />}
                          colorScheme="red"
                          variant="solid"
                          height="48px"
                          width="300px"
                          border="2px"
                        >
                          Chat 24/7
                        </Button>
                      </Link>
                    </Stack>
                  </Stack>
                </Center>
              </TabPanel>

              <TabPanel>
                <Center>
                  <Stack direction="row" wrap='wrap'>
                    <Link href="https://krisenchat.de/">
                      <Image
                        src={krisenchat}
                        alt="krisenchat"
                        width="250px"
                        pt="70 px"
                        pr={mobile ? 'unset' :'30px'}
                      />
                    </Link>

                    <Stack pt="40px" spacing="20px">
                      <Link href="https://api.whatsapp.com/send/?phone=4915735998143&text&app_absent=0">
                        <Button
                          leftIcon={<ChatIcon />}
                          colorScheme="whatsapp"
                          variant="solid"
                          size="md"
                          height="48px"
                          width="300px"
                          border="2px"
                        >
                          Whatsapp
                        </Button>
                      </Link>

                      <Link href="mailto:yourmail@gmail.com">
                        <Button
                          leftIcon={<EmailIcon />}
                          colorScheme="red"
                          variant="solid"
                          height="48px"
                          width="300px"
                          border="2px"
                        >
                          Email
                        </Button>
                      </Link>
                    </Stack>
                  </Stack>
                </Center>
              </TabPanel>

              <TabPanel>
                <Center>
                  <Stack direction="row" wrap='wrap'>
                    <Link href="https://www.nummergegenkummer.de/">
                      <Image src={nummergegenkummer} alt="nummergegenkummer" width={200}/>
                    </Link>

                    <Stack pt="40px" spacing="20px">
                      <Link href="https://www.nummergegenkummer.de/onlineberatung/#/">
                        <Button
                          leftIcon={<ChatIcon />}
                          colorScheme="red"
                          variant="solid"
                          size="md"
                          height="48px"
                          width="300px"
                          border="2px"
                        >
                          Contact per Mail or Chat
                        </Button>
                      </Link>

                      <Link href="tel:11611">
                        <Button
                          leftIcon={<PhoneIcon />}
                          colorScheme="red"
                          variant="solid"
                          height="48px"
                          width="300px"
                          border="2px"
                        >
                          Call
                        </Button>
                      </Link>
                    </Stack>
                  </Stack>
                </Center>
              </TabPanel>
            </TabPanels>
          </Tabs>
          </Flex>
      {/* </Box> */}
    </Flex>
  );
}
