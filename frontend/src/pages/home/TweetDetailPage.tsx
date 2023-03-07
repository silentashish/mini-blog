import { Container, Flex, Spinner } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useMutation } from "react-query";
import { apiClient } from "../../apis";
import {
  Navbar,
  ReplyGrid,
  TweetGrid,
  TweetRepliesGrid,
} from "../../components";

interface props {}

export const TweetDetailPage: React.FC<props> = () => {
  const id = new URLSearchParams(window.location.search).get("id");
  const [tweetDetailData, setTweetDetailData] = useState<any>({});

  const LoadDetail = useMutation(
    (data: any) => {
      return apiClient.post("/tweet/one", data);
    },
    {
      onSuccess: (data: any) => {
        setTweetDetailData(data.data);
      },
      onError: (data: any) => {
        console.log({ data });
      },
    }
  );

  useEffect(() => {
    LoadDetail.mutate(JSON.stringify({ id }));
  }, []);

  return (
    <Container maxW={"8xl"}>
      <Navbar hideSignIn />

      {LoadDetail.isLoading && (
        <Flex justify="center" align={"center"} pt={55} pb={55}>
          <Spinner size={"xl"} />
        </Flex>
      )}

      {Object.keys(tweetDetailData).length > 0 && (
        <>
          <TweetGrid {...tweetDetailData} backNav />
          {tweetDetailData.replies_list.map((replies: any) => (
            <ReplyGrid {...replies} />
          ))}
          <TweetRepliesGrid
            id={id ? parseInt(id) : 0}
            refetch={() => {
              LoadDetail.mutate(JSON.stringify({ id }));
            }}
          />
        </>
      )}
    </Container>
  );
};
