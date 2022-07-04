import * as React from "react"
import {
  ChakraProvider,
  Box,
  Text,
  Stack,
  Image,
  theme,
  Flex,
  Center,
  Heading,
  Button,
} from "@chakra-ui/react"
import Sidebar from "../components/Sidebar"
import thumbnail from "../thumbnail.png"
import sun from "../sun.png"
import { useNavigate } from "react-router-dom";
import { TimeIcon } from "@chakra-ui/icons"



interface ICountdown {
  hours: number;
  minutes: number;
  seconds: number;
}

const CountDownTimer = ({ hours = 0, minutes = 0, seconds = 60 }: ICountdown) => {


  const [time, setTime] = React.useState<ICountdown>({ hours, minutes, seconds });
      const navigate = useNavigate();



  const tick = () => {
      
    if (time.hours === 0 && time.minutes === 0 && time.seconds === 0)
      reset()
    else if (time.hours === 0 && time.minutes==10 && time.seconds === 0 ) {
      setTime({ hours: time.hours  , minutes: 9, seconds: 59
       });
    } else if (time.seconds === 0) {
      setTime({ hours: time.hours, minutes: time.minutes - 1, seconds: 59 });
    } else {
      setTime({ hours: time.hours, minutes: time.minutes, seconds: time.seconds - 1 });
    }
  };


  const reset = () => setTime({ hours: time.hours, minutes: time.minutes, seconds: time.seconds });


  React.useEffect(() => {
    const timerId = setInterval(() => tick(), 1000);
    return () => clearInterval(timerId);
  });

   const refreshPage = ()=>{
     window.location.reload();
  }

  return (
    <ChakraProvider theme={theme}>

    
        <Box >
          <Sidebar />
          
        </Box>
    
        <Box w='100%' h='600px'>
          
          <Box w='100%' h='200px' bg='#F5F500'>
            <Text fontSize='40px' align='center' pt='50px' color='white'>Optimism </Text>
            <Center>
              <Image src={sun} alt="sun" width='80px' />
            </Center>
            <Button  colorScheme='yellow' variant='ghost' pl='300px' onClick={() => navigate
                    ('/optimism1')}>
                        ← Back 
                </Button>

            <Box w='100%' h='800px' pt='20px'>
              <Center>
           <Text fontSize='7xl'>
           {`${time.hours.toString().padStart(2, '0') }:${time.minutes
              .toString()
              .padStart(2, '0')}:${time.seconds.toString().padStart(2, '0')}`}
            </Text>
              </Center>

              <Box pt='40px'>
                <Center>
                  <Button
                  display={'inline-block'} colorScheme='yellow' variant='solid'
               onClick={refreshPage } size='md' height='48px' width='250px' leftIcon={<TimeIcon />} > Reset  </Button>
              </Center>
              
          <Center>
          <Box width="900px" pt='40px'>
           
          <Text fontSize='18px' color='black' align='center'>If you want to practice optimism, the following task can help you: set a timer for 10 minutes. During this time, think about your best possible future self and write it down on a piece of paper. Prepare several pieces of paper for this exercise. Imagine your life the way you always imagined it. Imagine you did your best and achieved all the things you always wanted to achieve in life. Don't worry about grammar or spelling as you write. Just focus on expressing all your thoughts and emotions in a vivid way.
          
        </Text>
      
      </Box>
            </Center>
            <Box pt='20px'>
      <Center>

        <Button onClick={() => navigate('/optimism3')}   display={'inline-block'} colorScheme='yellow' variant='solid' size='lg'>Lets go</Button>
 
      </Center>
        </Box>
              </Box>
               
              </Box>
          </Box >



      
        </Box>


    </ChakraProvider>
  );
}
export default CountDownTimer;