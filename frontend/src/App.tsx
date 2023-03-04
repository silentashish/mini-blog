import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { Box, Button, useColorMode, useColorModeValue } from "@chakra-ui/react";

function App() {
  const { toggleColorMode } = useColorMode();

  // const bg = useColorModeValue("red.500", "red.200");
  // const color = useColorModeValue("white", "gray.800");

  return (
    <>
      <Box mb={4}>This box's style will change based on the color mode.</Box>
      <Button size="sm" onClick={toggleColorMode}>
        Toggle Mode
      </Button>
    </>
  );
}

export default App;
