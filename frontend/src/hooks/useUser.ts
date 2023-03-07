import { useContext } from "react";
import { AuthContext } from "../context";
import { UserType } from "../types";
import { useLocalStorage } from "./useLocalStorage";
import { apiClient } from "../apis";

export const useUser = () => {
  const { user, setUser } = useContext(AuthContext);
  const { setItem } = useLocalStorage();

  const addUser = (user: UserType) => {
    setUser(user);
    setItem("user", JSON.stringify(user));
    apiClient.defaults.headers.common["Authorization"] = "Token " + user.token;
  };

  const removeUser = () => {
    setUser(null);
    setItem("user", "");
    delete apiClient.defaults.headers.common["Authorization"];
  };

  return { user, addUser, removeUser };
};
