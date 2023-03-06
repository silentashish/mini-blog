import { Container } from "@chakra-ui/react";
import React from "react";
import { Navbar } from "../../components";

interface props {}

export const HomePage: React.FC<props> = () => {
  return (
    <Container maxW={"8xl"}>
      <Navbar />
    </Container>
  );
};
