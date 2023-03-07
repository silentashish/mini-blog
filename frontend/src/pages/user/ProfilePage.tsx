import { Container, Flex, Spinner } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useMutation } from "react-query";
import { apiClient } from "../../apis";
import { Navbar, TweetGrid, UserGrid } from "../../components";
import { useAuth } from "../../hooks";

interface props {
  user_id?: number | undefined;
}

export const ProfilePage: React.FC<props> = ({ user_id }) => {
  const { user } = useAuth();

  let userId = user_id ?? user?.id ?? 0;

  const [profileDetailData, setProfileDetailData] = useState<any>({});

  const LoadDetail = useMutation(
    (data: any) => {
      return apiClient.post("user/details", data);
    },
    {
      onSuccess: (data: any) => {
        setProfileDetailData(data.data);
      },
      onError: (data: any) => {
        console.log({ data });
      },
    }
  );

  const refetch = () => {
    LoadDetail.mutate(JSON.stringify({ id: userId }));
  };

  useEffect(() => {
    refetch();
  }, []);

  return (
    <Container maxW={"8xl"}>
      <Navbar />

      {LoadDetail.isLoading && (
        <Flex justify="center" align={"center"} pt={55} pb={55}>
          <Spinner size={"xl"} />
        </Flex>
      )}

      {Object.keys(profileDetailData).length > 0 && (
        <>
          {profileDetailData.user && (
            <UserGrid user={profileDetailData.user} own={!user_id} />
          )}
          {profileDetailData.tweets.map((replies: any) => (
            <TweetGrid {...replies} showDelete refetch={refetch} />
          ))}
        </>
      )}
    </Container>
  );
};
