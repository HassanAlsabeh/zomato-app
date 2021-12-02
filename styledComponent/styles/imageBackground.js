import React from "react";
import styled from "styled-components/native";

const ImageBackgroundStyle = styled.ImageBackground`
  flex: 1;
  justify-content: center;
`;

const ImageBackground = ({ bgColor, source, children }) => {
  return (
    <ImageBackgroundStyle bgColor={bgColor} source={source} resizeMode="cover">
      {children}
    </ImageBackgroundStyle>
  );
};

export default ImageBackground;
