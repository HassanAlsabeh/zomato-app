import React from 'react';
import styled from 'styled-components/native';

const ImageStyle = styled.Image`

    width: ${props => props.imgWidth};
    height: ${props => props.imgHeight};
`;

const Image = ({ source, imgWidth, imgHeight }) => {
  return (
    <ImageStyle source={source} imgWidth={imgWidth} imgHeight={imgHeight} />
  );
}

export default Image;