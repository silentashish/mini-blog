import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  Stack,
  Link,
  Button,
  Heading,
  Text,
  useColorModeValue,
  Container,
  useToast,
  FormErrorMessage,
  InputRightElement,
  InputGroup,
  IconButton,
  Image,
  Center,
} from "@chakra-ui/react";
import { ImagePicker, Navbar } from "../../components";

import { useForm, SubmitHandler } from "react-hook-form";
import { CompleteProfileType } from "../../types";
import { useMutation } from "react-query";
import { apiClient } from "../../apis";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks";

interface props {}

export const CompleteProfilePage: React.FC<props> = () => {
  const toast = useToast();

  const { user, login } = useAuth();

  const getDefaultImage = (imagelink: string | undefined) => {
    let file: File | null = null;
    if (imagelink) {
      fetch(imagelink).then(async (response) => {
        const contentType = response.headers.get("content-type");
        const blob = await response.blob();
        let content: any = { type: contentType };
        let fileName: string =
          imagelink.split("/").slice(-1).pop() ?? "randome.png";
        file = new File([blob], fileName, content);
        if (file !== null) {
          setImage(file);
        }
      });
    }
  };

  useEffect(() => {
    getDefaultImage(user?.profile_picture);
  }, []);

  const [image, setImage] = useState<File | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<CompleteProfileType>({
    defaultValues: {
      first_name: user?.first_name,
      last_name: user?.last_name,
    },
  });

  const navigate = useNavigate();

  const SigninMutation = useMutation(
    (data: any) => {
      return apiClient.post("/auth/completeprofile", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
    },
    {
      onSuccess: (data: any) => {
        const { user: updatedUser } = data.data;

        login({ ...user, ...updatedUser });

        toast({
          title: "Profile Updated",
          description: "profile updated successfully.",
          status: "success",
          duration: 3000,
          isClosable: true,
        });

        setTimeout(() => {
          navigate("/home");
        }, 3000);
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

  const [fileError, setFileError] = useState(false);

  const onSubmit: SubmitHandler<CompleteProfileType> = (data) => {
    if (image === null) {
      setFileError(true);
    } else {
      let formData = new FormData();
      formData.append("profile_image", image, image.name);
      formData.append("first_name", data.first_name);
      formData.append("last_name", data.last_name);

      SigninMutation.mutate(formData);
    }
  };

  return (
    <Container maxW={"8xl"}>
      <Navbar hideSignIn />
      <Flex
        align={"center"}
        justify={"center"}
        minH={"95vh"}
        bg={useColorModeValue("gray.50", "gray.800")}
      >
        <Stack
          spacing={8}
          mx={"auto"}
          minW={["sm", "lg"]}
          maxW={"lg"}
          py={12}
          px={6}
        >
          <Stack align={"center"}>
            <Heading fontSize={"4xl"}>Complete Profile</Heading>
          </Stack>

          <Box
            rounded={"lg"}
            bg={useColorModeValue("white", "gray.700")}
            boxShadow={"lg"}
            p={8}
          >
            <form onSubmit={handleSubmit(onSubmit)}>
              <Stack spacing={4}>
                <Center>
                  <ImagePicker
                    error={fileError}
                    file={image}
                    onChange={(file) => {
                      setImage(file);
                      setFileError(false);
                    }}
                  />
                </Center>

                <FormControl
                  id="first_name"
                  isInvalid={Boolean(errors.first_name)}
                >
                  <FormLabel>First Name</FormLabel>
                  <Input
                    type="string"
                    {...register("first_name", {
                      required: "First Name is required",
                    })}
                  />
                  <FormErrorMessage>
                    {errors.first_name && errors.first_name.message}
                  </FormErrorMessage>
                </FormControl>

                <FormControl
                  id="last_name"
                  isInvalid={Boolean(errors.last_name)}
                >
                  <FormLabel>Last Name</FormLabel>
                  <Input
                    type="string"
                    {...register("last_name", {
                      required: "Last Name is required",
                    })}
                  />
                  <FormErrorMessage>
                    {errors.last_name && errors.last_name.message}
                  </FormErrorMessage>
                </FormControl>

                <Stack spacing={10}>
                  <Button
                    bg={"orange.400"}
                    color={"white"}
                    colorScheme="orange"
                    isLoading={isSubmitting || SigninMutation.isLoading}
                    type={"submit"}
                  >
                    Update Profile
                  </Button>
                </Stack>
              </Stack>
            </form>
          </Box>
        </Stack>
      </Flex>
    </Container>
  );
};
