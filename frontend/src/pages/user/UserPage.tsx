import { Container } from "@chakra-ui/react";
import React from "react";
import { ProfilePage } from "./ProfilePage";

interface props {}

export const UserPage: React.FC<props> = () => {
  const userId = new URLSearchParams(window.location.search).get("user");
  return <ProfilePage user_id={userId ? parseInt(userId) : undefined} />;
};
