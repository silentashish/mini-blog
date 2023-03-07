import { Center, Image, Input } from "@chakra-ui/react";
import React, { useRef } from "react";
import UserImage from "../../assets/user.png";

interface props {
  file: File | null;
  onChange: (f: File) => void;
  error?: boolean;
}

export const ImagePicker: React.FC<props> = ({
  file,
  onChange,
  error = false,
}) => {
  let ref: any = useRef(null);

  const onChangeFile = (event: any) => {
    event.stopPropagation();
    event.preventDefault();
    var file = event.target.files[0];
    onChange(file);
  };

  return (
    <>
      <Center>
        <Image
          border={error ? "3px solid red" : undefined}
          borderRadius="full"
          boxSize="150px"
          src={file ? URL.createObjectURL(file) : UserImage}
          alt="Dan Abramov"
          onClick={() => ref.current.click()}
        />
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
