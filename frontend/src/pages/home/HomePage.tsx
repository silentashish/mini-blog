import { Center, Container, Flex, Spinner, Text } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import { apiClient } from "../../apis";
import { Navbar, TweetAddGrid, TweetGrid } from "../../components";
import { useAuth } from "../../hooks";

interface props {}

export const HomePage: React.FC<props> = () => {
  const { user } = useAuth();
  console.log({ user });
  const navigate = useNavigate();

  const { isLoading, isError, data } = useQuery("alltweet", () => {
    return apiClient.get("tweet/all");
  });

  useEffect(() => {
    if (!user?.profile_picture) {
      navigate("/completeprofile");
    }
  }, [user]);

  return (
    <Container maxW={"8xl"}>
      <Navbar />

      <TweetAddGrid />

      {isLoading && (
        <Flex justify="center" align={"center"} pt={55} pb={55}>
          <Spinner size={"xl"} />
        </Flex>
      )}

      {data?.data && data?.data.map((item: any) => <TweetGrid {...item} />)}

      {data?.data && data?.data.length === 0 && (
        <Center py={20}>
          <Text color={"gray.400"}>Nothing here, add new tweet now.</Text>
        </Center>
      )}
    </Container>
  );
};
