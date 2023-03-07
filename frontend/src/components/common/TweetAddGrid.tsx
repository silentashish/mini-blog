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
import { calculateSince } from "../../functions";
import { Gallery } from "react-grid-gallery";
import { ChatIcon } from "@chakra-ui/icons";
import { useAuth } from "../../hooks";
import { SubmitHandler, useForm } from "react-hook-form";
import { TweetType } from "../../types";
import { useMutation } from "react-query";
import { apiClient } from "../../apis";
import { TweetImagePicker } from "./TweetImagePicker";

interface props {
  refetch: () => void;
}

export const TweetAddGrid: React.FC<any> = ({ refetch }) => {
  const { user } = useAuth();
  const toast = useToast();

  const background = useColorModeValue("white", "gray.900");
  const textAreabackground = useColorModeValue("gray.100", "gray.900");

  const [image1, setImage1] = useState<File | null>(null);
  const [image2, setImage2] = useState<File | null>(null);
  const [image3, setImage3] = useState<File | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<TweetType>();

  const AddTweetMutation = useMutation(
    (data: any) => {
      return apiClient.post("/tweet/add", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
    },
    {
      onSuccess: (data: any) => {
        reset();
        setImage1(null);
        setImage2(null);
        setImage3(null);
        toast({
          title: "Tweet Added",
          description:
            typeof data.data === "string"
              ? data.data
              : JSON.stringify(data.data),
          status: "success",
          duration: 3000,
          isClosable: true,
        });
        refetch && refetch();
      },
      onError: (data: any) => {
        toast({
          title: "Signin Failed",
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
    let formData = new FormData();
    formData.append("message", data.message);
    formData.append("image1", image1 ?? "");
    formData.append("image2", image2 ?? "");
    formData.append("image3", image3 ?? "");
    AddTweetMutation.mutate(formData);
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
        p={[3, 6]}
        textAlign={"center"}
      >
        <Flex alignItems={"flex-start"}>
          <Avatar
            size={["md", "lg"]}
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

              <Flex mt={3} justifyContent="space-between" alignItems={"center"}>
                <Flex>
                  <TweetImagePicker
                    file={image1}
                    onChange={(f) => setImage1(f)}
                  />
                  <TweetImagePicker
                    file={image2}
                    onChange={(f) => setImage2(f)}
                  />
                  <TweetImagePicker
                    file={image3}
                    onChange={(f) => setImage3(f)}
                  />
                </Flex>
                <Button
                  color={"white"}
                  variant="solid"
                  bg={"orange.400"}
                  colorScheme="orange"
                  type="submit"
                >
                  Tweet
                </Button>
              </Flex>
            </form>
          </Box>
        </Flex>
      </Box>
    </Center>
  );
};
