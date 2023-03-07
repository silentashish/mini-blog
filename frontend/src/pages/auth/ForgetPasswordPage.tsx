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
} from "@chakra-ui/react";
import { Navbar } from "../../components";

import { useForm, SubmitHandler } from "react-hook-form";
import { LoginType } from "../../types";
import { useMutation } from "react-query";
import { apiClient } from "../../apis";
import { useState } from "react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { useNavigate } from "react-router-dom";

interface props {}

export const ForgetPasswordPage: React.FC<props> = () => {
  const toast = useToast();

  // Show and hide password
  const [show, setShow] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<LoginType>();

  const navigate = useNavigate();

  const SigninMutation = useMutation(
    (data: any) => {
      return apiClient.post("/auth/resetpassword", data);
    },
    {
      onSuccess: (data: any) => {
        reset();
        toast({
          title: "Reset Link Send",
          description: data.data,
          status: "success",
          duration: 3000,
          isClosable: true,
        });
        setTimeout(() => {
          navigate("/signin");
        }, 3000);
      },
      onError: (data: any) => {
        toast({
          title: "Signin Failed",
          description: data.data,
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      },
    }
  );

  const onSubmit: SubmitHandler<LoginType> = (data) => {
    SigninMutation.mutate(JSON.stringify(data));
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
            <Heading fontSize={"4xl"}>Forget Password</Heading>
          </Stack>

          <Box
            rounded={"lg"}
            bg={useColorModeValue("white", "gray.700")}
            boxShadow={"lg"}
            p={8}
          >
            <form onSubmit={handleSubmit(onSubmit)}>
              <Stack spacing={4}>
                <FormControl id="email" isInvalid={Boolean(errors.email)}>
                  <FormLabel>Email address</FormLabel>
                  <Input
                    type="email"
                    {...register("email", {
                      required: "Email is required",
                    })}
                  />
                  <FormErrorMessage>
                    {errors.email && errors.email.message}
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
                    Reset Password
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
