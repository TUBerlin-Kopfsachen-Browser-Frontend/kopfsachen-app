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
import LogoutButton, { LogoutButtonSidebar } from "../components/Logout";
import { ContentWrapper } from "../components/utils";

export default function Profile() {
  return (
    <ContentWrapper headerProps={{text:'My Profile'}}>
      <Flex flexDir='column' alignItems='center'>
        <Center>
          <Avatar size="xl" src="avatar-1.jpg" margin={7} />
        </Center>
        <Stack direction="column" spacing={3}>
          <Link>
            <Button
              // colorScheme='primary'
              size='lg'
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
              // colorScheme='primary'
              size='lg'
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
              // colorScheme='primary'
              size='lg'
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
              // colorScheme='warning'
              size='lg'
              width={200}
              leftIcon={<FiShield />}
              rightIcon={<FiChevronRight />}
            >
              {" "}
              Data protection{" "}
            </Button>
          </Link>
          {/* <Link href="settings">
            <Button
              width={200}
              leftIcon={<FiSettings />}
              rightIcon={<FiChevronRight />}
            >
              {" "}
              Settings{" "}
            </Button>
          </Link> */}
          <LogoutButton/>
        </Stack>
      </Flex>
    </ContentWrapper>
  );
}
