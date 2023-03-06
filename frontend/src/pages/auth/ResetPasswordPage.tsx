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
import { LoginType, ResetPasswordType } from "../../types";
import { useMutation } from "react-query";
import { apiClient } from "../../apis";
import { useState } from "react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { useNavigate } from "react-router-dom";

interface props {}

export const ResetPasswordPage: React.FC<props> = () => {
  const toast = useToast();

  // Show and hide password
  const [show, setShow] = useState(false);

  const ToekenValue = new URLSearchParams(window.location.search).get("token");

  const {
    register,
    watch,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ResetPasswordType>();

  const navigate = useNavigate();

  const ResetPasswordMutation = useMutation(
    (data: any) => {
      return apiClient.post("/auth/createnewpassword", data);
    },
    {
      onSuccess: (data: any) => {
        reset();
        toast({
          title: "Password Reset",
          description: data.data,
          status: "success",
          duration: 3000,
          isClosable: true,
        });
        navigate("/signin");
      },
      onError: (data: any) => {
        toast({
          title: "Reset Password Failed",
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

  const onSubmit: SubmitHandler<ResetPasswordType> = (data) => {
    ResetPasswordMutation.mutate(
      JSON.stringify({
        token: ToekenValue,
        new_password: data.new_password,
      })
    );
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
            <Heading fontSize={"4xl"}>Create New Password</Heading>
          </Stack>

          <Box
            rounded={"lg"}
            bg={useColorModeValue("white", "gray.700")}
            boxShadow={"lg"}
            p={8}
          >
            <form onSubmit={handleSubmit(onSubmit)}>
              <Stack spacing={4}>
                <FormControl
                  id="new_password"
                  isInvalid={Boolean(errors.new_password)}
                >
                  <FormLabel>New password</FormLabel>
                  <InputGroup>
                    <Input
                      type={show ? "text" : "password"}
                      {...register("new_password", {
                        required: "new_password is required",
                      })}
                    />
                    <InputRightElement right={0}>
                      <IconButton
                        aria-label="show new_password"
                        icon={show ? <ViewOffIcon /> : <ViewIcon />}
                        onClick={() => setShow((o) => !o)}
                      ></IconButton>
                    </InputRightElement>
                  </InputGroup>
                  <FormErrorMessage>
                    {errors.new_password && errors.new_password.message}
                  </FormErrorMessage>
                </FormControl>

                <FormControl
                  id="new_password"
                  isInvalid={Boolean(errors.ver_new_password)}
                >
                  <FormLabel>Reenter new password</FormLabel>
                  <InputGroup>
                    <Input
                      type={show ? "text" : "password"}
                      {...register("ver_new_password", {
                        required: "ver_new_password is required",
                        validate: (val: string) => {
                          if (watch("new_password") !== val) {
                            return "Your passwords do no match";
                          }
                        },
                      })}
                    />
                    <InputRightElement right={0}>
                      <IconButton
                        aria-label="show ver_new_password"
                        icon={show ? <ViewOffIcon /> : <ViewIcon />}
                        onClick={() => setShow((o) => !o)}
                      ></IconButton>
                    </InputRightElement>
                  </InputGroup>
                  <FormErrorMessage>
                    {errors.ver_new_password && errors.ver_new_password.message}
                  </FormErrorMessage>
                </FormControl>

                <Stack spacing={10}>
                  <Button
                    bg={"orange.400"}
                    color={"white"}
                    colorScheme="orange"
                    isLoading={isSubmitting || ResetPasswordMutation.isLoading}
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
