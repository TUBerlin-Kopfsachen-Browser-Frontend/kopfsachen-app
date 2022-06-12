// Sidebar Base by Benjamin Carlson
// https://github.com/bjcarlson42/chakra-left-responsive-navbar
// 12.05.2022


import React, { useState } from 'react'
import {
    Flex,
    Text,
    IconButton,
    Divider,
    Avatar,
    Heading,
    Link,
    Select
} from '@chakra-ui/react'
import {
    FiMenu,
    FiHome,
    FiCalendar,
    FiBookOpen,
    FiArrowUpCircle,
    FiShield,
    FiSettings
} from 'react-icons/fi'
import NavItem from '../components/NavItem'
import { ColorModeSwitcher } from "../components/ColorModeSwitcher"

import i18n, { t } from "i18next";
import { initReactI18next, useTranslation } from "react-i18next";
import {translationsEn, translationsTr, translationsDe, translationsAl} from "../components/translationText"

i18n
    .use(initReactI18next)
    .init({
        resources: {
            en: {translation: translationsEn},
            tr: {translation: translationsTr},
            de: {translation: translationsDe},
            al: {translation: translationsAl}
        },
        lng: "en",
        fallbackLng: "en",
        interpolation: {escapeValue: false},
    });

export default function Sidebar() {
    const [navSize, changeNavSize] = useState("large")

    const { t } = useTranslation();

    const onChange = (event) => {
        i18n.changeLanguage(event.target.value);
    }
    return (
        <Flex
            pos="fixed"
            left="5"
            h="95vh"
            marginTop="2.5vh"
            boxShadow="0 4px 12px 0 rgba(0, 0, 0, 0.05)"
            borderRadius={navSize === "small" ? "15px" : "30px"}
            w={navSize === "small" ? "75px" : "250px"}
            flexDir="column"
            justifyContent="space-between"
        >
            <Flex
                p="5%"
                flexDir="column"
                w="100%"
                alignItems={navSize === "small" ? "center" : "flex-start"}
                as="nav"
            >
                <IconButton
                    background="none"
                    mt={6}
                    _hover={{ background: 'none' }}
                    icon={<FiMenu />}
                    onClick={() => {
                        if (navSize === "small")
                            changeNavSize("large")
                        else
                            changeNavSize("small")
                    }}
                />
                
                <NavItem navSize={navSize} icon={FiHome} title={t('home')} description="This is the description for the dashboard." routeto="/"/>
                <NavItem navSize={navSize} icon={FiCalendar} title={t('moodDiary')} routeto="/mooddiary"/>
                <NavItem navSize={navSize} icon={FiBookOpen} title={t('wiki')} routeto="/wiki" />
                <NavItem navSize={navSize} icon={FiArrowUpCircle} title={t('resources')} routeto="/resources"/>
                <NavItem navSize={navSize} icon={FiShield} title={t('emergencyNumbers')} routeto="/emergencynumbers"/>
                <NavItem navSize={navSize} icon={FiSettings} title={t('settings')} routeto="/settings"/>
                <Select onChange={onChange} padding={'10px'}>
                        <option value='en'>🇬🇧 English</option>
                        <option value='de'>🇩🇪 Deutsch</option>
                        <option value='tr'>🇹🇷 Türkçe</option>
                        <option value='al'>🇦🇱 Shqip</option>
                    </Select>

                
            </Flex>

            
            <Flex
                p="5%"
                flexDir="column"
                w="100%"
                alignItems={navSize === "small" ? "center" : "flex-start"}
                mb={4}
            >
                <ColorModeSwitcher justifySelf="flex-end" />
            </Flex>



            <Flex
                p="5%"
                flexDir="column"
                w="100%"
                alignItems={navSize === "small" ? "center" : "flex-start"}
                mb={4}
            >
                <Divider display={navSize === "small" ? "none" : "flex"} />
                <Flex mt={4} align="center">
                    <Avatar size="sm" src="avatar-1.jpg" />
                    <Flex flexDir="column" ml={4} display={navSize === "small" ? "none" : "flex"}>
                        <Link href='profile'> 
                            <Heading as="h3" size="sm">Maxi Mustermensch</Heading>
                        </Link>
                        <Text color="gray">{t('username')}</Text>
                    </Flex>
                </Flex>
            </Flex>
        </Flex>
    )
}