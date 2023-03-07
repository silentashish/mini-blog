import { HomePageIllustration } from "../../assets";
import {
  Flex,
  Container,
  Heading,
  Stack,
  Text,
  Button,
} from "@chakra-ui/react";
import { Navbar, ThemeSwitch } from "../../components";

interface props {}

export const LandingPage: React.FC<props> = () => {
  return (
    <Container maxW={"8xl"}>
      <Navbar />
      <Stack
        textAlign={"center"}
        align={"center"}
        spacing={{ base: 8, md: 10 }}
        py={{ base: 20, md: 28 }}
      >
        <Heading
          fontWeight={600}
          fontSize={{ base: "3xl", sm: "4xl", md: "6xl" }}
          lineHeight={"110%"}
        >
          Office Communication{" "}
          <Text as={"span"} color={"orange.400"}>
            made easy
          </Text>
        </Heading>
        <Text color={"gray.500"} maxW={"3xl"}>
          Wanted to know what is happening inside your office? What your staff
          is into? What people are doing in the coming weekend? Are you missing
          out on something? Mini-Blog Keep everyone inside your office
          connected. The secure micro-blogging platform just for your company
          employee.
        </Text>

        <Flex w={"full"}>
          <HomePageIllustration
            height={{ sm: "24rem", lg: "28rem" }}
            mt={{ base: 12, sm: 16 }}
          />
        </Flex>
      </Stack>
    </Container>
  );
};
