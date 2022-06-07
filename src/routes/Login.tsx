import { useEffect, useState } from "react"
import { ChakraProvider, Text, Link, theme, Flex, Heading, Input, InputGroup, InputLeftElement, Button, Skeleton, Center, } from "@chakra-ui/react"

// api response format as interface
interface LoginBody {
    id: string;
    type: string;
    expires_at: string;
    issued_at: string;
    request_url: string;
    ui: {
        action: string;
        method: string;
        nodes:{
            type: string;
            group: string;
            attributes:{
                name: string;
                type: string;
                value: string;
                required: boolean;
                disabled: boolean;
                node_type: string;
            };
            messages:{}[];
            meta:{}[];
        }[]
    }
    contents: {
        content: string;
        type: string;
    }[];
}


function LoginPage() {
    const [LoginBody, setLoginBody] = useState<LoginBody>();
    // to fetch data everytime the front page is loaded
    useEffect(() => {
        const baseUrl = "http://localhost:4433"; // localhost + port as base url
        const fetchRegistrastionFlowWrapper = async () => {
            const loginFlow = await fetch(`${baseUrl}/self-service/login/browser`, {
                headers: { 'Accept': 'application/json' },
            });
            if (loginFlow.ok) {
                const loginFlowData = await loginFlow.json();
                setLoginBody(loginFlowData);
            } else {
                console.log("Failed to fetch login Flow.");
            }
        }
        fetchRegistrastionFlowWrapper();

    }, []);
    if (LoginBody) {
        return <p>{LoginBody.id}</p>
    }
    return <p></p>;
}


export default function Login() {
    return (
        <ChakraProvider theme={theme}>
            <Center>
                <Text>
                    Login! fetching flow id ...
                    <LoginPage />
                </Text>   
            </Center>
            
        </ChakraProvider>
    );
}