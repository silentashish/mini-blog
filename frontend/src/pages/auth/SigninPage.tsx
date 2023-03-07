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
import { useAuth } from "../../hooks";

interface props {}

export const SigninPage: React.FC<props> = () => {
  const toast = useToast();

  const { login } = useAuth();

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
      return apiClient.post("/auth/signin", data);
    },
    {
      onSuccess: (data: any) => {
        const { user, token } = data.data;
        login({ ...user, token });
        reset();
        navigate("/home");
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
        <Stack spacing={8} mx={"auto"} minW={"lg"} maxW={"lg"} py={12} px={6}>
          <Stack align={"center"}>
            <Heading fontSize={"4xl"}>Sign in to your account</Heading>
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
                <FormControl id="password" isInvalid={Boolean(errors.password)}>
                  <FormLabel>Password</FormLabel>
                  <InputGroup>
                    <Input
                      type={show ? "text" : "password"}
                      {...register("password", {
                        required: "Password is required",
                      })}
                    />
                    <InputRightElement right={0}>
                      <IconButton
                        aria-label="show password"
                        icon={show ? <ViewOffIcon /> : <ViewIcon />}
                        onClick={() => setShow((o) => !o)}
                      ></IconButton>
                    </InputRightElement>
                  </InputGroup>
                  <FormErrorMessage>
                    {errors.password && errors.password.message}
                  </FormErrorMessage>
                </FormControl>
                <Stack spacing={10}>
                  <Stack
                    direction={{ base: "column", sm: "row" }}
                    align={"start"}
                    justify={"space-between"}
                  >
                    <Checkbox>Remember me</Checkbox>
                    <Link
                      color={"orange.400"}
                      onClick={() => navigate("/forgetpassword")}
                    >
                      Forgot password?
                    </Link>
                  </Stack>
                  <Button
                    bg={"orange.400"}
                    color={"white"}
                    colorScheme="orange"
                    isLoading={isSubmitting || SigninMutation.isLoading}
                    type={"submit"}
                  >
                    Sign in
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
