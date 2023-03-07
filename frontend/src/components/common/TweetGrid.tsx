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
  Button,
  useToast,
} from "@chakra-ui/react";
import { calculateSince } from "../../functions";
import { Gallery } from "react-grid-gallery";
import { AiFillHeart, AiOutlineHeart, AiOutlineMessage } from "react-icons/ai";
import { useMutation } from "react-query";
import { apiClient } from "../../apis";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MdOutlineChevronLeft } from "react-icons/md";
import { useAuth } from "../../hooks";

export const TweetGrid: React.FC<any> = ({
  user,
  text,
  images,
  created_at,
  likes,
  replies,
  id,
  liked,
  backNav = false,
  showDelete,
  refetch,
}) => {
  let { user: currentUser } = useAuth();
  let date = calculateSince(created_at);

  let toast = useToast();

  let navigate = useNavigate();

  const TweetDeleteMutation = useMutation(
    (data: any) => {
      return apiClient.post("/tweet/delete", data);
    },
    {
      onSuccess: (data: any) => {
        refetch && refetch();
        toast({
          title: "Tweet Delete",
          description:
            typeof data.data === "string"
              ? data.data
              : JSON.stringify(data.data),
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      },
      onError: (data: any) => {
        toast({
          title: "Tweet Delete",
          description:
            typeof data.data === "string"
              ? data.data
              : JSON.stringify(data.data),
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      },
    }
  );

  const LikeDislikeMutation = useMutation(
    (data: any) => {
      return apiClient.post("/tweet/like", data);
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

  const [tweetLiked, setTweetLiked] = useState<boolean>(Boolean(liked));
  const [likeCount, setLikeCount] = useState<number>(likes);

  const handleTweetLikeDislike = () => {
    LikeDislikeMutation.mutate(
      JSON.stringify({
        tweet: id,
        action: !tweetLiked,
      })
    );
    setTweetLiked(!tweetLiked);
    setLikeCount((c) => (tweetLiked ? c - 1 : c + 1));
  };

  const goToProfile = () => {
    navigate(`/user?user=${user.id}`);
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
            onClick={goToProfile}
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
                <Text ml={1} color={"gray.500"}>
                  .
                </Text>
                <Text ml={1} color={"gray.500"}>
                  {date.toString()}
                </Text>
              </Flex>
              {user.id === currentUser?.id && showDelete && (
                <Button
                  size={"sm"}
                  colorScheme={"red"}
                  onClick={() =>
                    TweetDeleteMutation.mutate(JSON.stringify({ id }))
                  }
                >
                  Delete
                </Button>
              )}
            </Flex>

            <Text
              textAlign={"left"}
              color={useColorModeValue("gray.700", "gray.400")}
            >
              {text}
            </Text>

            {images.length > 0 && <Flex height={2} />}

            <Gallery
              rowHeight={320}
              maxRows={3}
              images={images.reduce((acc: Array<any>, item: any) => {
                return [...acc, { src: item.image }];
              }, [])}
            />
            <Flex mt={3} align="center">
              <Icon
                as={tweetLiked ? AiFillHeart : AiOutlineHeart}
                h={5}
                w={5}
                color={tweetLiked ? "red.500" : undefined}
                onClick={handleTweetLikeDislike}
              />
              <Text ml={1} color={"gray.500"}>
                {likeCount} likes
              </Text>

              <Icon
                as={AiOutlineMessage}
                h={5}
                w={5}
                ml={4}
                onClick={() => !backNav && navigate(`/detail?id=${id}`)}
              />
              <Text ml={1} color={"gray.500"}>
                {replies} replies
              </Text>
            </Flex>
          </Box>
        </Flex>
      </Box>
    </Center>
  );
};
