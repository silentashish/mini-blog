import {
  Box,
  Flex,
  Avatar,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useColorModeValue,
  Stack,
  useColorMode,
  Center,
  Image,
} from "@chakra-ui/react";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import Logo from "../../assets/logo.png";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks";

interface props {
  hideSignIn?: boolean;
}

export const Navbar: React.FC<props> = ({ hideSignIn = false }) => {
  const { colorMode, toggleColorMode } = useColorMode();
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  return (
    <>
      <Box bg={useColorModeValue("gray.100", "gray.900")} px={4} pl={0}>
        <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
          <Box onClick={() => navigate("/")} cursor="pointer">
            <Image src={Logo} h={16} />
          </Box>

          <Flex alignItems={"center"}>
            <Stack direction={"row"} spacing={7}>
              <Button onClick={toggleColorMode}>
                {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
              </Button>

              <Menu>
                {user !== null ? (
                  <MenuButton
                    as={Button}
                    rounded={"full"}
                    variant={"link"}
                    cursor={"pointer"}
                    minW={0}
                  >
                    <Avatar
                      size={"sm"}
                      src={
                        user.profile_picture ??
                        "https://avatars.dicebear.com/api/male/username.svg"
                      }
                    />
                  </MenuButton>
                ) : (
                  !hideSignIn && (
                    <Button
                      onClick={() => navigate("/signin")}
                      variant={"solid"}
                      bg={"orange.400"}
                      color={"white"}
                      colorScheme="orange"
                    >
                      Sign In
                    </Button>
                  )
                )}
                {user !== null && (
                  <MenuList alignItems={"center"}>
                    <br />
                    <Center>
                      <Avatar
                        size={"2xl"}
                        src={
                          user.profile_picture ??
                          "https://avatars.dicebear.com/api/male/username.svg"
                        }
                      />
                    </Center>
                    <br />
                    <Center>
                      <p>
                        {user.first_name} {user.last_name}
                      </p>
                    </Center>
                    <Center>
                      <p>@{user.username}</p>
                    </Center>
                    <br />
                    <MenuDivider />
                    <MenuItem onClick={() => navigate("/changepassword")}>
                      Change Password
                    </MenuItem>
                    <MenuItem onClick={() => navigate("/completeprofile")}>
                      Complete Profile
                    </MenuItem>
                    <MenuItem
                      onClick={() => {
                        logout();
                      }}
                    >
                      Logout
                    </MenuItem>
                  </MenuList>
                )}
              </Menu>
            </Stack>
          </Flex>
        </Flex>
      </Box>
    </>
  );
};
