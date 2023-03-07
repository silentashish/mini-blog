import React from "react";

import {
  Heading,
  Avatar,
  Box,
  Center,
  Text,
  Stack,
  Button,
  Link,
  Badge,
  useColorModeValue,
  Flex,
  Image,
} from "@chakra-ui/react";
import { calculateSince } from "../../functions";
import { Gallery } from "react-grid-gallery";

interface props {}

export const TweetGrid: React.FC<any> = ({
  user,
  text,
  images,
  created_at,
  likes,
  replies,
  id,
}) => {
  let date = calculateSince(created_at);
  return (
    <Center py={3}>
      <Box
        // maxW={"320px"}
        w={"full"}
        bg={useColorModeValue("white", "gray.900")}
        boxShadow={"2xl"}
        rounded={"lg"}
        p={6}
        textAlign={"center"}
      >
        <Flex alignItems={"flex-start"}>
          <Avatar
            size={"lg"}
            src={user.profile_picture}
            mb={4}
            pos={"relative"}
          />
          <Box mt={1} ml={3}>
            <Flex align={"center"}>
              <Heading fontSize={"xl"}>
                {user.first_name} {user.last_name}
              </Heading>
              <Text ml={1} color={"gray.500"}>
                @{user.username}
              </Text>
              <Text ml={1} color={"gray.500"}>
                .
              </Text>
              <Text ml={1} color={"gray.500"}>
                {date.toString()}
              </Text>
            </Flex>

            <Text
              textAlign={"left"}
              color={useColorModeValue("gray.700", "gray.400")}
            >
              {text}
            </Text>

            <Gallery
              rowHeight={320}
              maxRows={2}
              images={images.reduce((acc: Array<any>, item: any) => {
                return [...acc, { src: item.image }];
              }, [])}
            />
          </Box>
        </Flex>
      </Box>
    </Center>
  );
};
