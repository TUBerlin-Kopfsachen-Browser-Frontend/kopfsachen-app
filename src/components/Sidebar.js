// Sidebar Base by Benjamin Carlson
// https://github.com/bjcarlson42/chakra-left-responsive-navbar
// 12.05.2022

import { useEffect, useMemo, useState } from "react";
import {
  Flex,
  Text,
  IconButton,
  Divider,
  Avatar,
  Heading,
  Link,
  Select,
  useColorModeValue,
} from "@chakra-ui/react";
import {
  FiMenu,
  FiHome,
  FiCalendar,
  FiBookOpen,
  FiArrowUpCircle,
  FiShield,
  FiSettings,
  FiUser,
} from "react-icons/fi";
import NavItem from "../components/NavItem";
import { ColorModeSwitcher } from "../components/ColorModeSwitcher";

import i18n from "i18next";
import { initReactI18next, useTranslation } from "react-i18next";
import {
  translationsEn,
  translationsTr,
  translationsDe,
  translationsAl,
} from "../components/translationText";

import { useStore } from "../../src/store/isLoggedIn";
import LogoutButton, { LogoutButtonSidebar } from "./Logout";

i18n.use(initReactI18next).init({
  resources: {
    en: { translation: translationsEn },
    tr: { translation: translationsTr },
    de: { translation: translationsDe },
    al: { translation: translationsAl },
  },
  lng: "en",
  fallbackLng: "en",
  interpolation: { escapeValue: false },
});

export default function Sidebar() {
  const [navSize, changeNavSize] = useState("large");
  const { t } = useTranslation();

  useEffect(() => {
    if (window.innerWidth <= 815) {
      changeNavSize("small");
    }
    window.addEventListener("resize", () => {
      if (window.innerWidth <= 815) {
        changeNavSize("small");
      } else {
        changeNavSize("large");
      }
    });
  }, []);

  const onChange = (event) => {
    i18n.changeLanguage(event.target.value);
  };

  const navIconDisplay = useMemo(
    () => (navSize === "small" ? "none" : "flex"),
    [navSize]
  );

  return (
    <Flex
      pos="fixed"
      left="25px"
      top='25px'
      bottom={navSize === 'small' ? 'unset' : '25px'}
      boxShadow="0 4px 12px 0 rgba(0, 0, 0, 0.25)"
      borderRadius={navSize === "small" ? "15px" : "30px"}
      w={navSize === "small" ? "75px" : "275px"}
      h={navSize === "small" ? "unset" : "600px"}
      flexDir="column"
      justifyContent="space-between"
      backgroundColor={useColorModeValue("neutral.50", "neutral.700")}
      zIndex={20}
      display={useStore((state) => state.isLoggedIn) ? "" : "none"}
    >
      <Flex
        p="5%"
        flexDir="column"
        w="100%"
        alignItems={navSize === "small" ? "center" : "flex-start"}
        as="nav"
        // padding='5px'
      >
        <IconButton
          background="none"
          mt={navSize === "small" ? 0 : 6}
          _hover={{ background: "none" }}
          icon={<FiMenu />}
          onClick={() => {
            if (navSize === "small") changeNavSize("large");
            else changeNavSize("small");
          }}
        />

        <NavItem
          display={navIconDisplay}
          navSize={navSize}
          icon={FiHome}
          title={t("home")}
          description="This is the description for the dashboard."
          routeto="/home"
        />
        <NavItem
          display={navIconDisplay}
          navSize={navSize}
          icon={FiCalendar}
          title={t("moodDiary")}
          routeto="/mooddiary"
        />
        <NavItem
          display={navIconDisplay}
          navSize={navSize}
          icon={FiBookOpen}
          title={t("wiki")}
          routeto="/wiki"
        />
        <NavItem
          display={navIconDisplay}
          navSize={navSize}
          icon={FiArrowUpCircle}
          title={t("resources")}
          routeto="/resources"
        />
        <NavItem
          display={navIconDisplay}
          navSize={navSize}
          icon={FiShield}
          title={t("emergencyNumbers")}
          routeto="/emergencynumbers"
        />
        <NavItem
          display={navIconDisplay}
          navSize={navSize}
          icon={FiUser}
          title={t("Profile")}
          routeto="/profile"
        />
        <Select
          display={navIconDisplay}
          marginTop={30}
          onChange={onChange}
          padding={"10px"}
          _hover={{ backgroundColor:useColorModeValue("neutral.100", "neutral.800") }}
          borderColor={useColorModeValue("neutral.50", "neutral.700")}
        >
          <option value="en">🇬🇧 English</option>
          <option value="de">🇩🇪 Deutsch</option>
          <option value="tr">🇹🇷 Türkçe</option>
          <option value="al">🇦🇱 Shqip</option>
        </Select>
      </Flex>

      <Flex
        p="5%"
        w="100%"
        alignItems={navSize === "small" ? "center" : "flex-start"}
        mb={1}
        display={navSize === "small" ? "none" : "flex"}
        justifyContent='space-between'
      >
        <ColorModeSwitcher justifySelf="flex-end"  _hover={{ textDecor: "none", backgroundColor:useColorModeValue("neutral.100", "neutral.800") }}/>
        <LogoutButtonSidebar/>
      </Flex>

      {/* <Flex
        p="5%"
        flexDir="column"
        w="100%"
        alignItems={navSize === "small" ? "center" : "flex-start"}
        mb={4}
        display={navSize === "small" ? "none" : "flex"}
      > */}
        {/* <Divider display={navSize === "small" ? "none" : "flex"} />
        <Flex mt={4} align="center">
          <Avatar size="sm" src="avatar-1.jpg" />
          <Flex
            flexDir="column"
            ml={4}
            display={navSize === "small" ? "none" : "flex"}
          >
            <Link href="profile">
              <Heading as="h3" size="sm">
                Maxi Mustermensch
              </Heading>
            </Link>
            <Text color={useColorModeValue("neutral.800", "neutral.100")}>{t("username")}</Text>
          </Flex>
        </Flex> */}
      {/* </Flex> */}
    </Flex>
  );
}
