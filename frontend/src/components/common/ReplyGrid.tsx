import React from "react";

import {
  Heading,
  Avatar,
  Box,
  Center,
  Text,
  useColorModeValue,
  Flex,
  Icon,
} from "@chakra-ui/react";
import { calculateSince } from "../../functions";
import { useNavigate } from "react-router-dom";
import { MdOutlineChevronLeft } from "react-icons/md";

export const ReplyGrid: React.FC<any> = ({
  user,
  text,
  created_at,
  backNav = false,
}) => {
  let date = calculateSince(created_at);

  let navigate = useNavigate();

  return (
    <Center py={3}>
      <Box
        w={"full"}
        bg={useColorModeValue("white", "gray.900")}
        boxShadow={"lg"}
        rounded={"lg"}
        p={6}
        textAlign={"center"}
        position={"relative"}
      >
        {backNav && (
          <Icon
            as={MdOutlineChevronLeft}
            h={10}
            w={10}
            cursor={"pointer"}
            position={"absolute"}
            left={4}
            top={1}
            onClick={() => {
              navigate(-1);
            }}
          />
        )}
        <Flex alignItems={"flex-start"} mt={backNav ? 5 : undefined}>
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
          </Box>
        </Flex>
      </Box>
    </Center>
  );
};
