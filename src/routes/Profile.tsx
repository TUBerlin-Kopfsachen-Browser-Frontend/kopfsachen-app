import * as React from "react";
import {
  ChakraProvider,
  theme,
  Flex,
  Heading,
  Button,
  Stack,
  Avatar,
  Center,
  Link,
} from "@chakra-ui/react";
import Sidebar from "../components/Sidebar";
import {
  FiUser,
  FiSettings,
  FiMail,
  FiCalendar,
  FiChevronRight,
  FiShield,
} from "react-icons/fi";

export default function Profile() {
  return (
    <Flex direction="column">
      <Sidebar />
      <Flex
        flexDirection="column"
        position="absolute"
        top="10vh"
        left="50vw"
        transform="translate(-50%, -0%)"
        maxWidth="800px"
      >
        <Center>
          <Heading> My Profile </Heading>
        </Center>
        <Center>
          <Avatar size="xl" src="avatar-1.jpg" margin={7} />
        </Center>
        <Stack direction="column" spacing={3}>
          <Link>
            <Button
              width={200}
              leftIcon={<FiUser />}
              rightIcon={<FiChevronRight />}
            >
              {" "}
              Account{" "}
            </Button>
          </Link>
          <Link href="mooddiary">
            <Button
              width={200}
              leftIcon={<FiCalendar />}
              rightIcon={<FiChevronRight />}
            >
              {" "}
              Mood history
            </Button>
          </Link>
          <Link>
            <Button
              width={200}
              leftIcon={<FiMail />}
              rightIcon={<FiChevronRight />}
            >
              {" "}
              Notifications{" "}
            </Button>
          </Link>
          <Link>
            <Button
              width={200}
              leftIcon={<FiShield />}
              rightIcon={<FiChevronRight />}
            >
              {" "}
              Data protection{" "}
            </Button>
          </Link>
          <Link href="settings">
            <Button
              width={200}
              leftIcon={<FiSettings />}
              rightIcon={<FiChevronRight />}
            >
              {" "}
              Settings{" "}
            </Button>
          </Link>
        </Stack>
      </Flex>
    </Flex>
  );
}
