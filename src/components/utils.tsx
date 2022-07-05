import { Flex, Text, Image, Box, Center } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import ReactCalendar from "react-calendar";
import Sidebar from "./Sidebar";

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

export interface IHeaderProps {
    text: string;
    // image?: string; // is the image required?
}

export function Header(props: IHeaderProps) {
    const mobile = useMobile();
    const height = 100;

    return <Box
        height={`${height}px`}
        mb={mobile ? '25px' : '75px'}
        zIndex={19} // 1 lower than sidebar
    >
        <Flex
            position='fixed'
            height={`${height}px`}
            w="100%"
            bgGradient='linear(to-r, neutral.500, green.600)'
            pt='20px' pb='20px'
        >
            <Flex
                ml={mobile ? '50px' : '425px'} mr='25px'
                justifyContent='center'
                alignItems='center'
                flexDir={mobile ? 'column' : 'row'}>
                <Text fontSize='xx-large' align="center" pl={mobile ? "80px" : "unset"} mr={mobile ? 'unset' : '10px'} color="white">
                    {props.text}
                </Text>
                {/* {props.image && <Image src={props.image} alt={props.image} />} */}
            </Flex>
        </Flex>
    </Box>
}

export interface IContentProps {
    children: JSX.Element;
    headerProps: IHeaderProps;
}

export function ContentWrapper(props: IContentProps) {
    const mobile = useMobile();
    return <Flex direction="column">
        <Box>
            <Sidebar />
        </Box>
        <Header {...props.headerProps} />
        <Box ml={mobile ? '25px' : '425px'} mr='25px' width={mobile ? 'calc(100vw - 50px)' : 'fit-content'}>
            {props.children}
        </Box>
    </Flex>
}