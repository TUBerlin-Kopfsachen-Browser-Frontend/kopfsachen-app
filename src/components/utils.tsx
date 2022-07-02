import { Flex, Text, Image } from "@chakra-ui/react";
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

export interface IHeaderProps {
    text: string;
    image?: string;
}

//header
export function Header(props: IHeaderProps) {
    const mobile = useMobile();

    return <Flex
        justifyContent='center'
        alignItems='center'
        flexDir={mobile ? 'column' : 'row'}
        w="100%"
        bgGradient='linear(to-r, neutral.500, green.600)'
        padding='20px'
        mb={mobile ? '25px' : '75px'}
    >
        <Text fontSize="40px" align="center" pl={mobile ? "80px" : "unset"} mr={mobile ? 'unset' : '10px'} color="white">
            {props.text}
        </Text>
        {props.image && <Image src={props.image} alt={props.image} />}
    </Flex>
}