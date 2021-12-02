import React from 'react';
import { Dimensions } from 'react-native';
import styled, { css } from 'styled-components/native';

const CardContainer = styled.TouchableOpacity`

  flex:1;
  width: ${Dimensions.get('window').width - 16};
  height: ${Dimensions.get('window').height - 550};
  ${props => {
    if (props.bgColor) {
      return `background: ${props.bgColor};`
    }
  }}
  align-items: ${props => props.alignCont};
  justify-content:${props => props.justCont};
  margin:${props => props.contMarg};
  overflow:hidden;

  ${({ borderRadius }) => {
    if (borderRadius) {
      return `border-radius: 5px;`
    }
  }}
`;

const Container = ({ borderRadius, onPress, bgColor, contPadding, alignCont, justCont, contMarg, children }) => {
  return (
    <CardContainer
      onPress={onPress}
      borderRadius={borderRadius}
      contPadding={contPadding}
      justCont={justCont}
      alignCont={alignCont}
      contMarg={contMarg}
      bgColor={bgColor}
    >
      {children}
    </CardContainer >)
    ;
}

export default Container;