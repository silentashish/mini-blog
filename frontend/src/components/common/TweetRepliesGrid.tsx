import React, { useState } from "react";

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
  IconButton,
  Textarea,
  useToast,
  FormErrorMessage,
  FormControl,
} from "@chakra-ui/react";
import { useAuth } from "../../hooks";
import { SubmitHandler, useForm } from "react-hook-form";
import { TweetType } from "../../types";
import { useMutation } from "react-query";
import { apiClient } from "../../apis";
import { TweetImagePicker } from "./TweetImagePicker";

interface props {
  id: number;
  refetch?: () => void;
}

export const TweetRepliesGrid: React.FC<props> = ({ id, refetch }) => {
  const { user } = useAuth();
  const toast = useToast();

  const background = useColorModeValue("white", "gray.900");
  const textAreabackground = useColorModeValue("gray.100", "gray.900");

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<TweetType>();

  const AddTweetMutation = useMutation(
    (data: any) => {
      return apiClient.post("/tweet/reply", data);
    },
    {
      onSuccess: (data: any) => {
        reset();
        refetch && refetch();
        toast({
          title: "Replies Added",
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
          title: "Failed to add reply",
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

  const onSubmit: SubmitHandler<TweetType> = (data) => {
    AddTweetMutation.mutate(
      JSON.stringify({ ...data, parent: null, tweet: id })
    );
  };

  if (!user) {
    return <></>;
  }

  return (
    <Center py={3}>
      <Box
        w={"full"}
        bg={background}
        boxShadow={"lg"}
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

          <Box mt={1} ml={3} width={"100%"}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Flex align={"center"}>
                <Text ml={1} color={"gray.500"}>
                  Write Something @{user.username}
                </Text>
              </Flex>
              <FormControl
                id="old_password"
                isInvalid={Boolean(errors.message)}
              >
                <Textarea
                  mt={3}
                  borderRadius={2}
                  width={"100%"}
                  bg={textAreabackground}
                  minH={120}
                  size={"lg"}
                  maxLength={280}
                  {...register("message", {
                    required: "You can't tweet empty",
                    validate: (val: string) => {
                      if (watch("message").length > 280) {
                        return "Too Long Message, can't post";
                      }
                    },
                  })}
                />
                <FormErrorMessage>
                  {errors.message && errors.message.message}
                </FormErrorMessage>
              </FormControl>

              <Flex mt={3} justifyContent="flex-end" alignItems={"center"}>
                <Button
                  color={"white"}
                  variant="solid"
                  bg={"orange.400"}
                  colorScheme="orange"
                  type="submit"
                >
                  Reply
                </Button>
              </Flex>
            </form>
          </Box>
        </Flex>
      </Box>
    </Center>
  );
};
