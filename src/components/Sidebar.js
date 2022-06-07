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

export default function Sidebar() {
    const [navSize, changeNavSize] = useState("large")
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
                    mt={5}
                    _hover={{ background: 'none' }}
                    icon={<FiMenu />}
                    onClick={() => {
                        if (navSize === "small")
                            changeNavSize("large")
                        else
                            changeNavSize("small")
                    }}
                />
                
                <NavItem navSize={navSize} icon={FiHome} title="Home" description="This is the description for the dashboard." routeto="/"/>
                <NavItem navSize={navSize} icon={FiCalendar} title="Mood Diary" routeto="/mooddiary"/>
                <NavItem navSize={navSize} icon={FiBookOpen} title="Wiki" routeto="/wiki" />
                <NavItem navSize={navSize} icon={FiArrowUpCircle} title="Resources" routeto="/resources"/>
                <NavItem navSize={navSize} icon={FiShield} title="Emergency numbers" routeto="/emergencynumbers"/>
                <NavItem navSize={navSize} icon={FiSettings} title="Settings" routeto="/settings"/>
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
                        <Text color="gray">Username</Text>
                    </Flex>
                </Flex>
            </Flex>
        </Flex>
    )
}