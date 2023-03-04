import { Button, IconButton, useColorMode } from "@chakra-ui/react";
import { SunIcon, MoonIcon } from "@chakra-ui/icons";
import React from "react";

interface props {}

export const ThemeSwitch: React.FC<props> = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  if (colorMode === "light")
    return (
      <IconButton
        aria-label="Search database"
        icon={<MoonIcon />}
        onClick={toggleColorMode}
      />
    );
  return (
    <IconButton
      aria-label="Search database"
      icon={<SunIcon />}
      onClick={toggleColorMode}
    />
  );
};
