import { Box, Flex } from "@chakra-ui/react";
import React from "react";
import { ThemeSwitch } from "../components";

interface props {}

export const LandingPage: React.FC<props> = () => {
  return (
    <Box width={["98%", "70%", "60%"]} margin="0 auto">
      <Flex justify={"flex-end"} mt={5} mb={5}>
        <ThemeSwitch />
      </Flex>
    </Box>
  );
};
