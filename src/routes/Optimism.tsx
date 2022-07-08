import * as React from "react";
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
} from "@chakra-ui/react";
import Sidebar from "../components/Sidebar";
import { useNavigate } from "react-router-dom";
import { TimeIcon } from "@chakra-ui/icons";
import { ContentWrapper } from "../components/utils";

interface ICountdown {
  hours: number;
  minutes: number;
  seconds: number;
}

const CountDownTimer = ({
  hours = 0,
  minutes = 0,
  seconds = 60,
}: ICountdown) => {
  const [time, setTime] = React.useState<ICountdown>({
    hours,
    minutes,
    seconds,
  });
  const navigate = useNavigate();

  const tick = () => {
    if (time.hours === 0 && time.minutes === 0 && time.seconds === 0) reset();
    else if (time.hours === 0 && time.minutes == 10 && time.seconds === 0) {
      setTime({
        hours: time.hours,
        minutes: 9,
        seconds: 59,
      });
    } else if (time.seconds === 0) {
      setTime({ hours: time.hours, minutes: time.minutes - 1, seconds: 59 });
    } else {
      setTime({
        hours: time.hours,
        minutes: time.minutes,
        seconds: time.seconds - 1,
      });
    }
  };

  const reset = () =>
    setTime({
      hours: time.hours,
      minutes: time.minutes,
      seconds: time.seconds,
    });

  React.useEffect(() => {
    const timerId = setInterval(() => tick(), 1000);
    return () => clearInterval(timerId);
  });

  const refreshPage = () => {
    window.location.reload();
  };

  return (
    <ContentWrapper headerProps={{ text: "Optimism 🌻" }}>
      <Flex flexDir="column">
        {/* <Button colorScheme='yellow' variant='ghost' pl='300px' onClick={() => navigate
          ('/resources/optimism1')}>
          ← Back
        </Button> */}
        <Box w="100%" h="800px">
          <Center>
            <Text fontSize="5xl">
              {`${time.hours.toString().padStart(2, "0")}:${time.minutes
                .toString()
                .padStart(2, "0")}:${time.seconds.toString().padStart(2, "0")}`}
            </Text>
          </Center>
          <Box pt="40px">
            <Center>
              <Button
                colorScheme="warning"
                display={"inline-block"}
                onClick={refreshPage}
                leftIcon={<TimeIcon />}
              >
                {" "}
                Reset{" "}
              </Button>
            </Center>
            <Center>
              <Box
                width="900px"
                p="20px"
                mt="40px"
                bg="yellow.200"
                borderRadius="lg"
                boxShadow={"xl"}
              >
                <Text fontSize="18px" color="black" textAlign="left">
                  If you want to practice optimism, the following task can help
                  you: set a timer for 10 minutes. During this time, think about
                  your best possible future self and write it down on a piece of
                  paper. Prepare several pieces of paper for this exercise.
                  Imagine your life the way you always imagined it. Imagine you
                  did your best and achieved all the things you always wanted to
                  achieve in life. Don't worry about grammar or spelling as you
                  write. Just focus on expressing all your thoughts and emotions
                  in a vivid way.
                </Text>
              </Box>
            </Center>
            <Box pt="40px">
              <Center>
                <Button
                  colorScheme="success"
                  onClick={() => navigate("/resources/optimism1")}
                  display={"inline-block"}
                >
                  Lets go!{" "}
                </Button>
              </Center>
            </Box>
          </Box>
        </Box>
      </Flex>
    </ContentWrapper>
  );
};
export default CountDownTimer;
