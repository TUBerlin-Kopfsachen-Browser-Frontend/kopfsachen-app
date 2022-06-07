import { useEffect, useState } from "react"
import { ChakraProvider, Text, Link, theme, Flex, Heading, Input, InputGroup, InputLeftElement, Button, Skeleton, } from "@chakra-ui/react"

// api response format as interface
interface RegisterBody {
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


function RegisterPage() {
    const [registerBody, setRegisterBody] = useState<RegisterBody>();
    // to fetch data everytime the front page is loaded
    useEffect(() => {
        const baseUrl = "http://localhost:4433"; // localhost + port as base url
        const fetchRegistrastionFlowWrapper = async () => {
            const registrationFlow = await fetch(`${baseUrl}/self-service/registration/browser`, {
                headers: { 'Accept': 'application/json' },
            });
            if (registrationFlow.ok) {
                const registrationFlowData = await registrationFlow.json();
                setRegisterBody(registrationFlowData);
            } else {
                console.log("Failed to fetch Registration Flow.");
            }
        }
        fetchRegistrastionFlowWrapper();

    }, []);
    if (registerBody) {
        return <p>{registerBody.id}</p>
    }
    return <p></p>;
}


export default function Register() {
    return (
        <ChakraProvider theme={theme}>
            <Text>
                Register! fetching flow id ...
                <RegisterPage />
            </Text>
        </ChakraProvider>
    );
}