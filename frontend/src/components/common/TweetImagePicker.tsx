import { Center, Icon, Flex, useColorModeValue, Image } from "@chakra-ui/react";
import React, { useRef } from "react";
import UserImage from "../../assets/user.png";
import { MdImage } from "react-icons/md";

interface props {
  file: File | null;
  onChange: (f: File) => void;
  error?: boolean;
}

export const TweetImagePicker: React.FC<props> = ({
  file,
  onChange,
  error = false,
}) => {
  let ref: any = useRef(null);

  const border = useColorModeValue("1px solid black", "1px solid white");

  const onChangeFile = (event: any) => {
    event.stopPropagation();
    event.preventDefault();
    var file = event.target.files[0];
    onChange(file);
  };

  return (
    <>
      <Center>
        <Flex p={2} border={border} mr={2}>
          {file ? (
            <Image
              boxSize="35px"
              src={file ? URL.createObjectURL(file) : UserImage}
              alt="Dan Abramov"
              onClick={() => ref.current.click()}
            />
          ) : (
            <Icon
              as={MdImage}
              w={8}
              h={8}
              onClick={() => ref.current.click()}
            />
          )}
        </Flex>
      </Center>
      <input
        type={"file"}
        ref={ref}
        style={{ display: "none" }}
        onChange={onChangeFile}
      />
    </>
  );
};
