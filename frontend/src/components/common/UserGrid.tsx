import React, { useState } from "react";

import {
  Avatar,
  Box,
  Button,
  Center,
  Flex,
  Heading,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { apiClient } from "../../apis";
import { useMutation } from "react-query";

export const UserGrid: React.FC<any> = ({ user, own = false }) => {
  const [isFollowing, setIsFollowing] = useState<boolean>(
    Boolean(user.is_following)
  );
  const [followers, setFollowers] = useState<number>(user.followers);

  const FollowMutation = useMutation(
    (data: any) => {
      return apiClient.post("/user/follow", data);
    },
    {
      onSuccess: (data: any) => {
        console.log({ data });
      },
      onError: (data: any) => {
        console.log({ data });
      },
    }
  );

  const handleFollowUnfollow = () => {
    FollowMutation.mutate(
      JSON.stringify({
        user: user.id,
        action: !isFollowing,
      })
    );
    setIsFollowing(!isFollowing);
    setFollowers((c) => (isFollowing ? c - 1 : c + 1));
  };

  return (
    <Center py={2}>
      <Box
        w={"full"}
        bg={useColorModeValue("white", "gray.900")}
        boxShadow={"lg"}
        rounded={"lg"}
        p={6}
        textAlign={"center"}
        position={"relative"}
      >
        <Flex alignItems={"flex-start"}>
          <Avatar
            size={"lg"}
            src={user.profile_picture}
            mb={4}
            pos={"relative"}
          />
          <Box mt={1} ml={3} width={"100%"}>
            <Flex justify={"space-between"} width={"100%"}>
              <Flex align={"center"}>
                <Heading fontSize={"xl"}>
                  {user.first_name} {user.last_name}
                </Heading>
                <Text ml={1} color={"gray.500"}>
                  @{user.username}
                </Text>
              </Flex>
              {!own && (
                <Button
                  colorScheme={isFollowing ? "gray" : "green"}
                  onClick={handleFollowUnfollow}
                >
                  {isFollowing ? "Unfollow" : "Follow"}
                </Button>
              )}
            </Flex>
            <Flex>
              <Text
                textAlign={"left"}
                color={useColorModeValue("gray.700", "gray.400")}
              >
                {followers} Followers
              </Text>
            </Flex>
          </Box>
        </Flex>
      </Box>
    </Center>
  );
};
